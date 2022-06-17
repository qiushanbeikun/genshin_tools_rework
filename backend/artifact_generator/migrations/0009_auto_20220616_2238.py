# Generated by Django 3.2.13 on 2022-06-17 05:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artifact_generator', '0008_auto_20220616_0221'),
    ]

    operations = [
        migrations.RenameField(
            model_name='artifact',
            old_name='cup_image',
            new_name='goblet_image',
        ),
        migrations.RenameField(
            model_name='artifact',
            old_name='glass_image',
            new_name='sand_image',
        ),
        migrations.RenameField(
            model_name='artifactdesc',
            old_name='cup',
            new_name='goblet',
        ),
        migrations.RenameField(
            model_name='artifactdesc',
            old_name='cup_desc',
            new_name='goblet_desc',
        ),
        migrations.RenameField(
            model_name='artifactdesc',
            old_name='glass',
            new_name='sand',
        ),
        migrations.RenameField(
            model_name='artifactdesc',
            old_name='glass_desc',
            new_name='sand_desc',
        ),
    ]
