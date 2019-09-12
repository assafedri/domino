import React from 'react';
import classes from './Cover.module.scss';
import Logo from '../../Layout/Logo/Logo';

class Cover extends React.Component{
    state = {
        positionY: '50%'
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = (e) => {
        this.setState({positionY: 50 + (window.pageYOffset * 0.1) + '%'})
    }

    render(){
        return(
            <section className={classes.Cover} style={{backgroundPositionY: this.state.positionY }}>
                <div>
                    <Logo width="auto" />
                    <p>כל המערכונים, כל השחקנים, כל העונות - במקום אחד!</p>
                </div>
            </section>
        )
    }
}

export default Cover;