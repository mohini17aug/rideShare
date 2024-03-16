"""
URL configuration for rideshare project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from ridebackend.views import UserRegistrationView, UserLoginView, RideListView, RideDetailView, get_drivers, ride_post_view, ride_complete_view, feedback

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('rides1/', RideListView.as_view(), name='ride-list1'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride-detail'),
    path('drivers/', get_drivers, name='get-drivers'),
    path('rides/', ride_post_view, name='ride-list'),
    path('rideComplete/', ride_complete_view, name='ride_complete_view'),
    path('feedback/', feedback, name='ride_feedback'),
    
]
