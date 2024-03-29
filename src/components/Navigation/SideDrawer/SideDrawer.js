import React from "react";
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import NavigationItems from "../NavigationItems/NavigationItems";
const sideDrawer = (props)=>{
    let attatchedClasses =[classes.SideDrawer, classes.Close];
    if(props.open) {
        attatchedClasses =[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attatchedClasses.join(' ')}>
            <div className={classes.Logo}><Logo /></div>  
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
        
    );
}
export default sideDrawer;