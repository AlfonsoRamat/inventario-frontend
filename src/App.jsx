import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { AuthContext } from "./shared/configs/Authcontext";
import LoginScreen from "./login/login";
import Main from "./main/main";
import RutasPrivadas from "./shared/components/privadas/RutasPrivadas";
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
      try {
        await userContext.getData(history);
      } catch (error) {
      } finally {
        setLoading(false);
      }

    } else {
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
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <div className="contenedor">
        {loading ?
          <div className="spinner">
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
