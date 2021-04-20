import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../configs/Authcontext';


function RutasPrivadas({ children, ...props }) {

    const userContext = useContext(AuthContext);

    return (
        <Route exact {...props} render={() => userContext.user ? (children) : (<Redirect to="/login" />)} />
    );
}

export default RutasPrivadas;