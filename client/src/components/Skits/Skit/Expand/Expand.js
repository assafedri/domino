import React from 'react';
import { Link } from 'react-router-dom';

import Aired from '../Aired/Aired';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';

import classes from './Expand.module.scss';
import Button from '../../../UI/Button/Button';

const Expand = (props) => (
    props.skit ? 
    <div className={classes.Expand}>
        <div className={classes.video} >
            <YoutubeVideo ratio="narrow" id={props.skit.youtube_id} />
        </div>
        <div className={classes.Info}>
            <h4>{props.skit.name}</h4>
            <Aired 
                season={props.skit.aired.season} 
                episode={props.skit.aired.episode} />
            <p className={classes.Desc}>{props.skit.description}</p>
            <Button design="Warning">
                <Link to={`/skits/${props.skit.youtube_id}`}>לעמוד המערכון</Link>
            </Button>
        </div>

    </div>
    : null
)

export default Expand;