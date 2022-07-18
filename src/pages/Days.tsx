import { IonContent, IonSlides, IonSlide, IonButton, } from '@ionic/react';

import { useEffect, useState, useRef } from 'react';
import '../App.css';
import Trainer from '../components/Trainer';
import Webcam from "react-webcam";
import Interface from "../components/Interface";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import checkBody from "../components/functions/checkBody";



//SVG
import cheked from '../assets/svg/cheked.svg'
import fa_lock from '../assets/svg/fa_lock.svg'
import uncheked from '../assets/svg/uncheked.svg'
import loadingHelp from '../assets/svg/loadingHelp.svg'

import { useDispatch, useSelector } from "react-redux";
import { setCourceIndex, setSetIndex } from "store/slices/appSlice";


export default function Days() {

    const dispatch = useDispatch()

    const trainerData = useSelector((state: any) => state.app.data)

    const allSets = trainerData.allSets
    const allCources = trainerData.allCources
    const allExercises = trainerData.allExercises
    const allSetsNames = trainerData.allSetsNames
    const allDays = trainerData.allDays
    


    const setsTimes = allSets.map((exercises: any) => {
        let time = 0
        exercises.forEach((exercise: any) => {
            if (!exercise.time) return
            time += exercise.time
        })
        return time
    })



    const [chosenCource, setChosenCource] = useState<any | null>(null)
    const [chosenSet, setChosenSet] = useState<any | null>(null)
    const [startingSet, setStartingSet] = useState<boolean>(false)
    const [cameraReadiness, setCameraReadiness] = useState(true)
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


    function unselectCource() {
        console.log('back')
        setChosenSet(null)
        dispatch(setSetIndex({index: null}))

        setChosenCource(null)
        dispatch(setCourceIndex({index: null}))

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
                                    allCources.map((cource: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <div
                                                    className={`card ${index > 4 ? "blocked" : ""}`}

                                                    onClick={() => { if(index <= 4) {
                                                        setChosenCource(cource);
                                                        dispatch(setCourceIndex({index: index}))
                                                        dispatch(setSetIndex({index: 0}))
                                                        setChosenSet(allSets[0]);
                                                        setChosenSetIndex(0)
                                                    } else console.log('blocked') }}
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
                            dots={dots}
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

                                                        onClick={() => { 
                                                            setChosenSet(allSets[setIndex]);
                                                            setChosenSetIndex(setIndex) 

                                                            dispatch(setSetIndex({index:setIndex}))
                                                        }}
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
            
            {cameraReadiness && <div className='blurer' />}

        </IonContent>
    )

}