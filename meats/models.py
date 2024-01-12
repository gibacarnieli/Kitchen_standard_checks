from django.db import models

# Create your models here.
class Meat(models.Model):
    meatName = models.CharField(max_length=255)
    temperature = models.PositiveIntegerField()
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='meats_owned',
        null=True
    )


    def __str__(self):
        return f'{self.meatName} ({self.temperature})'
