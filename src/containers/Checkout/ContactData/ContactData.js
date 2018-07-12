import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


/*
    Formularz kontaktowy podmieniony na Spinner, jezeli
    jest oczekiwanie na serwer, po kliknieciu 
    ORDER    
    Nastepnie po otrzymaniu pozytywnej odpowiedzi od serwera,
    nastepuje przekierowanie do innej strony
*/

/*
    Kazdy input bedzie oddzielnym komponentem
    UI/Input
    Input komponent tak dostosowany, zeby wyswietlal 
    odpowiedni element formularza w zaleznosci od tego
    jakie parametry tam zostana wyslane poprzez obiekt
    props
*/

/*
    Wygenerowanie odpowiednich inputow o odpowiednich
    typach poprzez uzycie petli zawierajacej elementy
    obiektu orderForm:
    1. Trzeba przerobic obiekt orderForm w taki sposob, 
    zeby uzyskac tablice.
    2. Kazdy key to jest caly oddzielny obiekt, np.
    street, zipCode, name
    natomiast config jest to prawa strona takiego obiektu,
    np. elementType, value:

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        });
    }

    3. Tak stworzona tablice formElementsArray mozna teraz 
    wykorzystac w petli do tworzenia poszczegolnych inputow:

        { 
        formElementsArray.map(formElement => (
            <Input elementType = { formElement.config.elementType } 
                   elementConfig = { formElement.config.elementConfig } 
                   value = { formElement.config.value } 
                   key = { formElement.id } />
        ))
        }

*/



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [ 
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        console.log(this.props.ingredients);
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }    
        axios.post('/orders.json', order)
            .then(response => {
                    console.log(response);
                    this.setState({ loading: false });
                    this.props.history.push('/');
            })
            .catch(error => {
                    console.log(error);
                    this.setState({ loading: false });
            });   
    }

    render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        });
    }

        let form = (
                <form>
                    { 
                    formElementsArray.map(formElement => (
                        <Input elementType = { formElement.config.elementType } 
                               elementConfig = { formElement.config.elementConfig } 
                               value = { formElement.config.value } 
                               key = { formElement.id } />
                    ))
                    }
                    <Button btnType = "Success" 
                            clicked = { this.orderHandler } >
                            ORDER
                    </Button>

                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className = { classes.ContactData } >
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;
