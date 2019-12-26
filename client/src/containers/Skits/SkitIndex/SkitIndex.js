import React, { useEffect } from 'react';

import Cover from '../../../components/UI/Cover/Cover'; 
import Skits from '../../../components/Skits/Skits';
import Spinner from '../../../components/UI/Spinner/Spinner';

import useHttp from '../../../hooks/http';

import classes from './SkitIndex.module.scss';

const SkitIndex = () => {
    const {loading, data, error, sendRequest} = useHttp();

    useEffect( () => sendRequest('api/skits/', 'GET'), [sendRequest]);

    let pageContent;
    
    if(loading){
        pageContent = <Spinner message="טוען מערכונים..."/>
    }else if(error){
        pageContent = <p>{error}</p>
    }else if(data){
        pageContent = <Skits skits={data} title="כל המערכונים" />;
    }

    return(
        <>
            <Cover />
            <div className={classes.SkitIndex}>
                {pageContent}
            </div>

        </>    
    )
}

export default SkitIndex;