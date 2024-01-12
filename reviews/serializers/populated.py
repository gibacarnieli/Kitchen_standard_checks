from .common import FridgeSerializer
from reviews.serializers.common import ReviewSerializer

class PopulatedFridgeSerializer(FridgeSerializer):
    reviews = ReviewSerializer(many=True)