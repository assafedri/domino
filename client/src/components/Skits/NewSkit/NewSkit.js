import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './NewSkit.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../../axios-domino';

const NewSkit = () => {
    const [formState, setFormState] = useState('loading');
    const [formError, setFormError] = useState();
    const [skitLink, setSkitLink] = useState();
    const [fields, setFields] = useState({
        name: {
            elmType: 'text', value: '',
            config: {
                label: 'שם המערכון',
            }
        },
        youtube_id: {
            elmType: 'text', value: '',
            config: {
                label: 'מזהה Youtube',
            }
        },
        season: {
            elmType: 'number', value: '',
            config: {
                label: 'עונה',
                min: 1,
                step: 1,
                max: 4
            }
        },
        episode: {
            elmType: 'number', value: '',
            config: {
                label: 'פרק',
                min: 1,
                step: 1,
                max: 18
            }
        },
        cast: {
            elmType: 'multiselect',
            value: [],
            config: {
                label: 'משתתפים',
                title: 'בחר שחקנים',
                options: []
            }
        }
    })

    useEffect( () => {
        let isSubscribed = true;

        axios.get('api/cast')
        .then(response => {
            if(isSubscribed && !fields.cast.options){
                const castData = response.data.map( member => {
                    return {
                        id: member._id,
                        name: member.name,
                        value: member._id
                    }
                } )
                const fieldsState = {...fields}
                if(!fields.cast.config.options.length){
                    fieldsState.cast.config.options = castData;
                    setFields(fieldsState);
                    setFormState('initial')
                }
            }
        })

        return () => isSubscribed = false;
    },[fields])

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

        setFields(fieldsUpdate);
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

        axios.post('/api', formData)
            .then(response => {
                setFormState('success');
                setSkitLink(`/skits/view/${response.data.youtube_id}`)
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
                        <h2>הוסף מערכון</h2>
                        <form onSubmit={submitFormHandler}>
                            {formFileds.map( elm => {
                                return <Input 
                                    key={elm.id}
                                    name={`skit[${elm.id}]`}
                                    changed={(e) =>inputChangesHandler(e, elm.id)}
                                    elmType={elm.data.elmType}
                                    value={elm.data.value}
                                    config={elm.data.config}/>
                            })}
                            <Button type="submit" design="Success">הוסף</Button>
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

    // let formHTML = <Spinner message="טוען טופס..." />

    // if(!fields.cast){
    //     const castOptions = [];

    //     // eslint-disable-next-line 
    //     for(let key in fields){
    //         castOptions.push({ id: key, data: fields[key]})
    //     }        

    //     formHTML = 
    //         <>
                
    //             <Button design="Danger" clicked={() => setLoading(!loading)}>toggle</Button>
    //         </>
    // }

    return(
        <div className={classes.NewSkit}>
            {formHTML}
        </div>
    );
}

export default NewSkit;