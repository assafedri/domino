/*
    1. V - Get skit id from url 
    2. V - Get skit info from API
    3. V - Get form fields from file
    4. V - Get cast data from redux
    5. V - Update form fields with cast options
    6. V - Update form with relevant skit data
    7. V Render Form
    // Show Selected Cast
    8. Mange input changes + validation
    9. Handle Submit
    10. Handle UI
*/

import React, {useState, useEffect, useReducer} from 'react';
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
            return { ...curFormState, loading: false, loadingText: null, render: true, valid: false }
        case 'valid':
            return { ...curFormState, valid: true }
        default:   
            throw new Error('Reducer Error');     
    }
}

const SkitEdit = props => {
    const skitId = props.match.params.id;
    const castData = useSelector(state => state.cast);
    const [fields, setFields] = useState(initalFiledsValues);
    const [formState, dispatch] = useReducer(formReducer, {});
    const {loading, error, data, sendRequest, clearRequest} = useHttp();

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
                    name: { ...f.name, value: data.name},
                    youtube_id: { ...f.youtube_id, value: data.youtube_id },
                    season: { ...f.season, value: data.aired.season},
                    episode: { ...f.episode, value: data.aired.episode},
                    cast: { ...f.cast, value: skitCastArray }
                }
            })
            
        }
    }, [data] );

    const submitFormHandler = () => {}
    const inputChangesHandler = () => {}

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
                <Button type="submit" design="Success" size="xl" /*disabled={!formState.valid}*/ >שמור</Button>
            </form>
        )
    }

    let pageContent;

    if(formState.loading){
        pageContent = <Spinner message={formState.loadingText} />
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