import React from "react";

export default function DayLabels(props) {
  let styles = {
    gridRow: 1,
    gridColumnStart: 2,
    gridColumnEnd: 8,

    backgroundColor: "blue",
  };
  return <div style={styles}>{props.day}</div>;
}
