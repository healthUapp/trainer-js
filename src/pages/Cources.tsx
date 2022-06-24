import { IonContent, IonImg, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';

import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../App.css';
import '../Cards.scss'
import Trainer from '../components/Trainer';
import Webcam from "react-webcam";
import Interface from "../components/Interface";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import checkBody from "../components/checkBody";


//GIF
import marchGif from '../assets/gif/March.gif'
import goodMorningGif from '../assets/gif/GM.gif'
import cabaretGif from '../assets/gif/Cabaret.gif'
import lungeGif from '../assets/gif/BL.gif'
import legPushGif from '../assets/gif/SLDL.gif'

//JPG
import set1 from '../assets/jpg/set1-min.jpg'
import set2 from '../assets/jpg/set2-min.jpg'
import set3 from '../assets/jpg/set3-min.jpg'

//SVG
import cheked from '../assets/svg/cheked.svg'
import uncheked from '../assets/svg/uncheked.svg'


export default function Exercise() {
    const exerciseNames = ["GOOD MORNING", "CABARET LEFT", "MARCH IN PLACE", "LEG PUSH", "SQUAT", "REVERSE LUNGE", "CALF RISES", "JUMPING JACK", "HALF JACK", "CABARET RIGHT", "SIDE LEG RISES", "STEP SIDE JACK"]
    const allSets = {
        names:  ["Monday", "Tuesday", "Wednesday"],
        images: [set1, set2, set3],
        exercises: [[2, 0, 5, 1, 9, 3],
        [0, 2, 0, 1, 4, 3], [6,7,8,6]]
    }
    const allExercises = exerciseNames.map((name) => {
        let time;
        let gif;
        switch (name) {
            case "GOOD MORNING":
                time = 30
                gif = goodMorningGif
                break;

            case "CABARET LEFT":
                time = 30
                gif = cabaretGif
                break;
            case "MARCH IN PLACE":
                time = 30
                gif = marchGif
                break;

            case "LEG PUSH":
                time = 30
                gif = legPushGif
                break;
            case "SQUAT":
                time = 30
                gif = goodMorningGif
                break;

            case "REVERSE LUNGE":
                time = 30
                gif = lungeGif
                break;
            case "CALF RISES":
                time = 30
                gif = goodMorningGif
                break;

            case "JUMPING JACK":
                time = 30
                gif = goodMorningGif
                break;
            case "HALF JACK":
                time = 30
                gif = goodMorningGif
                break;
            case "CABARET RIGHT":
                time = 30
                gif = cabaretGif
                break;
            case "SIDE LEG RISES":
                time = 30
                gif = goodMorningGif
                break;
            case "STEP SIDE JACK":
                time = 30
                gif = goodMorningGif
                break;

        }

        return {
            name: name,
            time: time,
            gif: gif
        }
    })

    const [chosenСourse, setChosenСourse] = useState<number[] | null>(null)
    const [cameraReadiness, setCameraReadiness] = useState(false)
    
    const cameraRef: any = useRef(null)
    const canvasRef: any = useRef(null)

    const [dots, setDots] = useState(undefined)
    const [visibleBody, setVisibleBody] = useState(false)
    const [colors, setColors] = useState({
        arm: {
            left: 'white',
            right: 'white'
        },
        body: {
            up: 'white',
            down: 'white',
            left: 'white',
            right: 'white'
        },
        leg: {
            left: 'white',
            right: 'white'
        }
    })

    let camera = null;

    function unselectCource() {
        setChosenСourse(null)
    }

    function onResults(results: any) {

        const videoWidth = cameraRef.current.video.videoWidth;
        const videoHeight = cameraRef.current.video.videoHeight;
        // Set canvas width

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );

        canvasCtx.restore();

        setVisibleBody(checkBody(results.poseLandmarks))

        if (results.poseLandmarks) {
            setDots(results.poseLandmarks)
        }
    }

    function drawCards(){
        return (
            <div className="cardsBox">
                        {    
                            allSets.exercises.map((cource, index) => {
                                return  (
                                <div  
                                    className={`card bg${(index)}`} 
                                    key={index}
                                    onClick={() => { setChosenСourse(cource) }}
                                >
                                       <div className='cardImgBox'>
                                        <img className='cardImg' src={allSets.images[index]} />
                                       </div>
                                        
                                        <div className="cardText">
                                            <h5 className='cardHighText'>{allSets.names[index]}</h5>
                                            <div className='cardLowerTextBox'>
                                                <p className='cardLowerText'>5 min</p>
                                                <p className='cardLowerText'>9 ex.</p>
                                                <div className='cardLowerIconsBox'>
                                                    <p className='cardLowerIconsText'>workouts</p>
                                                    <div className='cardLowerIconsCheckedBox'>
                                                        <img className='cardLowerIconsCheckedIcon' src={cheked} alt="" />
                                                        <img className='cardLowerIconsCheckedIcon' src={cheked} alt="" />
                                                        <img className='cardLowerIconsCheckedIcon' src={uncheked} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                )
                            })
                        }
            </div>
        )
    }

    useEffect(() => {
        console.log(cameraReadiness)
    }, [cameraReadiness])

    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });


        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: false,
            minDetectionConfidence: 0.6,
            minTrackingConfidence: 0.6
        });

        //@ts-ignore
        pose.onResults(onResults);

        if (
            typeof cameraRef.current !== "undefined" &&
            cameraRef.current !== null
        ) {
            console.log('upTrue')
            camera = new cam.Camera(cameraRef.current.video, {
                onFrame: async () => {
                    await pose.send({ image: cameraRef.current.video });
                    if (!cameraReadiness) {
                        setCameraReadiness(true)
                    }
                },
                width: 640,
                height: 480,
            });
            camera.start();
        } else {
            console.log('false')
        }
    }, []);


    return (
        <IonContent className="startPage" fullscreen>
            <div className="exerciseView">
                {(chosenСourse === null) &&
                    drawCards()
                }

                <div className='drawBox' style={chosenСourse ? { "display": "inline-flex" } : { "display": "none" }}>
                    <Webcam
                        width={"1280"}
                        height={"720"}
                        ref={cameraRef}
                    />
                    <div className="canvasBox">
                        <div className="svgBox">
                            {visibleBody &&
                                // @ts-ignore
                                <Interface dots={dots} colors={colors} />
                            }
                            <canvas ref={canvasRef} className="draw" />
                        </div>
                    </div>
                    {(chosenСourse !== null) && <>
                        <Trainer
                            setColors={setColors}
                            visibleBody={visibleBody}
                            dots={dots}
                            cource={chosenСourse}
                            allExercises={allExercises}
                            unselectCource={unselectCource}   
                        />
                    </>}

                </div>
            </div>

            {!cameraReadiness && <div className="loadingView">
                <h1>LOADING...</h1>
            </div>}

        </IonContent>
    )

}