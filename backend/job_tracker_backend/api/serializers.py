from rest_framework import serializers
from base.models import Job
from account.models import Account


class JobSerializer(serializers.ModelSerializer):
    """
     A serializer to steralize object instances into usable data for our api to handle. 
    """

    class Meta:
        model = Job
        #  A list of specific fields can also be entered as well.
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializes data so it can be cleanly read. 
    """

    class Meta:
        model = Account
        fields = '__all__'
