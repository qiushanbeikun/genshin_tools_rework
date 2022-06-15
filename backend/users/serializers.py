from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        # read_only_field = ['is_active', 'created']

    # def update(self, instance, validated_data):
    #     print("cao ni ma de bi")
    #
    #     user = User.objects.get(id=instance.id)
    #     User.objects.filter(id=instance.id).update(**validated_data)


class UpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=128, min_length=4, required=True)
    genshin_server = serializers.CharField(max_length=128, required=False)
    genshin_uid = serializers.CharField(max_length=128, required=False)

    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {'email': {'required': False}, 'password': {'required': False}}

    # def create(self, validated_data):
    #     user = User.objects.create_user(validated_data["username"], validated_data["email"], validated_data["password"])
    #     return user
    #
    # def update(self, instance, validated_data):
    #     instance.username = validated_data['username']
    #     instance.genshin_server = validated_data['genshin_server']
    #     instance.genshin_uid = validated_data['genshin_uid']
    #     instance.save()
        # return instance
    # def update(self, instance, validated_data):
    #     instance.username = validated_data.get("username")
    #     instance.genshin_server = validated_data.get("genshin_server")
    #     instance.genshin_uid = validated_data.get("genshin_uid")
    #     instance.save()
    #     return instance
