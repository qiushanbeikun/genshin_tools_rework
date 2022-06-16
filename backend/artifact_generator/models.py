from django.db import models
from users.models import User


class Artifact(models.Model):
    # before we have a reliable method of storing images, for now images are stored as base64 strings
    image_dir = models.CharField(blank=False, null=False, max_length=255, default="")
    flower_image = models.TextField(blank=False, null=False, default="")
    feather_image = models.TextField(blank=False, null=False, default="")
    glass_image = models.TextField(blank=False, null=False, default="")
    cup_image = models.TextField(blank=False, null=False, default="")
    head_image = models.TextField(blank=False, null=False, default="")

    # if user modify existing one, save a copy and push the new user
    contribution = models.ManyToManyField(User)
    production = models.BooleanField(blank=True, unique=False)


class ArtifactDesc(models.Model):

    LANG = [("en", "English"), ("zh", "简体中文")]

    title = models.CharField(blank=False, null=False, max_length=255, unique=True)

    flower = models.CharField(blank=False, null=False, max_length=255, default="")
    feather = models.CharField(blank=False, null=False, max_length=255, default="")
    glass = models.CharField(blank=False, null=False, max_length=255, default="")
    cup = models.CharField(blank=False, null=False, max_length=255, default="")
    head = models.CharField(blank=False, null=False, max_length=255, default="")

    flower_desc = models.CharField(blank=False, null=False, max_length=255, default="")
    feather_desc = models.CharField(blank=False, null=False, max_length=255, default="")
    glass_desc = models.CharField(blank=False, null=False, max_length=255, default="")
    cup_desc = models.CharField(blank=False, null=False, max_length=255, default="")
    head_desc = models.CharField(blank=False, null=False, max_length=255, default="")

    two_set_buff = models.CharField(blank=False, null=False, max_length=255, default="")
    four_set_buff = models.CharField(blank=False, null=False, max_length=255, default="")
    img_path = models.CharField(blank=False, max_length=255, null=False, default="")

    language = models.CharField(blank=False, null=False, choices=LANG, default="en", max_length=255)

    contribution = models.ManyToManyField(User)
    production = models.BooleanField(blank=True, default=False)
    # artifact = models.ForeignKey(Artifact, on_delete=models.CASCADE)

