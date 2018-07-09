import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';


// Strona z podsumowaniem zamowienia
// Wykorzystanie naszego Buttona z dynamiczna klasa css
// Button oczywiscie reaguje na klikniecie
// Ponowne wykorzystanie skladnikow aby stworzyc Burgera na 
// stronie z podsumowaniem jeszcze raz
const checkoutSummary = (props) => {
    return (
        <div className = { classes.CheckoutSummary } >
            <h1>We hope it tastes well</h1>
            <div style = {{ width: '100%', margin: 'auto' }} >
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button btnType = "Danger"
                    clicked = { props.checkoutCancelled } >
                    CANCEL
            </Button>
            <Button btnType = "Success"
                    clicked = { props.checkoutContinued } >
                    CONTINUE
            </Button>
        </div>
    );
}

export default checkoutSummary;
