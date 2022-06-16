from rest_framework import serializers
from .models import *


class ArtifactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artifact
        fields = "__all__"


class ArtifactDescSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArtifactDesc
        fields = "__all__"
