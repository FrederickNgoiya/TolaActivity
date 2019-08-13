"""
Tests of the various views related to the results framework
"""
import datetime

from django import test

from rest_framework.test import APIRequestFactory, APIClient

from factories import (
    workflow_models as w_factories,
    indicators_models as i_factories
)
from indicators.models import Indicator, Level, LevelTierTemplate
import indicators.views.views_results_framework as rfv
from workflow.models import Country, ProgramAccess


#
class RFBuilderTestSetup(object):

    def setUp(self):
        self.program = w_factories.ProgramFactory()
        country = self.program.country.all()[0]

        self.users = {}
        for auth_level in ['low', 'medium', 'high']:
            username = auth_level + '_user'
            user = w_factories.UserFactory(
                username=username, first_name=auth_level, last_name='test')
            user.country = country
            user.save()
            ProgramAccess.objects.create(
                country=country, program=self.program, tolauser=user.tola_user, role=auth_level)
            w_factories.TolaUserFactory(
                user=user, country=Country.objects.get(country=country))
            self.users[auth_level] = user

    def test_unauthenticated_access(self):
        client = APIClient()
        response = client.post(self.url, self.successful_data, format='json')
        self.assertEqual(response.status_code, 403, "Status code should be 403 when accessing as anonymous user")

    def test_authenticated_access(self):
        for user_level, user in self.users.items():
            client = APIClient()
            client.force_authenticate(user=user)
            response = client.post(self.url, self.successful_data, format='json')
            if user_level == 'high':
                self.assertEqual(response.status_code, 200, "High level users should be able to submit")
            if user_level in ['low', 'medium']:
                self.assertEqual(response.status_code, 302, "Low and Medium users should get redirected")



class TestRFBuilderSaveTemplate(RFBuilderTestSetup, test.TestCase):

    def setUp(self):
        super(TestRFBuilderSaveTemplate, self).setUp()
        self.url = '/api/save_custom_tiers'
        self.successful_data = {'program_id': self.program.id, 'tiers': ['Frist', 'Second', 'Third']}

    def test_validation_duplicate_tier_name(self):
        pass

    def test_validation_preserve_tiers_with_levels(self):
        pass
