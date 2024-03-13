from django.contrib.auth import authenticate
from rest_framework import serializers
from rideshare_app.models import User, Ride


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'is_passenger', 'is_driver']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['id', 'passenger', 'driver', 'pickup_location', 'destination', 'status', 'created_at', 'rating', 'feedback']
        read_only_fields = ['id', 'status', 'driver', 'created_at']


