import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './DrawerToggle.module.scss';

const DrawerToggle = (props) => (
    <div className={classes.Menu} onClick={props.open}>
        <FontAwesomeIcon icon={faBars}/>
    </div>
)

export default DrawerToggle