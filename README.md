# DAY VIEW CALENDAR

## About Project
The purpose of this project to render a series of events on a single day calendar in all modern standards-compliant browsers
This project is created using JavaScript, HTML, CSS and Jasmine.

## Implemented the following requirements (As per task)
- Project has the following sections on Home Page:
    - Header
    - Main section to display calendar with timeframe and events
    - Footer section (blank as of now)
- Events are in the form of Array 
  - An event is a JavaScript Object that contains an id, start time and an end time.
  - It has default event set to  
    - [id: 0, start: 30, end: 90}, {id: 1, start: 120, end: 180}, {id: 2, start: 150, end: 270}, {id: 3, start: 180, end: 240}, {id: 4, start: 300, end: 540}] 
- The start and end are minutes since 9am, so 30 is 9:30 am, 120 is 11am, etc. 
- Calendar view show the working hours window of 9am-6pm for one day. 
  - The calendar is laid out vertically
  - No events visually are overlap on the calendar 
  - If two or more events collide then they have equal width
- renderDay function is accessible globally. It takes 1 argument - events - an array of Events 
  - To update event on calendar run below command in the browser console:
    - window.renderDay[{id: 0, start: 30, end: 150}, {id: 1, start: 200, end: 260}, {id: 2, start: 350, end: 400}]
    - This will render 3 events on calendar

## Additional implementations
- Used latest Jasmine Library for testing for following scenarios:  
    - start time is negative Less than 
    - should have maximum width in case of single event 
    - should set event start time to minimum value if outside the given range 
    - should render three colliding events without overlapping 
    - should sort two events according to time 
    - should render event with max time interval 
    - should sort three events where two events have same start or end time 
    - should have equal width in case two events collide 
    - should display random multiple events in correct order 
    - should render events with same & different widths with overlap 
    - should render multiple colliding events 
    - should render multiple events in 2 columns 
    - should not overlap two colliding events 
    - should throw error if events are not in array format 
    - should set event end time to maximum value if outside the given range 
    - should not have any run time error in case event array is empty

## Execution
### Application 
- Open index.html in any browser from root directory

### Test Execution
- To view test execution result open ./test/jasmine-standalone-4.5.0/SpecRunner.html



