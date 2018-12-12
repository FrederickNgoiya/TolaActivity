# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-11-12 19:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0021_auto_20181026_1449'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentation',
            name='url',
            field=models.CharField(blank=True, max_length=135, null=True, verbose_name='Link to document, document repository, or document URL'),
        ),
    ]