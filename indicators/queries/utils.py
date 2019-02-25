""" Utilities to support queries in program_queries and indicator_queries"""

from indicators.models import (
    Indicator,
    Result,
    PeriodicTarget
)
from django.db import models


TIME_AWARE_FREQUENCIES = [
    (Indicator.ANNUAL, 12),
    (Indicator.SEMI_ANNUAL, 6),
    (Indicator.TRI_ANNUAL, 4),
    (Indicator.QUARTERLY, 3),
    (Indicator.MONTHLY, 1)
]

# pylint: disable=W0223
class UTCNow(models.Func):
    """no arguments, returns the current utc timestamp"""
    function = 'UTC_TIMESTAMP'
    template = '%(function)s()'

# pylint: disable=W0223
class Round(models.Func):
    """One argument, rounds to integer level (0 decimal places)"""
    function = 'ROUND'
    template = '%(function)s(%(expressions)s, 0)'

# pylint: disable=W0223
class MonthDate(models.Func):
    """takes a date and outputs a YYYYMM format date for period_diff comparison"""
    function = 'DATE_FORMAT'
    template = '%(function)s(%(expressions)s, \'%%%%Y%%%%m\')'


# pylint: disable=W0223
class MonthsCount(models.Func):
    """takes two date fields, finds their value, converts them to MonthDate format, and finds the difference in months

        note: +1 is due to the 'first of the month to end of the month' inclusive month ranges in our dates
        note: wrapping parens due to this field being used in division math"""
    function = 'PERIOD_DIFF'
    template = '(%(function)s(%(expressions)s)+1)'

    def __init__(self, end_date, start_date, **extra):
        if not start_date:
            raise ValueError('two dates required for diff')
        expressions = MonthDate(models.F(end_date)), MonthDate(models.F(start_date))
        super(MonthsCount, self).__init__(*expressions)


def indicator_lop_actual_progress_annotation():
    """actual progress:
        - only data associated with active periodic targets
        - summed if NUMBER, latest if PERCENTAGE
    """
    return models.Case(
        models.When(
            models.Q(
                models.Q(
                    models.Q(
                        models.Q(target_frequency=Indicator.LOP) &
                        # models.Q(program__reporting_period_end__lte=models.functions.Now())
                        models.Q(program__reporting_period_end__lt=UTCNow())
                    ) |
                    models.Q(target_frequency__in=[Indicator.MID_END, Indicator.EVENT])
                ) &
                models.Q(unit_of_measure_type=Indicator.PERCENTAGE)
                ),
            then=models.Subquery(
                Result.objects.filter(
                    indicator=models.OuterRef('pk')
                ).order_by('-date_collected').values('achieved')[:1]
            )
        ),
        models.When(
            models.Q(
                models.Q(
                    models.Q(target_frequency=Indicator.LOP) &
                    # models.Q(program__reporting_period_end__lte=models.functions.Now())
                    models.Q(program__reporting_period_end__lt=UTCNow())
                ) |
                models.Q(target_frequency__in=[Indicator.MID_END, Indicator.EVENT])
            ),
            then=models.Subquery(
                Result.objects.filter(
                    indicator=models.OuterRef('pk')
                ).order_by().values('indicator').annotate(
                    actual_sum=models.Sum('achieved')
                ).values('actual_sum')[:1]
            )
        ),
        models.When(
            models.Q(
                models.Q(target_frequency__in=[f[0] for f in TIME_AWARE_FREQUENCIES]) &
                models.Q(unit_of_measure_type=Indicator.PERCENTAGE)
                ),
            then=models.Subquery(
                Result.objects.filter(
                    models.Q(indicator=models.OuterRef('pk')) &
                    # models.Q(periodic_target__end_date__lt=models.functions.Now())
                    models.Q(periodic_target__end_date__lt=UTCNow())
                ).order_by('-date_collected').values('achieved')[:1]
            )
        ),
        models.When(
            target_frequency__in=[f[0] for f in TIME_AWARE_FREQUENCIES],
            then=models.Subquery(
                Result.objects.filter(
                    models.Q(indicator=models.OuterRef('pk')) &
                    # models.Q(periodic_target__end_date__lt=models.functions.Now())
                    models.Q(periodic_target__end_date__lt=UTCNow())
                ).order_by().values('indicator').annotate(
                    actual_sum=models.Sum('achieved')
                ).values('actual_sum')[:1]
            )
        ),
        default=models.Value(None),
        output_field=models.IntegerField()
    )

def indicator_lop_target_progress_annotation():
    """ target progress:
        active targets subset (active = completed time period, lop in completed program, or midend/event with data)
        targets summed if NUMBER & non-cumulative, latest if PERCENTAGE or cumulative
    """
    return models.Case(
        models.When(
            models.Q(
                models.Q(
                    models.Q(target_frequency=Indicator.LOP) &
                    # models.Q(program__reporting_period_end__lte=models.functions.Now())
                    models.Q(program__reporting_period_end__lt=UTCNow())
                )
            ),
            then=models.F('lop_target')
        ),
        models.When(
            models.Q(
                models.Q(target_frequency__in=[f[0] for f in TIME_AWARE_FREQUENCIES]) &
                models.Q(
                    models.Q(is_cumulative=True) |
                    models.Q(unit_of_measure_type=Indicator.PERCENTAGE)
                    )
                ),
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    models.Q(indicator=models.OuterRef('pk')) &
                    # models.Q(end_date__lt=models.functions.Now())
                    models.Q(end_date__lt=UTCNow())
                ).order_by('-end_date').values('target')[:1]
            )
        ),
        models.When(
            target_frequency__in=[f[0] for f in TIME_AWARE_FREQUENCIES],
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    models.Q(indicator=models.OuterRef('pk')) &
                    # models.Q(end_date__lt=models.functions.Now())
                    models.Q(end_date__lt=UTCNow())
                ).order_by().values('indicator').annotate(
                    target_sum=models.Sum('target')
                ).values('target_sum')[:1]
            )
        ),
        models.When(
            models.Q(
                models.Q(target_frequency__in=[Indicator.MID_END, Indicator.EVENT]) &
                models.Q(
                    models.Q(is_cumulative=True) |
                    models.Q(unit_of_measure_type=Indicator.PERCENTAGE)
                    )
                ),
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    indicator=models.OuterRef('pk')
                ).annotate(
                    has_data=models.Exists(Result.objects.filter(periodic_target=models.OuterRef('pk')))
                ).filter(
                    has_data=True
                ).order_by('-customsort').values('target')[:1]
            )
        ),
        models.When(
            target_frequency__in=[Indicator.MID_END, Indicator.EVENT],
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    indicator=models.OuterRef('pk')
                ).annotate(
                    has_data=models.Exists(Result.objects.filter(periodic_target=models.OuterRef('pk')))
                ).filter(
                    has_data=True
                ).order_by().values('indicator').annotate(
                    target_sum=models.Sum('target')
                ).values('target_sum')[:1]
            )
        ),
        default=models.Value(None),
        output_field=models.IntegerField()
    )

def indicator_lop_percent_met_progress_annotation():
    """percent met progress:
        actual progress (see above) / target progress (see above)
    """
    return models.Case(
        models.When(
            models.Q(
                models.Q(lop_actual_progress__isnull=False) &
                models.Q(lop_target_progress__isnull=False)
            ),
            then=models.ExpressionWrapper(
                models.F('lop_actual_progress') / models.F('lop_target_progress'),
                output_field=models.FloatField()
            )
        ),
        default=models.Value(None)
    )

def indicator_reporting_annotation():
    """annotation to sort indicators into 'reporting' and 'nonreporting' based on business rules:
        LOP only reports when the program reporting period has ended
        all indicators only report when their targets are defined
        all indicators only report when they have at least one data point (an actual data sum)
        lop_actual_progress above
        lop_target_progress above"""
    return models.Case(
        models.When(
            models.Q(target_frequency=Indicator.LOP) &
            # models.Q(program__reporting_period_end__gt=models.functions.Now()),
            models.Q(program__reporting_period_end__gt=UTCNow()),
            then=models.Value(False)
        ),
        models.When(
            lop_target_progress__isnull=True,
            then=models.Value(False)
        ),
        models.When(
            lop_actual_progress__isnull=True,
            then=models.Value(False)
        ),
        default=models.Value(True),
        output_field=models.BooleanField()
    )


def indicator_over_under_annotation():
    """annotates indicators with how close to on-track they are:
        -1 : under target by a 15% margin
        0 : within 15% of target
        1 : over target by a 15% margin
        None: nonreporting indicator"""
    over_scope = 1 + Indicator.ONSCOPE_MARGIN
    under_scope = 1 - Indicator.ONSCOPE_MARGIN
    return models.Case(
        # None for indicators missing targets or data:
        models.When(
            models.Q(reporting=False) |
            models.Q(lop_percent_met_progress__isnull=True),
            then=models.Value(None)
            ),
        models.When(
            # over is negative if DOC is Negative
            models.Q(lop_percent_met_progress__gt=over_scope) &
            models.Q(direction_of_change=Indicator.DIRECTION_OF_CHANGE_NEGATIVE),
            then=models.Value(-1)
            ),
        models.When(
            lop_percent_met_progress__gt=over_scope,
            then=models.Value(1)
        ),
        models.When(
            # under is positive if DOC is Negative:
            models.Q(lop_percent_met_progress__lt=under_scope) &
            models.Q(direction_of_change=Indicator.DIRECTION_OF_CHANGE_NEGATIVE),
            then=models.Value(1)
        ),
        models.When(
            lop_percent_met_progress__lt=under_scope,
            then=models.Value(-1)
        ),
        default=models.Value(0),
        output_field=models.IntegerField(null=True)
    )


def indicator_lop_target_calculated_annotation():
    """annotates an indicator with the sum of targets for the entire program (not taking active/inactive targets)
       into account - NOT for progress, for results display only"""
    return models.Case(
        models.When(
            models.Q(
                models.Q(
                    models.Q(unit_of_measure_type=Indicator.PERCENTAGE) |
                    models.Q(is_cumulative=True)
                    ) &
                models.Q(target_frequency__in=[Indicator.MID_END, Indicator.EVENT])
                ),
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    indicator=models.OuterRef('pk')
                ).order_by('-customsort').values('target')[:1],
                output_field=models.IntegerField()
                )
            ),
        models.When(
            models.Q(
                models.Q(unit_of_measure_type=Indicator.PERCENTAGE) |
                models.Q(is_cumulative=True)
                ),
            then=models.Subquery(
                PeriodicTarget.objects.filter(
                    indicator=models.OuterRef('pk')
                ).order_by('-end_date').values('target')[:1],
                output_field=models.IntegerField()
                )
            ),
        default=models.Subquery(
            PeriodicTarget.objects.filter(
                indicator=models.OuterRef('pk')
            ).order_by().values('indicator').annotate(
                target_sum=models.Sum('target')
            ).values('target_sum')[:1],
            output_field=models.IntegerField()
        )
    )


def indicator_lop_actual_annotation():
    """annotates an indicator with the value for the results table Life of Program Actual field
       NOT FOR progress measurement, does not take into account completed/active periods"""

    return models.Case(
        models.When(
            unit_of_measure_type=Indicator.PERCENTAGE,
            then=models.Subquery(
                Result.objects.filter(
                    indicator=models.OuterRef('pk')
                ).order_by('-date_collected').values('achieved')[:1]
                )
            ),
        default=models.Subquery(
            Result.objects.filter(
                indicator=models.OuterRef('pk')
            ).order_by().values('indicator').annotate(
                achieved_sum=models.Sum('achieved')
            ).values('achieved_sum')[:1]
            ),
        output_field=models.DecimalField(decimal_places=2)
        )


def indicator_lop_percent_met_annotation():
    """annotates an indicator with the percent met using:
        - lop_target (currently lop_target field, but will shift to lop_target_calculated)
        - lop_actual"""
    return models.Case(
        models.When(
            models.Q(lop_target__isnull=True) |
            models.Q(lop_actual__isnull=True),
            then=models.Value(None)
            ),
        default=models.ExpressionWrapper(
            models.F('lop_actual') / models.F('lop_target'),
            output_field=models.FloatField()
        )
    )
