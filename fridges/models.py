from django.db import models

# Create your models here.
class Fridge(models.Model):
    fridgeNumber = models.PositiveIntegerField()
    temperature = models.PositiveIntegerField()
    date = models.DateField()
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='fridges_owned',
        null=True
    )

    def __str__(self):
        return f'{self.fridgeNumber} - {self.temperature} ({self.date})'