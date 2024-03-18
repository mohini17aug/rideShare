from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    # Additional fields if needed
    AvailibilityChoices = (
        ('available', 'Available'),
        ('assigned', 'Assigned'),
        ('busy', 'Busy'),
        ('not_available', 'Not Available'),
        ('not_active', 'Not Active'),
    )
    is_passenger = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200, default="Password1")
    #email= models.CharField(max_length=200, default="Null")
    availibility = models.CharField(max_length=20, choices=AvailibilityChoices, default='available')

class Ride(models.Model):
    STATUS_CHOICES = (
        ('requested', 'Requested'),
        ('assigned', 'Assigned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

#    passenger = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rides')
    passenger = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username', related_name='rides')
    driver = models.ForeignKey(User, on_delete=models.CASCADE,to_field='username',default='Null', related_name='assigned_rides')
 #   driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_rides')
    pickup_location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(null=True, blank=True, choices=[(i, str(i)) for i in range(1, 6)])
    feedback = models.TextField(null=True, blank=True)