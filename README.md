# Read Me

## Summary
The Daily Planner is a ToDo SPA that's different than other ToDo apps in that it's oriented around 'BrainJuice'. BrainJuice is the mental/psychological effort that a task requires of you. By grouping tasks by BrainJuice, you are more effective and waste less time/energy transitioning in/out of tasks.  
  
This is an ongoing learning project. Steps to learn different skills are:  
1. Sinatra app with CSS and JS/Ajax [On Heroku](https://visual-daily-planner.herokuapp.com/todos)   
2. Rails API backend [On Github](https://github.com/ShawnTe/daily-planner-rails-api)    
3. React frontend **(current status)**  
4. SVG calendar  
5. Mobile version  

### MVP
- User can view one day - Today
- User can drag and drop containers on day times
- User can resize containers
- User sees tasks divided into high, med low priority/brain juice
- User can add new task + priority
- User sees new task show up immediately
- User can edit task
- User can mark task complete
- Site is deployed on Heroku
- WOOOTTTTT!!!

### v.next features
- User sees prepopulated time containers
- Time containers connected to Google Cal api
- Containers sized by BJ session duration
- User can drag and drop tasks to a specific BJ session

### Good things
- New Todo submit button flashed on .done function
- SPA
- Learning the Ajax!
- Flexbox
- Using partials
- jQueryUI for draggable and resizeable boxes

### User Process
This is the user's process that I'm basing my design decisions on. Based on [Natural Professional](http://www.naturalprofessional.com/) methodology.  
1. Enter Todos (Braindump!) (Pool of Possibilities)  
2. Clean up Todos (doing anything here??)  
3. Plan day  
  - Set Brainjuice session lengths  
  - Assign Todos to Container by Brainjuice  
    - receive error if too many  
    - unassign as needed  
4. Get to work!  
  - View only Todos in current Brainjuice session  
  - Edit Todos if nec  
  - Mark Todos complete  
5. End of session wrap up  
  - Decide if undone todos carry over or return to Pool of Possibilities  
