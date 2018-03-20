# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Symptom(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __unicode__(self):
        return self.name


class Diagnosis(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __unicode__(self):
        return self.name


class DiagnosisToSymptom(models.Model):
    diagnosis_id = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    symptom_id = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    times_encountered = models.IntegerField(default=1)
