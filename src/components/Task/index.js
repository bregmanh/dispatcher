import React from "react";
import "./index.css";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

export default function Task(props) {
  const task_start = props.task["start_time"];
  const task_end = props.task["end_time"];
  let colorStyle;
  //assigning different background colours depending on the type of task
  if (props.task["type"] === "pickup") {
    colorStyle = "#8FBC8F";
} else if (props.task["type"] === "dropoff") {
    colorStyle = "#BC8F8F";
} else {
    colorStyle = "#b0c4de";
}
  const styles = {
    gridRowStart: `${task_start + 1}`,
    gridRowEnd: `${task_end + 1}`,
    backgroundColor: `${colorStyle}`,
  };
  const textStyle = {
    marginTop: "0",
    marginBottom: "0",
  };



  return (
    <main style={styles} className="task_show">
      <p style={textStyle}>
        <b>{`${props.task["type"].charAt(0).toUpperCase() + props.task["type"].slice(1)} (${props.task["start_time"]}:00 - ${props.task["end_time"]}:00)`}</b>
      </p>
      <p style={textStyle}>{props.task["description"]}</p>
      <p style={textStyle}>{props.task["location"]}</p>

      <div className="buttons">
        <EditForm
          task={props.task}
          driver={props.driver}
          tasksDatabase={props.tasksDatabase}
          week={props.week}
          setTask={props.setTaks}
          setTasksDatabase={props.setTasksDatabase}
          changeState={props.changeState}
        />
        <DeleteForm
          task={props.task}
          driver={props.driver}
          tasksDatabase={props.tasksDatabase}
          week={props.week}
          setTask={props.setTaks}
          setTasksDatabase={props.setTasksDatabase}
          changeState={props.changeState}
        />
      </div>
    </main>
  );
}