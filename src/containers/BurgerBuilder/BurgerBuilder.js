import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    
updatePurchaseState(ingredients) {
    // Sprawdzenie czy mozna juz zamowic burger
    // 1. Korzystanie z najnowszej tablicy ingredients zamiast
    // kopiowanie state (...this.state.ingredients)
    // 2. sum jest stala, bedaca liczba wszystkich skladnikow
    // bedzie mozna zamowic burgera jezeli wystepuje choc jeden
    // skladnik
    const sum = Object.keys(ingredients).map(igKey => {
        return ingredients[igKey];
    })
    .reduce((sum, el) => {
        return sum + el;
    }, 0);
    // 3. Zaktualizowanie oryginalnego state aplikacji
    // na sam koniec
    // purchasable: true, jezeli sum > 0
    this.setState({purchasable: sum > 0});
    // Info idzie do BuildControls
    // Button bedzie dostepny, jezeli bedzie wartosc true 
    // przekazana
    // Metode trzeba gdzies wywolac:
    // W addIngredient i removeIngredient
    // Metoda ta przyjmuje dane (tablice ingredients) aby
    // posiadac ich najbardziej aktualna wersje
}


addIngredientHandler = (type) => {
    // 1. Po type (nazwa skladnika z BuildControls) pobranie z tablicy
    // obecnego stanu
    const oldCount = this.state.ingredients[type];
    // 2. Zwiekszenie o 1 (po kliknieciu MORE)
    const updatedCount = oldCount + 1;
    // 3. Pobranie calej oryginalnej tablicy
    const updatedIngredients = {
        ...this.state.ingredients
    };
    // 4. Po type dokonanie aktualizacji zwiekszonej ilosci o 1
    updatedIngredients[type] = updatedCount;
    // 5. Z nowej tablicy wyszukanie ceny skladnika jaki tutaj dotarl
    // po kliknieciu z BuildControls (type)
    const priceAddition = INGREDIENT_PRICES[type];
    // 6. Pobranie z tablicy aktualnej kwoty do zaplaty
    const oldPrice = this.state.totalPrice;
    // 7. Do juz istniejacej kwoty do zaplaty dodanie wartosci
    // wybranego skladnika
    const newPrice = oldPrice + priceAddition;
    // 8. Finalne zaktualizowanie calego state
    this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients
    });
    // Ogolny przebieg addIngredient:
    /*
        1. BuildControls na podstawie tablicy generuje poszczegolne
           przyciski (control) i kazdy z takowych w przycisku MORE posiada
           click listener ktory wywoluje props.added
        2. Jest to wywolanie added w BuildControls, czyli dalej,
           wywolanie props.ingredientAdded wraz z przekazaniem aktualnie 
           wybranego type (nazwy skladnika)
        3. Do BurgerBuilder trafia wywolanie ostateczne metody addIngredientHandler
           ktora otrzymuje type
    */
    this.updatePurchaseState(updatedIngredients);
}


removeIngredientHandler = (type) => {

    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients
    });
    // Ogolny przebieg removeIngredient:
    /*
        Analogicznie jak przy addIngredient
    */
    this.updatePurchaseState(updatedIngredients);
}

purchaseHandler = () => {
    this.setState({purchasing: true});
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    alert('You continue');
}



    render () {
        //-----------------------------------------------
        /*
            Jezeli jakis skladnik wystepuje 0 razy to
            przy nim pojawi sie true czyli miejsce w ktorym
            nastapi wylaczenie sie buttona
            Do BuildControls wysylka tylko tablicy
            bo ona juz zawiera true/false do danych
            skladnikow
            disabled = { props.disabled[ctrl.type] }
            Kazdy przycisk musi pobrac informacje czy 
            musi byc disabled a tablica jaka tam przyszla
            posiada wszystkie skladniki na raz wiec trzeba
            uzyskac w ten sposob info o konkretnym skladniku
        */
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //-----------------------------------------------
        return (
            <Aux>
                <Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelHandler } >
                    <OrderSummary ingredients = { this.state.ingredients } 
                                  purchaseCancelled = { this.purchaseCancelHandler } 
                                  purchaseContinued = { this.purchaseContinueHandler } 
                                  price = { this.state.totalPrice } />
                </Modal>
                <Burger ingredients = { this.state.ingredients } />
                <BuildControls ingredientAdded = { this.addIngredientHandler } 
                               ingredientRemoved = { this.removeIngredientHandler } 
                               disabled = { disabledInfo }
                               purchasable = { this.state.purchasable } 
                               price = { this.state.totalPrice } 
                               ordered = { this.purchaseHandler } />
            </Aux>
        );
    }
}

export default BurgerBuilder;