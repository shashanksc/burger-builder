import React from "react";
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls =[
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
    
];
const buildControls =(props) =>(
    
    <div className={classes.BuildControls}>
        <p>Current Price : Rs.{props.price.toFixed()}</p>
        {controls.map(ctrl =>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            removed ={()=>props.ingredientRemoved(ctrl.type)}
            added ={()=>props.ingredientAdded(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchasable}>
            ORDER NOW
        </button>
    </div>
);
export default buildControls;