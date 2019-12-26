import { useReducer, useCallback } from 'react';
import axios from '../axios-domino';

const httpReducer = ( curHttpState, action ) => {
    switch(action.type){
        case 'SEND':
            return { ...curHttpState, loading: true, error: null, data: null }
        case 'RESPONSE':
            return { ...curHttpState, loading: false, data: action.responseData}
        case 'ERROR':
            return { ...curHttpState, loading: false, error: action.error}
        case 'CLEAR':
            return { error: null, loading: false, data: null}
        default:   
            throw new Error('useHttp Reducer Error');     
    }
}

const useHttp = () => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        loading: false,
        error: null, 
        data: null
    })

    const sendRequest = useCallback((url, method, body) => {
        dispatch({type: 'SEND'});
        let request;

        switch(method){
            case 'GET':
                request = axios.get(url, body);
                break;
            case 'POST':
                request = axios.post(url, body);    
                break;
            default:
                throw new Error('Wrong request method')    
        }

        request
        .then( response => {
            dispatch({type: 'RESPONSE', responseData: response.data})
        } )
        .catch( error => {
            dispatch({type: 'ERROR', error: error.message})
        })    
    }, []);

    const clearRequest = useCallback(() => {
        dispatch({type: 'CLEAR'})
    }, [])

    return {
        loading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        clearRequest: clearRequest
    }
};

export default useHttp;