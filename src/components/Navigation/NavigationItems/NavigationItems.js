import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let navigationItems = <NavigationItem link="/auth">Authenticate</NavigationItem>;
    if (props.isAuthenticated) {
        navigationItems = (
            <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        );
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burguer Builder</NavigationItem>
            {navigationItems}
        </ul>
    );
};

export default navigationItems;
