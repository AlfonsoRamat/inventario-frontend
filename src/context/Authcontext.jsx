import React, { useState } from 'react';
import AxiosInstance from '../extras/configs/AxiosInstance';

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);


    const getData = async (history) => {
        try {
            const userResult = (await AxiosInstance(history).get('/usuarios/get-user')).data;
            const logedUser = { nombre: userResult.nombre, permisos: userResult.permisos };
            setUser(logedUser);
        } catch (error) {
            console.log('getData executed logout');
            signOut();
        }


    }

    const signIn = async (nombre, password) => {

        const request = {
            nombre: nombre,
            password: password
        }
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
    }

    const signOut = () => {
        console.log('signOut Executed');
        AxiosInstance().delete('/usuarios/logout').then(res => {
            console.log('Succesfully logged out');
        }).catch(err => console.log('There was an error')).finally(() => {
            console.log('finally');
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