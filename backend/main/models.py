from django.db import models


class WordData(models.Model):
    topic = models.CharField(max_length=100)
    word = models.CharField(max_length=100)
    meaning = models.CharField(max_length=250)
    sentence = models.CharField(max_length=250)
    id = models.IntegerField(primary_key=True)

    def __str__(self):
        return f'{self.word}'


