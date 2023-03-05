from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Job
from .serializers import JobSerializer, AccountSerializer
import bcrypt
from account.models import Account
import json
from api.custom_exceptions import UserExists, InvalidCreds
from api.handlers.jwt_handlers import jwtWrapper
from django.contrib.auth import authenticate, login


@api_view(['GET'])
def getData(request):
    jobs = Job.objects.all()
    # Many tells our serializer to accept an iterable of objects
    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def addJob(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        # Create item in databasqe
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    user_exists = Account.objects.filter(email=request.data['email'])
    if user_exists:
        raise UserExists

    user = Account.objects.create_user(email=request.data['email'],
                                       password=request.data['password'])

    if user:
        payload = {
            "email": user.email
        }
        token = jwtWrapper().encode(payload)
    return Response(json.dumps({
        "token": token,
        "email": user.email
    }))


@api_view(['POST'])
def loginUser(request):
    # Check if user exists, reject if user doesnt
    userExists = Account.objects.filter(email=request.data['email'])

    if not userExists:
        raise InvalidCreds

    user = authenticate(username=request.data.get('email'),
                        password=request.data.get('password'))

    if user:
        payload = {
            "email": user.email
        }
        token = jwtWrapper().encode(payload)

        # TODO Create payload generator function
        return Response(json.dumps({
            "token": token,
            "email": user.email
        }))

# Info endpoint


@api_view(['GET'])
def info(request):
    endpoints = {
        'Register user': '/register'
    }

    return Response(endpoints)
