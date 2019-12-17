import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authStart = () => {
    return { 
        type: actionTypes.AUTH_START
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (exporationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, exporationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        const API_TOKEN = '[API_KEY]';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_TOKEN;
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_TOKEN;
        }

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};