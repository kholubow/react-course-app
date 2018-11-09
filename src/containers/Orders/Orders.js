import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

// Kontener Orders, korzystajacy, zbierajacy, 
// wykorzystanie pojedynczych zamowien: Order Component
// Wyswietlenie tutaj wszystkich zamowien, zbudowanych
// przy pomocy Order Component

// <Route /> dla Orders.js ustalony w App.js
// Dodanie Link do tego komponentu w Navigation Component
// -> NavigationItems.js

// Wszystkie zamowienia i ceny pobrane z backendu na nowo tutaj
// Komponent odbierajacy wszystkie zamowienia zamkniety
// w nasz error handler component
// Dane przekazywane z backendu do lokalnego state aplikacji
// przemapowane do lokalnej tablicy
// przekazanie danych do pojedynczych zamowien i wyswietlenie
// ich wszystkich tutaj


// Dane o skladnikach odebrane w Order.js trzeba dostosowac
// aby moc je poprawnie wyswietlic

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = (
                    this.props.orders.map(order => (
                        <Order key = { order.id } 
                               ingredients = { order.ingredients } 
                               price = { order.price } />
                    ))         
            );
        };
        return (
            <div>
                { orders }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
