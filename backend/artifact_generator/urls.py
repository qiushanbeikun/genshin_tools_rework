from django.urls import path

from . import views

from common.views import IndexView

app_name = 'artifact_generator'
# front end views
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('celestia/', views.celestia, name="celestia"),
]
