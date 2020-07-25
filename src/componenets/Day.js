import React from "react";
import "./Day.css";
import Task from "./Task/Show";
import DayLabels from "./DayLabels";

export default function Day(props) {
  console.log(props.tasks);
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
    gridColumn: props.index + 1,
  };
  console.log("keys", props);
  return (
    <div style={styles}>
      {tasksForDay.map((task, index) => (
        <Task
          key={index}
          task={task}
          driver={props.driver}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}
