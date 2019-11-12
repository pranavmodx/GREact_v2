from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WordDataSerializer
from .models import WordData
from django.shortcuts import render


def Home(request):
    context = {
        'words': WordData.objects.all()[:5]
    }
    return render(request, template_name='main/home.html', context=context)


class MainView(viewsets.ModelViewSet):
    serializer_class = WordDataSerializer
    queryset = WordData.objects.all()
    