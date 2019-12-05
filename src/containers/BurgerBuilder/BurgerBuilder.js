import React, {Component} from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurguerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                const ingredients = response.data;
                let price = this.state.totalPrice;
                for (let ingredient in ingredients) {
                    price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
                }
                this.setState({
                    ingredients: ingredients,
                    totalPrice: price
                });
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        // Updating ingredients
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;

        // Updating pricing
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        // Updating state
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        // Updating purchasable
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // Updating ingredients
        const oldCount = this.state.ingredients[type];
        // You can't have negative ingredients
        if (oldCount <= 0) return;
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;

        // Updating pricing
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeduction;

        // Updating state
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        // Updating purchasable
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Player 1',
        //         address: {
        //             street: 'Test 1',
        //             zipCode: '12345',
        //             country: 'Spain'
        //         },
        //         email: 'player1@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     });
        const queryParams = [];
        for (let ingredient in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
        }
        const queryString  = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable} 
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients} 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinuedHandler}
                                price={this.state.totalPrice}
                            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurguerBuilder, axios);
