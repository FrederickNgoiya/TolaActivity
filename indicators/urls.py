from django.conf.urls import url

from .views import (
    CollectedDataList,
    CollectedDataCreate,
    CollectedDataUpdate,
    CollectedDataDelete,
    IndicatorCreate,
    IndicatorDelete,
    IndicatorUpdate,
    IndicatorList,
    IndicatorExport,
    IndicatorReportData,
    CollectedDataReportData,
    IndicatorReport,
    IndicatorDataExport,
    TVAReport, DisaggregationReport,
    PeriodicTargetDeleteView,
    indicator_create,
    collecteddata_import,
    indicator_report,
    programIndicatorReport,
    indicator_data_report,
    service_json,
    collected_data_json,
    program_indicators_json,
    TVAPrint,
    DisaggregationPrint,
    PeriodicTargetView
)

urlpatterns = [
    url(r'^home/(?P<program>\d+)/(?P<indicator>\d+)/(?P<type>\d+)/$',
        IndicatorList.as_view(), name='indicator_list'),

    url(r'^indicator_list/(?P<pk>\d+)/$', IndicatorList.as_view(),
        name='indicator_list'),

    url(r'^indicator_create/(?P<id>\d+)/$', indicator_create,
        name='indicator_create'),

    url(r'^indicator_add/(?P<id>\d+)/$', IndicatorCreate.as_view(),
        name='indicator_add'),

    url(r'^indicator_update/(?P<pk>\d+)/$', IndicatorUpdate.as_view(),
        name='indicator_update'),

    url(r'^indicator_delete/(?P<pk>\d+)/$', IndicatorDelete.as_view(),
        name='indicator_delete'),

    url(r'^periodic_target_delete/(?P<pk>\d+)/$',
        PeriodicTargetDeleteView.as_view(),  name='pt_delete'),

    url(r'^periodic_target_generate/(?P<indicator>\d+)/$',
        PeriodicTargetView.as_view(), name='pt_generate'),

    url(r'^periodic_target_deleteall/(?P<indicator>\d+)/(?P<deleteall>\d+)/$',
        PeriodicTargetView.as_view(), name='pt_deleteall'),

    url(r'^collecteddata/(?P<program>\d+)/(?P<indicator>\d+)/(?P<type>\d+)/$',
        CollectedDataList.as_view(), name='collecteddata_list'),

    url(r'^collecteddata_add/(?P<program>\d+)/(?P<indicator>\d+)/$',
        CollectedDataCreate.as_view(), name='collecteddata_add'),

    url(r'^collecteddata_import/$', collecteddata_import,
        name='collecteddata_import'),

    url(r'^collecteddata_update/(?P<pk>\d+)/$', CollectedDataUpdate.as_view(),
        name='collecteddata_update'),

    url(r'^collecteddata_delete/(?P<pk>\d+)/$', CollectedDataDelete.as_view(),
        name='collecteddata_delete'),

    url(r'^collecteddata_export/(?P<program>\d+)/(?P<indicator>\d+)/$',
        CollectedDataList.as_view(), name='collecteddata_list'),

    url(r'^report/(?P<program>\d+)/(?P<indicator>\d+)/(?P<type>\d+)/$',
        indicator_report, name='indicator_report'),

    url(r'^tvareport/$', TVAReport.as_view(), name='tvareport'),

    url(r'^tvaprint/(?P<program>\d+)/$', TVAPrint.as_view(), name='tvaprint'),

    url(r'^disrep/(?P<program>\d+)/$', DisaggregationReport.as_view(),
        name='disrep'),

    url(r'^disrepprint/(?P<program>\d+)/$', DisaggregationPrint.as_view(),
        name='disrepprint'),

    url(r'^report_table/(?P<program>\d+)/(?P<indicator>\d+)/(?P<type>\d+)/$',
        IndicatorReport.as_view(), name='indicator_table'),

    url(r'^program_report/(?P<program>\d+)/$', programIndicatorReport,
        name='programIndicatorReport'),

    url(r'^data/(?P<id>\d+)/(?P<program>\d+)/(?P<type>\d+)/$',
        indicator_data_report, name='indicator_data_report'),

    url(r'^data/(?P<id>\d+)/(?P<program>\d+)/(?P<type>\d+)/map/$',
        indicator_data_report, name='indicator_data_report'),

    url(r'^data/(?P<id>\d+)/(?P<program>\d+)/(?P<type>\d+)/graph/$',
        indicator_data_report, name='indicator_data_report'),

    url(r'^data/(?P<id>\d+)/(?P<program>\d+)/(?P<type>\d+)/table/$',
        indicator_data_report, name='indicator_data_report'),

    url(r'^data/(?P<id>\d+)/(?P<program>\d+)/$', indicator_data_report,
        name='indicator_data_report'),

    url(r'^data/(?P<id>\d+)/$', indicator_data_report,
        name='indicator_data_report'),

    url(r'^export/(?P<id>\d+)/(?P<program>\d+)/(?P<indicator_type>\d+)/$',
        IndicatorExport.as_view(), name='indicator_export'),

    url(r'^service/(?P<service>[-\w]+)/service_json/', service_json,
        name='service_json'),

    url(r'^collected_data_table/(?P<indicator>\d+)/(?P<program>\d+)/',
        collected_data_json, name='collected_data_json'),

    url(r'^program_indicators/(?P<program>\d+)/(?P<indicator>\d+)/\
            (?P<type>\d+)',
        program_indicators_json,
        name='program_indicators_json'),

    url(r'^report_data/(?P<id>\w+)/(?P<program>\d+)/(?P<type>\d+)/$',
        IndicatorReportData.as_view(), name='indicator_report_data'),

    url(r'^report_data/(?P<id>\w+)/(?P<program>\d+)/(?P<indicator_type>\d+)/\
            export/$',
        IndicatorExport.as_view(),
        name='indicator_export'),

    url(r'^collecteddata_report_data/(?P<program>\d+)/(?P<indicator>\d+)/\
            (?P<type>\d+)/$',
        CollectedDataReportData.as_view(),
        name='collecteddata_report_data'),

    url(r'^collecteddata_report_data/(?P<program>\d+)/(?P<indicator>\d+)/\
            (?P<type>\d+)/export/$',
        IndicatorDataExport.as_view(),
        name='collecteddata_report_data'),
]
