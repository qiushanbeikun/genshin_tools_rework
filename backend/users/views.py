from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render  # noqa
from rest_framework.decorators import api_view
from .models import User


@api_view(['GET'])
def check_email(request):
    email = request.GET.get("email", "")
    try:
        User.objects.get(email=email)
    except ObjectDoesNotExist:
        return JsonResponse({"data": "true"})
    return JsonResponse({"data": "false"})
