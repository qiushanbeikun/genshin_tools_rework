from django.urls import path
from . import views

paths = ['', 'damage_calculator', 'signup', 'login', 'recovery', 'profile']

app_name = 'common'
# front end views
urlpatterns = [path(x, views.IndexView.as_view()) for x in paths]
