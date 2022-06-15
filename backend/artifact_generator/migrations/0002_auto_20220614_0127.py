# Generated by Django 3.2.13 on 2022-06-14 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifact_generator', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='artifact',
            name='cup_image',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='artifact',
            name='feather_image',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='artifact',
            name='flower',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='artifact',
            name='flower_image',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='artifact',
            name='glass_image',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='artifact',
            name='head_image',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='artifact',
            name='image_dir',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='artifact',
            name='production',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='cup',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='desc',
            field=models.CharField(default='', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='feather',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='four_set_buff',
            field=models.CharField(default='', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='glass',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='head',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='two_set_buff',
            field=models.CharField(default='', max_length=255, unique=True),
        ),
    ]