import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {NavLink, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';
import Trainer from '../components/Trainer';

export default function Exercise() {

    const [exerciseValue, setExerciseValue] = useState<number | null>(null)
    const exerciseNames = ["GOOD MORNING","CABARET","MARCH IN PLACE","LEG PUSH","SQUAT","REVERSE LUNGE","CALF RISES","JUMPING JACK"]
    return (
        <IonContent className="startPage" fullscreen>
            {(exerciseValue === null) &&
                <div className='buttonBox'>
                    {
                        exerciseNames.map((name, index)=>{
                            return <IonButton className={`exercise-${(index)}`} key={index} expand="full" onClick={()=>setExerciseValue(index)}>{name}</IonButton>
                        })
                    }
                </div>
            }
            {(exerciseValue !== null) && <Trainer exerciseName={exerciseNames[exerciseValue]} exerciseValue={exerciseValue}/>}
        </IonContent>
    )
}