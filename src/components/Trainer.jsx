import { IonButton, IonCheckbox, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useRef, useEffect, useState } from "react";
import CheckPose from "../components/CheckPose";
import findAngle from "./findAngle";





export default function Trainer({visibleBody, dots, cource, unselectCource, setColors}) {
  const exerciseNames = ["GOOD MORNING","CABARET LEFT","MARCH IN PLACE","LEG PUSH","SQUAT","REVERSE LUNGE","CALF RISES","JUMPING JACK","HALF JACK", "CABARET RIGHT"]
  const rightDots = [11,12,13,14,15,16,23,24,25,26,27,28]
  const [crazyRule,setCrazyRule] = useState([])
  const [precent, setPrecent] = useState(null)
  const [rules,setRules] = useState([])
  const [dotsForAngle,setDotsForAngle] = useState([])
  const [angle,setAngle] = useState(null)
  const [checking,setChecking]=useState(false)
  const [stage,setStage] = useState(null)
  const [counter,setCounter] = useState(0)
  const [exerciseNumber,setExerciseNumber] = useState(0)
  const maxTime = 10
  const [time, setTime] = useState(maxTime)
  const [showResults, setShowResults] = useState(false)
  const [results,setResults] = useState([])
 


  

  useEffect(()=>{
    if(!showResults){
      if(visibleBody && (time > 0)) {
        setTimeout(()=>{
          setTime(time - 1)
        },1000)
      }
  
      if(visibleBody && (time <= 0)){
        setResults([{name: exerciseNames[cource[exerciseNumber]], value: counter},...results])
        setCounter(0)
        if(exerciseNumber + 1 >= cource.length){
          console.log('cource is ended')
          setShowResults(true)
        }else {
          setTime(maxTime)
          setExerciseNumber(exerciseNumber + 1)
        }
      }
    }
  },[visibleBody, time, showResults])

  useEffect(()=>{    
        if(dots){
          const poseInfo = CheckPose(dots, cource[exerciseNumber], stage)
          setColors(poseInfo.colors)
          setCounter(counter + poseInfo.counter)
          setStage(poseInfo.stage)

        }
  },[dots])

  
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
    console.log(angles)
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

  function drawResults(){

    return <div className="results">
                <h1 className="resultHead">RESULTS: </h1>
                {
                  results.map((result,index)=> <p className="resultElement" key={index}>{result.name}: <span style={{"color":'rgb(177, 63, 29);'}}>{result.value}</span></p> )
                }
              </div>
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
      
      <div className="exerciseStateView">
          <div className="textBox">
            <IonButton className="backBtn" onClick={unselectCource}>GO BACK</IonButton>
            <div className="hText">
              <h1>Excersice name:  <span style={{'color':"gray"}}>{exerciseNames[cource[exerciseNumber]]}</span></h1>
              {!showResults && <>
                <h1>Exersice number: {exerciseNumber + 1}/{cource.length}</h1>
                <h1 className="hight">Performed: <span style={{'color':"#28a64e"}}>{counter}</span></h1>
                <h1 className="hight">Time: <span style={{'color':"orange"}}>{time}</span>s</h1>
              </>}
            </div>
            {showResults && drawResults()}
            
            {stage && !showResults && 
              <>
              <div className="infoBox">
                <h1 className="infoStage"><span className="tm">TREINER MESSAGE:</span> <br/>{stage}</h1>
              </div>
              </>
              }
          </div>

          {/* <IonButton className="createRules" expand="block" color="success" onClick={()=>{createRules()}}>CREATE RULES</IonButton> */}
          {/* {(crazyRule.length > 0) && <IonButton className="checkRule" expand="block" color="success" onClick={()=>{setChecking(!checking)}}>{checking? "UNCHECK" : "CHECK"} RULES</IonButton>} */}
          {/* {precent && <div className="precentBox">
            <h1 style={{color: `rgba(${200 - precent*2},${precent * 2},0,0.9)`}}>{precent}%</h1>
          </div>} */}
      </div>
      {(!visibleBody || !dots) &&
        <div className="foregroundView">
          <div className="foregroundTextBox">
              <h1 className="foregroundText">Stand up to your full height</h1>
          </div>
        </div>
      }
      
    </>
  );
}

