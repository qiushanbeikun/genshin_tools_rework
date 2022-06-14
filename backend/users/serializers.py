from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        read_only_field = ['is_active', 'created']


class UpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=128, min_length=4, required=True)
    genshin_server = serializers.CharField(max_length=128, required=False)
    genshin_uid = serializers.CharField(max_length=128, required=False)

    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {'email': {'required': False}, 'password': {'required': False}}
