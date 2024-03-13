from django.shortcuts import render

from rest_framework import status, generics
from rest_framework.response import Response
from rideshare_app.serializers import UserRegistrationSerializer,UserLoginSerializer, RideSerializer
from rest_framework.authtoken.models import Token
from rideshare_app.models import Ride
from rest_framework.permissions import IsAuthenticated

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            uid=user.id
            return Response(uid, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class RideListView(generics.ListCreateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Assign the passenger as the request user
        serializer.save(passenger=self.request.user)

class RideDetailView(generics.RetrieveUpdateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    
    def perform_update(self, serializer):
        ride = self.get_object()
        if ride.status != 'completed':
            raise serializers.ValidationError("Can only rate completed rides.")
        serializer.save()