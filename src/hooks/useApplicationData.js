import { useState, useEffect } from "react";


export default function useApplicationData() {
  let driversData = [{ "id": "1", "name": 'Alice' }, { "id": "2", "name": 'Bob' }, { "id": "3", "name": 'Greg' }];
  let initialTaskData = {
    //first key is driver id, second key is week id
    "1": {
      "1": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'desciption': 'smth', 'location': 'london' },
      { 'day': 'Tuesday', 'start_time': 7, 'end_time': 12, 'title': 'other', 'desciption': 'smth', 'location': 'toronto' },
      { 'day': 'Monday', 'start_time': 6, 'end_time': 8, 'title': 'pickup', 'desciption': 'pickup', 'location': 'ottawa' },],
     "2": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'desciption': 'smth', 'location': 'london' },],
    },
     "2": { "1": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'desciption': 'smth', 'location': 'london' },], },
    "3": { "1": [] }
  }
  const [tasksDatabase, setTasksDatabase] = useState(initialTaskData);

  const [driver, setDriver] = useState(driversData[0]);
  const [tasks, setTasks] = useState(initialTaskData["1"]["1"]);
  const [week, setWeek] = useState(1);
 
  
  function weekForward() {
    if (week !== 52) {
      setWeek(week + 1)
    }
  }
  function weekBack() {
    if (week !== 1) {
      setWeek(week - 1)
    }
  }


 
  

  useEffect(() => {
   
    
    setTasks(tasksDatabase[driver["id"]][week])
    console.log("taksData", tasksDatabase);
    console.log("taks", tasks);

  }, [tasks, tasksDatabase, driver, week]);

  return { driver, setDriver, tasks, setTasks, week, setWeek, driversData, tasksDatabase, setTasksDatabase, weekForward, weekBack };
}
