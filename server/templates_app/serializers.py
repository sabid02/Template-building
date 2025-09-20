from rest_framework import serializers
from .models import Tenant, TemplateSetting, User


class TenantSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.get_full_name", read_only=True)

    class Meta:
        model = Tenant
        fields = "__all__"


class TemplateSettingSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(
        source="created_by.get_full_name", read_only=True
    )
    tenant_name = serializers.CharField(source="tenant.name", read_only=True)

    class Meta:
        model = TemplateSetting
        fields = "__all__"
