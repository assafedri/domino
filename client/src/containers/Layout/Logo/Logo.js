import React from 'react';
import ReactSVG from 'react-svg';
import logo from '../../../assets/img/logo.svg'

const Logo = (props) => {
    return (
        <ReactSVG src={logo} beforeInjection={ svg => {
            svg.setAttribute('style', `width:${props.width}; height:auto`)
        } } />
    );
};

export default Logo;