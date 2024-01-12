from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerorReadyOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.owner