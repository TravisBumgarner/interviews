from time import sleep
from collections import deque

class Traxi:
    """
        Traxi:  Travis Taxi, get it.... ha...
    """
    def __init__(self, max_x, max_y):
        self.time = 0
        self.pickup_queue = deque()
        self.current_passenger = {}
        self.next_passenger = {}
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
        self.idle_point_x = max_x / 2
        self.idle_point_y = max_y / 2

        self.destination_x = None
        self.destination_y = None

        self.status = 'Idling'

    def print_current_status(self):
        print('Time:         {}'.format(self.time))
        print('Status:       {}'.format(self.status))
        print('Location:     ({}, {})'.format(self.current_location_x, self.current_location_y))
        print('Destination:  ({}, {})'.format(self.destination_x, self.destination_y))
        print('Current P:    {}'.format(self.current_passenger['name'] if self.current_passenger else ''))
        print('Next P:       {}'.format(self.next_passenger['name'] if self.next_passenger else ''))
        print('Pickup Queue: {}'.format(len(self.pickup_queue)))
        print('\n')

    def increment_time(self):
        self.time += 1
        sleep(0.5)

    def drive(self):
        distance_away_x = self.destination_x - self.current_location_x
        distance_away_y = self.destination_y - self.current_location_y

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

    def set_destination(self, x, y):
        self.destination_x = x
        self.destination_y = y

    def manage(self, new_passenger): # could be better than new_p

        if new_passenger:
            self.pickup_queue.append(new_passenger)

        if self.current_passenger:
            at_end = self.current_location_x == self.current_passenger['end_x'] and \
                             self.current_location_y == self.current_passenger['end_y']

            if at_end:
                print('\nDropping off Passenger {} at ({}, {})\n'.format(
                    self.current_passenger['name'],
                    self.current_passenger['start_x'],
                    self.current_passenger['start_y'])
                )
                self.current_passenger = {}

        elif self.next_passenger:
            at_start = self.current_location_x == self.next_passenger['start_x'] and \
                        self.current_location_y == self.next_passenger['start_y']

            if at_start:
                print('\nPicking up Passenger {} at ({}, {})\n'.format(
                    self.next_passenger['name'],
                    self.next_passenger['start_x'],
                    self.next_passenger['start_y'])
                )
                self.current_passenger = self.next_passenger
                self.next_passenger = {}
                self.set_destination(self.current_passenger['end_x'], self.current_passenger['end_y'])

        elif self.pickup_queue:
            self.next_passenger = self.pickup_queue.popleft()
            self.set_destination(self.next_passenger['start_x'], self.next_passenger['start_y'])

        else:
            self.set_destination(self.idle_point_x, self.idle_point_y)

        self.drive()
        self.print_current_status()
        self.increment_time()

