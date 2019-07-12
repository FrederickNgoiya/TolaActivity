from rest_framework import serializers
from django.shortcuts import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _


from workflow.models import Program, Documentation, ProjectAgreement

from indicators.models import Level, Indicator


class DocumentListProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = [
            'id',
            'gaitid',
            'name',
        ]


class DocumentListProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAgreement
        fields = [
            'id',
            'project_name',
        ]


class DocumentListDocumentSerializer(serializers.ModelSerializer):
    project = DocumentListProjectSerializer(read_only=True)

    class Meta:
        model = Documentation
        fields = [
            'id',
            'name',
            'create_date',
            'program',
            'project',
            'url',
        ]

class LogframeIndicatorSerializer(serializers.ModelSerializer):
    level = serializers.PrimaryKeyRelatedField(read_only=True)
    level_order_display = serializers.CharField(read_only=True)
    auto_number_indicators = serializers.BooleanField(read_only=True)

    class Meta:
        model = Indicator
        fields = [
            'pk',
            'name',
            'means_of_verification',
            'level',
            'level_order_display',
            'level_order',
            'number',
            'auto_number_indicators'
        ]

class LogframeUnassignedIndicatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = [
            'pk',
            'name',
            'means_of_verification',
        ]



class LogframeLevelSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    level_depth = serializers.SerializerMethodField()
    indicators = LogframeIndicatorSerializer(many=True, read_only=True, source='indicator_set')
    child_levels = serializers.SerializerMethodField()
    display_ontology = serializers.SerializerMethodField()
    ontology = serializers.SerializerMethodField()

    class Meta:
        model = Level
        fields = [
            'pk',
            'display_name',
            'level_depth',
            'ontology',
            'display_ontology',
            'indicators',
            'assumptions',
            'child_levels'
        ]

    def get_child_levels(self, obj):
        return [lvl.pk for lvl in obj.program.levels.all() if lvl.parent_id == obj.pk]

    def get_parent(self, obj):
        if obj.parent_id is not None:
            return [lvl for lvl in obj.program.levels.all() if lvl.pk == obj.parent_id][0]

    def get_level_depth(self, obj):
        depth = 1
        target = self.get_parent(obj)
        while target is not None:
            depth += 1
            target = self.get_parent(target)
        return depth

    def get_leveltier(self, obj):
        tiers = obj.program.level_tiers.all()
        if len(tiers) > self.get_level_depth(obj) - 1:
            return tiers[self.get_level_depth(obj) - 1]
        return None

    def get_display_ontology(self, obj):
        target = obj
        ontology = []
        while self.get_parent(target) is not None:
            ontology = [str(target.customsort)] + ontology
            target = self.get_parent(target)
        return '.'.join(ontology)

    def get_ontology(self, obj):
        target = obj
        ontology = []
        while True:
            ontology = [str(target.customsort)] + ontology
            target = self.get_parent(target)
            if not target:
                break
        tier_count = len(obj.program.level_tiers.all())
        missing_tiers = tier_count - self.get_level_depth(obj)
        ontology += missing_tiers * ['0']
        return '.'.join(ontology)

    def get_display_name(self, obj):
        parts = []
        leveltier = self.get_leveltier(obj)
        if leveltier is not None:
            parts.append(unicode(_(leveltier.name)))
        display_ontology = self.get_display_ontology(obj)
        if display_ontology:
            parts.append(display_ontology)
        label = u'{}: '.format(u' '.join(parts)) if parts else u''
        return u'{}{}'.format(label, obj.name)


class LogframeProgramSerializer(serializers.ModelSerializer):
    results_framework_url = serializers.SerializerMethodField()
    program_page_url = serializers.CharField()
    results_framework = serializers.BooleanField()
    rf_chain_sort_label = serializers.SerializerMethodField()
    levels = LogframeLevelSerializer(many=True, read_only=True)
    unassigned_indicators = LogframeUnassignedIndicatorSerializer(many=True, read_only=True)


    class Meta:
        model = Program
        fields = [
            'pk',
            'name',
            'results_framework_url',
            'program_page_url',
            'results_framework',
            'rf_chain_sort_label',
            'levels',
            'unassigned_indicators'
        ]

    @classmethod
    def load(cls, pk):
        indicator_prefetch = models.Prefetch(
            'indicator_set',
            queryset=Indicator.objects.filter(level__isnull=True).only(
                'pk', 'name', 'means_of_verification', 'program', 'sector'
            ),
            to_attr='unassigned_indicators'
        )
        program = Program.active_programs.only(
            'pk', 'name', '_using_results_framework', 'auto_number_indicators'
        ).prefetch_related(
            'level_tiers',
            'levels',
            'levels__indicator_set',
            indicator_prefetch
        ).get(pk=pk)
        return cls(program)

    def get_results_framework_url(self, obj):
        return reverse('results_framework_builder', kwargs={'program_id': obj.pk})

    def get_rf_chain_sort_label(self, obj):
        second_tier = [lt for lt in obj.level_tiers.all() if lt.tier_depth == 2]
        if second_tier:
            # Translators: see note for %(tier)s chain, this is the same thing
            return _('by %(level_name)s chain') % {'level_name': _(second_tier[0].name)}
        return None
