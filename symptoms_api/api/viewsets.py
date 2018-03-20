from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import SymptomSerializer, DiagnosisToSymptomSerializer
from .models import Symptom, Diagnosis, DiagnosisToSymptom


class SymptomViewSet(ModelViewSet):
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer
    pagination_class = None

    def retrieve(self, request, *args, **kwargs):
        symptom = Symptom.objects.get(id=kwargs['pk'])
        diagnoes_to_symptoms = DiagnosisToSymptom.objects.filter(symptom=symptom)

        times_encountered_sum = 0
        diagnoses_list = {}
        for d2s in diagnoes_to_symptoms:
            times_encountered_sum += d2s.times_encountered
            diagnoses_list[d2s.id] = {
                'times_encountered': d2s.times_encountered,
                'name': d2s.diagnosis.name,
            }
        return Response({
            'times_encountered_sum': times_encountered_sum,
            'diagnoses_list': diagnoses_list,
        })
