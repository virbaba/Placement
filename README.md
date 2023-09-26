# Placement
 Placement Cell 
 MY APPLICATION BASICALLY PERFORM 5 TASK
 1. Createing student and displaying student.
 2. Creating interview and displaying interview.
 3. Allocating the interview to the student.
 4. Fill student data with interview details into CSV file.
 5. last but not the least job list using linkedIN job api

 Header portion:
 header have initially three link 1 sign up and sign in
 after login header have three link 
 1. user name which help to reach out at placement manager portal 
 2. Jobs for listing the job via api
 3. sign out

 Placement Manager:
 This page contain two contaner
 1. Student Manager
 2. Interview Manager

 1. Student Manger:
 Student manager contain :
 1. Student creating form
 2. Student displaying container which display some student details it's have two button:
 A. delete button for deleting student 
 B. More Details button that display student details and interview details
3. contain download all details button

2. Interview Manager
Interview manager contain :
1. Creating interview form
2. container that display interview details 
it's have two button which is:
A. delete button for delete the interview
B. Allocate the interview

3. Allocate Interview:
This page contain 2 thing:
1. Allocating interview form
2. Container that display student details which is allocate to current interview
this details contain 3 indication:

1. red for fail
2. orange for hold
3. green for pass

in this form we have a option to change the status of interview by default interview set to hold status

** remember that inteview allocation to student on one condition if interview date has not passed

** remember that one inteview can not be allocate to single student multiple student

4. fill the data into csv file
this feature help in two thing:
1. we can download the data of all student
2. we can download the data of single student
remember if we download data for single student then it's goes into downloads folder
other wise goes to downloadAll folder

5. Job api
in this i use linkedIN job api that help to display real jobs and allow to apply in reality


/* use full API */
    "connect-flash": "^0.1.1", -> for notificaion feature
    "connect-mongo": "^5.0.0", -> store cookie into databasse
    "cookie-parser": "^1.4.6", -> generate cookie
    "csv-writer": "^1.6.0", -> write data into CSV file comma seprated file
    "ejs": "^3.1.9", -> view engine
    "express": "^4.18.2", -> server engine
    "express-ejs-layouts": "^2.5.1", -> generate express ejs layout for common front end
    "express-session": "^1.17.3", -> express session generating package
    "linkedin-jobs-api": "^1.0.0", -> job api
    "mongoose": "^7.5.1", -> databases
    "nodemon": "^3.0.1", -> refresh the server
    "noty": "^3.2.0-beta-deprecated", -> notification
    "passport": "^0.6.0", -> passport authentication
    "passport-local": "^1.0.0" -> using local strategy



