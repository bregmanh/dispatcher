import React from "react";
import "./index.css";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

export default function Show(props) {
  const task_start = props.task["start_time"];
  const task_end = props.task["end_time"];

  let styles = {
    gridRowStart: `${task_start + 1}`,
    gridRowEnd: `${task_end + 1}`,
  };
  let textStyle = {
    marginTop: "0",
    marginBottom: "0",
  };

  return (
    <main style={styles} className="task_show">
      <p style={textStyle}>
        <b>{props.task["type"]}</b>
      </p>
      <p style={textStyle}>{props.task["description"]}</p>
      <p style={textStyle}>{props.task["location"]}</p>
      <p style={textStyle}>
        {props.task["start_time"]} - {props.task["end_time"]}
      </p>

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
