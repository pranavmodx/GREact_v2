from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WordDataSerializer
from .models import WordData


class MainView(viewsets.ModelViewSet):
    serializer_class = WordDataSerializer
    queryset = WordData.objects.all()
    