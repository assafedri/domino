import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = (props) => (
    <div className={classes.Spinner}>
        <div className={classes.Icon}>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Message}>{props.message}</div>
    </div>
)

export default Spinner;