import React from 'react';
import './Day.css';
import Task from "./Task";
export default function Day(props) {
  console.log(props.tasks)
  const tasksForDay = props.tasks.filter((task) => {
    return task.day == props.day
  })
  
  //const task_start;

  //const task_start= task["start_time"];
  //const task_duration = task["end_time"]-task["start_time"];
  return (
    <>
    <div>Add New Button here</div>
    <div>
    {tasksForDay.map(task => (<Task task={task} />))}
    </div>
      </>
    );
}