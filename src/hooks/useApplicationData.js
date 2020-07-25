import { useState, useEffect } from "react";

export default function useApplicationData() {
  const driversData = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Greg" },
  ];
  const initialTaskData = {
    //first key is driver id, second key is week id
    "1": {
      "1": [
        {
          day: "Monday",
          start_time: 10,
          end_time: 16,
          title: "dropoff",
          desciption: "smth",
          location: "london",
        },
        {
          day: "Tuesday",
          start_time: 7,
          end_time: 12,
          title: "other",
          desciption: "smth",
          location: "toronto",
        },
        {
          day: "Monday",
          start_time: 6,
          end_time: 8,
          title: "pickup",
          desciption: "pickup",
          location: "ottawa",
        },
      ],
      "2": [
        {
          day: "Monday",
          start_time: 10,
          end_time: 16,
          title: "dropoff",
          desciption: "smth",
          location: "london",
        },
      ],
    },
    "2": {
      "1": [
        {
          day: "Monday",
          start_time: 10,
          end_time: 16,
          title: "dropoff",
          desciption: "smth",
          location: "london",
        },
      ],
    },
    "3": { "1": [] },
  };
  //all tasks
  const [tasksDatabase, setTasksDatabase] = useState(initialTaskData);
  const [tasksDatabase2, setTasksDatabase2] = useState();
console.log("td 2", tasksDatabase2 )
  const [driver, setDriver] = useState(driversData[0]);
  //taks for the week
  const [tasks, setTasks] = useState(initialTaskData["1"]["1"]);
  //week number
  const [week, setWeek] = useState(1);

  function weekForward() {
    if (week !== 52) {
      setWeek(week + 1);
    }
  }
  function weekBack() {
    if (week !== 1) {
      setWeek(week - 1);
    }
  }
  function changeState(temp){
    setTasksDatabase(temp);
    setTasksDatabase2("chicken");

    console.log("temp!", temp)

    console.log("function called!!")

  }

  useEffect(() => {
    console.log("taksData", tasksDatabase);
    setTasks(tasksDatabase[driver["id"]][week]);
    // console.log("taksData", tasksDatabase);
    // console.log("tasks", tasks);
  }, [tasks, tasksDatabase, driver, week]);

  return {
    driver,
    setDriver,
    tasks,
    setTasks,
    week,
    driversData,
    tasksDatabase,
    weekForward,
    weekBack,
    changeState
  };
}
