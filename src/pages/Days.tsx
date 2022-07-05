import { IonContent, IonSlides, IonSlide, } from '@ionic/react';

import { useEffect, useState, useRef } from 'react';
import '../App.css';
import Trainer from '../components/Trainer';
import Webcam from "react-webcam";
import Interface from "../components/Interface";
import * as cam from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";
import checkBody from "../components/functions/checkBody";

//GIF
import marchGif from '../assets/gif/March.gif'
import goodMorningGif from '../assets/gif/GM.gif'
import cabaretGif from '../assets/gif/Cabaret.gif'
import lungeGif from '../assets/gif/BL.gif'
import legPushGif from '../assets/gif/SLDL.gif'

//PNG
import day1 from '../assets/png/day1.png'
import day2 from '../assets/png/day2.png'
import day3 from '../assets/png/day3.png'
import day4 from '../assets/png/day1.png'
import day5 from '../assets/png/day2.png'
import day6 from '../assets/png/day3.png'
import day7 from '../assets/png/day2.png'


import start from '../assets/png/start.png'

//SVG
import cheked from '../assets/svg/cheked.svg'
import next from '../assets/svg/nextSlide.svg'
import logo from '../assets/svg/logo.svg'
import fa_lock from '../assets/svg/fa_lock.svg'
import uncheked from '../assets/svg/uncheked.svg'
import loadingHelp from '../assets/svg/loadingHelp.svg'




export default function Days() {
    const allExercises = [
        {
            name :"GOOD MORNING",
            gif : goodMorningGif   
        },
        {
            name:"CABARET LEFT",
            gif : cabaretGif
        },
        {   
            name:"MARCH IN PLACE",
            gif : marchGif
        },
        {
            name:"LEG PUSH",
            gif : legPushGif
        },
        {
            name:"SQUAT",
            gif : goodMorningGif,
        },
        {
            name:"REVERSE LUNGE",
            gif : lungeGif
        },{
            name:"CALF RISES",
            gif : goodMorningGif
        },{
            name:"JUMPING JACK",
            gif : goodMorningGif
        },
        {
            name:"HALF JACK",
            gif : goodMorningGif
        },
        {
            name:"CABARET RIGHT",
            gif : cabaretGif
        },
        {
            name:"SIDE LEG RISES",
            gif : goodMorningGif
        },
        {
            name:"STEP SIDE JACK",
            gif : goodMorningGif
        },
        {
            name:"CHEST EXPANSION",
            gif : goodMorningGif
        },
        {
            name: "SIDE ARM RISES",
            gif : goodMorningGif
        },
        {
            name: "SHRUGS",
            gif : goodMorningGif
        },
        {
            name: "HEAD TILTS LR",
            gif : goodMorningGif
        },

        {
            name: "OVERHEAD SHOULDER STRETCH",
            gif : goodMorningGif
        },
    ]

    const allSets = [
        [
            //По этому индексу вытаскивается упражнение из allExercises
            {exerciseIndex: 2, time: 30},
            {exerciseIndex: 0, time: 30},
            {exerciseIndex: 5, time: 30}, // время в секундаx
            {exerciseIndex: 1, time:30},
            {exerciseIndex: 9, time: 30},
            {exerciseIndex: 3, time: 30},
        ],
        [
            {exerciseIndex: 7, time: 10},
            {exerciseIndex: 4, time: 10},
            {exerciseIndex: 7, time: 10}, // время в секундаx
            {exerciseIndex: 4, time:10},
            {exerciseIndex: 7, time: 10},
            {exerciseIndex: 4, time: 10},

        ],
        [
            {exerciseIndex: 8, time: 10},
            {exerciseIndex: 7, time: 10},
            {exerciseIndex: 8, time: 10}, // время в секундаx
            {exerciseIndex: 7, time: 10},
            {exerciseIndex: 8, time: 10},
            {exerciseIndex: 7, time: 10},

        ],

        [
            {exerciseIndex: 5, time: 15},
            {exerciseIndex: 8, time: 15},
            {exerciseIndex: 4, time: 15}, // время в секундаx
            {exerciseIndex: 8, time: 15},
        ],
        [
            {exerciseIndex: 11, time: 10},
            {exerciseIndex: 7, time: 10},
            {exerciseIndex: 11, time: 10}, // время в секундаx
            {exerciseIndex: 7, time: 10},
        ],

    ]

    const allCources = [
        [3,1,2],
        [1,2,4],
        [5,4,3],
        [2,1,4],
        [1,5,3],
        [],[]
    ]

    const exercisesTimes = allSets.map((exercises)=>{
        let time = 0
        exercises.forEach((exercise)=>{
            time += exercise.time
        })
        return time
    })

    const courcesTimes = allCources.map((setsIndexes)=>{
        let time = 0
        setsIndexes.forEach((setIndex)=>{
            time += exercisesTimes[setIndex]
        })
        return time
    })

    

    const allDays = {
        names:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ,"Sunday"],
        images: [day1, day2, day3, day4, day5, day6, day7],
    }

    const [chosenDay, setChosenDay] = useState<any | null>(null)
    const [chosenСourse, setChosenСourse] = useState<any | null>(null)
    const [cameraReadiness, setCameraReadiness] = useState(false)

    const date = new Date()

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

    const [initialSlide, setTinitialSlide] = useState(0)


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

    useEffect(() => {
        const pose = new Holistic({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
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
            {!cameraReadiness && <div className='loadingViewBox'>
                <div className="loadingView">
                    <h1 className='loadingText'>LOADING...</h1>
                    <img className='loadingHelpIcon' src={loadingHelp} alt="" />       
                </div>
            </div>}
            
            <div className={`exerciseView`}>
                
                {(chosenСourse === null) &&
                   <>
                        <div className="cardsBox">
                                        {    
                                            allCources.map((cource, index) => {
                                                if(index === initialSlide){
                                                    return  (
                                                        <div key={index}>
                                                            <div
                                                                className={`card ${index > 4? "blocked" : ""}`} 
                                                                
                                                                onClick={() => {index <= 4 ? setChosenDay(cource) : alert('Weekends!') }}
                                                            >
                                                                <div className='cardImgBox'>
                                                                    <img className='cardImg' src={day1} />
                                                                    {index > 4 && <img className="faLockSvg" src={fa_lock} />}
                                                                </div>
                                                            
                                                                <div className={`cardText ${index>0? "blocked" : ""}`} >
                                                                    <h5 className='cardHighText'>{allDays.names[index]}</h5>
                                                                    <div className='cardLowerTextBox'>
                                                                        <p className='cardLowerText-1'>{ courcesTimes[index] ? `${Math.floor(courcesTimes[index] / 60)} min. ${(courcesTimes[index] % 60) > 0 ? (`${courcesTimes[index] % 60}s.`) : ""}` : "0 s."}</p>
                                                                        <p className='cardLowerText-2'>{allSets[index] ? allSets[index].length : 0} ex.</p>
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

                                                           {allCources[index + 1] ?
                                                                <div 
                                                                    className='nextSlideBox'
                                                                    onClick={()=>setTinitialSlide(index + 1)}
                                                                >
                                                                    <img src={next} alt="" />
                                                                </div>
                                                                :
                                                                <div 
                                                                    className='nextSlideBox'
                                                                    onClick={()=>setTinitialSlide(0)}
                                                                >
                                                                    <img src={next} alt="" />
                                                                </div>
                                                           }
                                                           {allCources[index - 1]?
                                                                <div 
                                                                    className='beforeSlideBox'
                                                                    onClick={()=>setTinitialSlide(index - 1)}
                                                                    >
                                                                        <img src={next} alt="" />
                                                                </div>
                                                                :
                                                                <div 
                                                                    className='beforeSlideBox'
                                                                    onClick={()=>setTinitialSlide(6)}
                                                                    >
                                                                        <img src={next} alt="" />
                                                                </div>                                                        
                                                            }
                                                        </div>
                                                        )
                                                }
                                            })
                                        }
                        </div>
                        <div className="startImgBox">
                            <img className="startImg" src={start} alt="" />
                            <img className="logoSvg" src={logo} alt="" />
                        </div>
                   </>
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
                            set={chosenСourse}
                            allExercises={allExercises}
                            unselectCource={unselectCource}   
                        />
                    </>}
                </div>

            </div>

            {(chosenDay) && 
                <div className='setsBox' onClick={()=>setChosenDay(null)}>
                    <div className="blueScreen"></div>
                    <div className="prewiewBox">
                        <div className="setPreview">
                            <div className="prewiewInfo">
                                <h1>{date.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/,/g, " ")}</h1>
                                <h5>See which sets can be performed today</h5>
                            </div>
                            <div className="setCardBox">
                                <div className="cardBoxList">
                                {
                                    chosenDay.map((setIndex: number, index: number)=>{
                                        console.log(allSets[setIndex])
                                        return(
                                            <div key={index}>

                                                            <div
                                                                className="setCard"
                                                                
                                                                onClick={() => setChosenСourse(allSets[setIndex])}
                                                            >
                                                                <div className='setCardImgBox'>
                                                                    <img className='setCardImg' src={day2}/>
                                                                </div>
                                                            
                                                                <div className={`cardText`} >
                                                                    <h5 className='setCardHighText'>{`Set №${index}`}</h5>
                                                                    <div className='cardLowerTextBox'>
                                                                        <p className='cardLowerText-1'>{courcesTimes[index] ? `${Math.floor(courcesTimes[index] / 60)} min. ${(courcesTimes[index] % 60) > 0 ? (`${courcesTimes[index] % 60}s.`) : ""}` : "0 s."}</p>
                                                                        <p className='cardLowerText-2'>{allSets[setIndex] ? allSets[setIndex].length : 0} ex.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className="exercisePreview">

                        </div>
                    </div>
                </div>
            }


            {cameraReadiness && 
                <div className='blurer' />
            }

        </IonContent>
    )

}