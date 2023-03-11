import jwt
import os
from rest_framework_simplejwt.tokens import RefreshToken


class jwtWrapper:
    """A wrapper for creating and decoding jwt tokens. 

    Raises:
        ValueError: Raised when dictionary is not passed into encoder. 
    """
    _SECRET_KEY = os.getenv("JWT_SECRET")
    _ALGORITHIM = os.getenv("JWT_ALG")

    if not _ALGORITHIM or not _SECRET_KEY:
        raise ValueError("Could not find .env files.")

    def encode(self, payload):
        if not isinstance(payload, dict):
            raise ValueError(
                "Payload must be a dictionary before encoding jwt.")
        return jwt.encode(payload, jwtWrapper._SECRET_KEY, algorithm="HS256")

    def decode(self, encoded_jwt):
        return jwt.decode(encoded_jwt, jwtWrapper._SECRET_KEY, algorithm=jwtWrapper._ALGORITHIM)

    def getToken(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
