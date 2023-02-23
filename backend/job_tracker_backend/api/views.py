from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Job
from .serializers import JobSerializer


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
