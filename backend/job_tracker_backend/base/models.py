from django.db import models

# Create your models here.


class Job(models.Model):
    company_name = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
