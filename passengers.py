from random import random, randint, choice


class Passengers:
    """
        generate(): Returns either a new passenger or None, dependent on congestion_factor
    """
    def __init__(self, congestion_factor, max_x, max_y):
        self.congestion_factor = congestion_factor
        self.max_x = max_x
        self.max_y = max_y
        self.min_x = 0
        self.min_y = 0

        with open('./first_names.txt', 'r') as f:
            self.names = f.read().split('\n')

    def generate(self):
        r = random()

        if r > self.congestion_factor:
            return None

        else:
            return {
                'name': choice(self.names),
                'start_x': randint(self.min_x, self.max_x),
                'start_y': randint(self.min_y, self.max_y),
                'end_x': randint(self.min_x, self.max_x),
                'end_y': randint(self.min_y, self.max_y),
            }
