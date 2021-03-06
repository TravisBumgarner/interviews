from time import sleep
from collections import deque

from config import SIMULATION_SPEED, GRID_SIZE


class Traxi:

    """
        Traxi:  Travis Taxi, get it.... ha...
    """

    def __init__(self):
        self.time = 0
        self.pickup_queue = deque()
        self.current_passenger = {}
        self.next_passenger = {}

        self.max_x, self.max_y = GRID_SIZE
        self.min_x = 0
        self.min_y = 0

        self.current_location_x = self.max_x / 2
        self.current_location_y = self.max_y / 2

        # Comment: A better way to do this would be to calculate the optimal idle point based on requests. There
        # could be a method that every 50 or so rides recalculates the optimal idle point. For purely random numbers
        # this would be the center of the grid though
        self.idle_point_x = self.max_x / 2
        self.idle_point_y = self.max_y / 2

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
        print('Pickup Queue: {}'.format(', '.join([p['name'] for p in self.pickup_queue])))
        print('\n')

    def increment_time(self):
        self.time += 1
        sleep(SIMULATION_SPEED)

    def drive(self):

        """
            Calculates the direction to travel for the next unit of time
        """

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

    def manage(self, new_passenger):

        """
            Runs per unit of time. It checks (Assuming there is only a current passenger OR a next passenger)
                1. If there is a new passenger, append to queue
                2. If there is a current passenger and if traxi is at the end, drop them off.
                3. Else if there's a next passenger and if traxi is at the start, pick them up, set destination to end.
                4. Else if there's neither but there is a queue, set the next passenger and set the destination to start.
                5. Else head to middle of map and idle until queue is not empty
                6. Increment time and print status
        """

        if new_passenger:
            self.pickup_queue.append(new_passenger)

        if self.current_passenger:
            at_end = self.current_location_x == self.current_passenger['end_x'] and \
                     self.current_location_y == self.current_passenger['end_y']

            if at_end:
                print('Dropping off Passenger {} at ({}, {})\n'.format(
                    self.current_passenger['name'],
                    self.current_passenger['end_x'],
                    self.current_passenger['end_y'])
                )
                self.current_passenger = {}

        elif self.next_passenger:
            at_start = self.current_location_x == self.next_passenger['start_x'] and \
                       self.current_location_y == self.next_passenger['start_y']

            if at_start:
                print('Picking up Passenger {} at ({}, {})\n'.format(
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

