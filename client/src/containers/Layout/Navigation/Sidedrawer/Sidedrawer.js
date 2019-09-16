import React from 'react';
import Navigation from '../Navigation';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';

const SideDrawer = (props) => {
    let sdClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        sdClasses  = [classes.SideDrawer, classes.Open];
    }
    return(
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={sdClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo width="70px" />
                </div>
                <Navigation />
            </div>
        </>
    )
}

export default SideDrawer;