import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    let updatedState = JSON.parse(JSON.stringify(state));

    switch ( action.type ) {
        case actionTypes.PURCHASE_BURGER_START:
            updatedState = purchaseBurgerStart(state, action, updatedState);
            break;
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            updatedState = purchaseBurgerSuccess(state, action, updatedState);
            break;
        case actionTypes.PURCHASE_BURGER_FAIL:
            updatedState = purchaseBurgerFail(state, action, updatedState);
            break;
        default:
            console.log("[Order Reducer] Action default case");
            break;
    }

    return updatedState;
};

export default reducer;

const purchaseBurgerStart = (state, action, updatedState) => {
    updatedState.loading = true;
    return updatedState;
}

const purchaseBurgerSuccess = (state, action, updatedState) => {
    const newOrder = {
        id: action.orderId,
        ...action.orderData
    };
    updatedState.loading = false;
    updatedState.orders = state.orders.concat(newOrder);
    return updatedState;
}

const purchaseBurgerFail = (state, action, updatedState) => {
    updatedState.loading = false;
    return updatedState;
}
