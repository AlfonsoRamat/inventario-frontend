import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";
import LoginScreen from "./ventanas/login/login";
import Main from "./ventanas/main/main";
import RutasPrivadas from "./ventanas/privadas/RutasPrivadas";
import { PropagateLoader } from "react-spinners";
import './App.css';
import { useContext, useEffect, useState } from "react";

function App() {

  const userContext = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);


  async function initialRun() {
    if (localStorage.getItem("token")) {
     await userContext.getData(history);
     setLoading(false);
    } else {
     await userContext.signOut();
     setLoading(false);
    }
  }

  useEffect(() => {
    initialRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <div className="contenedor">
        {loading ? <div className="spinner">
          <PropagateLoader size={30} color="rgba(205, 109, 147, 0.8)" />
        </div>
          :
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <RutasPrivadas path="/">
              <Main />
            </RutasPrivadas>
          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
