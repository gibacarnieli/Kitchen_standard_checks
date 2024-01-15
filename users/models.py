from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
class User(AbstractUser):
    role = models.CharField(max_length=255, blank=True, null=True)
    bio = models.CharField(max_length=300, blank=True, null=True)
