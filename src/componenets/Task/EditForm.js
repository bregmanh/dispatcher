import React from "react";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useApplicationData from "../../hooks/useApplicationData.js";
import InputField from "./InputField";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";


export default function EditForm(props) {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(props.week);
  const [newTask, setNewTask] = React.useState(null);
  const {
    writeTaskToDatabase,
    createTask,
  } = require("../../helpers/formSubmitters");

  const handleClickOpen = (e) => {
    setOpen(true);
    let taskEditIndex = props.tasksDatabase[props.driver["id"]][props.week].findIndex(
      (e) => JSON.stringify(e) === JSON.stringify(props.task)
    );
    setNewTask(props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex])
  };
  const taksKeys = [
    "day",
    "start_time",
    "end_time",
    "title",
    "description",
    "location",
  ];

  const handleClose = () => {
    setOpen(false);
    
  };
//   const editTask = (e) => {
    
    
// console.log("task edit", taskEdit)
// let inputId = e.target.id;
// let inputValue = e.target.value;
// console.log("input id", inputId)
// console.log("input value", inputValue)

//     taskEdit[inputId] = inputValue;
//     console.log("new task", taskEdit);
//     //WET code below: fix later
//     if (inputId === "start_time" || inputId === "end_time") {
//       taskEdit[inputId] = Number(inputValue);
//       setNewTask(taskEdit);
//     } else {
//       taskEdit[inputId] = inputValue;
//       setNewTask(taskEdit);

//     }
//   }

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
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
            maxWidth="md"
            defaultValue={props.week}
            onChange={(e) => setWeekTask(e.target.value)}
          />
          {taksKeys.map((key, index) => (
            <TextField
              key={index}
              taskaData={props.tasksData}
              driver={props.driver}
              margin="dense"
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type={
                key === "start_time" || key === "end_time" ? "number" : "text"
              }
              defaultValue={props.task[key]}
              onChange={(e) => createTask(e, weekTask, newTask, props.tasksDatabase, props.driver, setNewTask)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => writeTaskToDatabase(props.tasksDatabase, weekTask, newTask, props.driver, props.changeState, handleClose)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
