# Generated by Django 2.2.3 on 2020-08-11 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0004_auto_20200811_0945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(),
        ),
    ]
