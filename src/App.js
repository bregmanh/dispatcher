import React from 'react';
import logo from './logo.svg';
import './App.css';
import DriverDropdown from './componenets/DriverDropdown'
import CSVDropdown from './componenets/CSVDropdown'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Day from './componenets/Day'
import Time from './componenets/Time'
import Form from './componenets/Form'

import useApplicationData from "./hooks/useApplicationData.js";


import Week from './componenets/Week'

import { makeStyles } from '@material-ui/core/styles';
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
    tasksData
  } = useApplicationData();

  const classes = useStyles();


  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"];

  function addNewTask() {
    console.log("add new task!")
  }

  function weekForward() {
    if (week !== 52) {
      setWeek(week + 1)
    }
  }
  function weekBack() {
    if (week !== 1) {
      setWeek(week - 1)
    }
  }

  return (

    <main>
      <div className="navbar">
        <div className="dropdown">Driver:
          <DriverDropdown className="dropdown" drivers={driversData} setDriver={setDriver} />
        </div>
        <div className="weekChanger"><Week week={week} weekForward={weekForward} weekBack={weekBack} /></div>
        <div className="dropdown">
          Download Schedule:<CSVDropdown className="dropdown" items={['2 days', '4 days', '6 days']} />
        </div>
      </div>
      <div className="newtask" ><Form /></div>
      <div class="layout">
        <div className="times">{times.map(time => (<Time time={time} />))}</div>
        <div className='days'>

         
          {days.map(day => (<div className='day'><div className="topdays">{day}</div>
            <Day driver={driver} tasks={tasks} day={day} addNewTask={addNewTask} />
          </div>))}
        </div>
      </div>
    </main>
    //take the componeent that diplays the days on the side (make a separate component)

  );
}

export default App;
