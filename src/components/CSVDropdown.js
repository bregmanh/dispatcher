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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CSVDropdown(props) {
  const classes = useStyles();

  const [items, setItems] = React.useState(props.items);

  const { csvGenerator } = require("../helpers/csvGenerators");

  const handleChange = (event) => {
    setItems(event.target.value);
    csvGenerator(props.driver, props.tasksDatabase, event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Download Schedule:
        </InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {props.items.map((item) => (
            <MenuItem value={item} key={item}>{`${item} days`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
