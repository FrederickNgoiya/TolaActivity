# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-31 17:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activitydb', '0073_auto_20160317_1329'),
    ]

    operations = [
        migrations.AddField(
            model_name='tolasites',
            name='tola_tables_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tolasites',
            name='tola_tables_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tolasites',
            name='tola_tables_user',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]