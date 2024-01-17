from .common import UserProfileSerializer
# from users.serializers.common import UserProfileSerializer

class PopulatedUserSerializer(UserProfileSerializer):
    users = UserProfileSerializer(many=True)
