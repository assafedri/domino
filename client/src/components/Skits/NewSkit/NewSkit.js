import React, {useState, useEffect} from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './NewSkit.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../../axios-domino';

const NewSkit = () => {
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState({
        name: {
            elmType: 'text',
            value: '',
            config: {
                label: 'שם המערכון',
            }
        },
        youtube_id: {
            elmType: 'text',
            value: '',
            config: {
                label: 'מזהה Youtube',
            }
        },
        season: {
            elmType: 'number',
            value: '',
            config: {
                label: 'עונה',
                min: 1,
                step: 1,
                max: 4
            }
        },
        episode: {
            elmType: 'number',
            value: '',
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
        console.log('effect');
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

    const submutFormHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name: fields.name.value,
            youtube_id: fields.youtube_id.value,
            aired: {
                season: fields.season.value,
                episode: fields.episode.value
            },
            actors: fields.cast.value
        }
        
        // eslint-disable-next-line
        // for( let key in fields ){
        //     formData[key] = fields[key].value;
        // }

        axios.post('/', formData)
            .then(response => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }

    let castHTML = <Spinner />

    if(fields.cast){
        const formHTML = [];
        // eslint-disable-next-line 
        for(let key in fields){
            formHTML.push({
                id: key, 
                data: fields[key]
            })
        }        

        castHTML = 
            <div className={classes.NewSkit}>
                <h3>הוסף מערכון</h3>
                
                <form onSubmit={submutFormHandler}>
                    {formHTML ? formHTML.map( elm => {
                        return <Input 
                            key={elm.id}
                            name={`skit[${elm.id}]`}
                            changed={(e) =>inputChangesHandler(e, elm.id)}
                            elmType={elm.data.elmType}
                            value={elm.data.value}
                            config={elm.data.config}/>
                    }) : null }


                    <Button type="submit" design="Success" disabled={loading}>
                        {loading ? <Spinner message="שומר..."/> : 'הוסף'}
                    </Button>
                </form>
                <Button design="Danger" clicked={() => setLoading(!loading)}>toggle</Button>
            </div>
    }

    return castHTML;
}

export default NewSkit;