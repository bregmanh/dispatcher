import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export default function Week(props) {
  return (
    <div>
      <ArrowBackIcon onClick={props.weekBack} />
      Week: {props.week}
      <ArrowForwardIcon onClick={props.weekForward} />
    </div>
  );
}
