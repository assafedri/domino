import React from 'react';
import NavItem from './NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faPlus, faTv, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import classes from './Navigation.module.scss'

const Navigation = (props) => {
    const items = [
        {link: '/skits', label: 'כל המערכונים',  faicon: {icon: faTv} }, 
        {link: '/skits/add', label: 'הוסף מערכון', faicon: {icon: faPlus} },
        {link: '/cast', label: ' שחקנים', faicon: {icon: faTheaterMasks}  },
        {link: '/login', label: 'התחברות', faicon: { icon: faSignInAlt, rotation: 180 } },
        {link: '/register', label: 'הרשמה', faicon: { icon: faUserPlus } },
    ]
    return(
        <ul className={classes.Navigation}>
            {items.map( (item,index) => {
                return(
                    <NavItem to={item.link} key={index} >
                        <div onClick={props.clicked}>
                            {item.faicon ? <FontAwesomeIcon {...item.faicon} /> : null}
                            {item.label}
                        </div>
                    </NavItem>
                )
            })}
        </ul>
    )
}    

export default Navigation;