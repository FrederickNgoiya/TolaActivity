"""URLS for the Indicators app in the Tola project"""
from indicators import views
from django.conf.urls import url


urlpatterns = [
    url(r'^indicator_create/(?P<program>\d+)/$', views.indicator_create, name='indicator_create'),

    url(r'^indicator_update/(?P<pk>\d+)/$', views.IndicatorUpdate.as_view(), name='indicator_update'),

    url(r'^indicator_delete/(?P<pk>\d+)/$', views.IndicatorDelete.as_view(), name='indicator_delete'),

    url(r'^periodic_target_generate/(?P<indicator>\d+)/$', views.PeriodicTargetView.as_view(), name='pt_generate'),

    url(r'^periodic_target_delete/(?P<pk>\d+)/$', views.PeriodicTargetDeleteView.as_view(), name='pt_delete'),

    url(r'^periodic_target_deleteall/(?P<indicator>\d+)/(?P<deleteall>\w+)/$',
        views.PeriodicTargetView.as_view(), name='pt_deleteall'),

    url(r'^result_add/(?P<indicator>\d+)/$', views.ResultCreate.as_view(), name='result_add'),

    url(r'^result_update/(?P<pk>\d+)/$', views.ResultUpdate.as_view(), name='result_update'),

    url(r'^result_delete/(?P<pk>\d+)/$', views.ResultDelete.as_view(), name='result_delete'),

    url(r'^disrep_quickstart/$', views.DisaggregationReportQuickstart.as_view(), name='disrep_quickstart'),
    url(r'^disrep/(?P<program>\d+)/$', views.DisaggregationReport.as_view(), name='disrep'),

    url(r'^disrepprint/(?P<program>\d+)/$', views.DisaggregationPrint.as_view(), name='disrepprint'),

    url(r'^indicator_plan/(?P<program>\d+)/$', views.indicator_plan, name='indicator_plan'),

    url(r'^indicator_plan/export/(?P<program>\d+)/$',
        views.IndicatorExport.as_view(), name='indicator_export'),

    url(r'^service/(?P<service>[-\w]+)/service_json/', views.service_json, name='service_json'),

    url(r'^result_table/(?P<indicator>\d+)/',
        views.result_view, name='result_view'),

    url(r'^program_indicators/(?P<program>\d+)/(?P<indicator>\d+)/'
        r'(?P<type>\d+)', views.program_indicators_json, name='program_indicators_json'),

    url(r'^report_data/(?P<id>\w+)/(?P<program>\d+)/(?P<type>\d+)/$',
        views.IndicatorReportData.as_view(), name='indicator_report_data'),

    url(r'^result_report_data/(?P<program>\d+)/(?P<indicator>\d+)/(?P<type>\d+)/$',
        views.ResultReportData.as_view(), name='result_report_data'),

    url(r'^iptt_quickstart/', views.IPTTQuickstart.as_view(), name='iptt_quickstart'),
    url(r'^iptt_report/(?P<program_id>\d+)/(?P<reporttype>\w+)/$', views.IPTTReport.as_view(), name='iptt_report'),
    url(r'^iptt_report_data/$', views.IPTTReportData.as_view(), name='iptt_ajax'),
    url(r'^iptt_excel/$', views.IPTTExcelExport.as_view(), name='iptt_excel'),

    url(r'^pinned_report/$', views.create_pinned_report, name='create_pinned_report'),
    url(r'^pinned_report/delete/$', views.delete_pinned_report, name='delete_pinned_report'),

    # Results framework builder
    url(r'^results_framework_builder/(?P<program_id>\d+)', views.ResultsFrameworkBuilder.as_view(),
        name='results_framework_builder'),

    # API call for program page
    url(r'^api/indicator/(?P<indicator>\d+)', views.api_indicator_view, name='api_indicator_view'),
]
