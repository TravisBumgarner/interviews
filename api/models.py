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

    operation_type = models.CharField(
        max_length=3,
        choices=OPERATION_CHOICES,
        default='unk'
    )
    text = models.CharField(max_length=300, unique=True)
    has_negative_values = models.BooleanField(default=False)
    correct_answer_id = models.IntegerField(unique=True)

    def __unicode__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.IntegerField(unique=False)

    def __unicode__(self):
        return "{} - {}".format(self.id, self.text)