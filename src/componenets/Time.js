import React from "react";
import "./Time.css";

export default function Times(props) {
  let styles = {
   
    gridColumn: 1,
  };
  return (
    <div let style={styles} className="times">
      {props.time}
    </div>
  );
}
