import React, {useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useHttp from '../../../hooks/http';
import initalFiledsValues from '../SkitNew/SkitFormFields';
import Spinner  from '../../../components/UI/Spinner/Spinner';
import Input    from '../../../components/UI/Input/Input'; 
import Button   from '../../../components/UI/Button/Button';
import classes from '../SkitNew/SkitNew.module.scss'

const formReducer = ( curFormState, action ) => {
    switch(action.type){
        case 'loading':
            return { ...curFormState, loading: true, loadingText: 'טוען טופס...', valid: false, render: false }
        case 'initial':
            return { ...curFormState, loading: false, loadingText: null, render: true, valid: true }
        case 'valid':
            return { ...curFormState, valid: true }
        case 'invalid':
            return { ...curFormState, valid: false }
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitEdit = props => {
    const skitId = props.match.params.id;
    const [fields, setFields] = useState(initalFiledsValues);
    const [formState, dispatch] = useReducer(formReducer, {});
    const {loading, error, data, sendRequest, clearRequest} = useHttp();
    const castData = useSelector(state => state.cast);

    useEffect( () => {
        dispatch({type: 'loading'});
        sendRequest(`/api/skits/${skitId}`, 'GET');

        if(skitId && castData){
            setFields( f => {
                return {
                    ...f, cast: { 
                        ...f.cast, config: {
                            ...f.cast.config, options: castData
                        }
                    }
                }
            })
            dispatch({type: 'initial'});
        }
    }, [skitId, castData, sendRequest] );

    useEffect( () => {
        if(data){
            let skitCastArray = data.actors.map( act => act._id );
            setFields( f => {
                return {
                    ...f, 
                    name: { ...f.name, value: data.name, valid: checkValidity(data.name, f.name.validation), touched: true},
                    youtube_id: { ...f.youtube_id, value: data.youtube_id, valid: checkValidity(data.youtube_id, f.youtube_id.validation), touched: true },
                    season: { ...f.season, value: data.aired.season, valid: checkValidity(data.aired.season, f.season.validation), touched: true },
                    episode: { ...f.episode, value: data.aired.episode, valid: checkValidity(data.aired.episode, f.episode.validation), touched: true },
                    cast: { ...f.cast, value: skitCastArray, valid: checkValidity(skitCastArray, f.cast.validation), touched: true }
                }
            })
        }
    }, [data] );

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required && isValid){
            isValid = value.toString().trim() !== ''
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

        formIsValid ? dispatch({type: 'valid'}) : dispatch({type: 'invalid'});
        setFields(fieldsUpdate);
    }

    const submitFormHandler = e => {
        e.preventDefault();
        clearRequest();

        const formData = {
            name: fields.name.value,
            youtube_id: fields.youtube_id.value,
            aired: { season: fields.season.value, episode: fields.episode.value},
            actors: fields.cast.value
        }

        sendRequest(`/api/skits/${skitId}/edit`, 'POST', formData )
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
                <Button type="submit" design="Success" size="xl" disabled={!formState.valid} >שמור</Button>
            </form>
        )
    }

    let pageContent;

    if(formState.loading){
        pageContent = <Spinner message={formState.loadingText} />
    }else if(error){
        pageContent = <p>{error}</p>
    }else if(formState.render) {
        pageContent = renderForm();
    }

    return (
        <div className={classes.SkitForm}>
            <h1>עריכת מערכון</h1>
            {pageContent}
        </div>
    );
};

export default withRouter(SkitEdit);