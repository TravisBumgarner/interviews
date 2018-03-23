from random import randint

from passengers import Passengers
from traxi import Traxi

from config import grid_size, congestion_factor


if __name__ == "__main__":
    if congestion_factor == 0 or congestion_factor > 1 or type(congestion_factor) != float:
        raise ValueError('Invalid congestion_factor value')

    max_x, max_y = grid_size
    if max_x <= 0 or max_y <= 0 or type(max_x) != int or type(max_y) != int:
        raise ValueError('Invalid grid_size value')

    p = Passengers(congestion_factor, max_x, max_y)
    t = Traxi(max_x, max_y)

    new_passenger = p.generate()
    while True:
        t.manage(new_passenger)
        new_passenger = None




