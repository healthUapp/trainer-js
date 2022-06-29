import { IonButton } from "@ionic/react";
import { useEffect, useState} from "react";
import CheckPose from "../components/CheckPose";
import findAngle from "./findAngle";
import Countdown from "./Countdown"
import Results from "./Results"
import MiniGraphAccuracy from "./MiniGraphAccuracy"
//SVG
import next from '../assets/svg/next.svg'




export default function Trainer({visibleBody, dots, cource, unselectCource, setColors, allExercises}) {
    const exerciseNames = ["GOOD MORNING","CABARET LEFT","MARCH IN PLACE","LEG PUSH","SQUAT","REVERSE LUNGE","CALF RISES","JUMPING JACK","HALF JACK", "CABARET RIGHT", "SIDE LEG RISES", "STEP SIDE JACK","CHEST EXPANSION","SIDE ARM RISES"]
    const rightDots = [11,12,13,14,15,16,23,24,25,26,27,28]
    const [crazyRule,setCrazyRule] = useState([])
    const [accuracy,setAccuracy] = useState([])
    const [precent, setPrecent] = useState(null)
    const [rules,setRules] = useState([])
    const [dotsForAngle,setDotsForAngle] = useState([])
    const [angle,setAngle] = useState(null)
    const [checking,setChecking]=useState(false)
    const [stage,setStage] = useState(null)
    const [counter,setCounter] = useState(0)
    const [exerciseNumber,setExerciseNumber] = useState(0)
    const [time, setTime] = useState(allExercises[cource[exerciseNumber]].time)
    const [pause, setPause] = useState(5)
    const [selectedGif,setSelectedGif] = useState(allExercises[cource[exerciseNumber]].gif)
    const [showResults, setShowResults] = useState(false)
    const [results,setResults] = useState([])


    useEffect(()=>{
        if(!showResults && !pause){
            if(visibleBody && (time > 0)) {
                setTimeout(()=>{
                    setTime(time - 1)
                },1000)
            }

            if(visibleBody && (time <= 0)){
                setResults([{name: allExercises[cource[exerciseNumber]].name, value: counter, accuracy: accuracy},...results])
                setCounter(0)
                if(exerciseNumber + 1 >= cource.length){
                    console.log('cource is ended')
                    setShowResults(true)
                }else {
                    setExerciseNumber(exerciseNumber + 1)
                    setSelectedGif(allExercises[cource[exerciseNumber + 1]].gif)
                    setTime(allExercises[cource[exerciseNumber + 1]].time)
                    setPause(5)
                }
            }
            
        }
    },[visibleBody, time, showResults, pause])
    
    useEffect(()=>{
        if(dots && !pause && !showResults){
            const poseInfo = CheckPose(dots, cource[exerciseNumber], stage)
            setColors(poseInfo.colors)
            if(poseInfo.counter){
                setCounter(counter + poseInfo.counter)
            }
            console.log(counter)
            if(poseInfo.accuracy) {setAccuracy([...accuracy, poseInfo.accuracy])}
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
            setAngle(findAngle(dotsForAngle[0],dotsForAngle[1],dotsForAngle[2], dots))
            let allRules = rules.slice()
            allRules.push({dots:dotsForAngle, angle: findAngle(dotsForAngle[0],dotsForAngle[1],dotsForAngle[2], dots)})
            setRules(allRules)
            setDotsForAngle([])
        }
    },[dotsForAngle])


    function createRules(){
        var dotsSet = (function(arr, limit){
            var results = [], result, mask, total = Math.pow(2, arr.length);
            for(mask = 0; mask < total; mask++){
                result = [];
                let i = arr.length - 1;
                do{
                    if( (mask & (1 << i)) !== 0){
                        result.push(arr[i]);
                    }
                }while(i--);
                if( result.length == limit){
                    results.push(result);
                }
            }
            return results;
        })(rightDots, 3);

        let angles = []
        dotsSet.forEach(element => {
            angles.push(findAngle(element[0],element[1],element[2],dots))
        });

        setCrazyRule(angles)
    }

    function checkRules(){
        var dotsSet = (function(arr, limit){
            var results = [], result, mask, total = Math.pow(2, arr.length);
            for(mask = 0; mask < total; mask++){
                result = [];
                let i = arr.length - 1;
                do{
                    if( (mask & (1 << i)) !== 0){
                        result.push(arr[i]);
                    }
                }while(i--);
                if( result.length == limit){
                    results.push(result);
                }
            }
            return results;
        })(rightDots, 3);

        let trueAngles = 0
        let falseAngles = 0

        let angles = []

        dotsSet.forEach(element => {
            angles.push(findAngle(element[0],element[1],element[2],dots))
        });

        angles.forEach((el,ind)=>{
            if(((el < crazyRule[ind] + 5) && (el > crazyRule[ind] - 5))){
                trueAngles = trueAngles + 1
            }else {
                falseAngles = falseAngles + 1
            }
        })
        setPrecent(Math.floor((trueAngles/220)*100))
        // console.log(trueAngles,falseAngles, `${Math.floor((trueAngles/220)*100)}%`)
    }


    
    useEffect(()=>{
        if(checking){
            let timer = setTimeout(()=>{
                checkRules()
                return () =>{
                    clearTimeout(timer)
                }
            },10)
        }
    },[dots, checking])

    return (
        <>
            <IonButton className="backBtn" onClick={unselectCource}>
                <img className="backBtn_svg" src={next}/>
                <p className="backBtn_text">Back</p>
            </IonButton>

            <div className="exerciseStateView">
                {!showResults && visibleBody &&
                  <div className="gifBox">
                    <img className="gif" src={selectedGif} />
                  </div>
                }

                <div className="textBox">
                    <div className="hText">
                        {!showResults && <>
                            <h1>Exersice number: {exerciseNumber + 1}/{cource.length}</h1>
                            <h1 className="hight">Performed: <span style={{'color':"#28a64e"}}>{counter}</span></h1>
                            <h1 className="hight">Time: <span style={{'color':"orange"}}>{time}</span>s</h1>
                            <h1 className="hight">Accuracy: <span style={{'color':"red"}}>{accuracy[counter === 0? 0 : counter -1]}</span>%</h1>
                        </>}
                    </div>

                    {!!stage && !showResults &&
                        <>
                            <div className="infoBox">
                                <h1 className="infoStage"><span className="tm">TREINER MESSAGE:</span> <br/>{stage}</h1>
                            </div>
                        </>
                    }
                </div>

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
                                <p className="middle">{allExercises[cource[exerciseNumber]].name}</p>
                                <div className="duo">
                                    <p className="down">{cource.length} reps</p>
                                    <p className="down">{allExercises[cource[exerciseNumber]].time} sec</p>
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
                    <div className="exerciseTimeBox">
                        <Countdown startTime={allExercises[cource[exerciseNumber]].time} newTime={time} width={226}/>
                     </div>
                </>
            }

            {showResults &&  <Results results={results} accuracy={accuracy}/>}
        </>
    );
}


