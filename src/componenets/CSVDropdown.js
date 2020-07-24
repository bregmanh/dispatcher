import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({

  formControl: {
    
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function CSVDropdown(props) {
  const classes = useStyles();
 
  const [items, setItems] = React.useState(props.items);

  const handleChange = (event) => {
    setItems(event.target.value);
  };

  return (
    <div>
 
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Select:
        </InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}>
          {items.map(item => <MenuItem value={item} >{item}</MenuItem>)}
        </Select>
      </FormControl>
     
    </div>
  );
}