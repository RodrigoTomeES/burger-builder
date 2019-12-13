import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    let updatedState = JSON.parse(JSON.stringify(state));

    switch ( action.type ) {
        case actionTypes.PURCHASE_BURGER_INIT:
            updatedState = purchaseBurgerInit(state, action, updatedState);
            break;
        case actionTypes.PURCHASE_BURGER_START:
            updatedState = purchaseBurgerStart(state, action, updatedState);
            break;
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            updatedState = purchaseBurgerSuccess(state, action, updatedState);
            break;
        case actionTypes.PURCHASE_BURGER_FAIL:
            updatedState = purchaseBurgerFail(state, action, updatedState);
            break;
        case actionTypes.FETCH_ORDERS_START:
            updatedState = fetchOrdersStart(state, action, updatedState);
            break;
        case actionTypes.FETCH_ORDERS_SUCCESS:
            updatedState = fetchOrdersSuccess(state, action, updatedState);
            break;
        case actionTypes.FETCH_ORDERS_FAIL:
            updatedState = fetchOrdersFail(state, action, updatedState);
            break;
        default:
            console.log("[Order Reducer] Action default case");
            break;
    }

    return updatedState;
};

export default reducer;

// Auxiliary Functions
const purchaseBurgerInit = (state, action, updatedState) => {
    updatedState.purchased = false;
    return updatedState;
}

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
    updatedState.purchased = true;
    updatedState.orders = state.orders.concat(newOrder);
    return updatedState;
}

const purchaseBurgerFail = (state, action, updatedState) => {
    updatedState.loading = false;
    return updatedState;
}

const fetchOrdersStart = (state, action, updatedState) => {
    updatedState.loading = true;
    return updatedState;
}

const fetchOrdersSuccess = (state, action, updatedState) => {
    updatedState.loading = false;
    updatedState.orders = action.orders;
    return updatedState;
}

const fetchOrdersFail = (state, action, updatedState) => {
    updatedState.loading = false;
    return updatedState;
}
