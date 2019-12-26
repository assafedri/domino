import React from 'react';

export default (props) => {
    let airedinfo = '';
    if(props.season){
        airedinfo += `עונה ${props.season}`

        if(props.episode){
            airedinfo += ` | פרק ${props.episode}`
        }
    }

    return(
        <p className="Aired">{airedinfo}</p>
    )
}