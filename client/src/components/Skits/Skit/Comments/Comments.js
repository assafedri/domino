import React from 'react';
import classes from './Comments.module.scss';

export default (props) => {
    let commentsHTML = (
        <p className={classes.noComments}>אין עדיין תגובות. אריה, תעשה משהו!</p>
    )

    if(props.comments.length > 0){
        commentsHTML = (
            <ul>
                {props.comments.map(comment => {
                    return(
                        <li>
                            <strong>{comment.author.username}</strong>
                            <p>{comment.text}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return(
        <div className={classes.Comments}>
            <h2>תגובות</h2>
            <button>הוסף תגובה</button>
            {commentsHTML}
        </div>
    )
   
}