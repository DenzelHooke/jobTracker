from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """A simple subclass that adds custom claims to our JWT token. 
    """

    default_error_messages = {
        'no_active_account': "No account found with those credentials"
    }

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email

        return token
