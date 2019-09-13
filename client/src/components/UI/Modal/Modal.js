import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const modal = (props) => (
    <>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal} style={{
            transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%,-100vh)',
            opacity: props.show ? '1': '0',
        }}>
            <div className={classes.Content}>
                {props.children}
            </div>
            <button onClick={props.modalClosed}>
                <FontAwesomeIcon icon={faPlus} onClick={props.modalClosed}/>
                
                </button>
        </div>
    </>
)

export default modal;