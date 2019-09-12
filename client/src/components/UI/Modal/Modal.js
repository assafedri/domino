import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: 'auto',
            maxWidth: '80%',
            height: 'auto%',
            zIndex: 1000,
            transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%,-100vh)',
            opacity: props.show ? '1': '0',
            transition: 'all 0.3s ease-out'
        }}>{props.children}</div>
    </>
)

export default modal;