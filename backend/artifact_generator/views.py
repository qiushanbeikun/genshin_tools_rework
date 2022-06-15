from rest_framework.decorators import api_view
from django.http import JsonResponse
from .blenders.blender_celestia import generate_celestia
from .blenders.blender_teyvat import generate_teyvat
from rest_framework.views import APIView


ENCODING = 'utf-8'


@api_view(['POST'])
def celestia(request):
    if request.method == 'POST':
        return JsonResponse({"data": generate_celestia(request.data).decode(ENCODING)})


@api_view(['POST'])
def teyvat(request):
    if request.method == 'POST':
        return JsonResponse({"data": generate_teyvat(request.data).decode(ENCODING)})


# @api_view(['GET'])
# def get_artifacts(request):
#     return False


