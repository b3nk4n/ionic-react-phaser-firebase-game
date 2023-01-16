import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth/auth';
import { IonReactRouter } from '@ionic/react-router';
import GamePage from './pages/GamePage';
import Lobby from './pages/Lobby';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import "./App.css";

setupIonicReact();

const App = () => {
  const { loading, auth } = useAuthInit();

  if (loading || !auth) {
    return (
      <IonApp>
        <div className="loading-wrapper">
          <IonSpinner color="primary" name="dots" />
        </div>
      </IonApp>
    );
  }

  const { loggedIn } = auth;
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login">
              {!loggedIn ? <Login /> : <Redirect to="/lobby" />}
            </Route>
            <Route exact path="/lobby">
              {loggedIn ? <Lobby /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/game">
              {loggedIn ? <GamePage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              <Redirect to="/lobby" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
      
    </IonApp>
  );
};

export default App;
