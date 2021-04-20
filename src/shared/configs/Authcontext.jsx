import React, { useState } from 'react';
import AxiosInstance from './AxiosInstance';

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const getData = async () => {

        AxiosInstance().get('/usuarios/getuser').then(res => {
            
            setUser(res.data);
        }).catch(err => {
            console.log('getData error', err);
            console.log('getData executed logout');
            signOut();
        });
    }

    const signIn = async (nombre, password) => {
        const request = {
            nombre: nombre,
            password: password
        }
        try {
            const result = await AxiosInstance().post('/usuarios/login', request);
            if (result.status === 200) {
                const loginResult = await result.data;
                localStorage.setItem('token', loginResult.accessToken);
                getData();
            }
            else if (result.status === 404) {
                console.log('Usuario no encontrado');
            } else if (result.status === 401) {
                console.log('Contraseña/password incorrectos');
            }
            return result;
        } catch (error) {
            return error;
        }
    }

    const signOut = () => {
        localStorage.removeItem('token');
        AxiosInstance().delete('/usuarios/logout').then(res => {
            console.log('Succesfully logged out');
        }).catch(err => console.log(err)).finally(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ user, signOut, signIn, getData }}>
            {children}
        </AuthContext.Provider>
    );
}


export { AuthContext, AuthProvider };