import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cast: null,
    error: false,
    wiki: null
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
        case actionTypes.FETCH_WIKIPEDIA_SUCCESS:
            return{
                ...state,
                wiki: action.content,
                error: false
            }
        case actionTypes.FETCH_WIKIPEDIA_FAILED:
            return{
                ...state,
                error: action.error
            }    
        case actionTypes.CLEAR_WIKIPEDIA_INFO:
            return{
                ...state,
                wiki: null,
            }
        default:
            return state;
    }
    
}

export default castResucer;