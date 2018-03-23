# Setup
- Requires python2.7
- No external packages

# Notes
- I had time to create the minimum infrastructure needed to queue up passengers, pick them up, and drop them off. I've written next steps to improve algorithm below. 
- I haven't seen a shortest path algorithm before so I decided to see what I could come up with on my own. 
- Used `_x` and `_y` instead of having to destructure
- There are a few bugs in my code throughout the commit history, mainly resulting from flip flopping between JS/Python every day for the past few weeks. (I've been working on a new personal portfolio with React and Django)

# Summary of Code
- `check_inputs.py` - validates `config.py` settings before beginning
- `config.py` - variable definitions are in the file
- `first_names.txt` - List from GitHub with random names. (https://github.com/dominictarr/random-name/blob/master/first-names.txt)
- `main.py` - entry point for project
- `passengers.py` - definition in file
- `traxi.py - 

# Next Steps
- When possible I commented next steps in the actual code instead of here. 

## Priority Queue
- `priority_queue_threshold` would be a constant int in the config file.
- A customer `c` sees `d` number of other customer drop offs. When `priority_queue_threshold >= d` customer is queued in `priority_queue` 
- If `len(priority_queue) > 0` no other pickups would occur. I believe it is more important to keep current customers (in the car) happy than potential customers wanting a ride.

## Calculating Shortest Route 
- A taxi at point `0` is considering two passengers (`1` & `2`) with starts/ends (`s` & `e`) Is there some sort of numerical value from 0 to 1 that could be calculated such that the next best step could be considered?
        - My first thought was to get the hypotenuse of `0 -> 1s` and `0 -> 1e` then compare that to `0 -> 2s` and `0 -> 2e`)
- Priority could be given to passengers with the shortest start -> end distance since that would keep the traxi in the same neighborhood
