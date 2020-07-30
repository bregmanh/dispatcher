import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
const { deleteTask } = require("../../helpers/formSubmitters");

export default function DeleteForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTaskFromDatabase = function () {
    //if week exists in the database
    let taskToDelete = props.tasksDatabase[props.driver["id"]][
      props.week
    ].findIndex((e) => JSON.stringify(e) === JSON.stringify(props.task));
    deleteTask(
      props.tasksDatabase,
      taskToDelete,
      props.driver,
      props.week,
      props.changeState
    );
    handleClose();
  };

  return (
    <div>
      <DeleteIcon onClick={handleClickOpen} fontSize={"small"} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTaskFromDatabase} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
