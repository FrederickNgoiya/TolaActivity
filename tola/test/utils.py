import time
from decimal import Decimal, ROUND_HALF_UP

from factory import Sequence

from django.utils import timezone
from django.core.exceptions import ImproperlyConfigured
from django.test import runner
from unittest import runner as ut_runner

from factories.indicators_models import IndicatorFactory, PeriodicTargetFactory, CollectedDataFactory
from factories.workflow_models import ProgramFactory, CountryFactory, DocumentationFactory
from indicators.views.views_reports import IPTT_ReportView
from indicators.views.views_indicators import generate_periodic_targets
from indicators.models import Indicator, PeriodicTarget
from workflow.models import Program


class PeriodicTargetValues(object):

    def __init__(self, target=0, collected_data=None, evidence=None):
        self.target = target
        self.collected_data = collected_data or []
        self.evidence = evidence or []

    @property
    def collected_data_sum(self):
        return sum(self.collected_data)


class IndicatorValues(object):

    def __init__(
            self,
            periodic_targets,
            is_cumulative=False,
            direction_of_change=Indicator.DIRECTION_OF_CHANGE_NONE,
            target_frequency=Indicator.ANNUAL,
            lop_target=0,
            unit_of_measure_type=Indicator.NUMBER):

        self.periodic_targets = periodic_targets
        self.is_cumulative = is_cumulative
        self.direction_of_change = direction_of_change
        self.target_frequency = target_frequency
        self.lop_target = lop_target
        self.unit_of_measure_type = unit_of_measure_type

    @property
    def collected_data_sum(self):
        # For program total or program-to-date, calculation is same if indicator is cumulative or not.
        return sum([pt_values.collected_data_sum for pt_values in self.periodic_targets])

    @property
    def collected_data_sets(self):
        collected_data_values_sets = []
        for pt_values in self.periodic_targets:
            collected_data_values_sets.append([decimalize(cd_value) for cd_value in pt_values.collected_data])
        return collected_data_values_sets

    @property
    def periodic_target_targets(self):
        return [decimalize(pt.target) for pt in self.periodic_targets]

    @property
    def collected_data_sum_by_periodic_target(self):
        collected_sums = []
        for i, pt_values in enumerate(self.periodic_targets):
            if self.unit_of_measure_type == Indicator.NUMBER:
                if self.is_cumulative:
                    # Sum a list of lists.  These are lists of collected data "to-date".
                    collected_sums.append(sum([sum(vals) for vals in self.collected_data_sets[:i+1]]))
                else:
                    collected_sums.append(sum(self.collected_data_sets[i]))
            else:
                collected_sums.append(self.collected_data_sets[i][-1])
        return collected_sums

    def program_to_date_achieved_ratio(self, period_ceiling=None):
        achieved_by_period = self.collected_data_sum_by_periodic_target[:period_ceiling]
        targets_by_period = self.periodic_target_targets[:period_ceiling]
        if self.unit_of_measure_type == Indicator.NUMBER:
            achieved_val = sum(achieved_by_period)
            if self.is_cumulative:
                target_val = targets_by_period[:-1]
            else:
                target_val = sum(targets_by_period)
        else:
            achieved_val = achieved_by_period[:-1]
            target_val = targets_by_period[:-1]
        return achieved_val / target_val

    def __unicode__(self):
        return 'Indicator with %s periodic targets' % (len(self.periodic_targets))

    def __str__(self):
        return unicode(self).encode('utf-8')


class Scenario(object):

    def __init__(self, **kwargs):
        if kwargs['indicators']:
            self.indicators = kwargs['indicators']
        else:
            self.indicators = []

    def percent_indicators_on_target(self):
        return 3


# Load scenario values into the database
def instantiate_scenario(program_id, scenario, existing_indicator_ids=None):

    if existing_indicator_ids and len(scenario.indicators) != len(existing_indicator_ids):
        raise ImproperlyConfigured(
            "Can't instatiate scenario, indicator count (%s) doesn't match scenario indicator count (%s)" %
            (len(existing_indicator_ids), len(scenario.indicators)))

    indicator_ids = []
    program = Program.objects.get(id=program_id)
    for n, indicator_value_set in enumerate(scenario.indicators):
        if existing_indicator_ids:
            indicator = Indicator.objects.get(id=existing_indicator_ids[n])
        else:
            indicator = IndicatorFactory(
                program=program,
                is_cumulative=indicator_value_set.is_cumulative,
                direction_of_change=indicator_value_set.direction_of_change,
                target_frequency=indicator_value_set.target_frequency,
                lop_target=indicator_value_set.lop_target,)

        # It's important to return indicator_ids in order.  Preserving the creation order also preserves
        # the link between the scenario and the indicator that was created in the database.
        indicator_ids.append(indicator.id)
        make_targets(program, indicator)
        periodic_targets = PeriodicTarget.objects.filter(indicator__id=indicator.id)
        if len(periodic_targets) != len(indicator_value_set.periodic_targets):
            raise ImproperlyConfigured(
                "Scenario's periodic target count (%s) doesn't match program-based periodic target count (%s)." %
                (len(indicator_value_set.periodic_targets), len(periodic_targets)))
        for i, pt in enumerate(periodic_targets):
            pt.target = indicator_value_set.periodic_targets[i].target
            pt.save()
            try:
                evidence_values = indicator_value_set.periodic_targets[i].evidence
            except KeyError:
                evidence_values = []
            for j, cd_value in enumerate(indicator_value_set.periodic_targets[i].collected_data):
                cd = CollectedDataFactory(
                    periodic_target=pt, indicator=indicator, program=program, achieved=cd_value, )
                if evidence_values and evidence_values[j]:
                    cd.evidence = DocumentationFactory()
                    cd.save()

    return indicator_ids


# Generate anonymous indicators and programs
def generate_core_indicator_data(c_params=None, p_count=3, i_count=4):
    """
    Create up to 5 countries and an arbitrary number of related programs and indicators
    """
    if c_params is None:
        c_params = [
            ('Colombia', 'CO'),
            ('Tunisia', 'TN'),
        ]

    program_ids = []
    indicator_ids = []

    for i in range(len(c_params)):
        country = CountryFactory(country=c_params[i][0], code=c_params[i][1])
        programs = ProgramFactory.create_batch(
            p_count, countries=[country], name=Sequence(lambda n: 'Program %s %s' % (country.code, n)),
            funding_status="Funded",
        )
        for p in programs:
            program_ids.append(p.id)
            indicators = IndicatorFactory.create_batch(
                i_count, program=p, unit_of_measure_type=Indicator.NUMBER, is_cumulative=False,
                direction_of_change=Indicator.DIRECTION_OF_CHANGE_NONE, target_frequency=Indicator.ANNUAL)
            indicator_ids = [i.id for i in indicators]
            p.indicator_set.add(*indicators)

    return program_ids, indicator_ids


def make_targets(program, indicator):
    num_periods = IPTT_ReportView._get_num_periods(
        program.reporting_period_start, program.reporting_period_end, indicator.target_frequency)
    targets_json = generate_periodic_targets(
        tf=indicator.target_frequency, start_date=program.reporting_period_start, numTargets=num_periods)
    for i, pt in enumerate(targets_json):
        PeriodicTargetFactory(
            indicator=indicator,
            customsort=i,
            start_date=pt['start_date'],
            end_date=pt['end_date'],
            edit_date=timezone.now())


def decimalize(number):
    return Decimal(number).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)


class TimedTestResult(ut_runner.TextTestResult):
    SLOW_TEST_THRESHOLD = 2

    def startTest(self, test):
        self._started_at = time.time()
        super(TimedTestResult, self).startTest(test)

    def addSuccess(self, test):
        elapsed = time.time() - self._started_at
        name = self.getDescription(test)
        if elapsed > self.SLOW_TEST_THRESHOLD:
            self.stream.write(
                "\n{} ({:.03}s)\n".format(
                    name, elapsed)
                )
        super(TimedTestResult, self).addSuccess(test)

    def getTestTimings(self):
        return self.test_timings

class TimedTestRunner(runner.DiscoverRunner):

    def get_test_runner_kwargs(self):
        kwargs = super(TimedTestRunner, self).get_test_runner_kwargs()
        kwargs['resultclass'] = TimedTestResult
        return kwargs
