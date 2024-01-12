from .common import MeatSerializer
from users.serializers.common import MeatListUserSerializer

class MeatListSerializer(MeatSerializer):
    owner = MeatListUserSerializer()