import React, {useState} from 'react';
import classes from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Input = (props) => {
    let elm = null;
    const [numSelected, setNumselected] = useState(0)

    const selectClickHandler = (e) => {
        e.target.classList.toggle(classes.Open)
    }
    
    const optionMarkHandler = (e) => {
        const et = e.target;
        if(et.classList.contains(classes.Selected)){
            et.classList.remove(classes.Selected)
            setNumselected( numSelected - 1 )
        }else{
            et.classList.add(classes.Selected)
            setNumselected( numSelected + 1 )
        }
    }

    let inputClasses = [classes.Input];
    let ErrorMsg = ''

    if(!props.valid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        ErrorMsg = 'שדה חובה';
    }

    switch(props.elmType){
        case('text'):
        case('number'):
            elm = <input 
            onChange={props.changed}
            type={props.elmType}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            {...props.config}/>
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
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div className={classes.Submenu}>
                        {props.config.options.map( opt => {
                            return(
                                <div className={classes.Option} key={opt.id}>
                                    <input type="checkbox" id={opt.id} name={props.name} value={opt.id} onChange={props.changed}/>
                                    <label htmlFor={opt.id} onClick={optionMarkHandler}>{opt.name}</label>
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
        <div className={inputClasses.join(' ')}>
            {props.config ? <label>{props.config.label}</label> : null}
            {elm}
            <p className={classes.ErrorMsg}>{ErrorMsg}</p>
        </div>
    )
}

export default Input;