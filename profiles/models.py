from django.contrib.auth.models import AbstractUser, Group, Permission  # Import the Group model
from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.


class UserProfile(AbstractUser):
    role = models.CharField(max_length=255, blank=True, null=True)
    bio = models.CharField(max_length=300, blank=True, null=True)
    password = models.CharField(max_length=128, default='some_default_value')
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='profile_groups',  # Add a unique related_name
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='profile_user_permissions',  # Add a unique related_name
    )