import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function Form({
  driver,
  tasksDatabase,
  changeState
}) {
  const {
    
    createTask,
    saveNewTask,
  } = require("../helpers/formSubmitters");

  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(null);
  const [newTask, setNewTask] = React.useState({});


  const handleClickOpen = () => {
    setOpen(true);
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

  const submitForm = ()=>{
    
    saveNewTask(tasksDatabase, weekTask, newTask, driver, changeState, handleClose)
    //resetting the inputs in the form
    setWeekTask(null)
    setNewTask({})
  }
  

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      > <ValidatorForm
        onSubmit={submitForm}
      >
          <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add the details about the task you would like to create here.
          </DialogContentText>

            <TextValidator
              required
              autoFocus
              margin="dense"
              id="week"
              label="Week"
              type="number"
              maxWidth="md"
              onChange={(e) => setWeekTask(e.target.value)}
              value={weekTask}
              validators={['required']}
            />

            {taksKeys.map((key, index) => (

              <TextValidator
                required
                key={index}
                margin="dense"
                id={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={key === "start_time" || key === "end_time" ? "number" : "text"}
                inputProps={key.charAt(0).toUpperCase}
                value={newTask[key]}
                onChange={(e) => createTask(e, weekTask, newTask, tasksDatabase, driver, setNewTask)}
                validators={['required']}

              />
            ))}

          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
