import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const BASE_PRICE = 4;

const initialState = {
    ingredients: null,
    totalPrice: BASE_PRICE,
    error: false
};

const reducer = (state = initialState, action) => {
    let updatedState = JSON.parse(JSON.stringify(state));

    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            updatedState = addIngredient(state, action, updatedState);
            break;
        case actionTypes.REMOVE_INGREDIENT:
            updatedState = removeIngredient(state, action, updatedState);
            break;
        case actionTypes.SET_INGREDIENTS:
            updatedState = setIngredient(state, action, updatedState);
            break;
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            updatedState = fetchIngredientFail(state, action, updatedState);
            break;
        default:
            console.log("[BurgerBuilder Reducer] Action default case");
            break;
    }

    return updatedState;
};

export default reducer;

// Auxiliary Functions
const addIngredient = (state, action, updatedState) => {
    updatedState.ingredients[action.ingredientName] =  state.ingredients[action.ingredientName] + 1;
    updatedState.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
    return updatedState;
}

const removeIngredient = (state, action, updatedState) => {
    updatedState.ingredients[action.ingredientName] =  state.ingredients[action.ingredientName] - 1;
    updatedState.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
    return updatedState;
}

const setIngredient = (state, action, updatedState) => {
    let price = BASE_PRICE;
    for (let ingredient in action.ingredients) {
        price += INGREDIENT_PRICES[ingredient] * action.ingredients[ingredient];
    }
    updatedState.ingredients = {
        salad: action.ingredients.salad,
        cheese: action.ingredients.cheese,
        bacon: action.ingredients.bacon,
        meat: action.ingredients.meat
    };
    updatedState.totalPrice = price;
    updatedState.error = false;
    return updatedState;
}

const fetchIngredientFail = (state, action, updatedState) => {
    updatedState.error = true;
    return updatedState;
}
