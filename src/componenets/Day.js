import React from "react";
import "./Day.css";
import Task from "./Task/Show";
import DayLabels from "./DayLabels";

export default function Day(props) {
  let tasksForDay;
  //checking if task list is empty for the driver
  if (props.tasks && Object.keys(props.tasks).length !== 0) {
    tasksForDay = props.tasks.filter((task) => {
      return task.day === props.day;
    });
  } else {
    tasksForDay = [];
  }
  

  let styles = {
display: "grid",
gridTemplateRows: "repeat(24, 5em)",
marginTop: "2em"
    
  };
  console.log("keys", props);
  return (
    <div style={styles}>
      {tasksForDay.map((task) => (
        <Task
          key={`${task["day"]}_${task["start_time"]}`}
          task={task}
          driver={props.driver}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          tasksDatabase={props.tasksDatabase}
          week={props.week}
          setTasks={props.setTasks}
          setTasksDatabase={props.setTasksDatabase}
        />
      ))}
    </div>
  );
}
