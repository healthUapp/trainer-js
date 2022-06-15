import { FaceMesh } from "@mediapipe/face_mesh";
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
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [leftHandAngle, setLeftHandAngle] = useState(0)
  const [leftHandColor,setLeftHandColor] = useState('#fff')
  const [dots,setDots] = useState(undefined)
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

  const [visibleBody, setVisibleBody] = useState(false)

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
      modelComplexity: 0.5,
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

