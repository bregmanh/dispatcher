import React from "react";
import Show from "./Show";


const SHOW = "SHOW";



export default function Task(props) {
  const mode = SHOW;
  return (
    <article className="appointment" data-testid="appointment">
     
     
      {mode === SHOW && (
        <Show
        task={props.task}
        />
      )}
    </article>
  );
}
