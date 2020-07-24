import React from "react";
import './Show.css';
import Task from ".";

export default function Show(props) {
  const task_start = props.task["start_time"]
  const task_end = props.task["end_time"]
  const task_duration = task_end-task_start

  var styles1 = {
    marginTop: `${task_start}`,
  
  };

  return (
    
    
      <main style={styles1}>
        <h5>Title: {props.task["title"]}</h5>
        <h6>Description: {props.task["desciption"]}</h6>
        <h6>Start Time: {props.task["start_time"]}</h6>
        <h6>End Time: {props.task["end_time"]}</h6>
      </main>
      
  );
    
}
