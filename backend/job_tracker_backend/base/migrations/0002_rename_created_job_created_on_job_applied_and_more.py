# Generated by Django 4.1.7 on 2023-03-09 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='created',
            new_name='created_on',
        ),
        migrations.AddField(
            model_name='job',
            name='applied',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='job',
            name='company_address',
            field=models.CharField(default=None, max_length=250),
        ),
        migrations.AddField(
            model_name='job',
            name='company_email',
            field=models.CharField(default=None, max_length=250),
        ),
        migrations.AddField(
            model_name='job',
            name='pending',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='job',
            name='rejected',
            field=models.BooleanField(default=False),
        ),
    ]
