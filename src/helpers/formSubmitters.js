const _ = require("lodash");

export function createTask(e, weekTask, taskType, newTask, tasksDatabase, driver, setNewTask, dayChosen) {
  console.log("target", e.target)
  let inputId;
  if (e.target.id) {
    inputId = e.target.id;
  } else {
    inputId = e.target.name
  }

  let inputValue = e.target.value;
  //WET code below: fix later
  if (inputId === "start_time" || inputId === "end_time") {
    setNewTask({ ...newTask, [inputId]: Number(inputValue) });
  } else {
    setNewTask({ ...newTask, [inputId]: inputValue });
  }

};

export function saveNewTask(tasksDatabase, weekTask, newTask, driver, changeState, handleClose) {
  handleClose();
  //check for conflicts, returns: [boolean, conflicting task, conflicting index]
  const results = checkConflicts(tasksDatabase, weekTask, newTask, driver)
  console.log("results", results)

  writeTaskToDatabase(tasksDatabase, weekTask, newTask, driver, changeState, results)

};

export function editTask(tasksDatabase, weekTask, newTask, driver, changeState, handleClose, taskEditIndex, originalWeek) {
  handleClose();
  //check for conflicts, returns: [boolean, conflicting task, conflicting index]
  const results = checkConflicts(tasksDatabase, weekTask, newTask, driver)

  const conflict = results[0]
  const conflictTask = results[1]
  const conflictIndex = results[2]
  //if no conflict (or if conflict is the same task), write new to database and delete original
  if (!conflict) {

    //deleting task from database
    let updatedTasksDatabase = _.cloneDeep(tasksDatabase)
    updatedTasksDatabase[driver["id"]][originalWeek].splice(taskEditIndex, 1);
    writeTaskToDatabase(updatedTasksDatabase, weekTask, newTask, driver, changeState, results)
    // overrideTask(tasksDatabase, taskEditIndex, driver, weekTask, changeState, newTask, originalWeek)
  } else if (conflictIndex === taskEditIndex) {
    let sameTask=true;
    overrideTaskOnEdit(tasksDatabase, conflictIndex, taskEditIndex, driver, weekTask, changeState, newTask, originalWeek, sameTask)
    sameTask=false;
  } else {
    //if conflict, override original
    if (window.confirm(`There is a conflict. Would you like to override the task with the title: ${conflictTask.type} and description: ${conflictTask.description}?`)) {
      //delete conflicting task. passing tasksdatabse, conflicting task, conflictingindex

      overrideTaskOnEdit(tasksDatabase, conflictIndex, taskEditIndex, driver, weekTask, changeState, newTask, originalWeek)
    }
  }

};

export function writeTaskToDatabase(tasksDatabase, weekTask, newTask, driver, changeState, results) {
  const conflict = results[0]
  const conflictTask = results[1]
  const conflictIndex = results[2]
  //if there is a conflicting task, asking the user if to delete the conflict
  if (conflict) {
    if (window.confirm(`There is a conflict. Would you like to override the task with the title: ${conflictTask.title} and description: ${conflictTask.description}?`)) {
      //delete conflicting task. passing tasksdatabse, conflicting task, conflictingindex
      overrideTask(tasksDatabase, conflictIndex, driver, weekTask, changeState, newTask)
    }
  } else {
    //if week exists
    if (tasksDatabase[driver["id"]][weekTask]) {
      //making a copy of the database
      let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
      updatedTasksDatabase[driver["id"]][weekTask].push(newTask);
      changeState(updatedTasksDatabase)
    } else {
      //if week doesnt exist
      let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
      //check the last existing week
      const weeks = Object.keys(updatedTasksDatabase)
      const lastWeek = weeks[weeks.length - 1]
      console.log("last week", lastWeek)
      for (let i = Number(lastWeek); i < Number(weekTask); i++) {
        updatedTasksDatabase[driver["id"]][i.toString()] = [];
        console.log("new week task here", weekTask)
        console.log("week i", i)

      }
      updatedTasksDatabase[driver["id"]][weekTask] = [newTask];
      changeState(updatedTasksDatabase)
    }
  }

};
export function checkConflicts(tasksDatabase, weekTask, newTask, driver) {
  //findTask(tasksDatabase, driver, weekTask)
  //first checking if week exists
  if (tasksDatabase[driver["id"]][weekTask]) {
    let conflictIndex = tasksDatabase[driver["id"]][weekTask].findIndex(function (task) {
      return (task.day === newTask.day && ((task.start_time < newTask.end_time && task.start_time >= newTask.start_time) || (task.end_time > newTask.start_time && task.end_time <= newTask.end_time)))
    })

    if (conflictIndex >= 0) {
      return [true, tasksDatabase[driver["id"]][weekTask][conflictIndex], conflictIndex];
    }
  }

  return false;

}

export function deleteTask(tasksDatabase, conflictIndex, driver, weekTask, changeState) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase)
  updatedTasksDatabase[driver["id"]][weekTask].splice(conflictIndex, 1);

  changeState(updatedTasksDatabase)
}

export function overrideTask(tasksDatabase, conflictIndex, driver, weekTask, changeState, newTask) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase)
  updatedTasksDatabase[driver["id"]][weekTask][conflictIndex] = newTask;

  changeState(updatedTasksDatabase)
}

function overrideTaskOnEdit(tasksDatabase, conflictIndex, taskEditIndex, driver, weekTask, changeState, newTask, originalWeek, sameTask) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase)
  if(sameTask){
    updatedTasksDatabase[driver["id"]][originalWeek].splice(taskEditIndex, 1, newTask);
  }else{
    updatedTasksDatabase[driver["id"]][originalWeek].splice(taskEditIndex, 1);
    updatedTasksDatabase[driver["id"]][weekTask][conflictIndex] = newTask;
  }
  console.log("task edit index here", taskEditIndex)
  changeState(updatedTasksDatabase)


}


