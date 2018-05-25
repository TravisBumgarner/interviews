import re

from api.constants import ADDITION, MULTIPLICATION, SUBTRACTION, DIVISION, UNKNOWN
from api.models import Question, Answer

def get_math_operation(question):
    # Assumes questons are of the format: What is 1754 - 3936?
    # Ideally this would be stored within the csv to allow for varied questions

    raw_operator = re.search('\s[\+\-\*\/]\s', question).group(0).strip()
    str_operator = UNKNOWN

    if raw_operator == '+':
        str_operator = ADDITION
    elif raw_operator == '-':
        str_operator = SUBTRACTION
    elif raw_operator == '*':
        str_operator = MULTIPLICATION
    elif raw_operator == '/':
        str_operator = DIVISION

    return str_operator


def check_for_negative_values(*values):
    has_a_negative = False
    for v in values:
        if v < 0:
            has_a_negative = True
    return has_a_negative


def save_question(question, answer, detractors):
    operator = get_math_operation(question)
    has_negative_values = check_for_negative_values(answer, *detractors)

    q = Question(text=question, operation_type=operator, has_negative_values=has_negative_values)
    q.save()

    all_answers = []
    a = Answer(text=answer, is_correct_answer=True)
    a.save()
    all_answers.append(a)

    for d in detractors:
        a = Answer(text=d, is_correct_answer=False)
        a.save()
        all_answers.append(a)

    q.answers.add(*all_answers)
