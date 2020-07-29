import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export default function Week(props) {
  
  const innerStyles = {
    paddingTop: "0.2em",
  }
  
  return (
    <>
      <div >
        <ArrowBackIcon onClick={props.weekBack} />
      </div>
      <div style ={innerStyles} >Week: {props.week}</div>
      <div >
        <ArrowForwardIcon onClick={props.weekForward} />
      </div>
    </>
  );
}
