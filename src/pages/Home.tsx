import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './App.css';
import {NavLink, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
//REDUX
import { useSelector, useDispatch } from 'react-redux'


const Home: React.FC = () => {

    return (
        <IonPage>
            <IonContent className="startPage" fullscreen>
                <h1>1</h1>
            </IonContent>
        </IonPage>
    );
};

export default Home;
