from django.urls import path
from . import auth_views

app_name = "auth"

urlpatterns = [
    # Authentication endpoints
    path("register/", auth_views.register_view, name="register"),
    path("login/", auth_views.login_view, name="login"),
    path("logout/", auth_views.logout_view, name="logout"),
    path("verify-token/", auth_views.verify_token_view, name="verify_token"),
    # User profile endpoints
    path("profile/", auth_views.user_profile_view, name="user_profile"),
    path("profile/update/", auth_views.update_profile_view, name="update_profile"),
    path("change-password/", auth_views.change_password_view, name="change_password"),
    path("current-user/", auth_views.current_user_view, name="current_user"),
    # Tenant/Organization endpoints
    path("tenants/", auth_views.user_tenants_view, name="user_tenants"),
    path("tenants/create/", auth_views.create_tenant_view, name="create_tenant"),
]
