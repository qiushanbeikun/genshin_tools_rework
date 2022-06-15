from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render  # noqa
from .models import User
from django.contrib.sessions.models import Session
from .serializers import UpdateSerializer
from rest_framework import views, permissions, response, decorators, status
from .serializers import UserSerializer

@decorators.api_view(['GET'])
def check_email(request):
    email = request.GET.get("email", "")
    try:
        User.objects.get(email=email)
    except ObjectDoesNotExist:
        return JsonResponse({"data": "true"})
    return JsonResponse({"data": "false"})


@decorators.api_view(['POST'])
@decorators.permission_classes((permissions.IsAuthenticated,))
def update_user(request):
    print(request.user.id, request.user.email)
    data = request.data
    uid, email = data["id"], data["email"]

    if request.user.is_superuser is False and (uid != request.user.id or email != request.user.email):
        # ban user and close session
        c_user = User.objects.get(id=request.user.id, email=request.user.email)
        c_user.is_active = False
        c_user.save()
        [s.delete() for s in Session.objects.all() if s.get_decoded().get('_auth_user_id') == c_user.id]
        return response.Response({"error": "Malicious activities detected, your account is banned"},
                                 status=status.HTTP_200_OK)
    user = User.objects.get(id=uid, email=email)
    if not user:
        return response.Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user.username = data["username"]
        user.genshin_uid = data["genshin_uid"]
        user.genshin_server = data["genshin_server"]
        user.save()
        serializer = UserSerializer(user)
        # serializer.is_valid()
        print(serializer.data)

        return response.Response(serializer.data, status.HTTP_200_OK)
