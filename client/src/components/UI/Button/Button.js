import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
    const assigned = [classes.Button, classes[props.design], classes[props.size]];

    if(props.invert){
        assigned.push(classes.Invert)
    }

    return(
        <button 
            className={assigned.join(' ') }
            onClick={props.clicked}
            disabled={props.disabled}>
                {props.children}
        </button>
    )
}

export default Button;
