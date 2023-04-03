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
from api.handlers.helpers import writePDF, AWS, generateFileNameFromUser
from job_tracker_backend.settings import IMAGE_BUCKET
from pathlib import Path
import json


root_dir = Path(__file__).parent.parent


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def jobDetail(request):
    if request.method == 'POST':
        s3_instance = None

        resume = request.FILES.get('resume') or ''
        cover = request.FILES.get('cover') or ''
        # Check if images folder exists
        if resume:
            # Generate appropriate file name
            file_name = generateFileNameFromUser(
                resume.name, request.user, type="resume")

            # Create pdf and return path on sysyem
            path = writePDF(path=f'{root_dir}/files/',
                            file=resume, file_name=file_name)
            s3_instance = AWS()

            # Upload file to aws
            uploaded = s3_instance.upload_file(
                bucket_name=IMAGE_BUCKET, path_to_file=path, file_name=file_name.strip(), type="resume")

            resume = file_name

        # Deserialize job status into dict
        jobStatus = json.loads(request.data['jobStatus'])
        print(request.data)
        job_values = {
            'company_name': request.data.get('company', None),
            'company_email': request.data.get('email', None),
            'company_address': request.data.get('address', None),
            'applied': jobStatus['applied'],
            'pending': jobStatus['pending'],
            'rejected': jobStatus['rejected'],
            'cover': cover.strip() or '',
            'resume': resume.strip() or '',

        }

        # company = request.data['company']
        # email = request.data['email']
        # address = request.data['address']
        # applied = jobStatus['applied']
        # pending = jobStatus['pending']
        # rejected = jobStatus['rejected']

        # print("RESUME: ", resume)

        # Create a job with populated values
        new_job = Job.objects.create(
            **job_values,
            user=request.user
        )

        return Response({
            "created": 1
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


@api_view(['GET'])
def access_image(request, pk):
    _NON_EXIST_MESSAGE = "N/A"

    try:
        user = request.user
        job = Job.objects.filter(user=user, id=pk)[0]
        s3_instance = AWS()
        resume = job.resume or None
        cover = job.cover or None

        if resume:
            resume_url = s3_instance.generatePreSigned(
                key=resume, bucket=IMAGE_BUCKET)
        else:
            resume_url = _NON_EXIST_MESSAGE

        if cover:
            cover_url = s3_instance.generatePreSigned(
                key=cover, bucket=IMAGE_BUCKET)
        else:
            cover_url = _NON_EXIST_MESSAGE

        return Response(
            {
                'resume_url': resume_url,
                'cover_url': cover_url
            }
        )
    except Exception as e:
        print("ERROR in access_image view: ", e)
        return Response({
            'error': e
        })
