# -*- coding: utf-8 -*-

from django.test import TestCase, SimpleTestCase
from django.urls import reverse

from factories import PinnedReportFactory
from indicators import models

from factories.workflow_models import (
    ProgramFactory,
    TolaUserFactory,
    UserFactory
)


class PinnedReportTestCase(TestCase):
    """
    Set up some base entities in the DB
    """

    def setUp(self):
        self.user = UserFactory(first_name="PeterPeter", last_name="PumpkinEater", username="PPPE")
        self.user.set_password('orangethumb')
        self.user.save()
        self.tola_user = TolaUserFactory(user=self.user)
        self.country = self.tola_user.country
        self.program = ProgramFactory(
            funding_status='Funded', reporting_period_start='2016-03-01', reporting_period_end='2020-05-01')
        self.program.country.add(self.country)
        self.program.save()

        # TolaUser not available on User if not logged in
        self.client.login(username=self.user.username, password='orangethumb')


class TestUrlCreationFromPinnedReport(TestCase):
    """
    From a saved report, can a GET URL be reconstituted
    """

    def setUp(self):
        self.pinned_report = models.PinnedReport(
            name='Test Pinned Report',
            program_id=42,
            report_type='timeperiods',
            query_string='level=3&level=2&timeframe=1&numrecentperiods=&indicators=5476&targetperiods=1',
        )

    def test_url_from_pinned_report(self):
        url_str = self.pinned_report.report_url
        expected = '/indicators/iptt_report/42/timeperiods/?level=3&level=2&timeframe=1&numrecentperiods=&indicators=5476&targetperiods=1'

        self.assertEquals(url_str, expected)


class TestCreatePinnedReport(PinnedReportTestCase):
    """
    Test AJAX call for creating a pinned report
    """

    def test_successful_create(self):
        report_name = 'Test report name'
        report_type = 'reporttype'
        query_string = 'level=3&level=2&timeframe=1&numrecentperiods=&indicators=5476&targetperiods=1'

        data = {
            'name': report_name,
            'program': self.program.id,
            'report_type': report_type,
            'query_string': query_string,
        }

        path = reverse('create_pinned_report')
        response = self.client.post(path, data=data)

        self.assertEqual(response.status_code, 200)

        pr = models.PinnedReport.objects.get()
        self.assertEquals(pr.name, report_name)
        self.assertEquals(pr.program_id, self.program.id)
        self.assertEquals(pr.report_type, report_type)
        self.assertEquals(pr.query_string, query_string)
        self.assertEquals(pr.tola_user_id, self.tola_user.id)

    def test_invalid_data_create(self):
        data = {
            # no post data!
        }

        path = reverse('create_pinned_report')
        response = self.client.post(path, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertEquals(models.PinnedReport.objects.count(), 0)


class TestPinnedReportDateStrings(SimpleTestCase):
    """
    Date range strings vary depending on query string args - test possibilities
    """

    def test_fixed_date_range_timeperiods(self):
        pr = models.PinnedReport()
        pr.query_string = 'timeperiods=7&numrecentperiods=&start_period=2018-01-01&end_period=2018-06-30'

        self.assertEqual(pr.date_range_str, 'Jan 1, 2018 – Jun 30, 2018')

    def test_fixed_date_range_targetperiods(self):
        pr = models.PinnedReport()
        pr.query_string = 'start_period=2017-07-01&numrecentperiods=&end_period=2020-06-30&targetperiods=3'

        self.assertEqual(pr.date_range_str, 'Jul 1, 2017 – Jun 30, 2020')

    def test_relative_to_today_timeperiods(self):
        pr = models.PinnedReport()
        pr.query_string = 'timeperiods=7&numrecentperiods=2&timeframe=2'

        self.assertEqual(pr.date_range_str, 'Most recent 2 Months')

        pr.query_string = 'timeperiods=3&numrecentperiods=2&timeframe=2'

        self.assertEqual(pr.date_range_str, 'Most recent 2 Years')

    def test_relative_to_today_targetperiods(self):
        pr = models.PinnedReport()
        pr.query_string = 'targetperiods=7&numrecentperiods=2&timeframe=2'

        self.assertEqual(pr.date_range_str, 'Most recent 2 Months')

        pr.query_string = 'targetperiods=3&numrecentperiods=2&timeframe=2'

        self.assertEqual(pr.date_range_str, 'Most recent 2 Years')

        pr.query_string = 'targetperiods=4&numrecentperiods=2&timeframe=2'

        self.assertEqual(pr.date_range_str, 'Most recent 2 Semi-annual periods')

    def test_show_all(self):
        pr = models.PinnedReport()
        pr.query_string = 'timeperiods=4&numrecentperiods=&timeframe=1'

        self.assertEqual(pr.date_range_str, 'Show all Semi-annual periods')

    def test_midline_endline(self):
        pr = models.PinnedReport()
        pr.query_string = 'targetperiods=2&timeframe=1'

        self.assertEqual(pr.date_range_str, 'Show all results')

    def test_lop(self):
        pr = models.PinnedReport()
        pr.query_string = 'targetperiods=1&timeframe=1'

        self.assertEqual(pr.date_range_str, 'Show all results')

    def test_missing_qs(self):
        pr = models.PinnedReport()
        pr.query_string = ''

        self.assertEqual(pr.date_range_str, '')

    def test_possible_bad_input(self):
        # the current quickstart UI allows this invalid form input -> query str
        pr = models.PinnedReport()
        pr.query_string = 'targetperiods=1&timeframe=2&numrecentperiods=2'

        self.assertEquals(pr.date_range_str, 'Show all results')

class TestDefaultPinnedReport(SimpleTestCase):
    """
    Default pinned report for programs page
    """

    def test_default_report(self):
        default_report = models.PinnedReport.default_report(0)
        self.assertEquals(default_report.name, 'Recent progress for all indicators')
        self.assertEquals(default_report.date_range_str, 'Most recent 2 Months')
        self.assertEquals(default_report.program_id, 0)


class TestPinnedReportListInProgramView(PinnedReportTestCase):
    """
    Verify list of pinned reports is as expected on program page view
    """

    def test_program_view_no_pinned_reports(self):
        response = self.client.get(reverse('program_page', args=(self.program.id, 0, 0)))

        self.assertEqual(response.status_code, 200)
        pinned_reports = response.context['pinned_reports']
        self.assertEquals(len(pinned_reports), 1)  # default report

    def test_program_view(self):
        # Create 3 reports, 1 tied to a different user
        for i in range(2):
            PinnedReportFactory(
                tola_user=self.tola_user,
                program=self.program,
            )

        other_user = UserFactory(first_name='Other', last_name='User', username='otheruser')
        other_tola_user = TolaUserFactory(user=other_user)
        PinnedReportFactory(
            tola_user=other_tola_user,
            program=self.program,
        )

        response = self.client.get(reverse('program_page', args=(self.program.id, 0, 0)))

        self.assertEqual(response.status_code, 200)
        pinned_reports = response.context['pinned_reports']
        self.assertEquals(len(pinned_reports), 3)  # 2 + 1 default

        # verify ordering - pinned reports should be sorted newest to oldest
        self.assertTrue(pinned_reports[0].creation_date > pinned_reports[1].creation_date)


class TestDeletePinnedReportAPI(PinnedReportTestCase):
    """
    Test delete API call
    """

    def test_delete_of_pinned_report(self):
        pr = PinnedReportFactory(
            tola_user=self.tola_user,
            program=self.program,
        )

        self.assertEquals(models.PinnedReport.objects.count(), 1)

        data = {
            'pinned_report_id': pr.id,
        }

        response = self.client.post(reverse('delete_pinned_report'), data=data)

        self.assertEqual(response.status_code, 200)

        self.assertEquals(models.PinnedReport.objects.count(), 0)

    def test_delete_of_pinned_report_not_owned_by_user(self):
        other_user = UserFactory(first_name='Other', last_name='User', username='otheruser')
        other_tola_user = TolaUserFactory(user=other_user)
        pr = PinnedReportFactory(
            tola_user=other_tola_user,
            program=self.program,
        )

        self.assertEquals(models.PinnedReport.objects.count(), 1)

        data = {
            'pinned_report_id': pr.id,
        }

        response = self.client.post(reverse('delete_pinned_report'), data=data)

        self.assertEqual(response.status_code, 200)

        # nothing deleted!
        self.assertEquals(models.PinnedReport.objects.count(), 1)
