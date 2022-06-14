from .serializers import UserSerializer, UpdateSerializer
from .models import User
from rest_framework import viewsets
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


class UpdateViewSet(viewsets.ViewSet):
    serializer_class = UpdateSerializer
    http_method_names = ['post']
    permission_classes = (IsAuthenticated,)
    # authentication_classes = (JWTTokenUserAuthentication,)
    queryset = User.objects.all()
    lookup_field = "pk"

    def list(self, request, project_pk=None):
        queryset = self.queryset.filter(project__name=project_pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.queryset.get(id=request.data["id"])
        print("@#@#@#@#@#@#@#")
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
