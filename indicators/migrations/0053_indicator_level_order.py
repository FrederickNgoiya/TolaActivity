# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-04-02 00:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0052_add_level_assumptions'),
    ]

    operations = [
        migrations.AddField(
            model_name='indicator',
            name='level_order',
            field=models.IntegerField(default=0),
        ),
    ]