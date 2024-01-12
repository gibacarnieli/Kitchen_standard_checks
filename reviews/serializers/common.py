from rest_framework.serializers import ModelSerializer
from fridges.serializers.common import FridgeSerializer  # Adjust the import path
from ..models import Review

class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'