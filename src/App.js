import React from "react";
import "./App.css";
import DriverDropdown from "./componenets/DriverDropdown";
import CSVDropdown from "./componenets/CSVDropdown";
import Day from "./componenets/Day";
import Time from "./componenets/Time";
import Form from "./componenets/Form";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import useApplicationData from "./hooks/useApplicationData.js";

import Week from "./componenets/Week";

import { makeStyles } from "@material-ui/core/styles";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const {
    driver,
    setDriver,
    tasks,
    setTasks,
    week,
    setWeek,
    driversData,
    weekForward,
    weekBack,
  } = useApplicationData();

  const classes = useStyles();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const times = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12pm",
  ];

  function addNewTask() {
    console.log("add new task!");
  }

  function onEdit() {
    console.log("edit!");
  }
  function onDelete() {
    console.log("delete!");
  }

  return (
    <main>
      <AppBar position="static">
        <Toolbar className="navbar">
          <div className="dropdown">
            <DriverDropdown
              className="dropdown"
              drivers={driversData}
              driver={driver}
              setDriver={setDriver}
            />
          </div>
          <div className="weekChanger">
            <Week week={week} weekForward={weekForward} weekBack={weekBack} />
          </div>
          <div className="dropdown">
            <CSVDropdown
              className="dropdown"
              items={["2 days", "4 days", "6 days"]}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className="newtask">
        <Form />
      </div>
      <div className="layout">
        {times.map((time, index) => (
          <Time time={time} index={index} key={index} />
        ))}

        {days.map((day, index) => (
          <Day
            driver={driver}
            tasks={tasks}
            day={day}
            addNewTask={addNewTask}
            index={index}
            key={day}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </main>
    //take the componeent that diplays the days on the side (make a separate component)
  );
}

export default App;
