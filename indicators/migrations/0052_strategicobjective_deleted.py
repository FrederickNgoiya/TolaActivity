# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-03-08 18:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0051_merge_20190222_0928'),
    ]

    operations = [
        migrations.AddField(
            model_name='strategicobjective',
            name='deleted',
            field=models.DateTimeField(editable=False, null=True),
        ),
    ]
