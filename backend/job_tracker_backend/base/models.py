from django.db import models
from account.models import Account
from pathlib import Path
import uuid

# Create your models here.


class Job(models.Model):
    company_name = models.CharField(max_length=250)
    company_email = models.CharField(max_length=250, default='', blank=True)
    company_address = models.CharField(max_length=250, default='', blank=True)
    company_position = models.CharField(
        max_length=250, default='', blank=False)
    applied = models.BooleanField(default=False)
    pending = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    resume = models.CharField(
        max_length=500, unique=False, default='')
    cover = models.CharField(
        max_length=500, unique=False, default='')
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name
