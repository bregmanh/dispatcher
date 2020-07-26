import React from "react";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useApplicationData from "../hooks/useApplicationData.js";
import InputField from "./InputField";
import TextField from "@material-ui/core/TextField";

export default function Form({
  driver,
  tasksData,
  tasksDatabase,
  changeState
}) {
  const {
    writeTaskToDatabase,
    createTask,
  } = require("../helpers/formSubmitters");

  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newTask, setNewTask] = React.useState({});
  // const {
  //   driver,
  //   setDriver,
  //   tasks,
  //   setTasks,
  //   week,
  //   driversData,
  //   tasksData,
  //   tasksDatabase,
  //   changeState
  // } = useApplicationData();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const taksKeys = [
    "day",
    "start_time",
    "end_time",
    "title",
    "desciption",
    "location",
  ];
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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
 >
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add the details about the task you would like to create here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="week"
            label="Week"
            type="number"
            maxWidth="md"
            onChange={(e) => setWeekTask(e.target.value, driver, changeState, handleClose)}
          />
          {taksKeys.map((key, index) => (
            <TextField
              key={index}
              taskaData={tasksData}
              driver={driver}
              margin="dense"
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type={key === "start_time" || key === "end_time" ? "number" : "text"}              
              inputProps={key.charAt(0).toUpperCase}
              onChange={(e)=>createTask(e, weekTask, newTask, tasksDatabase, driver, setNewTask)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>writeTaskToDatabase(tasksDatabase, weekTask, newTask, driver, changeState, handleClose)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
