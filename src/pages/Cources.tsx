import { IonContent, IonSlides, IonSlide, } from '@ionic/react';

import { useEffect, useState, useRef } from 'react';
import '../App.css';
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


export default function Exercise() {
<<<<<<< HEAD
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
            gif :goodMorningGif,
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
        }
=======

    const allSets = {
        names:  ["Today", "Tomorrow"],
        images: [set1, set2, set3],
        exercises: [[2, 0, 5, 1, 9, 3],[0] 
        // [5, 8, 4, 8]
        ]
    }

    const allExercises = [
            {
                name :"GOOD MORNING",
                time : 30,
                gif : goodMorningGif   
            },
            {
                name:"CABARET LEFT",
                time : 360,
                gif : cabaretGif
            },
            {   
                name:"MARCH IN PLACE",
                time : 30,
                gif : marchGif
            },
            {
                name:"LEG PUSH",
                time : 30,
                gif : legPushGif
            },
            {
                name:"SQUAT",
                time :30,
                gif :goodMorningGif,
            },
            {
                name:"REVERSE LUNGE",
                time : 30,
                gif : lungeGif
            },{
                name:"CALF RISES",
                time : 30,
                gif : goodMorningGif
            },{
                name:"JUMPING JACK",
                time : 30,
                gif : goodMorningGif
            },
            {
                name:"HALF JACK",
                time : 30,
                gif : goodMorningGif
            },
            {
                name:"CABARET RIGHT",
                time : 30,
                gif : cabaretGif
            },
            {
                name:"SIDE LEG RISES",
                time : 30,
                gif : goodMorningGif
            },
            {
                name:"STEP SIDE JACK",
                time : 30,
                gif : goodMorningGif
            },

            {
                name:"CHEST EXPANSION",
                time : 30,
                gif : goodMorningGif
            },

            {
                name:"SIDE ARM RISES",
                time : 30,
                gif : goodMorningGif
            },
            {
                name:"UP SHOULDERS",
                time : 30,
                gif : goodMorningGif
            },

            {
                name: "EAR TO SHOULDERS",
                time : 30,
                gif : goodMorningGif
            }
>>>>>>> 0f9a114c1990c9e16f5de628f99ee1471649c4e9

    ]

    const allSets = {
        lowerBody: [
            //По этому индексу вытаскивается упражнение из allExercises
            {exerciseIndex: 2, time: 30},
            {exerciseIndex: 0, time: 30},
            {exerciseIndex: 5, time: 30}, // время в секундаx
            {exerciseIndex: 2, time:30},
            {exerciseIndex: 9, time: 30},
            {exerciseIndex: 3, time: 30},
        ],

    }

    const allDays = {
        names:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ,"Sunday"],
        images: [day1, day2, day3, day4, day5, day6, day7],
        cources: [
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
            [
                allSets.lowerBody,
                allSets.lowerBody,
                allSets.lowerBody,
            ],
        ]
    }

    const [chosenСourse, setChosenСourse] = useState<any | null>(null)
    const [chosenSet, setChosenSet] = useState(null)
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
                                            allDays.cources.map((set, index) => {
                                                if(index === initialSlide){
                                                    return  (
                                                        <div key={index}>
                                                            <div
                                                                className={`card ${index>0? "blocked" : ""}`} 
                                                                
                                                                onClick={() => {index <= 0 ? setChosenСourse(set) : alert('This set of exercises will unlock tomorrow.') }}
                                                            >
                                                                <div className='cardImgBox'>
                                                                    {/* <img className='cardImg' src={''} /> */}
                                                                    <img className='cardImg' src={allDays.images[index]} />
                                                                    {index > 0 && <img className="faLockSvg" src={fa_lock} />}
                                                                </div>
                                                            
                                                                <div className={`cardText ${index>0? "blocked" : ""}`} >
                                                                    <h5 className='cardHighText'>{allDays.names[index]}</h5>
                                                                    <div className='cardLowerTextBox'>
                                                                        <p className='cardLowerText'>5 min</p>
                                                                        <p className='cardLowerText'>{set.length} ex.</p>
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

                                                           {allDays.cources[index + 1] ?
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
                                                           {allDays.cources[index - 1]?
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
                            set={chosenСourse[0]}
                            allExercises={allExercises}
                            unselectCource={unselectCource}   
                        />
                    </>}
                </div>

            </div>

            {cameraReadiness && 
                <div className='blurer'>
                    
                </div>
            }

        </IonContent>
    )

}