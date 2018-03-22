from random import random, randint, choice


class Passengers:
    """
        congestion_factor:  0 < range <= 1 where 0 is no requests and 1 is a request at every intersection
        generate(): Returns either a new passenger or None, dependent on congestion_factor
    """
    def __init__(self, congestion_factor, grid_size):
        if congestion_factor == 0 or congestion_factor > 1 or type(congestion_factor) != float:
            raise ValueError('Invalid congestion_factor value')

        max_x, max_y = grid_size
        if max_x <= 0 or max_y <= 0 or type(max_x) != int or type(max_y) != int:
            raise ValueError('Invalid grid_size value')

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
            start = (randint(self.min_x, self.max_x), randint(self.min_x, self.max_x))
            end = (randint(self.min_y, self.max_y), randint(self.min_y, self.max_y))

            return {
                'name': choice(self.names),
                'start': start,
                'end': end
            }
