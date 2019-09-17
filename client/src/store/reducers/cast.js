import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cast: null,
    error: false
}

const castResucer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CAST:
            return{
                ...state,
                cast: action.cast,
                error: false
            }    
            case actionTypes.FETCH_CAST_FAILED:
                return{
                    ...state,
                    error: action.error
                }    
        default:
            return state;
    }
    
}

export default castResucer;