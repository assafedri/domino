import React, {useEffect, useReducer} from 'react';
import axios from '../../../axios-domino';
import {withRouter, Link} from 'react-router-dom';

import YoutubeVideo from '../../../components/Skits/Skit/YoutubeVideo/YoutubeVideo';
import Aired from '../../../components/Skits/Skit/Aired/Aired';
import Comments from '../../../components/Skits/Skit/Comments/Comments';
import Cast from '../../../components/Cast/Cast';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import PageNotFound from '../../PageNotFound/PageNotFound';

import classes from './SkitShow.module.scss'; 

const httpReducer = ( currentState, action ) => {
    switch(action.type){
        case 'load':
            return {...currentState, error: false, loading: true}
        case 'response':
            return {error: false, loading: false, data: action.data}
        case 'error':
            return {error: action.error, loading: false, data: null}
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitShow = props =>{
    const [state, dispatch] = useReducer(httpReducer, {error: false, loading: true, data: false});
    const skitId = props.match.params.id;

    useEffect( () => {
        dispatch({type: 'load'});
        axios.get(`/api/skits/${skitId}`)
        .then( response => dispatch({ type: 'response', data: response.data }))
        .catch( error => dispatch( { type: 'error', error: error.message}))
    }, [skitId]);

    const castClickHandler = (e) => {
        alert('הנך מועבר לעמוד השחקן')
        const targetId = e.target.parentNode.id
        props.history.push('/cast/' + targetId);
    }

    const deleteSkitHandler = (e) => {
        alert('Delete clicked')
        e.preventDefault();
        const skitId = state.data._id;
        
        if(window.confirm('האם אתה בטוח?')){
            axios.delete(`/api/skits/${skitId}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        }
    }

    let pageContent;

    if(state.loading){
        pageContent = <Spinner message="טוען מערכון..."/>;
    }else if(state.error){
        pageContent = <PageNotFound message="המערכון לא נמצא"/>
    }else{
        pageContent = (
            <div className={classes.SkitShow}>

                <section className={classes.video} >
                    <YoutubeVideo id={state.data.youtube_id} />
                </section>

                <section className={classes.admin}>
                    <Button design="Warning">
                        <Link to={`/skits/${state.data.youtube_id}/edit`}>ערוך</Link>
                    </Button>
                    <form onSubmit={deleteSkitHandler}>
                        <Button design="Danger">מחק</Button>
                    </form>
                </section>

                <h1>{state.data.name}</h1>

                <section className={classes.description}>
                    <p>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.</p>
                    <Aired season={state.data.aired.season} episode={state.data.aired.episode}/>
                </section>

                <section className={classes.cast}>
                    <h2>משתתפים</h2>
                    <Cast cast={state.data.actors} clicked={castClickHandler} />
                </section>

                {/* <section className={classes.charecters}>
                    <h2>דמויות</h2>
                    <ul>
                        {[1,2,3,4].map((item, index) => {
                            return(
                                <li key={index}>
                                    <Link to="" >
                                        <img src="bla" alt=""/>
                                        <h4>דמות {item}</h4>
                                    </Link>                                    
                                </li>
                            )    
                        })}
                    </ul>
                </section> */}

                <section className={classes.comments}>
                    <Comments comments={state.data.comments} />
                </section>
            </div>
        )
    }

    return pageContent;

}

export default withRouter(SkitShow);