import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './App.css';
import {NavLink, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
//REDUX
import { useSelector, useDispatch } from 'react-redux'


const Home: React.FC = () => {
    return (
        <IonContent className="startPage" fullscreen>
            <NavLink to="trainer">
                <IonButton className='button'>START</IonButton>
            </NavLink>
        </IonContent>
    );
};

export default Home;
