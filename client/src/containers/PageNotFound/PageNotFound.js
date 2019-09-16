import React from 'react';
import classes from './PageNotFound.module.scss';

const PageNotFound = (props) => {
    return (
        <div className={classes.PageNotFound}>
            <h1>404</h1>
            <h2>העמוד לא נמצא</h2>
            <p>{props.message}</p>
        </div>
    );
};

export default PageNotFound;