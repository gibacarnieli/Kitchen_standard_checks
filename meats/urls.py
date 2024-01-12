from django.urls import path
from .views import MeatListCreateView, MeatDetailView

urlpatterns = [
    path('', MeatListCreateView.as_view()),
    path('<int:pk>/', MeatDetailView.as_view())
]