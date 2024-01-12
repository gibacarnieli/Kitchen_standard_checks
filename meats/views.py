from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Meat
from .serializers.common import MeatSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.populated import MeatListSerializer
from lib.permissions import IsOwnerorReadyOnly
from lib.views import OwnerListCreateView

# Create your views here.
# Path: /meats/

class MeatListCreateView(OwnerListCreateView):
    queryset = Meat.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MeatListSerializer
        return MeatSerializer

# Path: /meats/:pk/
# Methods: GET, PUT, PATCH, DELETE
class MeatDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Meat.objects.all()
    permission_classes = [IsOwnerorReadyOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MeatListSerializer
        else:
            return MeatSerializer