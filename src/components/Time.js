import React from "react";
import "./Time.css";

export default function Times(props) {
  let styles = {
    gridRowStart: props.index,
  };
  return (
    <div style={styles} className="time-item">
      {props.time}
    </div>
  );
}
