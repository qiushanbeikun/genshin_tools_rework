from django.core import management

from genshin_tools_rework import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
