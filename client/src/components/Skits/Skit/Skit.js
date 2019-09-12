import React from 'react';
import classes from './Skit.module.scss';

const Skit = (props) => {
    return (
        <>
            <div className={classes.Skit} onClick={props.clicked}>
                <img 
                    src={`https://img.youtube.com/vi/${props.skit.youtube_id}/0.jpg`} 
                    alt={props.skit.name} />
                <h4>{props.skit.name}</h4>
            </div>
        </>
    )
}

export default Skit;