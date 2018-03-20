from django.conf.urls import url, include
from rest_framework import routers

from .viewsets import SymptomViewSet

router = routers.DefaultRouter()

router.register(r'symptoms', SymptomViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]