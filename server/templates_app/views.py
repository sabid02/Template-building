from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tenant, TemplateSetting
from .serializers import TenantSerializer, TemplateSettingSerializer


class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own tenants
        return Tenant.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the owner to the current user
        serializer.save(owner=self.request.user)


class TemplateSettingViewSet(viewsets.ModelViewSet):
    queryset = TemplateSetting.objects.all()
    serializer_class = TemplateSettingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see templates from their tenants
        user_tenants = Tenant.objects.filter(owner=self.request.user)
        return TemplateSetting.objects.filter(tenant__in=user_tenants)

    def perform_create(self, serializer):
        # Automatically set the created_by to the current user
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=["get"])
    def my_templates(self, request):
        """Get templates created by the current user"""
        templates = self.get_queryset().filter(created_by=request.user)
        serializer = self.get_serializer(templates, many=True)
        return Response(serializer.data)
