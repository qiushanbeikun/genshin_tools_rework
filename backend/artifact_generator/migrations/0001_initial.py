# Generated by Django 3.2.13 on 2022-06-14 08:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artifact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True)),
                ('feather', models.CharField(max_length=255, unique=True)),
                ('glass', models.CharField(max_length=255, unique=True)),
                ('cup', models.CharField(max_length=255, unique=True)),
                ('head', models.CharField(max_length=255, unique=True)),
                ('two_set_buff', models.CharField(max_length=255, unique=True)),
                ('four_set_buff', models.CharField(max_length=255, unique=True)),
                ('desc', models.CharField(max_length=255, unique=True)),
                ('contribution', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]