const _ = require("lodash");

export function createTask(event, newTask, setNewTask) {
  let inputId;
  if (event.target.id) {
    inputId = event.target.id;
  } else {
    inputId = event.target.name;
  }

  let inputValue = event.target.value;
  if (inputId === "start_time" || inputId === "end_time") {
    setNewTask({ ...newTask, [inputId]: Number(inputValue) });
  } else {
    setNewTask({ ...newTask, [inputId]: inputValue });
  }
}

export function saveNewTask(
  tasksDatabase,
  weekTask,
  newTask,
  driver,
  changeState,
  handleClose
) {
  handleClose();
  //check for conflicts, returns: [boolean, conflicting task, conflicting index] (synchornous)
  const results = checkConflicts(tasksDatabase, weekTask, newTask, driver);

  writeTaskToDatabase(
    tasksDatabase,
    weekTask,
    newTask,
    driver,
    changeState,
    results
  );
}

export function editTask(
  tasksDatabase,
  weekTask,
  newTask,
  driver,
  changeState,
  handleClose,
  taskEditIndex,
  originalWeek
) {
  handleClose();
  //check for conflicts, returns: [boolean, conflicting task, conflicting index]
  const results = checkConflicts(tasksDatabase, weekTask, newTask, driver);
  const conflict = results[0];
  const conflictTask = results[1]; //array of conflicting tasks
  const conflictIndex = results[2]; //array of conflicting indecies

  //if no conflict
  if (!conflict) {
    let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
    //deletes original
    updatedTasksDatabase[driver["id"]][originalWeek].splice(taskEditIndex, 1);
    writeTaskToDatabase(
      updatedTasksDatabase,
      weekTask,
      newTask,
      driver,
      changeState,
      results
    );

    //if conflict is only the task itself, treat is as if no conflict
  } else if (
    conflictIndex.length === 1 &&
    conflictIndex[0] === taskEditIndex &&
    Number(originalWeek) === Number(weekTask)
  ) {
    let sameTask = true;
    overrideTaskOnEdit(
      tasksDatabase,
      conflictIndex,
      taskEditIndex,
      driver,
      weekTask,
      changeState,
      newTask,
      originalWeek,
      sameTask
    );
    sameTask = false;

    //if conflict, override original but check first if the conflict includes the same task
  } else {
    //find the index of the task being edited and remove from conflict tasks (if the same week)
    let filteredConflicts;
    if (Number(originalWeek) === Number(weekTask)) {
      const indexIgnore = conflictIndex.findIndex((idx) => {
        return idx === taskEditIndex;
      });
      filteredConflicts = conflictTask.filter((task, index) => {
        return index !== indexIgnore;
      });
    } else {
      filteredConflicts = conflictTask;
    }

    let message =
      "There is a conflict. Are yo sure you would like to override the following tasks:";
    for (let i = 0; i < filteredConflicts.length - 1; i++) {
      message += ` type: ${filteredConflicts[i].type} with description: ${filteredConflicts[i].description} and`;
    }
    message += ` type: ${
      filteredConflicts[filteredConflicts.length - 1].type
    } with description: ${
      filteredConflicts[filteredConflicts.length - 1].description
    }?`;
    if (window.confirm(message)) {
      //delete conflicting task. passing tasksdatabse, conflicting task, conflictingindex
      overrideTaskOnEdit(
        tasksDatabase,
        conflictIndex,
        taskEditIndex,
        driver,
        weekTask,
        changeState,
        newTask,
        originalWeek
      );
    }
  }
}

export function writeTaskToDatabase(
  tasksDatabase,
  weekTask,
  newTask,
  driver,
  changeState,
  results
) {
  const conflict = results[0];
  const conflictTask = results[1];
  const conflictIndex = results[2];
  //if there is a conflicting task, asking the user if to delete the conflict
  if (conflict) {
    let message =
      "There is a conflict. Are yo sure you would like to override the following tasks:";
    for (let i = 0; i < conflictTask.length - 1; i++) {
      message += ` type: ${conflictTask[i].type} with description: ${conflictTask[i].description} and`;
    }
    message += ` type: ${
      conflictTask[conflictTask.length - 1].type
    } with description: ${conflictTask[conflictTask.length - 1].description}?`;
    if (window.confirm(message)) {
      //delete conflicting task. passing tasksdatabse, conflicting task, conflictingindex
      overrideTask(
        tasksDatabase,
        conflictIndex,
        driver,
        weekTask,
        changeState,
        newTask
      );
    }
  } else {
    //if week exists
    if (tasksDatabase[driver["id"]][weekTask]) {
      //making a copy of the database
      let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
      updatedTasksDatabase[driver["id"]][weekTask].push(newTask);
      changeState(updatedTasksDatabase);
    } else {
      //if week doesnt exist
      let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
      //check the last existing week
      const weeks = Object.keys(updatedTasksDatabase);
      const lastWeek = weeks[weeks.length - 1];
      for (let i = Number(lastWeek); i < Number(weekTask); i++) {
        updatedTasksDatabase[driver["id"]][i.toString()] = [];
      }
      updatedTasksDatabase[driver["id"]][weekTask] = [newTask];
      changeState(updatedTasksDatabase);
    }
  }
}

export function checkConflicts(tasksDatabase, weekTask, newTask, driver) {
  //findTask(tasksDatabase, driver, weekTask)
  //first checking if week exists
  let conflictIndex = [];
  if (tasksDatabase[driver["id"]][weekTask]) {
    let conflictTasks = tasksDatabase[driver["id"]][weekTask].filter(function (
      task,
      index
    ) {
      const topConflict =
        task.start_time < newTask.end_time &&
        task.start_time >= newTask.start_time;
      const bottomConflict =
        task.end_time > newTask.start_time && task.end_time <= newTask.end_time;
      const withinConflict =
        task.end_time >= newTask.end_time &&
        task.start_time <= newTask.start_time;
      const isConflict =
        task.day === newTask.day &&
        (topConflict || bottomConflict || withinConflict);
      if (isConflict) {
        conflictIndex.push(index);
      }
      return isConflict;
    });
    if (conflictIndex.length >= 1) {
      return [true, conflictTasks, conflictIndex];
    }
  }
  return false;
}

export function deleteTask(
  tasksDatabase,
  conflictIndex,
  driver,
  weekTask,
  changeState
) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
  updatedTasksDatabase[driver["id"]][weekTask].splice(conflictIndex, 1);
  changeState(updatedTasksDatabase);
}

export function overrideTask(
  tasksDatabase,
  conflictIndex,
  driver,
  weekTask,
  changeState,
  newTask
) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
  //filter all elements to not contain conflicting indecies:
  const filteredTasks = updatedTasksDatabase[driver["id"]][weekTask].filter(
    (task, index) => {
      return !conflictIndex.includes(index);
    }
  );
  filteredTasks.push(newTask);
  //push new task
  updatedTasksDatabase[driver["id"]][weekTask] = filteredTasks;
  changeState(updatedTasksDatabase);
}

export function overrideTaskOnEdit(
  tasksDatabase,
  conflictIndex,
  taskEditIndex,
  driver,
  weekTask,
  changeState,
  newTask,
  originalWeek,
  sameTask
) {
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
  if (sameTask) {
    updatedTasksDatabase[driver["id"]][originalWeek].splice(
      taskEditIndex,
      1,
      newTask
    );
  } else {
    //this is wrong! slicing changes the indecies of the array!!
    if (originalWeek === weekTask) {
      //filtering out conflicts and task we are editing from tasks
      const filteredTasks = updatedTasksDatabase[driver["id"]][weekTask].filter(
        (task, index) => {
          return !conflictIndex.includes(index) && index !== taskEditIndex;
        }
      );
      filteredTasks.push(newTask);
      updatedTasksDatabase[driver["id"]][weekTask] = filteredTasks;
      changeState(updatedTasksDatabase);
      //if we are moving a task to a different week
    } else {
      //we are removing the task from the original week
      updatedTasksDatabase[driver["id"]][originalWeek].splice(taskEditIndex, 1);
      // overrideTask(updatedTasksDatabase, conflictIndex, driver, weekTask, changeState, newTask)
      //
      const filteredTasks = updatedTasksDatabase[driver["id"]][weekTask].filter(
        (task, index) => {
          return !conflictIndex.includes(index);
        }
      );
      filteredTasks.push(newTask);
      //push new task
      updatedTasksDatabase[driver["id"]][weekTask] = filteredTasks;
      changeState(updatedTasksDatabase);
    }
  }
  changeState(updatedTasksDatabase);
}
