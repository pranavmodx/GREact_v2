from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from main import views

router = routers.DefaultRouter()
router.register(r'words', views.MainView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('api/', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]
