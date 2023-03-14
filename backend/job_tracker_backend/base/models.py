from django.db import models
from account.models import Account


# Create your models here.


class Job(models.Model):
    company_name = models.CharField(max_length=250)
    company_email = models.CharField(max_length=250, default=None)
    company_address = models.CharField(max_length=250, default=None)
    applied = models.BooleanField(default=False)
    pending = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name
