import React, { useContext, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext';

function RutasPrivadas({ children, ...props }) {

    const userContext = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            userContext.getData(history);
        } else{
            userContext.signOut();
            console.log('user', userContext.user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Route exact {...props} render={() => userContext.user ? (children) : (<Redirect to="/login" />)} />
    );
}

export default RutasPrivadas;