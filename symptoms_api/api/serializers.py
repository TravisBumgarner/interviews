from rest_framework import serializers

from .models import DiagnosisToSymptom, Diagnosis, Symptom


class DiagnosisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diagnosis
        fields = (
            'id',
            'name',
        )


class DiagnosisToSymptomSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiagnosisToSymptom
        fields = (
            'id',
            'times_encountered'
        )


class SymptomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Symptom
        fields = (
            'id',
            'name',
        )
