from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

from common.views import IndexView

app_name = 'artifact_generator'

# front end views
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('celestia/', views.celestia, name="celestia"),
    path('teyvat/', views.teyvat, name="teyvat"),
    path('add_artifact/', views.add_artifact, name='add_artifact'),
    path('get_artifact_summary/', views.get_artifact_summary, name='artifact_summary'),
    path('pending_artifact/', views.get_pending_artifacts, name='pending_artifact'),
    path('active_artifact/', views.get_active_artifacts, name='active_artifact'),
    path('get_set_names/', views.get_set_names, name='get_set_names'),
    path('publish/', views.publish, name='publish'),
    path('delete/<int:aid>', views.publish, name='publish')

]
