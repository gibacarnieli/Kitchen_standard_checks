from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
class User(AbstractUser):
    role = models.CharField(max_length=255)
    bio = models.CharField(max_length=300)
