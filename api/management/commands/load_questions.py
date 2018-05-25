import csv

from django.core.management.base import BaseCommand, CommandError

from api.utils import save_question


class Command(BaseCommand):
    help = 'Loads questions from the specified CSV file into the database.' \
           'Input should be of the format question|answer|distractor1,distractor2'

    def handle(self, *args, **options):
        print('running!l')

    def add_arguments(self, parser):
        parser.add_argument(
            '--filename', dest='filename', required=True,
            help='the file to process',
        )

    def handle(self, *args, **options):
        with open(options['filename'], 'rb') as f:
            reader = csv.reader(f, delimiter='|')
            for row in reader:
                question, answer, raw_detractors = row
                answer = int(answer)
                detractors = [int(x) for x in raw_detractors.split(',')]

                save_question(question, answer, detractors)



