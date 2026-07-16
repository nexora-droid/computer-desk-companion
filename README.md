# Computer - A smart dashboard for your desk
Computer is a sort of smart (although considerably dumb) dashboard that I made for Hack Club YSWS [Thingondesk](www.thingondesk.hackclub.com).
The features included in Computer + how to use them are included below!

## Features!
### Weather, temperature and generic info
I call this a bit generic as it is what every dashboard contains, and it was what gave me motivation to finish, actling like the spark of a matchstick for a pile of wood (what in the 5am english is this phrase).
Most of this project runs on JS, so the weather and respective data is basically the website sending a request to an API url, which returns the data about location and latitude + longitude. This is then fed to another APi for the actual weather and temperature and day/night status.

### Battery Level Indicator
Why am  I even calling this a feature, its way too small to be one ngl.
Well it uses JS's builtin function called Navigator, which is only available on certain browsers cause apparently some blocked it for security purposes and arguing that people can use it to trace your EXACT location.. uhhhhhh thats wild.
This feature also has a charging/not charging indicator and a dynamic battery value bar.

### Event Countdown System
The dashboard page has 4 slots for event countdowns to 4 specific events the user can set. These countdowns can be for how many ever years into the future YAYYY! Use it to store important countdowns like events or exams or meetings and so on...
You can delete the countdowns but right only max of 4 due to visual presentation space limitions (overcomplicated way of saying we're out of space).

### Todolist & Quotes
Pretty much self explanatory! Todolist with a sufficient character cap.
Useful checkbox system for progress ykwim.
Delete system for old goals!
Quote system pulls a random quote from an API who's github fork I have on my current account github.

### Calendar System
A full working calendar system for the current month someone's in for them to add events with colours, names and even discriptions.
The calendar system contains all the days of that month the user is in so users can add plently of events!
Press on the date to add events!!!

### Pomodoro timer
Pomodoro is a japanese (i think) concept of studying where you do 25 min study with 5 min break.
After 3 sessions of 25 mins you get a 15 min break which is also added into the website.

### Water and posture reminder
Just reminds you to drink water every 30 mins and sit straight every 20 mins with trackable progress bars or circles.



