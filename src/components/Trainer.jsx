import { IonButton, IonCheckbox, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useRef, useEffect, useState } from "react";
import CheckPose from "./CheckPose";
import findAngle from "./findAngle";





export default function Trainer({visibleBody, dots, cource, unselectCource}) {
  const exerciseNames = ["GOOD MORNING","CABARET","MARCH IN PLACE","LEG PUSH","SQUAT","REVERSE LUNGE","CALF RISES","JUMPING JACK","HALF JACK"]
  const rightDots = [11,12,13,14,15,16,23,24,25,26,27,28]
  const [leftHandAngle, setLeftHandAngle] = useState(0)
  const [crazyRule,setCrazyRule] = useState([])
  const [precent, setPrecent] = useState(null)
  const [rules,setRules] = useState([])
  const [leftHandColor,setLeftHandColor] = useState('#fff')
  const [dotsForAngle,setDotsForAngle] = useState([])
  const [angle,setAngle] = useState(null)

  const [checking,setChecking]=useState(false)
  const [stage,setStage] = useState(null)
  const [counter,setCounter] = useState(0)
  const [exerciseNumber,setExerciseNumber] = useState(0)
  const [time, setTime] = useState(5)
  const [showResults, setShowResults] = useState(false)
  const [results,setResults] = useState([])
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


  

  useEffect(()=>{
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
        setTime(5)
        setExerciseNumber(exerciseNumber + 1)
      }
    }
  },[visibleBody, time])

  useEffect(()=>{    
        if(dots){
          const poseInfo = CheckPose(dots, cource[exerciseNumber], stage)
          
          if(dots) {
            setLeftHandAngle(findAngle(16,14,11, dots))
            setLeftHandColor(`${poseInfo.colors.arm.right}`)
            setColors(poseInfo.colors)
            setCounter(counter + poseInfo.counter)
            setStage(poseInfo.stage)
          }
           
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


  function selectDot(dotNumber){
    
    if(dotsForAngle.length < 3){
        let a = dotsForAngle.slice()
        a.push(dotNumber)
        setDotsForAngle(a)
    }
  }

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
                  results.map((result,index)=> <p className="resultElement" key={index}>{result.name}: {result.value}</p> )
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
              <h1>Exersice number: {exerciseNumber + 1}/{cource.length}</h1>
              <h1>Performed: <span style={{'color':"#28a64e"}}>{counter}</span></h1>
              <h1>Time: <span style={{'color':"orange"}}>{time}</span>s</h1>
            </div>
            {showResults && drawResults()}
            
            {stage && 
              <>
             
              <div className="infoBox">
                <h1 className="infoStage"><span className="tm">TREINER MESSAGE:</span> <br/>{stage}</h1>
              </div>
              </>
              }
          </div>
          {/* <div className="dotBox">
            {
              rightDots.map((value,index)=>{
                return <IonButton className="dotNumber" key={index} expand="block" color="primary" onClick={()=>{
                  if(dotsForAngle.length > 0){
                    if(value !== dotsForAngle[0] &&
                      value !== dotsForAngle[1] &&
                      value !== dotsForAngle[2]){
                        selectDot(value)
                      }
                  }else {
                    selectDot(value)
                  }
                  
                }}>{value}</IonButton>
              })
            }
          </div> */}
          {/* <div className="selectedDotsForAngle">
            {
              dotsForAngle.map((item,index)=>{
                return <IonButton className="selectedDotNumber" key={index} expand="block" color="success">{item}</IonButton>
              })
            }
          </div> */}

          {/* {angle && <div className="angleBox">
                      <h1 >{Math.floor(angle*10)/10}°</h1>
                    </div>
          } */}
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

