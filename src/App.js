import React from 'react';
import logo from './logo.svg';
import './App.css';
import DriverDropdown from './componenets/DriverDropdown'
import CSVDropdown from './componenets/CSVDropdown'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Day from './componenets/Day'
import Time from './componenets/Time'

import Week from './componenets/Week'

import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

  const classes = useStyles();


  let driversData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Greg' }];
  let tasksData = {
    //first key is driver id, second key is week id
    "1": {
      "1": [{ 'day': 'Monday', 'start_time': 10, 'end_time': 16, 'title': 'dropoff', 'desciption': 'smth' },
      { 'day': 'Tuesday', 'start_time': 7, 'end_time': 12, 'title': 'other', 'desciption': 'smth' },
      { 'day': 'Monday', 'start_time': 6, 'end_time': 8, 'title': 'pickup', 'desciption': 'pickup' },]
    }
  }

  const [driver, setDriver] = React.useState(driversData[0]);
  const [tasks, setTasks] = React.useState(tasksData["1"]["1"]);
  const [week, setWeek] = React.useState(1);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"];

  return (

    <main>
      <div className="navbar">
        <div className="dropdown">Driver:
          <DriverDropdown className="dropdown" drivers={driversData} />
        </div>
        <div className="weekChanger"><ArrowBackIcon />Week: <Week week={week} /><ArrowForwardIcon /></div>
        <div className="dropdown">
          Download Schedule:<CSVDropdown className="dropdown" items={['2 days', '4 days', '6 days']} />
        </div>
      </div>
      <>
        <div className='days'>
          {days.map(day => (<div><div className= "topdays">{day}</div>
            <Day driver={driver} tasks={tasks} day={day} />
          </div>))}
        </div>
        <aside>{times.map(time => (<Time time={time}/>))}</aside>
          
        
      </>
    </main>
    //take the componeent that diplays the days on the side (make a separate component)

  );
}

export default App;
