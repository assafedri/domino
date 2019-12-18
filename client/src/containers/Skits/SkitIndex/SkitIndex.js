import React, { useEffect, useReducer } from 'react';
import axios from '../../../axios-domino';

import Cover from '../../../components/UI/Cover/Cover'; 
import Skits from '../../../components/Skits/Skits';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './SkitIndex.module.scss';

const httpReducer = ( currentState, action ) => {
    switch(action.type){
        case 'Send':
            return {error: false, loading: true, data: null}
        case 'response':
            return {error: false, loading: false, data: action.data}
        case 'error':
            return {error: action.error, loading: false, data: null}
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitIndex = () => {
    const [state, dispatch] = useReducer(httpReducer, {error: false, loading: false, data: []})

    useEffect( () => {
        dispatch({type: 'Send'});
        axios.get('api/skits/')
            .then( response => {
                dispatch({type: 'response', data: response.data})
            }).catch( error => {
                dispatch({type: 'error', error: error.message})
            })
    }, []);

    let skitsHTML;
    
    if(state.loading){
        skitsHTML = <Spinner message="טוען מערכונים"/>
    }else if(state.error){
        skitsHTML = <p>{state.error}</p>
    }else{
        skitsHTML = <Skits skits={state.data} title="כל המערכונים" />;
    }

    return(
        <>
            <Cover />
            <div className={classes.SkitIndex}>
                {skitsHTML}
            </div>

        </>    
    )
}

export default SkitIndex;