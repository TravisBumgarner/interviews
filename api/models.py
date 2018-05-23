# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from api.constants import ADDITION, MULTIPLICATION, SUBTRACTION, DIVISION, UNKNOWN

class Question(models.Model):
    OPERATION_CHOICES = (
        (ADDITION, 'Addition'),
        (SUBTRACTION, 'Subtraction'),
        (MULTIPLICATION, 'Multiplication'),
        (DIVISION, 'Division'),
        (UNKNOWN, 'Unknown'),
    )

    text = models.CharField(max_length=300, unique=True)
    has_negative_values = models.BooleanField(default=False)
    opperation_type = models.CharField(
        max_length=3,
        choices=OPERATION_CHOICES,
        default='unk'
    )

    def __unicode__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.IntegerField(unique=False)
    is_correct = models.BooleanField()

    def __unicode__(self):
        return "{} - {}".format(self.text, self.is_correct)