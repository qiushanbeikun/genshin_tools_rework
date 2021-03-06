from django.urls import path
from . import views

paths = ['', 'damage_calculator/', 'signup/', 'login/', 'recovery/', 'profile/', 'upload_artifact/',
         'upload_artifact/<int:id>']

app_name = 'common'
# front end views
urlpatterns = [path(x, views.IndexView.as_view()) for x in paths]
