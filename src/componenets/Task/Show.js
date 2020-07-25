import React from "react";
import "./Show.css";
import Task from ".";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

export default function Show(props) {
  const task_start = props.task["start_time"];
  const task_end = props.task["end_time"];
  const task_duration = task_end - task_start;

  let styles = {
    gridRowStart: task_start + 1,
    gridRowEnd: task_start + task_duration,
  };

  return (
    <main style={styles} className="task_show">
      <h5>Title: {props.task["title"]}</h5>
      <p>Description: {props.task["desciption"]}</p>
      <div className="hidden_buttons">
        <EditForm task={props.task} />
        <DeleteForm task={props.task} />
      </div>
    </main>
  );
}
