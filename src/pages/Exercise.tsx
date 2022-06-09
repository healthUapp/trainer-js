import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {NavLink, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Trainer from './Trainer';

export default function Exercise() {

    const [exerciseName, setExerciseName] = useState<Number | null>(null)
    
    return (
        <IonContent className="startPage" fullscreen>
            {(exerciseName === null) &&
                <div className='buttonBox'>
                    <IonButton className='exercise-1' expand="full" onClick={()=>setExerciseName(1)}>START-1</IonButton>
                    <IonButton className='exercise-2' expand="full" onClick={()=>setExerciseName(2)}>START-2</IonButton>
                    <IonButton className='exercise-3' expand="full" onClick={()=>setExerciseName(3)}>START-3</IonButton>
                    <IonButton className='exercise-4' expand="full" onClick={()=>setExerciseName(4)}>START-4</IonButton>
                </div>
            }
            {(exerciseName === 1) && <Trainer exerciseName = {exerciseName}/>}
            {(exerciseName === 2) && <Trainer exerciseName = {exerciseName}/>}
            {(exerciseName === 3) && <Trainer exerciseName = {exerciseName}/>}
            {(exerciseName === 4) && <Trainer exerciseName = {exerciseName}/>}
        </IonContent>
    )
}