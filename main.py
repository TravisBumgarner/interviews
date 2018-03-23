from passengers import Passengers
from traxi import Traxi
from check_inputs import check_inputs


if __name__ == "__main__":
    check_inputs()

    p = Passengers()
    t = Traxi()
    while True:
        new_passenger = p.generate()
        t.manage(new_passenger)
