from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile, Tenant, TemplateSetting


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "email",
        "username",
        "first_name",
        "last_name",
        "is_staff",
        "is_verified",
    )
    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        "is_verified",
        "date_joined",
    )
    search_fields = ("email", "username", "first_name", "last_name")
    ordering = ("-date_joined",)

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "email", "phone_number")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_verified",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ),
            },
        ),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "company", "created_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("user__email", "user__first_name", "user__last_name", "company")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "owner", "created_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("name", "email", "owner__email")
    readonly_fields = ("created_at", "updated_at")


@admin.register(TemplateSetting)
class TemplateSettingAdmin(admin.ModelAdmin):
    list_display = ("template_name", "tenant", "created_by", "updated_at")
    list_filter = ("updated_at", "tenant__name")
    search_fields = ("template_name", "tenant__name", "created_by__email")
    readonly_fields = ("updated_at",)
