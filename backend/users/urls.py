from rest_framework.routers import SimpleRouter
from .auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from django.urls import path
from . import views
from .viewsets import UserViewSet, UpdateViewSet

routes = SimpleRouter()
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'auth/update', UpdateViewSet, basename='auth-update')
routes.register(r'user', UserViewSet, basename='user')


urlpatterns = [
    *routes.urls,
    path("auth/check_email/", views.check_email, name="check_email"),
]
