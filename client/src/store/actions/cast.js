import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-domino';

export const setCast = (cast) => {
    return {
        type: actionTypes.SET_CAST,
        cast: cast
    }
}

export const fetchCastFailed = (error) => {
    return {
        type: actionTypes.FETCH_CAST_FAILED,
        error: error
    }
}

export const initCast = () => {
    return dispatch => {
        axios.get('api/cast')
            .then(response => {
                const team_labels = {
                    'originals': 'הצוות המקורי',
                    'next-gen': 'הדור הבא',
                    'guests': 'אורחים'
                }
                let castGroupsArray = [];
                const castGroupsObject = response.data.reduce( (teams,current) => {
                    const team = current.team;
                    teams[team] = (teams[team] || []).concat(current);
                    return teams;
                },[]);
                // eslint-disable-next-line 
                for(let key in castGroupsObject){
                    castGroupsArray.push({
                        id: key, 
                        label: team_labels[key],
                        data: castGroupsObject[key]
                    })
                }
                
                
                dispatch(setCast(castGroupsArray))
            })
            .catch( error => {
                dispatch(fetchCastFailed(error))
            })
    }
}