import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';

import {NavLink, useHistory} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../App.css';
import Trainer from '../components/Trainer';
import Webcam from "react-webcam";
import Interface from "../components/Interface";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import checkBody from "../components/checkBody";

import marchGif from '../assets/gif/1.gif'
import goodMorningGif from '../assets/gif/2.gif'
import cabaretGif from '../assets/gif/4.gif'
import lungeGif from '../assets/gif/5.gif'

export default function Exercise() {
    const exerciseNames = ["GOOD MORNING","CABARET LEFT","MARCH IN PLACE","LEG PUSH","SQUAT","REVERSE LUNGE","CALF RISES","JUMPING JACK","HALF JACK","CABARET RIGHT","STEP SIDE JACK"]
    const [chosenСourse, setChosenСourse] = useState<number[] | null>(null)
    const [exerciseTime, setExerciseTime] = useState(60)
    const [cameraReadiness, setCameraReadiness] = useState(false)
    const allCources = [[2,0,5,1,9,3]
        // {
        //     name: 'Power Trim',
        //     time: 20,
        //     exercises: [[5,5],[8,5],[4,5],[8,5]]
        // },
        // {
        //     name: 'Something Else',
        //     time: 20,
        //     exercises: [[0,5],[1,5],[2,5],[3,5]]
        // }
    ]
    const allExercises = exerciseNames.map((name)=>{
        let time;
        let gif;
        switch (name) {
            case "GOOD MORNING":
                time = 60
                gif = goodMorningGif
                break;
            
            case "CABARET LEFT":
                time = 30
                gif = cabaretGif
                break;
            case "MARCH IN PLACE":
                time = 60
                gif = marchGif
                break;
            
            case "LEG PUSH":
                time = 60
                gif = goodMorningGif
                break;
            case "SQUAT":
                time = 60
                gif = goodMorningGif
                break;
            
            case "REVERSE LUNGE":
                time = 60
                gif = lungeGif
                break;
            case "CALF RISES":
                time = 60
                gif = goodMorningGif
                break;
            
            case "JUMPING JACK":
                time = 60
                gif = goodMorningGif
                break;
            case "HALF JACK":
                time = 60
                gif = goodMorningGif
                break;
            case "CABARET RIGHT":
                time = 30
                gif = cabaretGif
                break;
            case "STEP SIDE JACK":
                time = 60
                gif = goodMorningGif
                break;
        
        }

        return {
            name: name,
            time: time,
            gif: gif
        }
    })
    const cameraRef:any = useRef(null)
    const canvasRef:any= useRef(null)
    const [dots,setDots] = useState(undefined)
    const [visibleBody, setVisibleBody] = useState(false)
    const [colors,setColors] = useState({
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

    var camera = null;
    
    function unselectCource(){
        setChosenСourse(null)
    }

    function onResults(results:any) {

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
        
      if(results.poseLandmarks) {
        setDots(results.poseLandmarks)
      }
    }

    useEffect(()=>{
        console.log(cameraReadiness)
    },[cameraReadiness])

    useEffect(() => {
        const pose = new Pose({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }});
    
        
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
                if(!cameraReadiness){
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
    
    // function drawCourcesButtons(){
    //     for (const cource of allCources) {
    //         () => {
    //             return <div></div>
    //         }
    //     }
    // }

    return (
        <IonContent className="startPage" fullscreen>
            <div className="exerciseView">
                {(chosenСourse === null) &&
                    <div className='buttonBox'>
                        <div className="buttonsCr">   
                        
                            {   
                                // drawCourcesButtons()
                                allCources.map((cource, index)=>{
                                    return <IonButton className={`exercise bg${(index)}`} 
                                        key={index} expand="full"
                                        onClick={()=>{setChosenСourse(cource)}}
                                        style={{"--background":`rgb(20,${170 - (150 * index /allExercises.length)},80)`}}
                                        >{cource.toString()}</IonButton>
                                })
                            }
                        </div>
                        <div className="buttonsEx">   
                            {
                                allExercises.map((ex: any, index)=>{
                                    return <IonButton className={`exercise bg${(index)}`} 
                                        key={index} expand="full"
                                        onClick={()=>{setChosenСourse([index])}}
                                        style={{"--background":`rgb(120,${200 - (200/allExercises.length) * index},0)`}}
                                        >{ex.name}</IonButton>
                                })
                            }
                        </div>
                    </div>
                }
                
               
                <div className='drawBox' style={chosenСourse ? {"display": "inline-flex"}:{"display": "none"}}>
                    <Webcam
                        width={"1280"}
                        height={"720"}
                        ref={cameraRef}
                    />
                    <div className="canvasBox">
                        <div className="svgBox">
                            {visibleBody &&
                                // @ts-ignore
                                <Interface dots={dots} colors={colors}/>
                            }
                            <canvas ref={canvasRef} className="draw"/>
                        </div>
                    </div>
                    {(chosenСourse !== null) && <>
                        <Trainer 
                            setColors={setColors}
                            visibleBody={visibleBody}
                            dots = {dots}
                            cource={chosenСourse} 
                            allExercises = {allExercises}
                            unselectCource={unselectCource}
                        />
                    </>}
                
                </div>
                
            </div>
            {!cameraReadiness && <div className="loadingView">   
                <h1>LOADING...</h1>
            </div>}
            {/* @ts-ignore */}
            
        </IonContent>
    )
    
}