## Dispatcher

An app built with React to help dispatchers manage tasks of their drivers.

**To see deployed app [click here](https://truck-dispatcher.herokuapp.com/).**

### How to Use

After downloading, npm install, npm start (and to test, npm test).

#### Choose a Driver

Choose a driver to see their tasks by using the dropdown menu in the top-left corner. The default drivers are: Alice, Bob (short for Fierce Bob), and Greg.

#### View Tasks

To view the tasks scroll down to see the appropriate time slot or press the arrow to switch weeks.

#### To Make a New Task

To make a new task, press on the "New Task" button in the top left corner.

#### To Edit a Task

To edit a task, click on the edit icon (pencil icon) on the desired task.

#### Handling Conflicts

If the task being edited or the new task being created conflicts with an existing task(s), the user is prompted if they would like to overwrite the conflicting task(s). If the user chooses to overwrite, the conflicting task(s) get deleted.

#### To Delete a Task

To delete a task, click the trash icon on the desired task.

#### To Download a CSV

Please choose the desired time interval in the dropdown menu in the top-right corner and the schedule will download. Please note, as an improvement, the CSV generated displays the time frames for the tasks that **exist** and not for the whole year (i.e., if there are only tasks for the first week, generating the 28 time frame will only have one row: 1-28 days).
