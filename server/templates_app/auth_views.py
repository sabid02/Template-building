from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import make_password
from django.db import transaction
from .models import User, UserProfile, Tenant
from .auth_serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserSerializer,
    TenantSerializer,
    ChangePasswordSerializer,
)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    """User registration endpoint"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                user = serializer.save()
                token, created = Token.objects.get_or_create(user=user)

                return Response(
                    {
                        "message": "User registered successfully",
                        "user": UserSerializer(user).data,
                        "token": token.key,
                        "status": "success",
                    },
                    status=status.HTTP_201_CREATED,
                )
        except Exception as e:
            return Response(
                {"message": f"Registration failed: {str(e)}", "status": "error"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {
                "message": "Registration failed",
                "errors": serializer.errors,
                "status": "error",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """User login endpoint"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)

        return Response(
            {
                "message": "Login successful",
                "user": UserSerializer(user).data,
                "token": token.key,
                "status": "success",
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"message": "Login failed", "errors": serializer.errors, "status": "error"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """User logout endpoint"""
    try:
        # Delete the token
        request.user.auth_token.delete()
        logout(request)
        return Response(
            {"message": "Logout successful", "status": "success"},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response(
            {"message": f"Logout failed: {str(e)}", "status": "error"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """Get current user profile"""
    try:
        profile = request.user.profile
        serializer = UserProfileSerializer(profile)
        return Response(
            {"profile": serializer.data, "status": "success"}, status=status.HTTP_200_OK
        )
    except UserProfile.DoesNotExist:
        # Create profile if it doesn't exist
        profile = UserProfile.objects.create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(
            {"profile": serializer.data, "status": "success"}, status=status.HTTP_200_OK
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """Update current user profile"""
    try:
        profile = request.user.profile
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Profile updated successfully",
                    "profile": serializer.data,
                    "status": "success",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "message": "Profile update failed",
                    "errors": serializer.errors,
                    "status": "error",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
    except UserProfile.DoesNotExist:
        return Response(
            {"message": "Profile not found", "status": "error"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    """Change user password"""
    serializer = ChangePasswordSerializer(
        data=request.data, context={"request": request}
    )
    if serializer.is_valid():
        user = request.user
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        # Delete all existing tokens to force re-login
        Token.objects.filter(user=user).delete()

        return Response(
            {
                "message": "Password changed successfully. Please login again.",
                "status": "success",
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {
                "message": "Password change failed",
                "errors": serializer.errors,
                "status": "error",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_tenants_view(request):
    """Get user's tenants/organizations"""
    tenants = Tenant.objects.filter(owner=request.user)
    serializer = TenantSerializer(tenants, many=True)
    return Response(
        {"tenants": serializer.data, "status": "success"}, status=status.HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_tenant_view(request):
    """Create a new tenant/organization"""
    serializer = TenantSerializer(data=request.data)
    if serializer.is_valid():
        tenant = serializer.save(owner=request.user)
        return Response(
            {
                "message": "Tenant created successfully",
                "tenant": TenantSerializer(tenant).data,
                "status": "success",
            },
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            {
                "message": "Tenant creation failed",
                "errors": serializer.errors,
                "status": "error",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    """Get current authenticated user info"""
    serializer = UserSerializer(request.user)
    return Response(
        {"user": serializer.data, "status": "success"}, status=status.HTTP_200_OK
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_token_view(request):
    """Verify if token is valid"""
    return Response(
        {
            "message": "Token is valid",
            "user": UserSerializer(request.user).data,
            "status": "success",
        },
        status=status.HTTP_200_OK,
    )
