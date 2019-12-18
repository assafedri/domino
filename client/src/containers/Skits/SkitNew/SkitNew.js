import React, {useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../axios-domino';

import Input    from '../../../components/UI/Input/Input'; 
import Button   from '../../../components/UI/Button/Button';
import Spinner  from '../../../components/UI/Spinner/Spinner';
import classes  from './SkitNew.module.scss';

const initalFileds = {
    name: {
        elmType: 'text', value: '',
        config: { label: 'שם המערכון' },
        validation: { required: true }, valid: false, touched: false,
    },
    youtube_id: {
        elmType: 'text', value: '',
        config: { label: 'מזהה Youtube' },
        validation: { required: true }, valid: false, touched: false,
    },
    season: {
        elmType: 'number', value: '',
        config: { label: 'עונה', min: 1, step: 1, max: 4 },
        validation: { required: true }, valid: false, touched: false
    },
    episode: {
        elmType: 'number', value: '',
        config: { label: 'פרק', min: 1, step: 1, max: 18 },
        validation: { required: true }, valid: false, touched: false
    },
    cast: {
        elmType: 'multiselect', value: [],
        config: { label: 'משתתפים', title: 'בחר שחקנים', options: [] },  
        validation: { atLeast: 1 }, valid: false, touched: false
    }
}

const formReducer = ( currentState, action ) => {
    switch(action.type){
        case 'loading':
            return { ...currentState, step: 'loading' }
        case 'initial':
            return { ...currentState, step: 'initial', error: false }
        case 'submit':
            return { ...currentState, step: 'submit' }
        case 'success':
            return { ...currentState, step: 'success', link: action.link }
        case 'failed':
            return { ...currentState, step: 'failed', error: action.error }
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitNew = props => {
    const castData = useSelector(state => state.cast);
    const [fields, setFields] = useState(initalFileds)
    const [submitable, setSubmitable] = useState(false)
    const [formState, dispatch] = useReducer(formReducer, {})

    useEffect( () => {
        dispatch({type: 'loading'})
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
    }, [castData]);

    const resetFormHandler = () => {
        dispatch({type: 'initial'})
    }

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

        /* Validation */
        let formIsValid = true;
        fieldsUpdate[id].valid = checkValidity(fieldsUpdate[id].value, fieldsUpdate[id].validation)
        // eslint-disable-next-line
        for(let id in fieldsUpdate){
            formIsValid = fieldsUpdate[id].valid && formIsValid;
        }

        setSubmitable(formIsValid);
        setFields(fieldsUpdate);

    }

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch({type: 'submit'})

        const formData = {
            name: fields.name.value,
            youtube_id: fields.youtube_id.value,
            aired: { season: fields.season.value, episode: fields.episode.value},
            actors: fields.cast.value
        }

        axios.post('/api/skits/', formData)
            .then( response => dispatch({type: 'success', link: `/skits/${response.data.youtube_id}` }) )
            .catch( error => dispatch({ type: 'failed', error: error.message }))
    }

    const renderForm = () => {
        const formFileds = [];

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
                <Button type="submit" design="Success" size="xl" disabled={!submitable} >הוסף</Button>
            </form>
        )
    }

    let pageContent;
    switch(formState.step){
        case 'loading':
            pageContent = <Spinner message="טוען טופס..." />;
            break;
        case 'initial':
            pageContent = renderForm();
            break;
        case 'submit':
            pageContent = <Spinner message="שולח טופס..."/>
            break;
        case 'success':
            pageContent = (
                <>
                    <p>המערכון נוסף בהצלחה</p>
                    <Link to={formState.link}>לחץ כאן למעבר לעמוד המערכון</Link>
                </>
            ) 
            break;
        case 'failed':
            pageContent = (
                <>
                    <p>שגיאה</p>
                    <p>{formState.error}</p>
                    <Button design="Warning" clicked={resetFormHandler}>חזרה</Button>
                </>    
            );
            break;
        default:
            pageContent = <h1>אירעה שגיאה בעמוד</h1>    
    }

    return(
        <div className={classes.SkitNew}>
            <h1>הוספת מערכון חדש</h1>
            {pageContent}
        </div>
    );
}
export default SkitNew;