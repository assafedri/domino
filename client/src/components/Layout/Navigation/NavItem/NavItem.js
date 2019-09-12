import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.scss'

const Item = (props) => (
    <li className={classes.NavItem}>
        <NavLink exact
            to={props.to}>{props.children}</NavLink>
    </li>
)
 
export default Item;