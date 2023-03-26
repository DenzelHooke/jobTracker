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
from rest_framework.exceptions import AuthenticationFailed
import uuid
import os
from api.handlers.helpers import create_image_dir, save_pdf_to_dir


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def jobDetail(request):
    if request.method == "POST":

        try:
            resume = request.FILES.get('resume')

            # Check if images folder exists
            if resume:
                resume_dir = create_image_dir(request.user.id, "resume")
                save_pdf_to_dir(resume, resume_dir, "resume")

            company = request.data['company']
            email = request.data['email']
            address = request.data['address']
            jobStatus = request.data['jobStatus']
            applied = jobStatus['applied']
            pending = jobStatus['pending']
            rejected = jobStatus['rejected']

            # print("RESUME: ", resume)

            # new_job = Job.objects.create(
            #     company_name=company,
            #     company_email=email,
            #     company_address=address,
            #     applied=applied,
            #     pending=pending,
            #     rejected=rejected,
            #     user=request.user
            # )

            return Response({
                "created": 1
            })

        except Exception as e:
            # if not company or not email or not jobStatus:
            #     raise InvalidCreds

            print("ERROR: ", e)
            return Response({
                "message": str(e)
            })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    print("DELETE PK: ", pk)

    try:
        user = request.user
        deleted_job = Job.objects.filter(id=pk).delete()

        category = {
            request.query_params['category']: True
        }
        all_category_jobs = []

        all_category_jobs = Job.objects.filter(
            user=user).filter(**category).values()

    except Exception as e:
        return Response({
            "message": str(e)
        })

    return Response({
        "deleted": deleted_job,
        "jobs": all_category_jobs
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategory(request):
    print(request.user)
    user = request.user
    category = {
        request.query_params['category']: True
    }
    all_category_jobs = []

    try:
        all_category_jobs = Job.objects.filter(
            user=user).filter(**category).values()
        print(all_category_jobs)

    except Exception as e:
        print(e)
        return Response({
            "message": str(e)
        })

    return Response({
        "jobs": all_category_jobs
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verifyToken(request):
    return Response({"authorized": 1})


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
