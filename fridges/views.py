from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Fridge
from .serializers.common import FridgeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.populated import FridgeListSerializer
from lib.permissions import IsOwnerorReadyOnly
from lib.views import OwnerListCreateView

# Create your views here.
# Path: /fridges/

class FridgeListCreateView(OwnerListCreateView):
    queryset = Fridge.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FridgeListSerializer
        return FridgeSerializer

# Path: /fridges/:pk/
# Methods: GET, PUT, PATCH, DELETE
class FridgeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Fridge.objects.all()
    permission_classes = [IsOwnerorReadyOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FridgeListSerializer
        else:
            return FridgeSerializer