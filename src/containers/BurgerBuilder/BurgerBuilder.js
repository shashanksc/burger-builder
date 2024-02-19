import React from "react";
import Aux from "../../hoc/Auxiliary";
import axios from "../../axios-orders";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad : 20,
    cheese : 35,
    bacon: 80,
    meat : 80
}
class BurgerBuilder extends React.Component {
    state ={
        ingredients : {
            salad :0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:20,
        purchasable:false,
        purchasing:false,
        
    }

    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            }).reduce((sum, el)=>{
                return sum + el; 
            },0);
        this.setState({purchasable : sum>0});
    }
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients ={
             ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdditon = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAdditon;
        this.setState({
            totalPrice:newPrice,
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){return;}
        const updatedCount = oldCount-1;
        const updatedIngredients ={
             ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    };
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name : 'John Doe',
                address:{
                    street:'125 Main St',
                    locality: 'anytown',
                    country: 'India',
                    pin: '834001'
                },
            email : 'mail@address.com'
            },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
    }
    render(){
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i]<=0
        }
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                    >
                    <OrderSummary 
                        price={this.state.totalPrice.toFixed(2)}
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler} //
                        purchaseContinue={this.purchaseContinueHandler} //
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;