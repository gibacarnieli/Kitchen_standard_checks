# profiles/views.py
from rest_framework import generics
from .models import UserProfile
from .serializers.common import UserProfileSerializer

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    
    serializer_class = UserProfileSerializer
