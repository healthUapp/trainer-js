import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Trainer from "./pages/Trainer"

setupIonicReact();

const App: React.FC = () => { 

return (
    <IonApp>
        <IonReactRouter>
            <Redirect exact path="/" to="/trainer"/> 
            <IonRouterOutlet>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/trainer">
                    <Trainer/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
)};

export default App;
