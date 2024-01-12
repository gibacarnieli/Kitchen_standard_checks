from django.urls import path
from .views import FridgeListCreateView, FridgeDetailView

urlpatterns = [
    path('', FridgeListCreateView.as_view()),
    path('<int:pk>/', FridgeDetailView.as_view())
]