import { FaceMesh } from "@mediapipe/face_mesh";
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Hands } from "@mediapipe/hands";
import { POSE_LANDMARKS ,POSE_CONNECTIONS} from "@mediapipe/pose";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import "@mediapipe/control_utils";
import {drawLandmarks, drawConnectors} from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import CheckPose from "./CheckPose";
import findAngle from "./findAngle";
import Interface from "./Interface";

import checkBody from "./checkBody";


export default function Trainer({exerciseValue, exerciseName}) {
  const rightDots = [11,12,13,14,15,16,23,24,25,26,27,28]
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [leftHandAngle, setLeftHandAngle] = useState(0)
  const [crazyRule,setCrazyRule] = useState([])
  const [precent, setPrecent] = useState(null)
  const [rules,setRules] = useState([])
  const [leftHandColor,setLeftHandColor] = useState('#fff')
  const [dots,setDots] = useState(undefined)
  const [dotsForAngle,setDotsForAngle] = useState([])
  const [angle,setAngle] = useState(null)
  const [visibleBody, setVisibleBody] = useState(false)
  const [checking,setChecking]=useState(false)
  const [delay,setDelay] = useState(0)
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

  function onResults(results) {
    //Видимость полной позы человека

    if(results.poseLandmarks){
      
    }
    
  
    // const video = webcamRef.current.video;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;    
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
    
    const poseInfo = CheckPose(results.poseLandmarks, exerciseValue)

    if(results.poseLandmarks) {
      setLeftHandAngle(findAngle(16,14,11,results.poseLandmarks))
      setVisibleBody(checkBody(results.poseLandmarks))
      setLeftHandColor(`${poseInfo.colors.arm.right}`)
      setDots(results.poseLandmarks)
      setColors(poseInfo.colors)
    }

      canvasCtx.restore();
  }

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
    
    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  useEffect(()=>{
    if(dotsForAngle.length === 3) {
      setAngle(findAngle(dotsForAngle[0],dotsForAngle[1],dotsForAngle[2], dots))
      let allRules = rules.slice()
      allRules.push({dots:dotsForAngle, angle: findAngle(dotsForAngle[0],dotsForAngle[1],dotsForAngle[2], dots)})
      setRules(allRules)
      setDotsForAngle([])
    }
  },[dotsForAngle])

  useEffect(()=>{
    console.log(rules)
  },[rules])

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
    <div className="exerciseView">    
      <div className="poseView">
        <div className="drawBox">
          <Webcam
            width={"1280"}
            height={"720"}
            ref={webcamRef}
          />
          <canvas ref={canvasRef} className="draw"/>
          {visibleBody &&
            <Interface dots={dots} colors={colors}/>
          }
        </div>
      </div>
      <div className="exerciseStateView">
          <div className="textBox">
            <h1>Excersice name: {exerciseName}</h1>
          </div>
          <div className="dotBox">
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
          </div>
          <div className="selectedDotsForAngle">
            {
              dotsForAngle.map((item,index)=>{
                return <IonButton className="selectedDotNumber" key={index} expand="block" color="success">{item}</IonButton>
              })
            }
          </div>

          {angle && <div className="angleBox">
                      <h1 >{Math.floor(angle*10)/10}°</h1>
                    </div>
          }
          <IonButton className="createRules" expand="block" color="success" onClick={()=>{createRules()}}>CREATE RULES</IonButton>
          {(crazyRule.length > 0) && <IonButton className="checkRule" expand="block" color="success" onClick={()=>{setChecking(!checking)}}>{checking? "UNCHECK" : "CHECK"} RULES</IonButton>}
          {precent && <div className="precentBox">
            <h1 style={{color: `rgba(${200 - precent*2},${precent * 2},0,0.9)`}}>{precent}%</h1>
          </div>}
      </div>
      {(!visibleBody || !dots) &&
        <div className="foregroundView">
          <div className="foregroundTextBox">
            {!dots
            ?<h1 className="foregroundText">Connecting to camera......</h1>
            :<h1 className="foregroundText">Stand up to your full height</h1>
            }
          </div>
        </div>
      }
      
    </div>
  );
}

