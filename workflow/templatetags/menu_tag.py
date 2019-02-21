from collections import OrderedDict

from django import template
from django.db import models
from django.db.models import Q
from workflow.models import Program

register = template.Library()


@register.inclusion_tag('workflow/tags/program_menu.html', takes_context=True)
def program_menu(context):
    request = context['request']
    try:
        countries = request.user.tola_user.countries.all()
    except AttributeError:
        countries = []
    programs = Program.objects.annotate(
        indicator_count=models.Count('indicator', distinct=True)
    ).filter(
        Q(country__in=countries) | Q(user_access=request.user.tola_user),
        funding_status="Funded",
        indicator_count__gt=0
    ).prefetch_related('country').distinct()

    programs_by_country = OrderedDict((country.country, []) for country in countries)
    programs_without_country = []

    for program in programs:
        for country in program.country.all():
            # a program can be in multiple countries, including a country a user is not privy to
            if country.country in programs_by_country:
                programs_by_country[country.country].append(program)
            else:
                programs_without_country.append(program)

    return {
        'programs': programs,
        'countries': countries,
        'programs_by_country': programs_by_country,
        'programs_without_country': programs_without_country
    }
