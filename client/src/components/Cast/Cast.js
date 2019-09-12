import React from 'react';
import classes from './Cast.module.scss';
 
const Cast = (props) => {
    return(
        <>
            <section className={classes.Cast}>
                <ul>
                {props.cast.map( member => {
                    const selectedClass = props.selected === member._id ? classes.Selected : null;
                    return(
                        <li className={selectedClass}
                            onClick={props.clicked} 
                            key={member._id} 
                            id={member._id}>
                                <div style={{backgroundImage: `url(${member.image})`}} />
                        </li>
                    ) 
                })}
                </ul>
            </section>
        </>
    )    

}

export default Cast;