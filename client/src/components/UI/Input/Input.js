import React, {useState, useEffect} from 'react';
import classes from './Input.module.scss';

const Input = (props) => {

    let elm = null;
    const [numSelected, setNumselected] = useState(0);

    useEffect( () => {
        if(props.elmType === 'multiselect'){
            setNumselected(props.value.length);
        }
    }, [props] )

    const selectClickHandler = (e) => {
        e.target.classList.toggle(classes.Open)
    }
    
    const optionMarkHandler = (e) => {
        const etcl = e.target.classList;
        if(etcl.contains(classes.Selected)){
            etcl.remove(classes.Selected)
            setNumselected( numSelected - 1 )
        }else{
            etcl.add(classes.Selected)
            setNumselected( numSelected + 1 )
        }
    }

    let inputClasses = [];
    let ErrorMsg = ''
    let inp;

    if(!props.valid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        ErrorMsg = 'שדה חובה';
    }

    switch(props.elmType){
        case('text'):
        case('number'):
            inputClasses.push(classes.Input)
            elm = (
                <>
                    <input 
                        onChange={props.changed}
                        type={props.elmType}
                        value={props.value}
                        ref={(ip) => inp = ip}
                        {...props.config}/>
                    {props.config 
                        ? <label onClick={ () => inp.focus()  } >{props.config.label}</label> 
                        : null}       
                </>
            ) 
            break;

        case('textarea'):
            elm = <textarea 
                {...props}
                />
            break;

        case('multiselect'):
            let multiSelectTitle = props.config.title
            if(numSelected === 1 ){
                multiSelectTitle = <strong>1 נבחר</strong>
            }else if(numSelected > 1){
                multiSelectTitle = <strong>{numSelected} נבחרו</strong>
            }
            inputClasses.push(classes.MultiSelect)

            elm = (
                <>
                <div onClick={selectClickHandler}>
                    <div className={classes.Title}>
                        {multiSelectTitle} 
                    </div>
                    <div className={classes.Submenu}>
                        {props.config.options.map( group => {
                            return(
                                <div key={group.id} className={classes.Group}>
                                    <div className={classes.Title}>{group.label}</div>
                                    {group.data.map(member => {
                                        let selected = '';
                                        if(props.value.includes(member._id)){
                                            selected = classes.Selected;
                                        }

                                        return(
                                            <div className={classes.Member} key={member._id}>
                                                <input 
                                                    type="checkbox" 
                                                    id={member._id} 
                                                    name={props.name} 
                                                    value={member._id} 
                                                    onChange={props.changed} 
                                                    checked={ selected ? 'checked' : false} />
                                                <label htmlFor={member._id} onClick={optionMarkHandler} className={selected}>
                                                    {member.name}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
               </> 
            )
            break;
        default:
            elm = <input 
                type={props.elmType}
                value={props.value}
                {...props.config}/>
    }

    return(
        <>
        <div className={inputClasses.join(' ')}>
            <div className={classes.Control}>
                {elm}
            </div>
            <div className={classes.ErrorMsg}>
                <p>{ErrorMsg}</p>
            </div>
        </div>
        </>
    )
}

export default Input;