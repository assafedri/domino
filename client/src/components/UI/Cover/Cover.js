import React from 'react';
import classes from './Cover.module.scss';

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
                    <h1>ברוכים הבאים לאתר המעריצים של דומינו</h1>
                    <p>כאן תוכלו למצוא את כל המערכונים הקיימים ברשת</p>
                </div>
            </section>
        )
    }
}

export default Cover;