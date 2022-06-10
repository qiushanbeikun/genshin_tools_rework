from django.urls import path
from . import views

app_name = 'common'
# front end views
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    # todo: these urls should be put into individual apps
    path('damage_calculator', views.IndexView.as_view()),
    path('others', views.IndexView.as_view()),
    path('signup', views.IndexView.as_view()),
    path('login', views.IndexView.as_view()),
    path('recovery', views.IndexView.as_view()),
]
