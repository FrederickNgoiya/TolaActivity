"""Integrative tests for the home page (URL '/')"""

import datetime
from bs4 import BeautifulSoup
from indicators.queries import ProgramWithMetrics
from factories import (
    indicators_models as i_factories,
    workflow_models as w_factories
)
from django.shortcuts import render
from django import test

start_date = datetime.date(2015, 1, 1)
end_date = datetime.date(2016, 12, 31)

def get_programs_for_country(country):
    two_indicator_program = w_factories.ProgramFactory(
        funding_status="Funded",
        reporting_period_start=start_date,
        reporting_period_end=end_date
    )
    two_indicator_program.country.set([country])
    one_indicator_program = w_factories.ProgramFactory(
        funding_status="Funded",
        reporting_period_start=start_date,
        reporting_period_end=end_date
    )
    one_indicator_program.country.set([country])
    zero_indicator_program = w_factories.ProgramFactory(
        funding_status="Funded",
        reporting_period_start=start_date,
        reporting_period_end=end_date
    )
    zero_indicator_program.country.set([country])
    i_factories.IndicatorFactory(
        program=two_indicator_program
    )
    i_factories.IndicatorFactory(
        program=two_indicator_program
    )
    i_factories.IndicatorFactory(
        program=one_indicator_program
    )
    return two_indicator_program.id, one_indicator_program.id, zero_indicator_program.id

class TestHomepageViewContext(test.TestCase):
    def setUp(self):
        self.tola_user = w_factories.TolaUserFactory()
        self.client = test.Client()
        self.client.force_login(self.tola_user.user)

    def test_active_country_gets_program(self):
        active_country = w_factories.CountryFactory(
            country="Active",
            code="AT",
        )
        inactive_country = w_factories.CountryFactory(
            country="Inactive",
            code="IT"
        )
        self.tola_user.active_country = active_country
        self.tola_user.save()
        active_program = w_factories.ProgramFactory(
            funding_status="Funded",
        )
        active_program.country.set([active_country])
        inactive_program = w_factories.ProgramFactory(
            funding_status="Funded"
        )
        inactive_program.country.clear()
        inactive_program.country.set([inactive_country])
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['programs']), 1)
        self.assertEqual(response.context['programs'][0].id, active_program.id)
        # test selected country overrides:
        response = self.client.get('/{pk}/'.format(pk=inactive_country.id))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['programs']), 1)
        self.assertEqual(response.context['programs'][0].id, inactive_program.id)
        self.tola_user.refresh_from_db()
        self.assertEqual(self.tola_user.active_country, inactive_country)

    def test_programs_have_indicator_counts(self):
        active_country = w_factories.CountryFactory(
            country="Active",
            code="AT",
        )
        self.tola_user.active_country = active_country
        self.tola_user.save()
        two_id, one_id, zero_id = get_programs_for_country(active_country)
        response = self.client.get('/')
        self.assertEqual(len(response.context['programs']), 3)
        indicator_counts = {}
        for program in response.context['programs']:
            indicator_counts[program.id] = program.indicator_count
        self.assertEqual(indicator_counts[two_id], 2)
        self.assertEqual(indicator_counts[one_id], 1)
        self.assertEqual(indicator_counts[zero_id], 0)

    def test_template_renders_no_program_links_for_zero_indicator_programs(self):
        """per github ticket #855"""
        active_country = w_factories.CountryFactory(
            country="Active",
            code="AT",
        )
        self.tola_user.active_country = active_country
        self.tola_user.save()
        two_id, one_id, zero_id = get_programs_for_country(active_country)
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['programs']), 3)
        soup = BeautifulSoup(response.content, features="lxml")
        program_list = soup.find("section", class_="home__program-list")
        articles = program_list.find_all("article", class_="program-list__program")
        self.assertEqual(len(articles), 3)
        link_ids = []
        for article in articles:
            link = article.find('h4').find('a')
            if link:
                href = link.attrs['href']
                pk = int(href.lstrip('/program/')[:-5])
                link_ids.append(pk)
            text_list = article.find('ul', class_='nav--text-list')
            if link:
                self.assertIsNotNone(text_list)
                self.assertEqual(len(text_list.find_all('li')), 2)
            else:
                self.assertIsNone(text_list)
        self.assertEqual(set(link_ids), set([two_id, one_id]))
        self.assertIsNone(
            soup.find(href='/program/{0}/0/0/'.format(zero_id))
        )