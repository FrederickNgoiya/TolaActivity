# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-01-08 20:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0043_indicator_setup_remove_asterisks'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResultsIndicator',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
            },
            bases=('indicators.indicator',),
        ),
    ]
