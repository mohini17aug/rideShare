from django.contrib.auth import authenticate
from rest_framework import serializers
from ridebackend.models import User, Ride
from rest_framework.exceptions import ValidationError


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    is_passenger = serializers.BooleanField(default=True)
    is_driver = serializers.BooleanField(default=False)
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'is_passenger', 'is_driver', 'availibility']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['id', 'passenger', 'driver', 'pickup_location', 'destination']
        #fields = ['id', 'passenger', 'driver', 'pickup_location', 'destination', 'status', 'created_at', 'rating', 'feedback']
        read_only_fields = ['id', 'driver', 'created_at']

        def perform_update(self, serializer):
            if Ride.status != 'completed':
                raise ValidationError("Can only rate completed rides.")
            serializer.save()


