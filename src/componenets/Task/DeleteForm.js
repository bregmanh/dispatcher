import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteForm(props) {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newTask, setNewTask] = React.useState({});
  const {
    deleteTask,
  } = require("../../helpers/formSubmitters");
  

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
  // "1": {
  //   "1": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'description': 'smth', 'location': 'london' },
  //   { 'day': 'Tuesday', 'start_time': 7, 'end_time': 12, 'title': 'other', 'description': 'smth', 'location': 'toronto' },
  //   { 'day': 'Monday', 'start_time': 6, 'end_time': 8, 'title': 'pickup', 'description': 'pickup', 'location': 'ottawa' },]
  // },
  // "2":{"1":[{}, {},]},
  // "3":{"1":{}}
  const handleClose = () => {
    setOpen(false);
  };

  const deleteTaskFromDatabase = function () {
    //if week exists in the database
    let taskToDelete = props.tasksDatabase[props.driver["id"]][props.week].findIndex(
      (e) => JSON.stringify(e) === JSON.stringify(props.task)
    );
    deleteTask(props.tasksDatabase, taskToDelete, props.driver, props.week, props.changeState)
  
    handleClose();
    
  };

  return (
    <div>
      <DeleteIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTaskFromDatabase} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
