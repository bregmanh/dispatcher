import React from 'react';
import { useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useApplicationData from "../../hooks/useApplicationData.js";
import InputField from "./InputField";
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

export default function EditForm(props) {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newTask, setNewTask] = React.useState({});
  const {
    driver,
    setDriver,
    tasks,
    setTasks,
    week,
    setWeek,
    driversData,
    tasksData,
    tasksDatabase,
    setTasksDatabase

  } = useApplicationData();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const taksKeys = ["day", "start_time", "end_time", "title", "desciption", "location"]
  // "1": {
  //   "1": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'desciption': 'smth', 'location': 'london' },
  //   { 'day': 'Tuesday', 'start_time': 7, 'end_time': 12, 'title': 'other', 'desciption': 'smth', 'location': 'toronto' },
  //   { 'day': 'Monday', 'start_time': 6, 'end_time': 8, 'title': 'pickup', 'desciption': 'pickup', 'location': 'ottawa' },]
  // },
  // "2":{"1":[{}, {},]},
  // "3":{"1":{}}
  const handleClose = () => {
    setOpen(false);
  };

  const createTask = function (e) {
    let inputId = e.id;
    let inputValue = e.value;

    //check if the task exists
    if (tasksDatabase[driver["id"]][weekTask] && tasksDatabase[driver["id"]][weekTask][inputId]) {
      const newError = { error: inputId, value: inputValue }
      setError(newError)
      console.log("Theres an error");
    } else {
      //WET code below: fix later
      if (inputId === "start_time" || inputId === "end_time") {

        setNewTask({ ...newTask, [inputId]: Number(inputValue) })
      } else {
        setNewTask({ ...newTask, [inputId]: inputValue })
      }
    }

  }
  const writeTaskToDatabase = function () {
    //if week exists in the database
    if (tasksDatabase[driver["id"]][weekTask]) {
      //making a copy of the database
      let temp = { ...tasksDatabase };
      temp[driver["id"]][weekTask].push(newTask);
      setTasksDatabase(temp)
      //if the week doesnt exist in the database
    } else {
      let temp = { ...tasksDatabase }
      temp[driver["id"]][weekTask] = [newTask]
      setTasksDatabase(temp)
      //setTasksDatabase({...tasksDatabase[driver["id"]], [weekTask]: [newTask]})

    }
    handleClose();
    //setTasks(...tasks, newTask)
  }

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit the Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the contents of the task.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="week"
            label="Week"
            type="number"
            maxWidth='md'
            defaultValue={week}
            onChange={(e) => setWeekTask(e.target.value)}
          />
          {taksKeys.map(key => (
            <InputField
              taskaData={tasksData} driver={driver}
              margin='dense'
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type={key === 'start_time' || key === 'end_time' ? 'number' : 'text'}
              defaultValue={props.task[key]}

              createTask={createTask}
            />
          ))}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={writeTaskToDatabase} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}