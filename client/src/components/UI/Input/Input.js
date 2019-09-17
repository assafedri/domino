import React, {useState} from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
    let elm = null;
    const [numSelected, setNumselected] = useState(0)

    const selectClickHandler = (e) => {
        e.target.classList.toggle(classes.Open)
    }
    
    const optionMarkHandler = (e) => {
        console.log(e.target)
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
                        {...props.config}/>
                    {props.config ? <label>{props.config.label}</label> : null}       
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
                                        return(
                                            <div className={classes.Member} key={member._id}>
                                                <input type="checkbox" id={member._id} name={props.name} value={member._id} onChange={props.changed}/>
                                                <label htmlFor={member._id} onClick={optionMarkHandler}>
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