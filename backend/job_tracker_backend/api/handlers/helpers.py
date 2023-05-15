import os
import uuid
from pathlib import Path
from account.models import Account
import boto3
from botocore.client import Config
import json


class AWS:
    s3_resource = boto3.resource('s3', config=Config(signature_version='s3v4'))
    clientS3 = boto3.client('s3', config=Config(signature_version='s3v4'))

    def __init__(self, resume=False, cover=False):
        self.resume = resume
        self.cover = cover
        self.bucket = None

    # @property
    # def resume(self):
    #     return self._resume

    # @resume.setter
    # def resume(self, value):
    #     self._resume = value

    # @property
    # def cover(self):
    #     return self._cover

    # @cover.setter
    # def cover(self, value):
    #     self.cover = value

    def set_bucket(self, bucket_name):
        self.bucket = AWS.s3_resource.Bucket(bucket_name)

    def upload_file(self, bucket_name, file_name, type, path_to_file=None):
        if type.lower() == "resume":
            with open(path_to_file or self.resume, 'rb') as f:
                AWS.s3_resource.meta.client.upload_fileobj(
                    f, bucket_name, file_name, ExtraArgs={
                        'ContentType': 'application/pdf',
                        'ContentDisposition': 'inline'
                    })

    def generatePreSigned(self, key, bucket, expires=14400):
        url = AWS.clientS3.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': bucket,
                'Key': key.strip(),
            },
            ExpiresIn=expires,
            HttpMethod='GET',
        )
        if url:
            return url


def generateFileNameFromUser(file_name, user, type):
    resume_tag = 1
    cover_tag = 2
    file_name = file_name.split('.pdf')[0]
    if type.lower() == "resume":
        return f"{'-'.join([file_name, str(user.id), str(resume_tag), uuid.uuid4().hex[:4]])}.pdf"


def writePDF(path, file, file_name):
    with open(f'{path}/{file_name}', 'wb') as f:
        f.write(file.read())
        return f'{path}/{file_name}'


def create_image_dir(userID, type):
    dir_name = f'{userID}-{uuid.uuid4()}'
    root_dir = Path(__file__).parent.parent.parent
    full_dir = f'{root_dir}/files/{dir_name}/'

    if type.lower() == "resume":
        dir_resume = f'{full_dir}/resume'
        os.makedirs(dir_resume)
        return dir_resume

    elif type.lower() == "cover":
        dir_cover = f'{full_dir}/cover'
        os.makedirs(dir_cover)
        return dir_cover
    else:
        raise Exception("Type must equal 'resume' or 'cover' to continue!")


def save_pdf_to_dir(file, path, type):

    if type == "resume":
        file = writePDF(path, file)

    elif type == "cover":
        file = writePDF(path, file)
    else:
        raise Exception("Type must equal 'resume' or 'cover' to continue!")

    return file


# def check_image_dir(user):
#     # image_dir_exist

def serializeDictFromRequest(request, cover, resume):

    jobStatus = json.loads(request.data['jobStatus'])

    job_values = {
        'company_name': request.data.get('company', None),
        'company_email': request.data.get('email', None),
        'company_position': request.data.get('position', None),
        'applied': jobStatus['applied'],
        'pending': jobStatus['pending'],
        'rejected': jobStatus['rejected'],
        'cover': cover.strip() or '',
        'resume': resume.strip() or '',
    }

    return job_values
