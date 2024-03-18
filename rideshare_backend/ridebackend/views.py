from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.http import require_POST
from rest_framework import status, generics
from rest_framework.response import Response
from ridebackend.serializers import UserRegistrationSerializer,UserLoginSerializer, RideSerializer,FeedbackSerializer
from rest_framework.authtoken.models import Token
from ridebackend.models import Ride,User
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse, HttpResponseBadRequest
import json
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        is_driver_inPayload= request.data['is_driver']
        is_passenger_inPayload= request.data['is_passenger']
        if is_driver_inPayload is is_passenger_inPayload :
          return Response("User should either be a passenger or a driver", status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            user = serializer.save()
            uid=user.id
            data={'id':uid}
            data.update(serializer.data)
            #data.update({'id':uid}) 
          #  return Response(uid, status=status.HTTP_201_CREATED)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        data={'token': token.key}
        data.update(serializer.data)
        data.pop("password")

        is_driver_inDB = data.get('is_driver')
        is_driver_inPayload= request.data['is_driver']
        if is_driver_inDB != is_driver_inPayload:
            if is_driver_inDB is True:
                return Response("This user is a driver", status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("This user is a passenger", status=status.HTTP_400_BAD_REQUEST)
                
        is_passenger_inDB = data.get('is_passenger')
        is_passenger_inPayload= request.data['is_passenger']
        if is_passenger_inDB != is_passenger_inPayload:
            if is_passenger_inDB is True:
                return Response("This user is a passenger", status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("This user is a driver", status=status.HTTP_400_BAD_REQUEST)

        #return Response({"token": token.key}, status=status.HTTP_200_OK)
       
        return Response(data, status=status.HTTP_200_OK)


class RideListView(generics.ListCreateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
       # Assign the passenger as the request user
        try:
            driver = User.objects.filter(is_driver=True).filter(availibility='Available').last()
            driver_json = serializers.serialize('json', [driver])
            driver_data = json.loads(driver_json)
            user_fields = driver_data[0]['fields']
            drivername = user_fields.get('username', 'Not available')
        except Exception as e:
        # Handle other exceptions
            return JsonResponse({'status': 'failed', 'error': "Driver not available."}, status=400)
       
            serializer.save(passenger=self.request.user)



@api_view(['GET'])
def get_drivers(request):
    users = User.objects.filter(is_driver=True)
    serializer = UserRegistrationSerializer(users, many=True)
    # Serialize the data
    #data = list(users.values('username', 'email', 'is_driver', 'is_passenger'))  # Adjust the fields as needed
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def RideDetailView(request):
    username = request.query_params.get('username', None)
    statusQuery = request.query_params.get('status', None)
    if statusQuery == "completed":
        user_profile = Ride.objects.filter(driver=username).filter(status='completed')
        if user_profile:
            serializer = FeedbackSerializer(user_profile, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    if username is not None:
        user_profile = Ride.objects.filter(driver=username).filter(status='assigned')
        if user_profile:
            serializer = RideSerializer(user_profile, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
    

@require_POST
@api_view(['POST'])
@csrf_exempt
def ride_post_view(request):
    try:
        data = json.loads(request.body)
        permission_classes = [IsAuthenticated]

        passenger = data.get('passenger')
        if not passenger:
            return HttpResponseBadRequest("passenger is required.")

        try:
            driver = User.objects.filter(is_driver=True).filter(availibility='available').last()
            driver_json = serializers.serialize('json', [driver])

            driver_data = json.loads(driver_json)
            user_fields = driver_data[0]['fields']

        # Access the specific field - in this case, 'username'
            drivername = user_fields.get('username', 'Not available')
            #serializer = UserRegistrationSerializer(driver, many=True)
        except Exception as e:
        # Handle other exceptions
            return JsonResponse({'status': 'failed', 'error': "Driver not available."}, status=500)
            
        response_data = {
            'passenger':passenger,
            'driver':drivername,
            'pickup_location':data.get('pickup_location'),
            'destination':data.get('destination'),
            'status' : 'assigned',
        }
        #update user model for driver
        driver_instance = User.objects.get(username=drivername)
        # Update the field
        driver_instance.availibility = 'assigned'
        # Save the changes
        driver_instance.save()

        #update ride model
        #serializer = RideSerializer(data=request.data, partial=True)
        passengerName = User.objects.get(username=passenger)
        driverName_User= User.objects.get(username=drivername)
        ride_Model = Ride(passenger=passengerName,  driver=driverName_User,  pickup_location=data.get('pickup_location'),  destination=data.get('destination'),  status = 'assigned')
        ride_Model.full_clean()
        ride_Model.save()
       
        # Return the response data as JSON
        return JsonResponse(response_data)

    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON.")


@require_POST
@csrf_exempt
def ride_complete_view(request):
    try:
        data = json.loads(request.body)
        permission_classes = [IsAuthenticated]

        passenger = data.get('passenger')
        drivername = data.get('driver')
        
        #update user model for driver
        #driver_instance = Ride.objects.get(passenger=passenger)
        driver_instance = Ride.objects.filter(passenger=passenger).filter(driver=drivername).last()
        
        # Update the field
        driver_instance.status='completed'
        # Save the changes
        driver_instance.save()

        user_model = User.objects.filter(username=drivername).last()
        user_model.availibility="available"
        user_model.save()

        # Return the response data as JSON
        ride_data={
            'passenger':passenger,
            'driver': drivername,
            'status' : 'completed',
        }
        return JsonResponse(ride_data, safe=False)
        
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON.")

@require_POST
@api_view(['POST'])
@csrf_exempt
def cancleRide(request):
    try:
        data = json.loads(request.body)
        permission_classes = [IsAuthenticated]

        driverName = data.get('driver')
        
        try:
            user_model = User.objects.filter(username=driverName).last()
            user_model.availibility="available"
            user_model.save() 
        except Exception as e:
            return JsonResponse({'status': 'failed', 'error': "Ride couldn't be cancled."}, status=400)
            
        ride_Model=Ride.objects.filter(driver=driverName).filter(status = 'assigned').last()
        ride_Model.status="cancelled"
        ride_Model.full_clean()
        ride_Model.save()
        # Return the response data as JSONride_complete_view
        ride_data={
            'message':"Ride has been cancelled"
        }
        return JsonResponse(ride_data, safe=False, status=200)
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON.")

@require_POST
@csrf_exempt
def feedback(request):
    try:
        data = json.loads(request.body)
        permission_classes = [IsAuthenticated]

        passenger = data.get('passenger')
        ratingFromUser= data.get('rating')
        feedbackFromUser= data.get('feedback')
        
        #update user model for driver
        driver_instance = Ride.objects.filter(passenger=passenger).filter(status='completed').last()
      # Update the field
        driver_instance.rating = ratingFromUser
        driver_instance.feedback =feedbackFromUser
        # Save the changes
        driver_instance.save()

        # Return the response data as JSON
        feedbackData={
            'passenger':passenger,
            'rating':ratingFromUser,
            'feedback' : feedbackFromUser,
            'status':'Feedback saved succesfully',
        }
        return JsonResponse(feedbackData, safe=False)
    except json.JSONDecodeError:
        return HttpResponseBadRequest("User can only rate their completed rides.")