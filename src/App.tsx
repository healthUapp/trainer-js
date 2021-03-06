import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Days from './pages/Days'




setupIonicReact();





const App: React.FC = () => {


    
return (
    <IonApp>
        <IonReactRouter>
            <Redirect exact path="/" to="/trainer"/> 
            <IonRouterOutlet>
                <Route path="/trainer">
                    <Days/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
)};

export default App;
