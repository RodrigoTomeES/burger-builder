import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    let updatedState = JSON.parse(JSON.stringify(state));

    switch ( action.type ) {
        case actionTypes.AUTH_START:
            updatedState = authStart(state, action, updatedState);
            break;
        case actionTypes.AUTH_SUCCESS:
            updatedState = authSuccess(state, action, updatedState);
            break;
        case actionTypes.AUTH_FAIL:
            updatedState = authFail(state, action, updatedState);
            break;
        case actionTypes.AUTH_LOGOUT:
            updatedState = authLogout(state, action, updatedState);
            break;
        default:
            console.log("[Auth Reducer] Action default case");
            break;
    }

    return updatedState;
};

export default reducer;

// Auxiliary Functions
const authStart = (state, action, updatedState) => {
    updatedState.error = null;
    updatedState.loading = true;
    return updatedState;
}

const authSuccess = (state, action, updatedState) => {
    updatedState.token = action.idToken;
    updatedState.userId = action.userId;
    updatedState.error = null;
    updatedState.loading = false;
    return updatedState;
}

const authFail = (state, action, updatedState) => {
    updatedState.error = action.error;
    updatedState.loading = false;
    return updatedState;
}

const authLogout = (state, action, updatedState) => {
    updatedState.token = null;
    updatedState.userId = null;
    return updatedState;
}
