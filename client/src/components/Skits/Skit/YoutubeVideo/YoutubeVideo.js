import React from 'react';
import PropTypes from 'prop-types';
import classes from './YoutubeVideo.module.scss'

class YoutubeVideo extends React.Component{
    youtubeSettings = `
        rel=0
        &hd=1
        &autoplay=1
        &modestbranding=1
        &showinfo=0
        &rel=0
        &theme=light
        &color=white`;

    render(){
        let ratioClasses = [classes.YoutubeVideo, classes.Wide]

        if(this.props.ratio === 'narrow'){
            ratioClasses = [classes.YoutubeVideo, classes.Narrow]
        }

        return(
            <div className={ratioClasses.join(' ')}>
                <iframe
                    title="youtube"
                    frameBorder="0" 
                    allowFullScreen 
                    src={`https://www.youtube.com/embed/${this.props.id}?${this.youtubeSettings}`}>
                </iframe>
            </div>
        )
    }
}

YoutubeVideo.propTypes = {
    id: PropTypes.string.isRequired
}

export default YoutubeVideo;