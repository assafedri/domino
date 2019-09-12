import React, {useEffect} from 'react';

const Backdrop = (props) => {

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        overflow: 'hidden'
    }
    
    useEffect( () => {
        if(props.show){
            document.body.style.overflow = "hidden";
        }
        
        
        return () => {
            document.body.style.overflow = "auto"
        }
    })

    return(
        props.show ? <div onClick={props.clicked} style={backdropStyle}></div> : null
    )
}
export default Backdrop;