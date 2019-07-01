from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WordDataSerializer
from .models import WordData

# Create your views here.
# def home(request):
#     context = {
#         'words' : WordData.objects.all()
#     }
#     return render(request, 'main/home.html', context)

class MainView(viewsets.ModelViewSet):
    serializer_class = WordDataSerializer
    queryset = WordData.objects.all()
    