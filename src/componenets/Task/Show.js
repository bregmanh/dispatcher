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
    // marginTop: `${(task_start)* 8-1}em`,
    // position: "absolute",
    // height: `${task_duration*7+2}em`
    gridRowStart: `${task_start+1}`,
    gridRowEnd: `${task_end+1}`
    



  };
  let textStyle={
marginTop:"0",
marginBottom: "0",
  }

  return (
    <main style={styles} className="task_show">
      <p style={textStyle}><b>{props.task["title"]}</b></p>
      <p style={textStyle}>{props.task["desciption"]}</p>
      <p style={textStyle}>{props.task["start_time"]} - {props.task["end_time"]}</p>
     
      <div className="hidden_buttons">
        <EditForm task={props.task}  driver={props.driver} tasksDatabase={props.tasksDatabase} week={props.week} setTask={props.setTaks} setTasksDatabase={props.setTasksDatabase}/>
         <DeleteForm task={props.task}  driver={props.driver} tasksDatabase={props.tasksDatabase} week={props.week} setTask={props.setTaks} setTasksDatabase={props.setTasksDatabase} />
        
      </div>
    </main >
  );
}
