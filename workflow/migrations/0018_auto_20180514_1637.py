# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-05-14 23:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0017_auto_20180419_0905'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='end_date',
            field=models.DateField(blank=True, null=True, verbose_name='Program End Date'),
        ),
        migrations.AddField(
            model_name='program',
            name='reporting_period_end',
            field=models.DateField(blank=True, null=True, verbose_name='Reporting Period End Date'),
        ),
        migrations.AddField(
            model_name='program',
            name='reporting_period_start',
            field=models.DateField(blank=True, null=True, verbose_name='Reporting Period Start Date'),
        ),
        migrations.AddField(
            model_name='program',
            name='start_date',
            field=models.DateField(blank=True, null=True, verbose_name='Program Start Date'),
        ),
    ]
