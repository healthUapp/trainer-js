import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Cources from './pages/Cources'

setupIonicReact();

const App: React.FC = () => { 

return (
    <IonApp>
        <IonReactRouter>
            <Redirect exact path="/" to="/cources"/> 

            <IonRouterOutlet>
                <Route path="/cources">
                    <Cources/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
)};

export default App;
