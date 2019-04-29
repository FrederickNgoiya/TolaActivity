# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-01-26 19:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0030_auto_20190124_1047'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='sectors',
            field=models.ManyToManyField(related_name='organizations', to='workflow.Sector'),
        ),
    ]
