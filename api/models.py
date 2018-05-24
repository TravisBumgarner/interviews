# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from api.constants import ADDITION, MULTIPLICATION, SUBTRACTION, DIVISION, UNKNOWN


class Answer(models.Model):
    is_correct_answer = models.BooleanField(default=False)
    text = models.IntegerField(unique=False)

    def __unicode__(self):
        return "{} - {}".format(self.id, self.text)


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
    answers = models.ManyToManyField(Answer, related_name="answers")
    has_negative_values = models.BooleanField(default=False)

    def __unicode__(self):
        return self.text
