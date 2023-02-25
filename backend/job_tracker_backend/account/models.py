from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class AccountManager(BaseUserManager):
    """Class that is responsible for creating user objects.

    Args:
        BaseUserManager (class): Stock Django object manager class.
    """

    def create_user(self, email, password):
        """Creates a user within database table. 

        Args:
            email (str): Email string.
            password (str): Password string.

        Raises:
            ValueError: Raised when no email is present
        """
        if not email:
            raise ValueError("Must contain email address")

        if not password:
            raise ValueError("Must contain a password")

        # (normalize=lowercase domain name)
        user = self.model(
            email=self.normalize_email(email),
        )

        # Set password for user
        user.set_password(password)

        # Save in database
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates a user that can access the admin page.

        Args:
            email (string): Email string.
            password (string): Password string.

        Returns:
            user object: User object containing methods and attributes for that user. 
        """
        user = self.create_user(
            email=self.normalize_email(email), password=password)

        user.is_active = True
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class Account(AbstractBaseUser):
    """
    A custom user model for maximum customization.

    Args:
        AbstractBaseUser (class): Stock Django abstract class.
    """

    email = models.EmailField(verbose_name='email',
                              max_length=100, unique=True)

    # Required Fields
    date_joined = models.DateTimeField(
        verbose_name='created_on', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last_login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AccountManager()

    def __str__(self):
        return str(self.email)

    # Required

    # Has perms if admin

    def has_perm(self, perm, obj=None):
        """Returns bool whether user has access to a specific permission or not. 

        Args:
            perm (obj)

            obj (obj, optional)

        Returns:
            bool: Admin status of user.
        """
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
