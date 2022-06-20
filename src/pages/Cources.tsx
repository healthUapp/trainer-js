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
export default function Exercise() {

    const [chosenСourse, setChosenСourse] = useState<number[] | null>(null)
    const [exerciseTime, setExerciseTime] = useState(60)
    const [cameraReadiness, setCameraReadiness] = useState(false)
    const allCources = [[5,8,4,8,1,0,6],[0,1,2],[3,4,5],[6,7,8]]
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
    

    return (
        <IonContent className="startPage" fullscreen>
            <div className="exerciseView">
                {(chosenСourse === null) &&
                    <div className='buttonBox'>
                        <div className="buttons">   
                            {
                                allCources.map((cource, index)=>{
                                    return <IonButton className={`exercise bg${(index)}`} 
                                        key={index} expand="full"
                                        onClick={()=>{setChosenСourse(cource)}}
                                        style={{"--background":`rgb(0,${200-((200/allCources.length) * index)},0)`}}
                                        >{cource.toString()}</IonButton>
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
                        {visibleBody &&
                            // @ts-ignore
                            <Interface dots={dots} colors={colors}/>
                        }
                        <canvas ref={canvasRef} className="draw"/>
                    </div>
                    {(chosenСourse !== null) && <>
                        <Trainer 
                            visibleBody={visibleBody}
                            dots = {dots}
                            cource={chosenСourse} 
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