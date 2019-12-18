import React, {useEffect} from 'react';

const Backdrop = ({ show, clicked }) => {
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
        if(show){
            document.body.style.overflow = "hidden";
        }
        
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [show])

    return(
        show && <div onClick={clicked} style={backdropStyle}></div>
    )
}
export default Backdrop;