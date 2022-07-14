import { IonButton } from "@ionic/react";
import { useEffect, useState} from "react";
import CheckPose from "./functions/CheckPose";
import findAngle from "./functions/findAngle";
import Countdown from "./сountdown/Countdown"
import Results from "./Results"
import MiniGraphAccuracy from "./MiniGraphAccuracy"

//SVG
import next from 'assets/svg/next.svg'

import { useDispatch } from "react-redux";
import { addResult } from "store/slices/userSlice";
import chackBody from "./functions/checkBody";


export default function Trainer({visibleBody, dots, selectedCource, set, allSets, chosenSetIndex, stoppingSet, setColors, allExercises}) {
    const dispatch = useDispatch()
    const [accuracy, setAccuracy] = useState([])
    const [rules,setRules] = useState([])
    const [dotsForAngle,setDotsForAngle] = useState([])
    const [stage,setStage] = useState(null)
    const [counter,setCounter] = useState(0)
    const [exerciseNumber,setExerciseNumber] = useState(0)
    const [time, setTime] = useState(set[exerciseNumber].time)
    const [pause, setPause] = useState(5)
    const [selectedGif,setSelectedGif] = useState(allExercises[set[exerciseNumber].exerciseIndex].gif)
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState([])
    

    useEffect(()=>{
        if(!showResults && !pause){
            if(visibleBody && (time > 0)) {
                setTimeout(()=>{
                    setTime(time - 1)
                },1000)
            }

            if(visibleBody && (time <= 0)){
                setResults([{name: allExercises[set[exerciseNumber].exerciseIndex].name, value: accuracy.length, accuracy: accuracy},...results])
                setCounter(0)
                setAccuracy([])
                if(exerciseNumber + 1 >= set.length){
                    console.log('set is ended')
                    setShowResults(true)
                }else {
                    setExerciseNumber(exerciseNumber + 1)
                    setSelectedGif(allExercises[set[exerciseNumber + 1]?.exerciseIndex]?.gif)
                    setTime(set[exerciseNumber + 1].time)
                    setPause(5)
                }
            }
            
        }
    },[visibleBody, time, showResults, pause])


    useEffect(()=>{
        
    })

    useEffect(()=>{
        if(showResults && results.length > 0) {
            dispatch(addResult({results:results, indexOfSet: chosenSetIndex}) )
            let timer = setTimeout(()=>{
                setResults([])
                clearTimeout(timer)
            }, 10000)
        }
        
    },[showResults, results])
    
    useEffect(()=>{
        if(dots && !pause && !showResults && visibleBody){
            const poseInfo = CheckPose(dots, set[exerciseNumber].exerciseIndex, stage)
            setColors(poseInfo.colors)
            if(poseInfo.counter){
                setCounter(counter + poseInfo.counter)
            }
            if(poseInfo.accuracy){setAccuracy([...accuracy, poseInfo.accuracy])}
            if(poseInfo.stage){
                setStage(poseInfo.stage)
            }
        }
    },[dots])

    useEffect(()=>{
        if(pause > 0){
            let timer = setTimeout(()=>{
                setPause(pause - 1)
                return clearTimeout(timer)
            },1000)
        }
    },[pause])

    useEffect(()=>{
        if(dotsForAngle.length === 3) {
            let allRules = rules.slice()
            allRules.push({dots:dotsForAngle, angle: findAngle(dotsForAngle[0],dotsForAngle[1],dotsForAngle[2], dots)})
            setRules(allRules)
            setDotsForAngle([])
        }
    },[dotsForAngle])


    return (
        <>
            <IonButton className="backBtn" onClick={stoppingSet}>
                <img className="backBtn_svg" src={next} alt="next"/>
                <p className="backBtn_text">Back</p>
            </IonButton>

            <div className="exerciseStateView">
                {!showResults && visibleBody &&
                    <div className="gifBox">
                        {!!selectedGif &&
                            <img className="gif" src={selectedGif? selectedGif : ""} alt="exercise gif"/>
                        }

                        {!selectedGif &&
                            <div className="noGif">
                                <p>GIF IS NOT FOUND</p>
                            </div>
                        }
                    </div>
                }
            </div>

            {(!visibleBody || !dots) && !showResults &&
                <div className="foregroundView">
                    <div className="foregroundTextBox">
                        <h1 className="foregroundText">Please move into the center of the screen</h1>
                    </div>
                </div>
            }

            {!!pause &&
                <>  
                    <Countdown startTime={5} newTime={pause} width={226}/>

                    <div className="pause">
                        <div className="pauseTextBox">
                            <div className="pauseText">
                                <p className="up">coming next</p>
                                <p className="middle">{allExercises[set[exerciseNumber].exerciseIndex].name}</p>
                                <div className="duo">
                                    <p className="down">{set.length} reps</p>
                                    <p className="down">{set[exerciseNumber].time} sec</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                
            }
            {!pause &&
                <>
                    <div className="exerciseAccuracyGraphBox">
                        <MiniGraphAccuracy results={results} accuracy={accuracy}/>
                    </div>
                    {!showResults &&
                        <div className="exerciseTimeBox">
                            <Countdown startTime={set[exerciseNumber].time} newTime={time} width={226}/>
                        </div>
                    }
                </>
            }


            {showResults &&  <Results allSets={allSets} selectedCource = {selectedCource} showResults={showResults} results = {
                {
                    results: results,
                    indexOfSet: chosenSetIndex,
                    date: new Date().toString()
                }
            } />}
        </>
    );
}


