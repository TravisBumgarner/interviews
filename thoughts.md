#Minimum Solution #0: Queue Up and Drop Off

- Pick up just one at a time.





# Minimum Solution #1: Based on Hypotenuse

- travel based on hypotenuse and only change course if a destination is reached or a new passenger is added. 

- Issues: a straight line of 10 units would have a hypotenuse of 10 units, a triangle of sides 5 and 5 (10 units total travel distance) would have a hypotenuse of ~7. 

- Benefits: Super simple calcuation

  ​

# Optmization #1: Track dropoffs seen by customer

- A customer `c`  sees `d` number of dropoffs, there is a threshold `d_t`  of dropoffs where if `d >= d_t` the customer  is guarenteed next dropoff
- Benefits: Customer never spends infinite amount of time in the car
- Does `d_t` need to be a constant or could it change? How to deal with if there are new customers every single intersection.. perhaps a queue of prioritized dropoffs. 



# More Complex Solution

- Try and drop people off in neighborhoods







#Notes

- Used `_x` and `_y` instead of having to destructure