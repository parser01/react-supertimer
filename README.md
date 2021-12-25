## Requirements

Build the Workout Timer.


There are 4 different types of individual timers as part of the final Workout Timer in total. Stopwatch, Countdown, XY, TABATA. Please, see the image1.png for the detailed description about these timers.


This Workout Timer app allows users to add multiple timers that can run sequentially. For example, the user can choose to configure their workout as follows:

- Countdown:   1:00
- XY:         3 rounds of 20 seconds
- Countdown:   2:00
- TABATA:     4 rounds, 10s work/5s rest

Total time:   1:00 + 1:00 + 2:00 + 1:00 = 5:00 min

The application should have 2 screens:

### Home - Path should be `/`
- list of timers to be run (user should be able to Remove a timer)
- the total time the workout will take
- controls to start/pause workout (Users click Start and the timers are run sequentially one after the other)
- button to "Add" a new timer

### Add Timer - Path should be `/add`
When user clicks "Add" from **Home** screen, they are routed to this page, where they can choose the type of timer and configure its options/props (`timeCap`, `startTime`, `rounds`, `timePerRound` or `workTime`/`restTime`) depending on what timer is selected. After configuring, the user confirms and the timer is added to the list. In the /add page, the user can pick between 4 types of times (stopwatch, countdown, XY and Tabata). After selecting the type, the user is presented with the options to configure the timer. The user can add as many timers as they want. 

## Running the Timer
When the user starts the workout from the Home screen, the app shows the current Timer depending on time. In the example above it would go as follows:

- Display shows Countdown for first 1:00
- Then switches to XY, running 3 rounds of 30s each
- Then shows Countdown for 2:00
- Finally shows TABATA for 4 rounds of 10s/5s

## Things to remember
- compose and abstract functionality so that you don't repeat your code
- clean up your timers and avoid memory leaks and state that could lead to infinite loops

## Deliverables
We should be able to run this project simply with `npm install` and `npm start`.
