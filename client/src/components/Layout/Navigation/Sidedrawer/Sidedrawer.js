import React from 'react';
import Navigation from '../Navigation';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let sdClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        sdClasses  = [classes.SideDrawer, classes.Open];
    }
    return(
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={sdClasses.join(' ')}>
                <div className={classes.Logo}><span>דומינו</span></div>
                <Navigation />
            </div>
        </>
    )
}

export default SideDrawer;