# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-06-13 15:38
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0059_require_level_name'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='indicator',
            unique_together=set([('level', 'level_order')]),
        ),
    ]
