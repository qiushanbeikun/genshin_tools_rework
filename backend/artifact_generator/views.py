from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.status import *
from django.http import JsonResponse
from .blenders.blender_celestia import generate_celestia
from .blenders.blender_teyvat import generate_teyvat
from .serializers import *
from users.models import User
from django.core.exceptions import ObjectDoesNotExist

ENCODING = 'utf-8'


@api_view(['POST'])
@permission_classes((AllowAny,))
def celestia(request):
    if request.method == 'POST':
        return JsonResponse({"data": generate_celestia(request.data).decode(ENCODING)})


@api_view(['POST'])
@permission_classes((AllowAny,))
def teyvat(request):
    if request.method == 'POST':
        return JsonResponse({"data": generate_teyvat(request.data).decode(ENCODING)})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_artifact_summary(request):
    total_active_artifacts = Artifact.objects.filter(production=True)
    # total_contributors = Artifact.objects.all()

    result = {"total_active_artifacts": ArtifactDesc.objects.filter(production=True).count(),
              "total_uploads": ArtifactDesc.objects.all().count(),
              "total_contributors": ArtifactDesc.objects.values_list('contribution').distinct().count()}
    return JsonResponse(result)


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_set_names(request):
    lang = request.GET.get('lang')
    titles = ArtifactDesc.objects.filter(language=lang, production=True).values_list('title', flat=True)
    return Response(list(titles), status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_artifacts(request):
    lang = request.GET.get('lang')
    search_term = request.GET.get('search_term')
    arti_id = request.GET.get('id')
    if search_term == "":
        artifact_list = ArtifactDesc.objects.filter(language=lang)
    elif search_term is not None:
        artifact_list = ArtifactDesc.objects.filter(language=lang, title__icontains=search_term)
    else:
        artifact_list = ArtifactDesc.objects.filter(language=lang, id=arti_id)
    serializer = ArtifactDescSerializer(artifact_list, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny,))
def add_artifact(request):
    data = request.data
    contributor = User.objects.get(id=request.user.id)
    exist = ArtifactDesc.objects.filter(title=data["title"])
    if exist.exists():
        exist.update(title=data["title"], flower=data["names"][0], feather=data["names"][1],
                     glass=data["names"][2], cup=data["names"][3], head=data["names"][4], img_path=data["img_path"],
                     flower_desc=data["descs"][0], feather_desc=data["descs"][1], glass_desc=data["descs"][2],
                     cup_desc=data["descs"][3], head_desc=data["descs"][4], language=data["language"],
                     two_set_buff=data["two_set_buff"], four_set_buff=data["four_set_buff"])
        exist[0].contribution.add(contributor)
        exist = exist[0]
    else:
        exist = ArtifactDesc(title=data["title"], flower=data["names"][0], feather=data["names"][1],
                             glass=data["names"][2], cup=data["names"][3], head=data["names"][4],
                             img_path=data["img_path"], flower_desc=data["descs"][0],
                             feather_desc=data["descs"][1], glass_desc=data["descs"][2],
                             cup_desc=data["descs"][3], head_desc=data["descs"][4], language=data["language"],
                             two_set_buff=data["two_set_buff"], four_set_buff=data["four_set_buff"])
        exist.save()
        exist.contribution.add(contributor)

    return Response("update success", HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAdminUser,))
def publish(request):
    # todo
    uid = request.data.id
    template = ArtifactDesc.objects.get(id=uid)
    template.production = True
    template.save()
    return Response("publish success", HTTP_200_OK)
