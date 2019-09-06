# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-09-04 20:06
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0069_merge_20190821_1922'),
    ]

    operations = [
        migrations.AddField(
            model_name='indicator',
            name='indicator_key',
            field=models.UUIDField(default=uuid.uuid4, help_text=b' ', verbose_name='Indicator key'),
        ),
    ]