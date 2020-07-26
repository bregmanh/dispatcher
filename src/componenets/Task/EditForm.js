import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";


export default function EditForm(props) {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(props.week);
  const [newTask, setNewTask] = React.useState({});
  const [taskType, setTaskType] = React.useState();
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();
  
  const {
    createTask,
    editTask,
  } = require("../../helpers/formSubmitters");
  let taskEditIndex = props.tasksDatabase[props.driver["id"]][props.week].findIndex(
    (e) => JSON.stringify(e) === JSON.stringify(props.task)
  );

  console.log("edit index", taskEditIndex)
  const taksKeys = [
    "day",
    "start_time",
    "end_time",
    "description",
    "location",
  ];
  const handleClickOpen = (e) => {
    setOpen(true);

    setNewTask(props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex])
    setTaskType(props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex]["type"])

  };
  const handleClose = () => {
    setOpen(false);

  };
  const handleChange = (event) => {
    setTaskType(event.target.value);
    createTask(event, weekTask, taskType, newTask, props.tasksDatabase, props.driver, setNewTask)
  };
 

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      > <ValidatorForm
      onSubmit={() => editTask(props.tasksDatabase, weekTask, newTask, props.driver, props.changeState, handleClose, taskEditIndex)}
    >
        <DialogTitle id="form-dialog-title">Edit the Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the contents of the task.
          </DialogContentText>

          <TextValidator
          required
            autoFocus
            margin="dense"
            id="week"
            label="Week"
            type="number"
            InputLabelProps={{ shrink: true }}
            defaultValue={props.week}
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
              onChange={handleChange}
            >
              <MenuItem value={"pickup"} id={"type"}>Pickup</MenuItem>
              <MenuItem value={"dropoff"} id={"type"}>Drop off</MenuItem>
              <MenuItem value={"other"} id={"type"}>Other</MenuItem>
            </Select>
          </FormControl>
          {taksKeys.map((key, index) => (
             <TextValidator
             required
              key={index}
              taskaData={props.tasksData}
              driver={props.driver}
              margin="dense"
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type={
                key === "start_time" || key === "end_time" ? "number" : "text"
              }
              value={newTask[key]}
              defaultValue={props.task[key]}
              onChange={(e) => createTask(e, weekTask, taskType, newTask, props.tasksDatabase, props.driver, setNewTask)}
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
