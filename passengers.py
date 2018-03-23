from random import random, randint, choice

from config import GRID_SIZE, CONGESTION_FACTOR

class Passengers:
    """
        generate(): Returns either a new passenger or None, dependent on CONGESTION_FACTOR
    """
    def __init__(self):
        self.congestion_factor = CONGESTION_FACTOR
        self.max_x, self.max_y = GRID_SIZE
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
