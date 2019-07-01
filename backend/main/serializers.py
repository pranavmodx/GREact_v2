from rest_framework import serializers
from .models import WordData


class WordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordData
        fields = ('topic', 'word', 'meaning', 'sentence', 'id')
