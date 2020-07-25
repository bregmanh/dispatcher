import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import useApplicationData from "../../hooks/useApplicationData.js";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteForm(props) {
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
    setTasksDatabase,
  } = useApplicationData();

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

  const deleteTaskFromDatabase = function () {
    //if week exists in the database
    let taskToDelete = tasksDatabase[driver["id"]][week].findIndex(
      (e) => JSON.stringify(e) === JSON.stringify(props.task)
    );
    console.log("taskToDelete", taskToDelete);
    let newTasks = [...tasks];
    newTasks.splice(taskToDelete, 1);
    setTasks(newTasks);
    handleClose();
    //setTasks(...tasks, newTask)
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
