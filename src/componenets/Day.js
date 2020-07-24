import React from 'react';
import './Day.css';
import Task from "./Task";


export default function Day(props) {
  console.log(props.tasks)
  let tasksForDay;
  //checking if task list is empty for the driver
  if (props.tasks && Object.keys(props.tasks).length !== 0) {
    tasksForDay = props.tasks.filter((task) => {
      return task.day === props.day
    })

  } else {
    tasksForDay = []
  }
 
  

  
  //const task_start;

  //const task_start= task["start_time"];
  //const task_duration = task["end_time"]-task["start_time"];
  return (
    <>
      

      <div className="container">
        <div className="item">
          {tasksForDay.map(task => (<Task task={task} driver={props.driver} />))}
        </div>
      </div>
    </>
  );
}