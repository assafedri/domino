import React from "react";
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Cast from '../../../components/Cast/Cast'
import classes from './CastIndex.module.scss'

const CastIndex = props => {
    const cast = useSelector( state => state.cast);
    const error = useSelector( state => state.error);

    const castClickHandler = (e) => {
        const targetId = e.target.parentNode.id
        props.history.push('/cast/' + targetId)
    }

    return(
        <div className={classes.CastIndex} >
            <section>
                <h1>שחקנים</h1>
                <p>כאן תוכלו למצוא את כל מי שהשתתף בדומינו</p>
            </section>

            {error.message}
            
            {cast ? cast.map( group => (
                <div key={group.id}>
                    <h2>{group.label}</h2>
                    <Cast 
                        cast={group.data}
                        clicked={castClickHandler}
                    />
                </div>
            ) ) : null}
        </div>    
    )
    
}

export default withRouter(CastIndex);