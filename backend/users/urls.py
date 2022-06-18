from rest_framework.routers import SimpleRouter
from .auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from rest_framework_simplejwt.views import TokenVerifyView, TokenBlacklistView
from django.urls import path
from . import views
from .viewsets import UserViewSet, UpdateUserViewSet

routes = SimpleRouter()
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls,
    path("auth/check_email/", views.check_email, name="check_email"),
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('auth/update/', views.update_user, name='user_update')
    # path('auth/update/', views.UserUpdateApiView.as_view(), name="user-update"),
]
