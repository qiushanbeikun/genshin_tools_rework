web: gunicorn genshin_tools_rework.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=genshin_tools_rework worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=genshin_tools_rework beat -S redbeat.RedBeatScheduler --loglevel=info
