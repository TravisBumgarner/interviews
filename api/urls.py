from django.conf.urls import url, include
from rest_framework import routers

from .viewsets import *

router = routers.DefaultRouter()

router.register(r'questions', QuestionViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]