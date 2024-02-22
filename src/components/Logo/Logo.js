import React from "react";
import classes from "./Logo.css";
import burgerLogo from "../../assets/images/logo.png";
const logo =(props)=>(
    <div className={classes.Logo}>
        <img alt ="Burger Logo" src={burgerLogo}/>
    </div>
);
export default logo;