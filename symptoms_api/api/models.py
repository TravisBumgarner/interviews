# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Diagnosis(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Diagnoses'


class Symptom(models.Model):
    name = models.CharField(max_length=200, unique=True)
    diagnosis = models.ManyToManyField(Diagnosis, through='DiagnosisToSymptom')

    def __unicode__(self):
        return self.name


class DiagnosisToSymptom(models.Model):
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE, related_name='diagnosis_id')
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='symptom_id')
    times_encountered = models.IntegerField(default=1)

    def __unicode__(self):
        return '{} - {}'.format(self.symptom.name, self.diagnosis.name)
