import React, { useState } from 'react';

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {

    const url = 'http://localhost:3004';

    const [user, setUser] = useState(null);


    const updateTokens = async (newToken, newRefreshToken) => {

    }

    const signIn = async (nombre, password) => {
        
        const request = {
            nombre: nombre,
            password: password
        }


        const result = await fetch(`${url}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        
        if (result.ok) {
            const userResult = await result.json();
            setUser(userResult);
        }
        else if (result.status === 404) {
            console.log('Usuario no encontrado');
            console.log(`${nombre}, ${password}`)
        } else if (result.status === 401) {
            console.log('Contraseña/password incorrectos');
        }
    }

    const signOut = async () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, updateTokens, signOut, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}


export { AuthContext, AuthProvider };