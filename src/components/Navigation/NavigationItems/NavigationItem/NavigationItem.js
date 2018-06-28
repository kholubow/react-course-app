import React from 'react';
import classes from './NavigationItem';

const navigationItem = (props) => (
    <li className = { classes.NavigationItem } >
        <a href="/">A Link</a>
    </li>
);

export default navigationItem;