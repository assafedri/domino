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
                dispatch(setCast(response.data))
            })
            .catch( error => {
                dispatch(fetchCastFailed(error))
            })
    }
}