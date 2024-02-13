import React ,{Component} from "react";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Auxiliary";
class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] will update');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey =>{
            return (<li key={igkey}>
                     <span style={{textTransform:'capitalize'}}>{igkey} </span>: {this.props.ingredients[igkey]}
                </li>);
        })
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        );
    }
};
export default OrderSummary;