from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from base.models import Job
from .serializers import JobSerializer, AccountSerializer
import bcrypt
from account.models import Account
from base.models import Job
import json
from api.custom_exceptions import UserExists, InvalidCreds
from api.handlers.jwt_handlers import jwtWrapper
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def jobDetail(request):

    if request.method == "POST":
        try:
            company = request.data['company']
            email = request.data['email']
            address = request.data['address']
            jobStatus = request.data['jobStatus']
            applied = jobStatus['applied']
            pending = jobStatus['pending']
            rejected = jobStatus['rejected']

            new_job = Job.objects.create(
                company_name=company,
                company_email=email,
                company_address=address,
                applied=applied,
                pending=pending,
                rejected=rejected
            )

            if new_job:
                return Response({
                    "created": 1
                })

            print(company, email, address, jobStatus)
        except Exception as e:
            print(e)


@api_view(['POST'])
def registerUser(request):
    user_exists = Account.objects.filter(email=request.data['email'])
    if user_exists:
        raise UserExists

    user = Account.objects.create_user(email=request.data['email'],
                                       password=request.data['password'])

    if not user:
        raise InvalidCreds

    return Response(jwtWrapper().getToken(user))
    # payload = {
    #     "email": user.email
    # }
    # token = jwtWrapper().encode(payload)


@api_view(['POST'])
def loginUser(request):
    # Check if user exists, reject if user doesnt
    userExists = Account.objects.filter(email=request.data['email'])

    if not userExists:
        raise InvalidCreds

    # Returns user object if user and password combination matches
    user = authenticate(username=request.data.get('email'),
                        password=request.data.get('password'))
    # payload = {
    #     "email": user.email
    # }
    # # Encode our payload into a jwt token
    # token = jwtWrapper().encode(payload)

    # # TODO Create payload generator function
    # return Response(json.dumps({
    #     "token": token,
    #     "email": user.email
    # }))

    if not user:
        raise InvalidCreds

    return Response(jwtWrapper().getToken(user))


# Info endpoint


@api_view(['GET'])
def info(request):
    endpoints = {
        'Register user': '/register'
    }

    return Response(endpoints)
