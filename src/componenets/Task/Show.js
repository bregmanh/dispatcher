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
    //marginTop:"3em",
    marginTop: `${(task_start)* 8-1}em`,
    position: "absolute",
    height: `${task_duration*7+2}em`
    



  };

  return (
    <main style={styles} className="task_show">
      <h5>{props.task["title"]}</h5>
      <p>{props.task["desciption"]}</p>
      <p>Start: {props.task["start_time"]}</p>
      <p>End: {props.task["end_time"]}</p>
      <div className="hidden_buttons">
        <EditForm task={props.task} />
        <DeleteForm task={props.task} />
      </div>
    </main >
  );
}
