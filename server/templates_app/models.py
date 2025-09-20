from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    class Meta:
        # Add custom related names to avoid conflicts
        pass

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


class Tenant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="owned_tenants",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class TemplateSetting(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    template_name = models.CharField(max_length=50)
    settings = models.JSONField(default=dict)  # flexible settings
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_templates",
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.tenant.name} - {self.template_name}"


class UserProfile(models.Model):
    """Extended user profile information"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    company = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} Profile"
