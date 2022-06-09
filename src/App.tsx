import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Exercise from './pages/Exercise'
import Trainer from "./pages/Trainer"

setupIonicReact();

const App: React.FC = () => { 

return (
    <IonApp>
        <IonReactRouter>
            <Redirect exact path="/" to="/home"/> 

            <IonRouterOutlet>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/exercise">
                    <Exercise/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
)};

export default App;
