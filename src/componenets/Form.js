import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useApplicationData from "../hooks/useApplicationData.js";
import InputField from "./InputField";
import TextField from '@material-ui/core/TextField';

export default function Form() {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(null);
  const [error, setError] = React.useState(null);
  const {
    driver,
    setDriver,
    tasks,
    setTasks,
    week,
    setWeek,
    driversData,
    tasksData
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
    console.log("week", weekTask)
    let inputId = e.id;
    console.log("input id", inputId);
    let inputValue = e.value;
    console.log("input value", inputValue);

    //check if the task exists
    if (tasksData[driver.id][weekTask] && tasksData[driver.id][weekTask][inputId]) {
      const newError = { error: inputId, value: inputValue }
      setError(newError)
      console.log("Theres an error");
    } else {
      //check if the week exists, if yes, write in the value
      if (tasksData[driver.id][weekTask]) {
        tasksData[driver.id][weekTask][inputId] = inputValue;
      } else {
        tasksData[driver.id][weekTask] = weekTask;
        tasksData[driver.id][weekTask].push(inputId : inputValue);
      }
      console.log(tasksData)
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Task
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            maxWidth='md'
            onChange={(e) => setWeekTask(e.target.value)}
          />
          {taksKeys.map(key => (
            <InputField
              taskaData={tasksData} driver={driver}
              margin='dense'
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type={key === 'start_time' || key === 'end_time' ? 'number' : 'text'}
              fullWidth={key === 'description' || key === 'location' ? 'true' : 'false'}
              inputProps={key.charAt(0).toUpperCase}
              createTask={createTask}
            />
          ))}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}