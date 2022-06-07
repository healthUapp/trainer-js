import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';


setupIonicReact();

const App: React.FC = () => { 

return (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
)};

export default App;
