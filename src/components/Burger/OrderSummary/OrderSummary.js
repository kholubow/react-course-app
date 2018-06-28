import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    /*
        Lista zamowien,
        zawiera liste skladnikow
        uzyskana z obiektu ingredients, dlatego trzeba
        uzyc map aby moc wypisac nazwy skladnikow
        a ich ilosc juz latwiej jest wypisac
        stala ingredientSummary zwraca taka liste
        W kontenerze dla naszej apki - BurgerBuilder
        ten plik jest zamkniety w Modal komponent, ktory
        dokona stylizacji, odpowiada za to, w pliku js jedynie
        co robi to wyswietla OrderSummary
        Boczne menu moze byc tak potraktowane / 
        wyskakujace info jak tutaj
        Menu pojawia sie gdy klikniemy w Order Now
        wtedy wywolywana metoda purchaseHandler()
        Modal komponent , tam trafia info czy show czy nie
        jezeli tak to widoczny, animacja
    // ------------------------------------------------------- //

        Backdrop:
        background-color: rgba(0, 0, 0, 0.5);
        kolor, przezroczystosc
        Backdrop jest scisle zwiazany z Modal wiec tam zostal
        zadeklerowany, jezeli pojawia sie menu, ktore siedzi
        w modal, backdrop, tlo z przezroczystoscia tez sie pojawi
        Tam tez, jezeli show jest true to renderowany jest div 
        robiacy za tlo, jezeli nie to nic nie jest renderowane

        Jezeli klikniemy na tlo, czyli na div, click listener 
        zostanie wywolany, info przekazywane wyzej do Modal, tam
        dalej przekazywane jeszcze wyzej, do BurgerBuilder, gdzie
        przy pomocy metody purchaseCancelHandler() show jest zmieniany
        na false i menu zostanie w ten sposob ukryte

        Jedna zmienna kontroluje i menu i tlo menu

    // ------------------------------------------------------- //

        Button:
        UI - folder menu, wszystko co go dotyczy
        Modal - komponent zamykajacy dane menu do 
        wyswietlenia, obiekt ingredients
        Backdrop - przezroczyste, klikalne tlo
        Button - przycisk ale z dynamiczna css'owa klasa
        props.btnType - w ten sposob zostanie wybrana odpowiednia
        klasa buttona w zaleznosci od potrzeby, z zewnatrz

        Przyciski korzystaja z metod z kontenera aplikacji:
        BurgerBuilder

    */
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return  (<li key = { igKey } >
                    <span style = {{ textTransform: 'capitalize' }} >
                          {igKey}
                    </span>: {props.ingredients[igKey]}
                 </li>
                );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p>
                <strong>
                    Total Price: { props.price.toFixed(2) }
                </strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger"
                    clicked = { props.purchaseCancelled } >
                    CANCEL
            </Button>
            <Button btnType="Success"
                    clicked = { props.purchaseContinued } >
                    CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;