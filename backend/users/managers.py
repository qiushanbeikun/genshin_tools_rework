from django.contrib.auth.models import BaseUserManager
from .utils import *


class UserManager(BaseUserManager):
    def create_user(self, username, email, password):
        validation(username, email, password)
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        validation(username, email, password)
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
