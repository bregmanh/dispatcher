import React from 'react';

import TextField from '@material-ui/core/TextField';


export default function InputField(props) {

  return(<TextField 
    
    margin='dense'
    id={props.id}
    label={props.label}
    type={props.type}
    onChange={(e) => props.createTask(e.target)}
    />)

}