from rest_framework import serializers
from base.models import Job


class JobSerializer(serializers.ModelSerializer):
    """
     A serializer to steralize object instances into usable data for our api to handle. 
    """

    class Meta:
        model = Job
        #  A list of specific fields can also be entered as well.
        fields = '__all__'
