from rest_framework.serializers import ModelSerializer
from ..models import Fridge

class FridgeSerializer(ModelSerializer):
    class Meta:
        model = Fridge
        fields = '__all__'