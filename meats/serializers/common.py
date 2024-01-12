from rest_framework.serializers import ModelSerializer
from ..models import Meat

class MeatSerializer(ModelSerializer):
    class Meta:
        model = Meat
        fields = '__all__'