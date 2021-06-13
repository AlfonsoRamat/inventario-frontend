import React, { useState } from "react";
import AxiosInstance from "./AxiosInstance";

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getData = async () => {
    AxiosInstance()
      .get("/usuarios/getuser")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        signOut();
      });
  };

  function signIn(nombre, password) {
   
    const request = {
      nombre: nombre,
      password: password,
    };

    return AxiosInstance()
      .post("/usuarios/login", request)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        getData();
        return;
      })
      .catch((err) => {
        const mensaje = err.data.error.message;
        return mensaje;
      });
  }

  const signOut = () => {
    localStorage.removeItem("token");
    AxiosInstance()
      .delete("/usuarios/logout")
      .then((res) => {
        console.log("Succesfully logged out");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider value={{ user, signOut, signIn, getData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
