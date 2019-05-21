from django.test import RequestFactory, TestCase
from django.urls import reverse_lazy

from indicators.models import Indicator
from tola.test.base_classes import TestBase


class IndicatorCreateFunctionTests(TestBase, TestCase):

    def setUp(self):
        super(IndicatorCreateFunctionTests, self).setUp()

    def test_get(self):
        url = reverse_lazy('indicator_create', args=[self.program.id])
        response = self.client.get(url)

        self.assertContains(response, 'Indicator Performance Tracking Table')
        self.assertTemplateUsed(response, 'indicators/indicator_create.html')

    def test_post(self):
        request_content = {
            'program': self.program.id, 'country': self.country.id, 'services': 0, 'service_indicator': 0}
        response = self.client.post('/indicators/indicator_create/%s/' % self.program.id, request_content)

        self.assertEqual(response.status_code, 302)


class IndicatorUpdateTests(TestBase, TestCase):

    def setUp(self):
        super(IndicatorUpdateTests, self).setUp()

    def test_get(self):
        url = reverse_lazy('indicator_update', args=[self.indicator.id])
        response = self.client.get(url)

        self.assertContains(response, 'Indicator Performance Tracking Table')
        self.assertTemplateUsed(response, 'indicators/indicator_form.html')

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

        url = reverse_lazy('indicator_update', args=[self.indicator.id])
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)


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

        print response.content
