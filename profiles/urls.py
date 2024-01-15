# profiles/urls.py
from django.urls import path
from .views import UserProfileListCreateView, UserProfileDetailView

urlpatterns = [
    path('', UserProfileListCreateView.as_view()),
    path('<int:pk>/', UserProfileDetailView.as_view()),
]
