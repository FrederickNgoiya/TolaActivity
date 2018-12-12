# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-10-26 21:49
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0020_auto_20180918_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='benchmarks',
            name='site',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.SiteProfile', verbose_name='site'),
        ),
        migrations.AlterField(
            model_name='checklist',
            name='country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Country', verbose_name='Country'),
        ),
        migrations.AlterField(
            model_name='checklistitem',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.TolaUser', verbose_name='Owner'),
        ),
        migrations.AlterField(
            model_name='documentation',
            name='template',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Template', verbose_name='Template'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='approval_submitted_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='submitted_by_agreement', to='workflow.TolaUser', verbose_name='Approval submitted by'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approving_agreement', to='workflow.TolaUser', verbose_name='Request approval'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='checked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='checking', to='workflow.TolaUser', verbose_name='Checked by'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='estimated_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estimating', to='workflow.TolaUser', verbose_name='Originated By'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='finance_reviewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='finance_reviewing', to='workflow.TolaUser', verbose_name='Finance reviewed by'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='me_reviewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewing_me', to='workflow.TolaUser', verbose_name='M&E Reviewed by'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='office',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Office', verbose_name='Office'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='project_type',
            field=models.ForeignKey(blank=True, max_length=255, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.ProjectType', verbose_name='Project Type'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='reviewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewing', to='workflow.TolaUser', verbose_name='Request review'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='sector',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Sector', verbose_name='Sector'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='approval_submitted_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='submitted_by_complete', to='workflow.TolaUser', verbose_name='Approval submitted by'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approving_agreement_complete', to='workflow.TolaUser', verbose_name='Approved by'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='checked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='checking_complete', to='workflow.TolaUser', verbose_name='Checked by'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='estimated_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estimating_complete', to='workflow.TolaUser', verbose_name='Estimated by'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='office',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Office', verbose_name='Office'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='project_type',
            field=models.ForeignKey(blank=True, max_length=255, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.ProjectType', verbose_name='Project Type'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='reviewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewing_complete', to='workflow.TolaUser', verbose_name='Reviewed by'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='sector',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Sector', verbose_name='Sector'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='admin_level_three',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.AdminLevelThree', verbose_name='Administrative Level 3'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='approved_by',
            field=models.ForeignKey(blank=True, help_text='This is the Provincial Line Manager', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comm_approving', to='workflow.TolaUser', verbose_name='Approved by'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='classify_land',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.LandType', verbose_name='Classify land'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='district',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.District', verbose_name='Administrative Level 2'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='filled_by',
            field=models.ForeignKey(blank=True, help_text='This is the originator', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comm_estimate', to='workflow.TolaUser', verbose_name='Filled by'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='location_verified_by',
            field=models.ForeignKey(blank=True, help_text='This should be GIS Manager', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comm_gis', to='workflow.TolaUser', verbose_name='Location verified by'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='office',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Office', verbose_name='Office'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='province',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Province', verbose_name='Administrative Level 1'),
        ),
        migrations.AlterField(
            model_name='siteprofile',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.ProfileType', verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='stakeholder',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stake_approving', to='workflow.TolaUser', verbose_name='Approved by'),
        ),
        migrations.AlterField(
            model_name='stakeholder',
            name='filled_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stake_filled', to='workflow.TolaUser', verbose_name='Filled by'),
        ),
        migrations.AlterField(
            model_name='stakeholder',
            name='formal_relationship_document',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='relationship_document', to='workflow.Documentation', verbose_name='Formal Written Description of Relationship'),
        ),
        migrations.AlterField(
            model_name='stakeholder',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.StakeholderType', verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='stakeholder',
            name='vetting_document',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='vetting_document', to='workflow.Documentation', verbose_name='Vetting/ due diligence statement'),
        ),
        migrations.AlterField(
            model_name='tolauser',
            name='country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='workflow.Country', verbose_name='Country'),
        ),
    ]