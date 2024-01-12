from django.db import models


class Review(models.Model):
    text = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    fridge = models.ForeignKey(
        to='fridges.Fridge',  # Use the correct path
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='reviews',
        null=True
    )
