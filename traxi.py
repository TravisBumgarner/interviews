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

        # Comment: A better way to do this would be to calculate the optimal idle point based on requests. There
        # could be a method that every 50 or so rides recalculates the optimal idle point. For purely random numbers
        # this would be the center of the grid though
        self.grid_idle_point_x = max_x / 2
        self.grid_idle_point_y = max_y / 2

        self.status = 'Idling'

    def print_current_status(self):
        print('Time:     {}'.format(self.time))
        print('Status:   {}'.format(self.status))
        print('Location: ({}, {})'.format(self.current_location_x, self.current_location_y))
        print('Occupants: {}'.format(', '.join([o['name'] for o in self.occupants] if len(self.occupants) else '')))
        print('\n')

    def increment_time(self):
        self.time += 1
        sleep(0.5)

    def drive_to_idle_point(self):
        distance_away_x = self.grid_idle_point_x - self.current_location_x
        distance_away_y = self.grid_idle_point_y - self.current_location_y

        should_move = distance_away_x or distance_away_y
        # Decrease the larger of x or y first
        should_move_x = abs(distance_away_x) > abs(distance_away_y)
        if should_move:
            self.status = 'Driving'
            # Reduce x or y distance away by +/- 1
            if should_move_x:
                self.current_location_x += distance_away_x / abs(distance_away_x)
            else:
                self.current_location_y += distance_away_y / abs(distance_away_y)
        else:
            self.status = 'Idling'

    def drive_to_dropoff_point(self):
        pass

    def drive(self):
        if len(self.occupants):
            self.drive_to_dropoff_point()
        else:
            self.drive_to_idle_point()

        self.print_current_status()
        self.increment_time()

