from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import SymptomSerializer
from .models import Symptom, Diagnosis, DiagnosisToSymptom


class SymptomViewSet(ModelViewSet):
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer
    pagination_class = None
