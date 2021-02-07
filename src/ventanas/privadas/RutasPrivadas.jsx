import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext';

function RutasPrivadas({ children, ...props }) {

    const userContext = useContext(AuthContext);

    return (
        <Route {...props} render={
            () => userContext.user ? (children) : (<Redirect to="/login" />)
        } />
    );
}

export default RutasPrivadas;