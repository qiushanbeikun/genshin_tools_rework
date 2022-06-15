# Generated by Django 3.2.13 on 2022-06-15 08:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artifact_generator', '0003_auto_20220614_2243'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artifact',
            name='cup',
        ),
        migrations.RemoveField(
            model_name='artifact',
            name='feather',
        ),
        migrations.RemoveField(
            model_name='artifact',
            name='flower',
        ),
        migrations.RemoveField(
            model_name='artifact',
            name='glass',
        ),
        migrations.RemoveField(
            model_name='artifact',
            name='head',
        ),
        migrations.RemoveField(
            model_name='artifact',
            name='title',
        ),
        migrations.AddField(
            model_name='artifactdesc',
            name='artifact',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='artifact_generator.artifact'),
            preserve_default=False,
        ),
    ]
