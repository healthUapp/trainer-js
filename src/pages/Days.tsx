import { IonContent, IonSlides, IonSlide, IonButton, } from '@ionic/react';

import { useEffect, useState, useRef } from 'react';
import '../App.css';
import Trainer from '../components/Trainer';
import Webcam from "react-webcam";
import Interface from "../components/Interface";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import checkBody from "../components/functions/checkBody";
//@ts-ignore
import ReactFreezeframe from 'react-freezeframe';


//GIF
import marchGif from '../assets/gif/March in place.gif'
import goodMorningGif from '../assets/gif/Good morning.gif'
import cancanGif from '../assets/gif/Cancan.gif'
import lungeGif from '../assets/gif/Back lunge.gif'
import SLDLGif from '../assets/gif/SLDL with chair.gif'
import armChopsSeatGif from '../assets/gif/Arm Chops on chair.gif'
import armScissorsSeatGif from '../assets/gif/Arm scissors on chair.gif'
import headTiltisGif from '../assets/gif/Head tilts.gif'
import overheadPunchesSeatedGif from '../assets/gif/Overhead punches seated.gif'
import overheadShouldersStretchGif from '../assets/gif/Overhead shoulders strech.gif'
import punchesSeatedGif from '../assets/gif/Punches.gif'
import shrugsGif from '../assets/gif/Shrugs.gif'

//video


//exImg
import halfjack from '../assets/exImg/halfjack.png'
import squat from '../assets/exImg/squat.png'
import stepsidejack from '../assets/exImg/step_side_jack.png'
import side_leg_raises from '../assets/exImg/side_leg_raises.png'
import side_arm_raises from '../assets/exImg/side_arm_raises.png'
import chest_expansion from '../assets/exImg/chest_expansion.png'
import jumping_jack from '../assets/exImg/jumping_jack.png'




//PNG
import day1 from '../assets/png/day1.png'
import day2 from '../assets/png/day2.png'
import day3 from '../assets/png/day3.png'
import day4 from '../assets/png/day4.png'
import day5 from '../assets/png/day7.png'
import day6 from '../assets/png/blocked.png'




//SVG
import cheked from '../assets/svg/cheked.svg'
import fa_lock from '../assets/svg/fa_lock.svg'
import uncheked from '../assets/svg/uncheked.svg'
import loadingHelp from '../assets/svg/loadingHelp.svg'

import { useDispatch } from "react-redux";
import { addResult } from "store/slices/userSlice";
import {start} from "repl";

export default function Days() {

    const allExercises = [
        {
            name: "GOOD MORNING",
            gif: goodMorningGif
        },
        {
            name: "CANCAN LEFT",
            gif: cancanGif
        },
        {
            name: "MARCH IN PLACE",
            gif: marchGif
        },
        {
            name: "LEG PUSH",
            gif: SLDLGif
        },
        {
            name: "SQUAT",
            gif: squat
        },
        {
            name: "REVERSE LUNGE",
            gif: lungeGif
        },
        {
            name: "CALF RISES",
        },
        {
            name: "JUMPING JACK",
            gif: jumping_jack
        },
        {
            name: "HALF JACK",
            gif: halfjack
        },
        {
            name: "CANCAN RIGHT",
            gif: cancanGif
        },
        {
            name: "SIDE LEG RISES",
            gif: side_leg_raises
        },
        {
            name: "STEP SIDE JACK",
            gif: stepsidejack
        },
        {
            name: "CHEST EXPANSION",
            gif: chest_expansion
        },
        {
            name: "SIDE ARM RISES",
            gif: side_arm_raises
        },
        {
            name: "SHRUGS SEATED",
            gif:shrugsGif
        },
        {
            name: "HEAD TILTS LR SEATED",
            gif:headTiltisGif
        },
        {
            name: "OVERHEAD SHOULDER STRETCH SEATED",
            gif:overheadShouldersStretchGif
        },

        {
            name: "PUNCHES SEATED",
            gif:punchesSeatedGif
        },

        {
            name: "OVERHEAD PUNCHES SEATED",
            gif:overheadPunchesSeatedGif
        },

        {
            name: "ARM CHOPS SEATED",
            gif:armChopsSeatGif
        },

        {
            name: "ARM SCISSORS SEATED",
            gif:armScissorsSeatGif
        },

        {
            name: "ARM CHOPS",
        },

        {
            name: "ARM SCISSORS",
        },
        {
            name: "ELBOW CLICKS SEATED",
        },
        {
            name: "SHOULDER TAPS SEATED",
        },
        {
            name: "ELBOW CLICKS ",
        },
        {
            name: "SHOULDER TAPS",
        },
        {
            name: "BICEPS EXTENSION SEATED",
        },
        {
            name: "W EXTENSION SEATED",
        },
        {
            name: "BICEPS EXTENSION",
        },

        {
            name: "W EXTENSION",
        }
        
    ]

    const allSetsNames = [
        "Seated stretch",
        "Chop Scissors Punches seated",
        "Legs & Core"
    ]

    const allSets = [

        [
            { exerciseIndex: 14, time: 30 },
            { exerciseIndex: 15, time: 30 },
            { exerciseIndex: 16, time: 30 },
        ],

        [
            { exerciseIndex: 19, time: 30 },
            { exerciseIndex: 20, time: 30 },
            { exerciseIndex: 17, time: 30 },
            { exerciseIndex: 18, time: 30 },
        ],

        [
            //По этому индексу вытаскивается упражнение из allExercises
            { exerciseIndex: 0, time: 30 },
            { exerciseIndex: 2, time: 30 },
            { exerciseIndex: 1, time: 30 },
            { exerciseIndex: 9, time: 30 },
            { exerciseIndex: 5, time: 30 },
            { exerciseIndex: 3, time: 30 },
        ],

        [
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },

        ],

        [
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },

        ],

        [
            { exerciseIndex: 5, time: 15 },
            { exerciseIndex: 8, time: 15 },
            { exerciseIndex: 4, time: 15 },
            { exerciseIndex: 8, time: 15 },
        ],

        [
            { exerciseIndex: 11, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 11, time: 10 },
            { exerciseIndex: 7, time: 10 },
        ],

        [
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            //2 минуты отдыха и так 3 раза
        ],

    ]

    const allCources = [
        [0,1,2],
        [0,1,2],
        [0,1,2],
        [0,1,2],
        [0,1,2],
        []
    ]


    const setsTimes = allSets.map((exercises) => {
        let time = 0
        exercises.forEach((exercise: any) => {
            if (!exercise.time) return
            time += exercise.time
        })
        return time
    })

    const courcesTimes = allCources.map((set) => {
        let time = 0
        set.forEach((setIndex, index) => {
            time += setsTimes[setIndex]
        })
        return time
    })

    const allDays = {
        names: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        images: [day1, day2, day3, day4, day5, day6],
    }

    const [chosenCource, setChosenCource] = useState<any | null>(null)
    const [chosenSet, setChosenSet] = useState<any | null>(null)
    const [startingSet, setStartingSet] = useState<boolean>(false)
    const [cameraReadiness, setCameraReadiness] = useState(false)
    const [chosenSetIndex, setChosenSetIndex] = useState<number | null>(null)

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
        console.log('back')
        setChosenSet(null)
        setChosenCource(null)
        setStartingSet(false)
    }
    function stoppingSet() {
        console.log('set is stopping')
        setStartingSet(false)
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
            enableSegmentation: false,
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

                {(!startingSet) &&
                    <>
                        <div className="startImgBox">
                            {/*<Video />*/}
                        </div>
                        <div className="cardsBox">
                            <div className={'titleCardBox'}>Weekly activity program</div>
                            <div className={'cardsWrapper'}>
                                {
                                    allCources.map((cource, index) => {
                                        return (
                                            <div key={index}>
                                                <div
                                                    className={`card ${index > 4 ? "blocked" : ""}`}

                                                    onClick={() => { index <= 4 ? setChosenCource(cource) : alert('Weekends!') }}
                                                >
                                                    <div className='cardImgBox'>
                                                        <img className='cardImg' src={allDays.images[index]} />
                                                        {index > 4 && <img className="faLockSvg" src={fa_lock} />}
                                                    </div>

                                                    <div className={`cardText ${index > 0 ? "blocked" : ""}`} >
                                                        <h5 className='cardHighText'>{allDays.names[index]}</h5>
                                                        <div className='cardLowerTextBox'>
                                                            {/*<p className='cardLowerText-1'>{courcesTimes[index] ? `${Math.floor(courcesTimes[index] / 60)} min. ${(courcesTimes[index] % 60) > 0 ? (`${courcesTimes[index] % 60}s.`) : ""}` : "0 s."}</p>*/}
                                                            <p className='cardLowerText-2'>{cource.length} ex.</p>
                                                            {/* <div className='cardLowerIconsBox'>
                                                                <p className='cardLowerIconsText'>activities</p>
                                                                <div className='cardLowerIconsCheckedBox'>
                                                                    <img className='cardLowerIconsCheckedIcon' src={cheked} alt="" />
                                                                    <img className='cardLowerIconsCheckedIcon' src={cheked} alt="" />
                                                                    <img className='cardLowerIconsCheckedIcon' src={uncheked} alt="" />
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <a className={'healtLink'} href="https://healthuapp.com">healthuapp.com</a>
                            </div>
                        </div>
                    </>
                }
                <div className='drawBox' style={startingSet ? { "display": "inline-flex" } : { "display": "none" }}>
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
                    {startingSet && <>
                        <Trainer
                            setColors={setColors}
                            visibleBody={visibleBody}
                            selectedCource={chosenCource}
                            dots={dots}
                            set={chosenSet}
                            allSets={allSets}
                            chosenSetIndex={chosenSetIndex}
                            allExercises={allExercises}
                            stoppingSet={stoppingSet}
                        />
                    </>}
                </div>

            </div>

            {(chosenCource && !startingSet) &&
                <div className='setsBox' >
                    <div className="blueScreen" onClick={() => unselectCource()}></div>
                    <div className="prewiewBox">
                        <div className="setPreview">
                            <div className="prewiewInfo">
                                <h1>{date.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/,/g, " ")}</h1>
                                <h5>See which sets can be performed today</h5>
                            </div>
                            <div className="setCardBox">
                                <div className="cardBoxList">
                                    {
                                        chosenCource.map((setIndex: number, index: number) => {
                                            return (
                                                <div key={index}>

                                                    <div
                                                        className="setCard"

                                                        onClick={() => { setChosenSet(allSets[setIndex]); setChosenSetIndex(setIndex) }}
                                                    >
                                                        <div className='setCardImgBox'>
                                                            <img className='setCardImg' src={allDays.images[index]} />
                                                        </div>

                                                        <div className={`cardText`} >
                                                            <h5 className='setCardHighText'>{`${allSetsNames[index]}`}</h5>
                                                            <div className='cardLowerTextBox'>
                                                                {/* <p className='cardLowerText-1'>{setsTimes[chosenCource[index]] ? `${Math.floor(courcesTimes[index] / 60)} min. ${(courcesTimes[index] % 60) > 0 ? (`${courcesTimes[index] % 60}s.`) : ""}` : "0 s."}</p> */}
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
                            <div className='prewiewBox_bottom'></div>
                        </div>
                        <div className="exercisesPreview">
                            {(chosenSet !== null) &&
                                <>
                                    <div className="exercisesPreviewList">
                                        <h2>Strength</h2>
                                        {chosenSet.map((ex: any, index: number) => (
                                            <div key={index} className='exercisePrewiew__item'>
                                                {/* <ReactFreezeframe src={allExercises[ex.exerciseIndex].gif} /> */}
                                                <img src={allExercises[ex.exerciseIndex].gif} />
                                                <h4>{allExercises[ex.exerciseIndex].name}</h4>
                                                <h5>{ex.time} sec</h5>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="startSetBtn">
                                        <div onClick={() => setStartingSet(true)}>
                                            <div><p>Begin</p></div>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>
            }
            
             {/*<IonButton className='firebase' onClick={() => {sendData('dce')}}>SHOW LOCAL</IonButton>*/}

            {cameraReadiness &&
                <div className='blurer' />
            }

        </IonContent>
    )

}