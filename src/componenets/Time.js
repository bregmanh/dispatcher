import React from 'react';
import './Time.css';

export default function Times(props) {
  let styles = {
    gridRowStart:  props.index+1,
    gridColumn:  1,
  };
  return (
    
    <div let style={styles}>{props.time}</div>
   
    
      
    );
}
