import React from 'react';
import classes from './Cover.module.scss';
import Logo from '../../../containers/Layout/Logo/Logo';

import originals from '../../../assets/img/originals.jpg';
import nextGen from '../../../assets/img/next-gen.jpg';

class Cover extends React.Component{
    state = {
        positionY: '50%',
        images: {originals,nextGen}
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = (e) => {
        this.setState({positionY: 50 + (window.pageYOffset * 0.03) + '%'})
    }

    render(){
        let images = []
        // eslint-disable-next-line
        for(let key in this.state.images){
            images.push( images[key] = this.state.images[key]  )
        }

        return(
            <section className={classes.Cover} >
                    <div className={classes.Slideshow}>
                        {images.map( img => {
                            return <div key={img}
                                className={classes.Slide}
                                style={{
                                    backgroundPositionY: this.state.positionY,
                                    backgroundImage: `url(${img})`
                                }}>
                            </div>
                        })}
                    </div>
                    <div className={classes.Info}>
                        <Logo width="auto" />
                        <p>כל המערכונים, כל השחקנים, כל העונות - במקום אחד!</p>
                    </div>
            </section>
        )
    }
}

export default Cover;