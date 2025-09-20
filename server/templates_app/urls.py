# templates_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, TemplateSettingViewSet

router = DefaultRouter()
router.register(r"tenants", TenantViewSet)
router.register(r"templates", TemplateSettingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
