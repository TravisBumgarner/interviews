import csv

from django.core.management.base import BaseCommand, CommandError

from api.utils import save_question


class Command(BaseCommand):
    help = 'Loads questions from the specified CSV file into the database.' \
           'Input should be of the format question|answer|distractor1,distractor2'

    def add_arguments(self, parser):
        parser.add_argument(
            '--filename', dest='filename', required=True,
            help='the file to process',
        )

    def handle(self, *args, **options):
        print('Processing, this may take a moment...')
        with open(options['filename'], 'rb') as f:
            reader = csv.reader(f, delimiter='|')
            questions_processed = 0

            for row in reader:
                question, answer, raw_detractors = row
                answer = int(answer)
                detractors = [int(x) for x in raw_detractors.split(',')]

                save_question(question, answer, detractors)

                questions_processed += 1
                if questions_processed % 25 == 0:
                    print('{} questions processed'.format(questions_processed))
