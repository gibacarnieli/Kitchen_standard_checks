from rest_framework.generics import DestroyAPIView
from .serializers.common import ReviewSerializer
from .models import Review
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerorReadyOnly

# Path: /reviews/
# Methods: GET, POST
class ReviewCreateView(OwnerListCreateView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Path: /reviews/:pk/
# Methods: DELETE
class ReviewDestroyView(DestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerorReadyOnly]
