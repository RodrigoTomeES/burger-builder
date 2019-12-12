import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 5
};

const reducer = (state = initialState, action) => {
    let updatedState = {
        ...state,
        ingredients: {
            ...state.ingredients
        }
    };

    const ingredient = action.ingredientName;

    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            updatedState.ingredients[ingredient] =  state.ingredients[ingredient] + 1;
            updatedState.totalPrice = state.totalPrice + INGREDIENT_PRICES[ingredient];
            break;
        case actionTypes.REMOVE_INGREDIENT:
            updatedState.ingredients[ingredient] =  state.ingredients[ingredient] - 1;
            updatedState.totalPrice = state.totalPrice - INGREDIENT_PRICES[ingredient];
            break;
        default:
            console.log("Action default case");
            break;
    }

    return updatedState;
};

export default reducer;
