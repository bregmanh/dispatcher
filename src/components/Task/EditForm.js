import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const { createTask, editTask } = require("../../helpers/formSubmitters");

export default function EditForm(props) {
  const [open, setOpen] = React.useState(false);
  //state to determine which week to write the new task to
  const [weekTask, setWeekTask] = React.useState(props.week);
  //state to build a new task as the input from the form comes
  const [newTask, setNewTask] = React.useState({});
  const [taskType, setTaskType] = React.useState();
  const [dayChosen, setDay] = React.useState("");
  
  //to keep track of the original week of the task being edited
  const originalWeek = props.week;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();

  let taskEditIndex = props.tasksDatabase[props.driver["id"]][
    props.week
  ].findIndex((e) => JSON.stringify(e) === JSON.stringify(props.task));

  const taksKeys = ["description", "location"];

  const handleClickOpen = () => {
    setOpen(true);
    setNewTask(
      props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex]
    );
    setTaskType(
      props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex]["type"]
    );
    setDay(
      props.tasksDatabase[props.driver["id"]][weekTask][taskEditIndex]["day"]
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTask = (event) => {
    setTaskType(event.target.value);
    createTask(event, newTask, setNewTask);
  };

  const handleChangeDay = (event) => {
    setDay(event.target.value);

    createTask(event, newTask, setNewTask);
  };

  const submitForm = () => {
    editTask(
      props.tasksDatabase,
      weekTask,
      newTask,
      props.driver,
      props.changeState,
      handleClose,
      taskEditIndex,
      originalWeek
    );
  };

   //custom validation rule to ensure end time is greater than start time
   ValidatorForm.addValidationRule('greaterThanStart', (value) => {
    if (value <= newTask["start_time"]) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <EditIcon onClick={handleClickOpen} fontSize={"small"} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <ValidatorForm onSubmit={submitForm}>
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
              onChange={(e) => setWeekTask(e.target.value)}
              value={weekTask}
              validators={["required", "minNumber:1", "maxNumber:52"]}
            />
            <FormControl required className={classes.formControl}>
              <InputLabel id="type">Task Type</InputLabel>
              <Select
                labelId="type"
                name="type"
                value={taskType}
                onChange={handleChangeTask}
              >
                <MenuItem value={"pickup"} id={"type"}>
                  Pickup
                </MenuItem>
                <MenuItem value={"dropoff"} id={"type"}>
                  Drop off
                </MenuItem>
                <MenuItem value={"other"} id={"type"}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel id="day">Task Type</InputLabel>
              <Select
                labelId="day"
                name="day"
                value={dayChosen}
                onChange={handleChangeDay}
              >
                <MenuItem value={"Sunday"} id={"Sunday"}>
                  Sunday
                </MenuItem>
                <MenuItem value={"Monday"} id={"Monday"}>
                  Monday
                </MenuItem>
                <MenuItem value={"Tuesday"} id={"Tuesday"}>
                  Tuesday
                </MenuItem>
                <MenuItem value={"Wednesday"} id={"Wednesday"}>
                  Wednesday
                </MenuItem>
                <MenuItem value={"Thursday"} id={"Thursday"}>
                  Thursday
                </MenuItem>
                <MenuItem value={"Friday"} id={"Friday"}>
                  Friday
                </MenuItem>
                <MenuItem value={"Saturday"} id={"Saturday"}>
                  Saturday
                </MenuItem>
              </Select>
            </FormControl>
            <TextValidator
              required
              key="start_time"
              margin="dense"
              id="start_time"
              label="Start Time (0 to 23)"
              type="number"
              value={newTask["start_time"]}
              onChange={(e) => createTask(e, newTask, setNewTask)}
              validators={["required", "minNumber:0", "maxNumber:23"]}
            />
            <TextValidator
              required
              key="end_time"
              margin="dense"
              id="end_time"
              label="End Time (Start to 24)"
              type="number"
              value={newTask["end_time"] || ""}
              onChange={(e) => createTask(e, newTask, setNewTask)}
              validators={["required", "greaterThanStart", "maxNumber:24"]}
            />
            {taksKeys.map((key, index) => (
              <TextValidator
                required
                key={index}
                driver={props.driver}
                margin="dense"
                id={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={
                  key === "start_time" || key === "end_time" ? "number" : "text"
                }
                value={newTask[key] || ""}
                onChange={(e) => createTask(e, newTask, setNewTask)}
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
