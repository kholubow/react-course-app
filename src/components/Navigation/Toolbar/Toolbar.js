import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

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
    budowanie listy linkow dynamiczne,
    przekazanie tresci linku, czy link jest aktywny (jezeli
    tak to wykorzystanie odpowiedniej klasy css w 
    NavigationItem) i adresu

// ---------------------------------------------------------- //

    Sidedrawer:
    Podreczne menu tylko dla malych urzadzen
    Pojawi sie tylko gdy ustalona wartosc ekranu w css
    zostanie przekroczona,
    Uzyty w Layout.js, jak Toolbar bo tak samo jak 
    Toolbar, SideDrawer powinien byc aktywny caly czas,
    niezaleznie od wyswietlanego kontentu
    Logo przyjmuje wartosc height z Toolbar.js i z
    SideDrawer.js

    NavigationItem - nasze linki - takze zostaly przystosowane
    w css do mobilnych urzadzen
    NavigationItems takze - w jaki sposob pojedyncze linki
    beda finalnie wyswietlane

    SideDrawer korzysta z tla Backdrop takze

    Jezeli SideDrawer jest otwarte, to wysylana jest informacja do
    Backdrop o show = true

    Po kliknieciu na tlo, clicked wywolane (w Backdrop.js)
    Wysylanie show = false

// ---------------------------------------------------------- //

    Po nacisnieciu przycisku MENU, ktory jest oddzielnym komponentem
    DrawerToggle, wywola sie click listener, nastepnie w Toolbar.js
    przechwycenie tego i wyslanie wyzej, jako drawerToggleClicked
    W Layout.js wywola to metode na bezpieczne zmienienie stanu
    aplikacji (na podstawie poprzedniego stanu)

*/
const toolbar = (props) => (
    <header className = { classes.Toolbar } >
        <DrawerToggle clicked = { props.drawerToggleClicked } />
        <div className = { classes.Logo } >
            <Logo />
        </div>
        <nav className = { classes.DesktopOnly } >
            <NavigationItems isAuthenticated = { props.isAuth } />
        </nav>
    </header>
);

export default toolbar;