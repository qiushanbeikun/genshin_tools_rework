# Generated by Django 3.2.13 on 2022-06-16 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifact_generator', '0006_auto_20220615_2139'),
    ]

    operations = [
        migrations.AddField(
            model_name='artifactdesc',
            name='img_path',
            field=models.CharField(default='', max_length=255),
        ),
    ]
