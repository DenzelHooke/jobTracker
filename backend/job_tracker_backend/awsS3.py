import boto3
from uuid import uuid4

s3_resource = boto3.resource('s3')


def create_bucket_name(bucket_prefix):
    return ''.join([bucket_prefix, str(uuid4().hex[:6])])


print(create_bucket_name("job-tracker"))
