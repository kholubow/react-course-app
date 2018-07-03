// Handling errors
// Oddzielny komponent, ktory zamknie cala apke, zamknie dokladnie
// wszystkie komponenty w BurgerBuilder.js, bedzie w jakis sposob
// nasluchiwal problemow i na nie reagowal
//
//
//
// Na sam koniec pliku: 
//        export default withErrorHandler(BurgerBuilder, axios);


// Z wykorzystaniem Lifecycle Hooks, state, jezeli przyjdzie
// obiekt error z firebase, zostanie tutaj przypisany do
// wartosci lokalnej error w state a nastepnie wyswietlony
// w Modal komponent, ktory pojawia sie tylko wtedy, gdy wystapil
// jakis blad


// Jezeli istnieje jakis blad to go renderuj i wyswietl, jezeli
// nie to nic nie renderuj:
/*
        <Modal show = { this.state.error } 
               clicked = { this.errorConfirmedHandler } >
               { this.state.error ? this.state.error.message : null }  
        </Modal>  
*/


/*
    return req i res => res, aby zapytania mogly dalej przebiegac
    do/z aplikacji
*/

/*
    Modal komponent posiada Backdrop, czyli tlo przezroczyste
    Jak klikniemy w tlo, komunikat powinien sie zamykac
    Nastepuje takze usuniecie bledu z lokalnego state
*/

import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxFolder/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

    
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }


        render () {
            return (
                    <Aux>
                        <Modal show = { this.state.error } 
                               modalClosed = { this.errorConfirmedHandler } >
                               { this.state.error ? this.state.error.message : null }  
                        </Modal>
                        <WrappedComponent { ...this.props } />
                    </Aux>
            );
        }
    }
} 

export default withErrorHandler;
