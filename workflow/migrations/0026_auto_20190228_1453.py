# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-02-28 22:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0025_auto_20190228_1356'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tolabookmarks',
            name='program',
        ),
        migrations.RemoveField(
            model_name='tolabookmarks',
            name='user',
        ),
        migrations.DeleteModel(
            name='TolaBookmarks',
        ),
    ]
