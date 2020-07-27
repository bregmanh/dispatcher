import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

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

  const classes = useStyles();
  const [taskType, setTaskType] = React.useState('');
  const [dayChosen, setDay] = React.useState('');


  const handleChangeTask = (event) => {
    setTaskType(event.target.value);
    createTask(event, weekTask, taskType, newTask, tasksDatabase, driver, setNewTask, dayChosen)
  };
  const handleChangeDay = (event) => {
    setDay(event.target.value);
    createTask(event, weekTask, taskType, newTask, tasksDatabase, driver, setNewTask, dayChosen)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const taksKeys = [
    
    "start_time",
    "end_time",
    "description",
    "location",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = () => {

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
              onChange={(e) => setWeekTask(e.target.value)}
              value={weekTask}
              validators={['required']}
            />
            <FormControl required className={classes.formControl}>
              <InputLabel id="type">Task Type</InputLabel>
              <Select
                labelId="type"
                name="type"
                value={taskType}
                onChange={handleChangeTask}
              >
                <MenuItem value={"pickup"} id={"type"}>Pickup</MenuItem>
                <MenuItem value={"dropoff"} id={"type"}>Drop off</MenuItem>
                <MenuItem value={"other"} id={"type"}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel id="day">Day</InputLabel>
              <Select
                labelId="day"
                name="day"
                value={dayChosen}
                onChange={handleChangeDay}
              >
                <MenuItem value={"Sunday"} id={"Sunday"}>Sunday</MenuItem>
                <MenuItem value={"Monday"} id={"Monday"}>Monday</MenuItem>
                <MenuItem value={"Tuesday"} id={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem value={"Wednesday"} id={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem value={"Thursday"} id={"Thursday"}>Thursday</MenuItem>
                <MenuItem value={"Friday"} id={"Friday"}>Friday</MenuItem>
                <MenuItem value={"Saturday"} id={"Saturday"}>Saturday</MenuItem>

              </Select>
            </FormControl>
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
                onChange={(e) => createTask(e, weekTask, taskType, newTask, tasksDatabase, driver, setNewTask)}
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
