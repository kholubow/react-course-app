import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

// Kontener zawierajacy strone z podsumowaniem
// zakupu Burgera
// Przekazanie skladnikow zeby Burger zostal zbudowany
// jeszcze raz
// Zostanie do tego wykorzystany routing w BurgerBuilder.js



/*
        const queryParams = [];

         for (let i in this.state.ingredients) {
             queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
         }
        const queryString = queryParams.join('&');
         this.props.history.push({
             pathname: '/checkout',
             search: '?' + queryString
         });
*/



/*
    Oczywiscie tak przekazane dane do adresu trzeba
    tutaj odebrac:
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients });
    }
*/



// Uzyta w App.js
// Strona z podsumowaniem zakupienia powinna sie wyswietlic
// po ORDER NOW -> CONTINUE
// Do tego trzeba wykorzystac routing:
// npm install --save react-router-dom
// W BurgerBuilder.js - uzycie tego komponentu, przejscie do
// niego po routingu: this.props.history.push('/checkout')
// Przyciski CANCEL i CONTINUE wywoluja metody znajdujace sie
// tutaj
// this.props.history.goBack(); - cofniecie do poprzedniej strony



// contact-data -> przekierowanie do formularza kontaktowego
// Oczywiscie wyswietlenie formularza tutaj


// Do formularza kontaktowego zostaja przekazane skladniki
// render = {() => (<ContactData ingredients = { this.state.ingredients } />)} />
// totalPrice takze zostaje przekazany do formularza
// queryParams.push( 'price=' + this.state.totalPrice );
// push na koniec adresu wartosci zakupu i odebranie tutaj



// W BurgerBuilder.js po kliknieciu CONTINUE dane (cala cena,
// poszczegolne skladniki i ich liczba) sa pushowane do routingu
// nastepnie tutaj w kontenerze do podsumowania zakupu dane sa 
// odczytywane z routingu i aktualizowany jest state aplikacji
// Zebrane w ten sposob dane sa wysylane np. do formularza

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }   
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients = { this.props.ings } 
                                 checkoutCancelled = { this.checkoutCancelledHandler } 
                                 checkoutContinued = { this.checkoutContinuedHandler } />
                <Route path = { this.props.match.path + '/contact-data' }
                       component = { ContactData } />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);
