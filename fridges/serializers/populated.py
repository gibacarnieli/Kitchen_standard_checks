from .common import FridgeSerializer
from users.serializers.common import FridgeListUserSerializer
from reviews.serializers.common import ReviewSerializer

class FridgeListSerializer(FridgeSerializer):
    reviews = ReviewSerializer(many=True)
    owner = FridgeListUserSerializer()