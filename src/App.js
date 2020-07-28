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

function App() {
  const {
    driver,
    setDriver,
    tasks,
    setTasks,
    week,
    driversData,
    weekForward,
    weekBack,
    changeState,
    tasksDatabase,
    setTasksDatabase
  } = useApplicationData();

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
    
  ];
  
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
              items={[2, 4, 7, 14, 28]}
              driver={driver}
              tasksDatabase={tasksDatabase}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className="newtask">
        <Form {...{driver, tasksDatabase, changeState}} />
        
      </div>
      <div className="layout">
        <div className="times">
        <div>
          {times.map((time, index) => (<Time time={time} key={time} index={index}/>))}
        </div>
        </div>
        <div className="days">

          {days.map((day, index) => (
            <div className='day'>
              <div className="topdays">{day}</div>
              <Day
                driver={driver}
                tasks={tasks}
                day={day}
                
                index={index}
                key={day}
                
                tasksDatabase={tasksDatabase}
                week={week}
                setTasks={setTasks}
                setTasksDatabase={setTasksDatabase}
                changeState={changeState}

              />
            </div>))}
        </div>
      </div>


    </main>
    //take the componeent that diplays the days on the side (make a separate component)
  );
}

export default App;
