import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import SideDrawer from './Navigation/Sidedrawer/Sidedrawer';

class Layout extends React.Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        console.log('here')
        this.setState( (prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer} 
        })
    }

    render(){
        return(
            <>
            <Header toggle={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} />
            <main>
                {this.props.children}
            </main>
            <Footer />
        </>
        )
    }
}    

export default Layout;
