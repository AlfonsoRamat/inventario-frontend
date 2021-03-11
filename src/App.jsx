import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";
import LoginScreen from "./ventanas/login/login";
import Main from "./ventanas/main/main";
import RutasPrivadas from "./ventanas/privadas/RutasPrivadas";
import { PropagateLoader } from "react-spinners";
import './App.css';
import { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";


ReactModal.setAppElement(document.getElementById('root'));
function App() {

  const userContext = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);


  async function initialRun() {
    if (localStorage.getItem("token")) {
      console.log('Token encontrado');
     await userContext.getData(history); 
     setLoading(false);
    } else {
      console.log('No se encontro un token');
      setLoading(false);
      try {
        await userContext.signOut();   
      } catch (error) {
        console.log(error);
      }
     
    }
  }

  useEffect(() => {
    initialRun();
    console.log('Initial run');
    //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
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
              <Main history={history} />
            </RutasPrivadas>
          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
