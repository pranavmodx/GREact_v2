from django.db import models

# Create your models here.


class WordData(models.Model):
    topic = models.CharField(max_length=30)
    word = models.CharField(max_length=30)
    meaning = models.CharField(max_length=30)
    sentence = models.CharField(max_length=30)
    id = models.IntegerField(primary_key=True)

    def __str__(self):
        return f'{self.word}'


