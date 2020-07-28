import React from "react";
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

export default function DriverDropdown(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setDriver(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Select Driver:
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={handleChange}
          value={props.driver["name"]}
          renderValue={(value) => `${value}`}
        >
          {props.drivers.map((driver) => (
            <MenuItem key={driver["id"]} value={driver} >{driver["name"]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
