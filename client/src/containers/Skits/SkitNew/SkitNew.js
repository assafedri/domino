import React, {useState, useEffect, useReducer, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useHttp from '../../../hooks/http';

import initalFiledsValues from './SkitNewFormFields';

import Input    from '../../../components/UI/Input/Input'; 
import Button   from '../../../components/UI/Button/Button';
import Spinner  from '../../../components/UI/Spinner/Spinner';
import classes  from './SkitNew.module.scss';

const formReducer = ( curFormState, action ) => {
    switch(action.type){
        case 'loading':
            return { ...curFormState, loading: true, loadingText: 'טוען טופס...', valid: false, render: false }
        case 'initial':
            return { ...curFormState, loading: false, loadingText: null, render: true, valid: false }
        case 'valid':
            return { ...curFormState, valid: true }
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitNew = () => {
    const castData = useSelector(state => state.cast);
    const [fields, setFields] = useState(initalFiledsValues);
    const [formState, dispatch] = useReducer(formReducer, {});
    const {loading, error, data, sendRequest, clearRequest} = useHttp();

    const resetFormHandler = useCallback(() => {
        clearRequest();
        if(castData){
            setFields( f => {
                return {
                    ...f, cast: { 
                        ...f.cast, config: {
                            ...f.cast.config, options: castData
                        }
                    }
                }
            })
            dispatch({type: 'initial'})
        }
    }, [castData, clearRequest]);

    useEffect( () => {
        dispatch({type: 'loading'})
        resetFormHandler();
    }, [resetFormHandler]);

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required && isValid){
            isValid = value.trim() !== ''
        }

        if(rules.atLeast && isValid){
            isValid = value.length >= rules.atLeast;
        }

        return isValid;
    }

    const inputChangesHandler = (e, id) => {
        const fieldsUpdate = {...fields}
        const etv = e.target.value;

        fieldsUpdate[id].touched = true;

        if(fieldsUpdate[id].elmType === 'multiselect'){
            let multiValues = fieldsUpdate[id].value  
            if(e.target.checked){
                multiValues.push(etv)
            }else{
                const index = multiValues.findIndex(e => e === etv)
                multiValues.splice(index,1);
            }
            fieldsUpdate[id].value = multiValues;
        }else{
            fieldsUpdate[id].value = e.target.value;
        }

        let formIsValid = true;
        fieldsUpdate[id].valid = checkValidity(fieldsUpdate[id].value, fieldsUpdate[id].validation)
        // eslint-disable-next-line
        for(let id in fieldsUpdate){
            formIsValid = fieldsUpdate[id].valid && formIsValid;
        }

        formIsValid && dispatch({type: 'valid'});
        setFields(fieldsUpdate);

    }

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = {
            name: fields.name.value,
            youtube_id: fields.youtube_id.value,
            aired: { season: fields.season.value, episode: fields.episode.value},
            actors: fields.cast.value
        }

        sendRequest('/api/skits/', 'POST', formData )
    }

    const renderForm = () => {
        const formFileds = [];
        
        // eslint-disable-next-line
        for(let key in fields){
            formFileds.push({ id: key, data: fields[key]})
        }

        return(
            <form onSubmit={submitFormHandler}>
                {formFileds.map( elm => {
                    return <Input 
                        key={elm.id}
                        name={`skit[${elm.id}]`}
                        elmType={elm.data.elmType}
                        config={elm.data.config}
                        valid={elm.data.valid}
                        value={elm.data.value}
                        changed={(e) =>inputChangesHandler(e, elm.id)}
                        shouldValidate={elm.data.validation}
                        touched={elm.data.touched}
                        />
                })}
                <Button type="submit" design="Success" size="xl" disabled={!formState.valid} >הוסף</Button>
            </form>
        )
    }

    let pageContent;

    if(formState.loading){
        pageContent = <Spinner message={formState.loadingText} />;
    }else if(formState.render){
        pageContent = renderForm();
    }

    if (loading){
        pageContent = <Spinner message="שולח טופס..." />;
    }
    else if(data){
        pageContent = (
            <>
                <p>המערכון נוסף בהצלחה</p>
                <Link to={`/skits/${data.youtube_id}`}>לחץ כאן למעבר לעמוד המערכון</Link>
            </>
        ) 
    }
    else if(error){
        pageContent = (
            <>
                <p>שגיאה</p>
                <p>{error}</p>
                {/* <Button design="Warning" clicked={resetFormHandler}>חזרה</Button> */}
            </>    
        );
    }

    return(
        <div className={classes.SkitNew}>
            <h1>הוספת מערכון חדש</h1>
            {pageContent}
        </div>
    );
}
export default SkitNew;