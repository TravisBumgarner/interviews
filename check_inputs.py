from config import GRID_SIZE, CONGESTION_FACTOR, SIMULATION_SPEED


def check_inputs():
    if CONGESTION_FACTOR == 0 or CONGESTION_FACTOR > 1 or type(CONGESTION_FACTOR) != float:
        raise ValueError('Invalid CONGESTION_FACTOR value')

    max_x, max_y = GRID_SIZE
    if max_x <= 0 or max_y <= 0 or type(max_x) != int or type(max_y) != int:
        raise ValueError('Invalid GRID_SIZE value')

    if not SIMULATION_SPEED > 0 or type(SIMULATION_SPEED) != float:
        raise ValueError('Invalid SIMULATION_SPEED value')

