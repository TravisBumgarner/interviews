from time import sleep


class Traxi:
    """
        Traxi:  Travis Taxi, get it.... ha
    """
    def __init__(self, max_x, max_y):
        self.time = 0
        self.occupants = []
        self.max_x = max_x
        self.max_y = max_y
        self.min_x = 0
        self.min_y = 0
        # In python2.7 this will round to an integer
        self.current_location_x = max_x / 2
        self.current_location_y = max_y / 2

        # Comment: A better way to do this would be to calculate the optimal waiting point based on requests. There
        # could be a method that every 50 or so rides recalculates the optimal waiting point. For purely random numbers
        # this would be the center of the grid though
        self.grid_waiting_point_x = max_x / 2
        self.grid_waiting_point_y = max_y / 2

    def current_status(self):
        print('Time:     {}'.format(self.time))
        print('Location: ({}, {})'.format(self.current_location_x, self.current_location_y))
        print('Occupants: {}'.format(', '.join([o['name'] for o in self.occupants] if len(self.occupants) else '')))

    def increment_time(self):
        self.time += 1
        sleep(0.5)
