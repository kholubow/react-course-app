import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

/*

    Pasek nawigacyjny dodany w App.js a dokladniej
    w Layout, bo oczywiscie akurat ten element musi
    byc wyswietlony caly czas, niezaleznie od podstrony
    jaka mamy
    Logo - obrazki jak zawsze w assets
    Musimy importowac jak w przykladzie Logo.js ten obrazek

// ---------------------------------------------------------- //

    NavigationItems, kazdy link daje sie jako oddzielny 
    komponent. 
    Opisany troche NavigationItems:


*/
const toolbar = (props) => (
    <header className = { classes.Toolbar } >
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;