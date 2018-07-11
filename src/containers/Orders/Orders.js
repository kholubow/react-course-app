import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
             .then(res => {
                 console.log(res.data);
                    const fetchedOrders = [];
                    for (let key in res.data) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    this.setState({ loading: false, orders: fetchedOrders });
             })
             .catch(err => {
                    this.setState({ loading: false });
             });
    }

    render () {
        return (
            <div>
            {
                this.state.orders.map(order => (
                    <Order key = { order.id } 
                           ingredients = { order.ingredients } 
                           price = { order.price } />
                ))
            }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
