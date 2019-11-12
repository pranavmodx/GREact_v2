# Generated by Django 2.2.3 on 2019-11-12 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WordData',
            fields=[
                ('topic', models.CharField(max_length=100)),
                ('word', models.CharField(max_length=100)),
                ('meaning', models.CharField(max_length=250)),
                ('sentence', models.CharField(max_length=250)),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
    ]
