import datetime
import json

from django.test import RequestFactory, TestCase
from django.urls import reverse_lazy

from factories import ResultFactory
from indicators.models import Indicator, PeriodicTarget
from indicators.views.views_indicators import PeriodicTargetJsonValidationError
from tola.test.base_classes import TestBase


class TestIndcatorCreateUpdateBase(TestBase):
    def setUp(self):
        super(TestIndcatorCreateUpdateBase, self).setUp()

        # reset program start/end date
        self.program.reporting_period_start = datetime.date(2018, 1, 1)
        self.program.reporting_period_end = datetime.date(2020, 12, 31)
        self.program.save()

    def _base_indicator_post_data(self, target_frequency, periodic_targets):
        return {
            'name': 'Test Indicator',
            'program_id': self.program.id,
            'target_frequency': target_frequency,
            'level': self.level.id,
            'indicator_type': 1,
            'unit_of_measure_type': 1,
            'unit_of_measure': 1,
            'lop_target': 3223,
            'direction_of_change': Indicator.DIRECTION_OF_CHANGE_NONE,
            'periodic_targets': json.dumps(periodic_targets),
            'rationale': 'foo',
        }



class IndicatorCreateTests(TestIndcatorCreateUpdateBase, TestCase):
    """
    Test the create indicator form api paths works, and PTs are created
    """

    def setUp(self):
        super(IndicatorCreateTests, self).setUp()

        self.indicator.delete()  # scrap this since we are making new indicators

    def test_get(self):
        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.get(url)

        self.assertTemplateUsed(response, 'indicators/indicator_form_modal.html')

    def test_lop_creation(self):
        periodic_targets = []
        data = self._base_indicator_post_data(Indicator.LOP, periodic_targets)

        self.assertEqual(Indicator.objects.count(), 0)
        self.assertEqual(PeriodicTarget.objects.count(), 0)

        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(Indicator.objects.count(), 1)
        self.assertEqual(PeriodicTarget.objects.count(), 1)

        indicator = Indicator.objects.get()
        pt = PeriodicTarget.objects.get()

        self.assertEqual(pt.indicator, indicator)
        self.assertEqual(pt.period_name, PeriodicTarget.LOP_PERIOD)
        self.assertEqual(pt.target, indicator.lop_target)

        # Does updating a second time update the dummy PT?

        data['lop_target'] = 1024

        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.post(url, data)

        indicator = Indicator.objects.get()
        pt = PeriodicTarget.objects.get()

        self.assertEqual(pt.indicator, indicator)
        self.assertEqual(pt.period_name, PeriodicTarget.LOP_PERIOD)
        self.assertEqual(pt.target, indicator.lop_target)

    def test_annual_creation(self):
        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2018", "end_date": "Dec 31, 2018"},
            {"id": 0, "period": "Year 2", "target": "2", "start_date": "Jan 1, 2019", "end_date": "Dec 31, 2019"},
            {"id": 0, "period": "Year 3", "target": "3", "start_date": "Jan 1, 2020", "end_date": "Dec 31, 2020"}]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        self.assertEqual(Indicator.objects.count(), 0)
        self.assertEqual(PeriodicTarget.objects.count(), 0)

        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(Indicator.objects.count(), 1)
        self.assertEqual(PeriodicTarget.objects.count(), 3)

        indicator = Indicator.objects.get()
        pt = PeriodicTarget.objects.order_by('start_date').first()

        self.assertEqual(pt.indicator, indicator)
        self.assertEqual(pt.period_name, 'Year 1')
        self.assertEqual(pt.target, 1)

    def test_events_creation(self):
        periodic_targets = [{"id": 0, "period": "a", "target": "1", "start_date": "", "end_date": ""},
                            {"id": 0, "period": "b", "target": "2"}]

        data = self._base_indicator_post_data(Indicator.EVENT, periodic_targets)

        self.assertEqual(Indicator.objects.count(), 0)
        self.assertEqual(PeriodicTarget.objects.count(), 0)

        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(Indicator.objects.count(), 1)
        self.assertEqual(PeriodicTarget.objects.count(), 2)

        indicator = Indicator.objects.get()
        pt = PeriodicTarget.objects.order_by('customsort').first()

        self.assertEqual(pt.indicator, indicator)
        self.assertEqual(pt.period_name, 'a')
        self.assertEqual(pt.target, 1)

    def test_annual_creation_invalid_json(self):
        """What if client sends in pad periodic_targets JSON?"""
        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},  # wrong dates
            {"id": 0, "period": "Year 2", "target": "2", "start_date": "Jan 1, 2019", "end_date": "Dec 31, 2019"},
            {"id": 0, "period": "Year 3", "target": "3", "start_date": "Jan 1, 2020", "end_date": "Dec 31, 2020"}]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        url = reverse_lazy('indicator_create', args=[self.program.id])

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)

        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},  # too few pts
        ]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)

        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "-1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},
            # negative value
        ]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)


class IndicatorUpdateTests(TestIndcatorCreateUpdateBase, TestCase):
    """
    Test the update form API works, PTs are created, and that results are reassigned
    """

    def setUp(self):
        super(IndicatorUpdateTests, self).setUp()

        self.result = ResultFactory(
            periodic_target=None,
            indicator=self.indicator,
            program=self.program,
            achieved=1024,
            date_collected='2018-06-01'
        )

    def test_get(self):
        url = reverse_lazy('indicator_update', args=[self.indicator.id])
        response = self.client.get(url)

        # self.assertContains(response, 'Indicator Performance Tracking Table')
        self.assertTemplateUsed(response, 'indicators/indicator_form_modal.html')

    def test_lop_update(self):
        data = self._base_indicator_post_data(Indicator.LOP, [])

        self.assertEqual(PeriodicTarget.objects.count(), 0)

        url = reverse_lazy('indicator_update', args=[self.indicator.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(PeriodicTarget.objects.count(), 1)

        self.result.refresh_from_db()
        self.assertEqual(self.result.periodic_target, PeriodicTarget.objects.get())

    def test_annual_update(self):
        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2018", "end_date": "Dec 31, 2018"},
            {"id": 0, "period": "Year 2", "target": "2", "start_date": "Jan 1, 2019", "end_date": "Dec 31, 2019"},
            {"id": 0, "period": "Year 3", "target": "3", "start_date": "Jan 1, 2020", "end_date": "Dec 31, 2020"}]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        self.assertEqual(PeriodicTarget.objects.count(), 0)

        url = reverse_lazy('indicator_update', args=[self.indicator.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(PeriodicTarget.objects.count(), 3)

        self.result.refresh_from_db()
        self.assertEqual(self.result.periodic_target, PeriodicTarget.objects.order_by('start_date').first())

    def test_annual_update_invalid_json(self):
        """What if client sends in pad periodic_targets JSON?"""
        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},  # wrong dates
            {"id": 0, "period": "Year 2", "target": "2", "start_date": "Jan 1, 2019", "end_date": "Dec 31, 2019"},
            {"id": 0, "period": "Year 3", "target": "3", "start_date": "Jan 1, 2020", "end_date": "Dec 31, 2020"}]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        url = reverse_lazy('indicator_update', args=[self.indicator.id])

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)

        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},  # too few pts
        ]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)

        periodic_targets = [
            {"id": 0, "period": "Year 1", "target": "-1", "start_date": "Jan 1, 2017", "end_date": "Dec 31, 2017"},  # negative value
        ]

        data = self._base_indicator_post_data(Indicator.ANNUAL, periodic_targets)

        with self.assertRaises(PeriodicTargetJsonValidationError):
            self.client.post(url, data)


class PeriodicTargetsFormTests(TestBase, TestCase):

    def setUp(self):
        super(PeriodicTargetsFormTests, self).setUp()

    def test_post(self):

        # build form data using URL encoded form key value pairs
        data = {
            'name': 'Test+Name',
            'program2': self.program.id,
            'target_frequency': Indicator.ANNUAL,
            'level': 1,
            'indicator_type': 1,
            'unit_of_measure_type': 1,
            'unit_of_measure': 1,
            'lop_target': 3223,
            'program': self.program.id,
            'direction_of_change': Indicator.DIRECTION_OF_CHANGE_NONE,
        }
        request = RequestFactory()
        request.user = self.user

        url = reverse_lazy('periodic_targets_form', args=[self.program.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)
