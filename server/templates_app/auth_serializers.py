from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, UserProfile, Tenant


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "password",
            "password_confirm",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "password_confirm": {"write_only": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "A user with this username already exists."
            )
        return value

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = User.objects.create_user(**validated_data)

        # Create user profile
        UserProfile.objects.create(user=user)

        # Create a default tenant for the user
        tenant = Tenant.objects.create(
            name=f"{user.first_name}'s Organization", email=user.email, owner=user
        )

        return user


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")
            attrs["user"] = user
            return attrs
        else:
            raise serializers.ValidationError("Must include email and password.")


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""

    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    username = serializers.CharField(source="user.username", read_only=True)
    phone_number = serializers.CharField(source="user.phone_number")
    is_verified = serializers.BooleanField(source="user.is_verified", read_only=True)
    date_joined = serializers.DateTimeField(source="user.date_joined", read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "bio",
            "avatar",
            "company",
            "website",
            "is_verified",
            "date_joined",
            "created_at",
            "updated_at",
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        user = instance.user

        # Update user fields
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer"""

    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "phone_number",
            "is_verified",
            "date_joined",
            "last_login",
        )
        read_only_fields = (
            "id",
            "username",
            "is_verified",
            "date_joined",
            "last_login",
        )

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class TenantSerializer(serializers.ModelSerializer):
    """Serializer for tenant/organization"""

    owner_name = serializers.CharField(source="owner.get_full_name", read_only=True)

    class Meta:
        model = Tenant
        fields = (
            "id",
            "name",
            "email",
            "owner",
            "owner_name",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password"""

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError("New passwords don't match.")
        return attrs

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value
