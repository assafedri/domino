import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios-domino';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './SkitNew.module.scss';


const SkitNew = (props) => {
    const [formState, setFormState] = useState('loading');
    const [formSubmitable, setFormSubmitable] = useState(false);
    const [formError, setFormError] = useState();
    const [skitLink, setSkitLink] = useState();
    const [fields, setFields] = useState({
        name: {
            elmType: 'text', value: '',
            config: {
                label: 'שם המערכון',
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        youtube_id: {
            elmType: 'text', value: '',
            config: {
                label: 'מזהה Youtube',
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        season: {
            elmType: 'number', value: '',
            config: {
                label: 'עונה',
                min: 1,
                step: 1,
                max: 4
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        episode: {
            elmType: 'number', value: '',
            config: {
                label: 'פרק',
                min: 1,
                step: 1,
                max: 18
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cast: {
            elmType: 'multiselect',
            value: [],
            config: {
                label: 'משתתפים',
                title: 'בחר שחקנים',
                options: []
            },  
            validation: {
                atLeast: 2
            },
            valid: false,
            touched: false
        }
    })

    const convertCastData = useCallback((cast) => {
     
            const castData = [];
            cast.map( group => {
                const groupMembers = group.data.map( member => {
                    return { id: member._id, name: member.name, value: member._id}
                })
                
                return castData[group.id] = { label: group.label, members: groupMembers }
            })

            return castData;
            
    },[])

    const updateCastState = useCallback((castData) => {
        return {
            ...fields,
            cast: {
                ...fields.cast,
                config: {
                    ...fields.cast.config,
                    options: castData
                }
            }
        }
    },[fields])


    useEffect( () => {
        let isSubscribed = true;

        if(isSubscribed && props.cast && fields.cast.config.options.length < 1){
            // const convertedData = convertCastData(props.cast);
            const updatedState = updateCastState(props.cast);
            console.log(updatedState.cast.config.options)
            if(updatedState.cast.config.options){
                
                setFields(updatedState);
                setFormState('initial')

            }
        }

        return () => isSubscribed = false;
    },[convertCastData, updateCastState, props.cast,fields.cast.config.options])

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
        fieldsUpdate[id].touched = true;
        fieldsUpdate[id].valid = checkValidity(fieldsUpdate[id].value, fieldsUpdate[id].validation)

        let formIsValid = true;
        // eslint-disable-next-line
        for(let id in fieldsUpdate){
            formIsValid = fieldsUpdate[id].valid && formIsValid;
        }

        setFields(fieldsUpdate);
        setFormSubmitable(formIsValid);
    }

    const submitFormHandler = (e) => {
        e.preventDefault();
        setFormState('pending');
  
        const formData = {
            name: fields.name.value,
            youtube_id: fields.youtube_id.value,
            aired: {
                season: fields.season.value,
                episode: fields.episode.value
            },
            actors: fields.cast.value
        }

        axios.post('/api/skits/', formData)
            .then(response => {
                setFormState('success');
                setSkitLink(`/skits/${response.data.youtube_id}`)
            })
            .catch(error => {
                setFormState('failed')
                setFormError(error.message);
            })
    }

    let formHTML = '';

    switch(formState){
        case 'loading':
                formHTML = <Spinner message="טוען טופס..." />;
            break;

        case 'initial':
            const formFileds = [];
            // eslint-disable-next-line 
            for(let key in fields){
                formFileds.push({ id: key, data: fields[key]})
            }

            if(formFileds){
                formHTML = (
                    <>
                        <form onSubmit={submitFormHandler}>
                            {formFileds.map( elm => {
                                return <Input 
                                    key={elm.id}
                                    name={`skit[${elm.id}]`}
                                    changed={(e) =>inputChangesHandler(e, elm.id)}
                                    elmType={elm.data.elmType}
                                    value={elm.data.value}
                                    config={elm.data.config}
                                    valid={elm.data.valid}
                                    shouldValidate={elm.data.validation}
                                    touched={elm.data.touched}
                                    />
                            })}
                            <Button type="submit" design="Success" size="xl" disabled={!formSubmitable}>הוסף</Button>
                        </form>
                    </>
                );
            }else{
                formHTML = 'שגיאה בטעינת הטופס';
            }

            break;

        case 'pending':
            formHTML = <Spinner message="שולח טופס..."/>
            break;

        case 'success':
            formHTML = (
                <>
                    <p>המערכון נוסף בהצלחה</p>
                    <Link to={skitLink}>לחץ כאן למעבר לעמוד המערכון</Link>
                </>
            )
            break;

        case 'failed':
                formHTML = (
                    <>
                        <p>שגיאה:</p>
                        <p>{formError}</p>
                    </>
                )
            break;

        default:

    }

    return(
        <div className={classes.SkitNew}>
            <h1>הוספת מערכון חדש</h1>
            {formHTML}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        team_labels: state.team_labels,
        cast: state.cast,
        error: state.error
    }
}

export default connect(mapStateToProps)(SkitNew);
