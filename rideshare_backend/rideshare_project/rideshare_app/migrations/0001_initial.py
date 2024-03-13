# Generated by Django 5.0.2 on 2024-03-12 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_passenger', models.BooleanField(default=False)),
                ('is_driver', models.BooleanField(default=False)),
            ],
        ),
    ]
