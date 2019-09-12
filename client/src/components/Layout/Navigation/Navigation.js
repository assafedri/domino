import React from 'react';
import NavItem from './NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import classes from './Navigation.module.scss'

const Navigation = () => (
    <ul className={classes.Navigation}>
        <NavItem to="/skits">מערכונים</NavItem>
        <NavItem to="/cast">שחקנים</NavItem>
        <NavItem to="/login"><FontAwesomeIcon icon={faSignInAlt} rotation={180} /> התחברות</NavItem>
        <NavItem to="/register"><FontAwesomeIcon icon={faUserPlus} /> הרשמה</NavItem>
    </ul>
)

export default Navigation;