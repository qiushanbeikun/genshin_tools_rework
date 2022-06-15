from .serializers import UserSerializer, UpdateSerializer
from .models import User
from rest_framework import viewsets, views, generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    # def partial_update(self, request, *args, **kwargs):
    #     print(request.data)
    #     kwargs["partial"] = True
    #     return self.update(request,  *args, **kwargs)


class UpdateUserViewSet(viewsets.ModelViewSet):
    serializer_class = UpdateSerializer
    http_method_names = ['post', 'put', 'patch']
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    # def update(self, request, *args, **kwargs):
    #     print(request.data)
    #
    #     return Response(status=status.HTTP_200_OK)
