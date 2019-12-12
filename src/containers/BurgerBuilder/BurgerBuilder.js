import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurguerBuilder extends Component {
    state = {
        purchasing: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         const ingredients = response.data;
        //         let price = this.props.price;
        //         for (let ingredient in ingredients) {
        //             price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
        //         }
        //         this.setState({
        //             ingredients: ingredients,
        //             totalPrice: price
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    isPurchasable = () => {
        const ingredients = this.props.ings;
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.isPurchasable()} 
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinuedHandler}
                                price={this.props.price}
                            />;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
