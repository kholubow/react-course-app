// npm install --save axios
// Wykorzystane zostanie backend Firebase tutaj ale oczywiscie
// logika laczenia sie ze swoim .NET'owym backendem taka sama
// Uzyte w BurgerBuilder.js
// Firebase database - struktura/logika MongoDB
// Podczas laczenia sie z backendem dodanie spinnera, ze cos
// sie dzieje
// Folder: components/UI/Spinner
// Google: css spinners
// Spinner uzyty w BurgerBuilder.js
// State: loading, jezeli true to Spinner, jezeli nie, to
// OrderSummary
// Logika Spinnera w BurgerBuilder.js:
/*
        let orderSummary = <OrderSummary ingredients = { this.state.ingredients } 
                                         purchaseCancelled = { this.purchaseCancelHandler } 
                                         purchaseContinued = { this.purchaseContinueHandler } 
                                         price = { this.state.totalPrice } />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelHandler } >
                        { orderSummary }
                </Modal>
*/

/*
        purchaseContinueHandler(), czyli klikamy aby 
        kontynuowac zakup, wtedy loading: true, czyli wyswietli
        sie spinner komponent,
        Nastepnie jak przyjdzie odpowiedz z serwera to 
        loading: false lub jezeli wystapil blad z polaczeniem
*/

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6e0f8.firebaseio.com/'
});

export default instance;
