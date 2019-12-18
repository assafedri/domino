import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import SideDrawer from './Navigation/Sidedrawer/Sidedrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return(
        <>
            <Header toggle={sideDrawerToggleHandler}/>
            <SideDrawer 
                open={showSideDrawer}
                closed={sideDrawerClosedHandler} />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}    

export default Layout;
