import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import LoginScreen from "./ventanas/login/login";
import Main from "./ventanas/main/main";
import RutasPrivadas from "./ventanas/privadas/RutasPrivadas";
import './App.css';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="contenedor">
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <RutasPrivadas path="/">
              <Main />
            </RutasPrivadas>
          </Switch>
        </div>
      </BrowserRouter >
    </AuthProvider >
  );
}

export default App;
