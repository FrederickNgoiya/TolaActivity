"""Creates a program with a fully fleshed out results framework and a few indicators for testing/QA"""

import datetime
import itertools
import random
from workflow.models import Program, Country, Organization, Sector, TolaUser
from indicators.models import LevelTier, Level, Indicator, IndicatorType
from django.core.management.base import BaseCommand

def create_tolaland():
    org = Organization.objects.get(id=1)
    country, _ = Country.objects.get_or_create(
        country='Tolaland', defaults={
            'latitude': 21.4, 'longitude': -158, 'zoom': 6, 'organization': org, 'code': 'TO'})
    return country

def create_program(country, name, count=0):
    program = Program.objects.create(**{
        'name': name,
        'reporting_period_start': datetime.date(2016, 1, 1),
        'reporting_period_end': datetime.date(2020, 12, 31),
        'funding_status': 'Funded',
        'gaitid': 'rf_fake_gait_id_{}'.format(count)
    })
    program.country.add(country)
    return program

def create_mercycorps_leveltiers(program):
    tiers = []
    for depth, tier_name in enumerate(LevelTier.PRESETS['Mercy Corps standard']):
        tiers.append(
            LevelTier.objects.create(
                name=tier_name,
                program=program,
                tier_depth=depth+1
            )
        )
    return tiers

def get_levels(level_data, program, sort_index, parent=None):
    level_name = level_data[0]
    children = level_data[1]
    new_level = Level.objects.create(
        name=level_name,
        parent=parent,
        program=program,
        customsort=sort_index + 1
    )
    created_children = []
    for child_index, child in enumerate(children):
        created_children.append(get_levels(child, program, child_index, new_level))
    return (new_level, created_children)

def get_kwarg_generator():
    indicator_types = itertools.cycle([it for it in IndicatorType.objects.all()])
    unit_of_measures = itertools.cycle(['bananas', 'horses', 'gallons of water', 'polka dots'])
    unit_of_measure_types = itertools.cycle([Indicator.NUMBER, Indicator.PERCENTAGE])
    #baseline random
    #lop_target random
    direction_of_changes = itertools.cycle([Indicator.DIRECTION_OF_CHANGE_NEGATIVE,
                                            Indicator.DIRECTION_OF_CHANGE_POSITIVE,
                                            Indicator.DIRECTION_OF_CHANGE_NEGATIVE,
                                            Indicator.DIRECTION_OF_CHANGE_POSITIVE,
                                            Indicator.DIRECTION_OF_CHANGE_NONE])
    #is cumulative random.choice
    target_frequencys = itertools.cycle([tf[0] for tf in Indicator.TARGET_FREQUENCIES])
    sectors = itertools.cycle([sector for sector in Sector.objects.all()[:5]])
    while True:
        yield {
            'indicator_type': next(indicator_types),
            'unit_of_measure': next(unit_of_measures),
            'unit_of_measure_type': next(unit_of_measure_types),
            'baseline': random.randint(0, 1000),
            'lop_target': random.randint(0, 1000),
            'direction_of_change': next(direction_of_changes),
            'is_cumulative': random.choice([True, False]),
            'target_frequency': next(target_frequencys),
            'sector': next(sectors)
        }



def add_indicators(levels, program, kwarg_generator=None):
    level = levels[0]
    if kwarg_generator is None:
        kwarg_generator = get_kwarg_generator()
    kwargs = next(kwarg_generator)
    indicator_type = kwargs.pop('indicator_type')
    kwargs['name'] = "Indicator A for {0} {1}".format(level.leveltier, level.display_ontology)
    kwargs['program'] = program
    kwargs['level'] = level
    indicator = Indicator.objects.create(
        **kwargs
    )
    indicator.indicator_type.add(indicator_type)
    indicator.save()
    kwargs['name'] = "Indicator B for {0} {1}".format(level.leveltier, level.display_ontology)
    indicator = Indicator.objects.create(
        **kwargs
    )
    indicator.indicator_type.add(indicator_type)
    indicator.save()
    for child in levels[1]:
        add_indicators(child, program, kwarg_generator)

class Command(BaseCommand):
    help = """
        Creates a program with a full results framework and some indicator test cases
        """

    def handle(self, *args, **options):
        # ***********
        # Creates program, results framework, and indicators for qa testing
        # ***********
        tolaland = Country.objects.filter(country='Tolaland')
        if tolaland.count() == 0:
            tolaland = create_tolaland()
        else:
            tolaland = tolaland.first()
        users = [
            'Cameron McFee',
        ]
        for user_name in users:
            tola_user = TolaUser.objects.filter(name=user_name)
            if tola_user.count() > 0:
                tola_user = tola_user.first()
                tola_user.countries.add(tolaland)
                tola_user.save()
        old_program = Program.objects.filter(name='RF Program - Mercy Corps Framework')
        if old_program.count() == 1:
            old_program.first().delete()
        program = create_program(tolaland, 'RF Program - Mercy Corps Framework')
        leveltiers = create_mercycorps_leveltiers(program)
        level_data = (
            #Goal tier:
            'To measure something at the GOAL tier', [
                # Outcome 1:
                ('To measure the first Outcome tier item', [
                    # Output 1.1:
                    ('To measure the first Output under Outcome 1', [
                        #Activity 1.1.1
                        ('To measure the first Activity under Output 1.1', []),
                        #Activity 1.1.2
                        ('To measure the second Activity under Output 1.1', [])
                        ]),
                    # Output 1.2:
                    ('To measure the second Output under Outcome 1', [
                        #Activity 1.2.1
                        ('To measure the first Activity under Output 1.2', []),
                        #Activity 1.2.2
                        ('To measure the second Activity under Output 1.2', [])
                        ]),
                    # Output 1.3:
                    ('To measure an empty (no activities) Output under Outcome 1', [])
                ]),
                # Outcome 2:
                ('To measure the second Outcome tier item', [
                    #Output 2.1:
                    ('To measure a single output under 2.1', [
                        #Activity 2.1.1
                        ('To measure a single activity under 2.1.1', [])
                        ])
                ]),
                # Outcome 3:
                ('To measure an empty [no outputs] Outcome 3', []),
            ]
        )
        levels = get_levels(level_data, program, 0)
        empty_level = Level.objects.create(
            name='To measure an empty [no indicators] Outcome 4',
            parent=levels[0],
            program=program,
            customsort=4
        )
        add_indicators(levels, program)
        