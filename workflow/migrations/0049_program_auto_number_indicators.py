# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-06-05 00:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0048_merge_20190515_1658'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='auto_number_indicators',
            field=models.BooleanField(default=True, verbose_name='Auto-number indicators according to the results framework'),
        ),
    ]
