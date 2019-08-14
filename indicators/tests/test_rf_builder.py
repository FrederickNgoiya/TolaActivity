"""
Tests of the various views related to the results framework
"""
import datetime
from unittest import skip

from django import test
from django.contrib.auth.models import User

from rest_framework.test import APIRequestFactory, APIClient

from factories import (
    workflow_models as w_factories,
    indicators_models as i_factories
)
from indicators.models import Indicator, Level, LevelTierTemplate, LevelTier
import indicators.views.views_results_framework as rfv
from workflow.models import Country, ProgramAccess


#
class RFBuilderTestSetup(object):

    def set_up(self):
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
        super(TestRFBuilderSaveTemplate, self).set_up()
        self.url = '/api/save_custom_tiers'
        self.successful_data = {'program_id': self.program.id, 'tiers': ['First', 'Second', 'Third']}
        self.user = self.users['high']
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_validation_duplicate_tier_name(self):
        duplicated_data = {'program_id': self.program.id, 'tiers': ['First', 'Second', 'Third', 'First']}
        response = self.client.post(self.url, duplicated_data, format='json')
        self.assertEqual(response.status_code, 400,
            "Duplicate tier values should not be allowed but status codes was {}".format(response.status_code))

    def test_validation_preserve_tiers_with_levels(self):
        i_factories.LevelTierFactory.build_mc_template(program=self.program)
        tier_count = LevelTier.objects.count()
        i_factories.LevelFactory(level)
        response = self.client.post(self.url, self.successful_data, format='json')
        self.assertEqual(response.status_code, 400)


    @skip('not implemented yet')
    def test_validation_blank_tiernames(self):
        pass

