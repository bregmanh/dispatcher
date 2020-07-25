import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { palette } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import white from '@material-ui/core/colors/blue';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
 
}));





export default function DriverDropdown(props) {
  const classes = useStyles();
  

  const handleChange = (event) => {
    props.setDriver(event.target.value);

  };

  return (
    <div>

      <FormControl className={classes.formControl} >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Select Driver:</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={handleChange}
          label={props.driver["name"]}

        >
          {props.drivers.map(driver => (<MenuItem value={driver} >{driver["name"]}</MenuItem>))}
        </Select>
      </FormControl>

    </div>
  );
}