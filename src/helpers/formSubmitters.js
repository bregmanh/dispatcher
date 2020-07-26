const _ = require("lodash");

export function createTask(e, weekTask, newTask, tasksDatabase, driver, setNewTask) {
  console.log(e.target.id, e.target.value)
  let inputId = e.target.id;
  let inputValue = e.target.value;

  //check if the task exists
  if (
    tasksDatabase[driver["id"]][weekTask] &&
    tasksDatabase[driver["id"]][weekTask][inputId]
  ) {
    // const newError = { error: inputId, value: inputValue };
    // setError(newError);
    // console.log("Theres an error");
  } else {
    //WET code below: fix later
    if (inputId === "start_time" || inputId === "end_time") {
      setNewTask({ ...newTask, [inputId]: Number(inputValue) });
    } else {
      setNewTask({ ...newTask, [inputId]: inputValue });
    }
  }
};

export function writeTaskToDatabase(tasksDatabase, weekTask, newTask, driver, changeState, handleClose) {
  handleClose();
  //check for conflicts, returns: [boolean, conflicting task, conflicting index]
  const results = checkConflicts(tasksDatabase, weekTask, newTask, driver)
const [conflict, conflictTask, conflictIndex]=[...results]
  //if there is a conflicting task, asking the user if to delete the conflict
  if (conflict) {
    if (window.confirm(`There is a conflict. Would you like to override the task with the title: ${conflictTask.title} and description: ${conflictTask.desciption}?`)) {
      //delete conflicting task. passing tasksdatabse, conflicting task, conflictingindex
      deleteTask(tasksDatabase, conflictIndex, driver, weekTask, changeState)

        //saveTask(newTask)
    

    }
  } else {
    if (tasksDatabase[driver["id"]][weekTask]) {
      //making a copy of the database
      let updatedTasksDatabase = _.cloneDeep(tasksDatabase);
      updatedTasksDatabase[driver["id"]][weekTask].push(newTask);
      changeState(updatedTasksDatabase)
    }

  }

  //if week exists in the database

  //   //if the week doesnt exist in the database
  // } else {
  //   // let temp = { ...tasksDatabase };
  //   // temp[driver["id"]][weekTask] = [newTask];

  //   // setTasksDatabase(temp);

  //   //setTasksDatabase({...tasksDatabase[driver["id"]], [weekTask]: [newTask]})
  // }

  // const newTask = {
  //   day: "Monday",
  //   start_time: 12,
  //   end_time: 16,
  //   title: "dropaaaaaoff",
  //   desciption: "aaaaaaa",
  //   location: "londaaaaaon",
  // }
  // let temp = _.cloneDeep(tasksDatabase);
  // temp["1"]["1"].push(newTask)
  // changeState(prev => ({...prev, lol:"YAS", yas:"LOL"}))



  //setTasks(...tasks, newTask)
};

function checkConflicts(tasksDatabase, weekTask, newTask, driver) {
  //findTask(tasksDatabase, driver, weekTask)
  let conflictIndex = tasksDatabase[driver["id"]][weekTask].findIndex(function (task) {

    return (task.day === newTask.day && ((task.start_time <= newTask.end_time && task.start_time <= newTask.start_time) || (task.end_time >= newTask.start_time && task.end_time <= newTask.end_time)))
  })

  if (conflictIndex >= 0) {
    return [true, tasksDatabase[driver["id"]][weekTask][conflictIndex], conflictIndex];
  }
  return false;

}
// function findTask(tasksDatabase, driver, week, taskToFind){
//   return tasksDatabase[driver["id"]][week].findIndex(
//     (taskToFind) => JSON.stringify(taskToFind) === JSON.stringify(props.task)
//   );
// }
function deleteTask(tasksDatabase, conflictIndex, driver, weekTask, changeState){
  let updatedTasksDatabase = _.cloneDeep(tasksDatabase)
  updatedTasksDatabase[driver["id"]][weekTask].splice(conflictIndex, 1);
  console.log("after delete", updatedTasksDatabase)

  changeState(updatedTasksDatabase)
}

function saveTask(){
console.log("saving!")
}