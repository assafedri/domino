import React from 'react';
import classes from './Header.module.scss'
import {withRouter} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import DrawerToggle from '../Navigation/Sidedrawer/DrawerToggle/DrawerToggle';


class Header extends React.Component {
    state = {
        assignClass: [] 
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
        this.assignClass();
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = (e) => {
       this.assignClass()
    }

    assignClass = () => {
        if(window.pageYOffset >= classes.height ){
            this.setState({assignClass: classes.Fixed})
        }else{
            this.setState({assignClass: ''})
        }
    }

    render(){
        return(
            <header className={this.state.assignClass}>
                <div className={classes.Container}>
                    <DrawerToggle open={this.props.toggle}/>
                    <div className={classes.Logo}><span>דומינו</span></div>
                    <nav className={classes.DesktopOnly}>
                        <Navigation />
                    </nav>
                </div>    
            </header>
        )
    }
}

export default withRouter(Header);