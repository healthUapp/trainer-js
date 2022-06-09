import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import { Hands } from "@mediapipe/hands";
import { POSE_LANDMARKS ,POSE_CONNECTIONS} from "@mediapipe/pose";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import "@mediapipe/control_utils";
import {drawLandmarks, drawConnectors} from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import CheckExercise from "./CheckExercise";

export default function Trainer(exerciseName) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;

  function onResults(results) {
    console.log(results)
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
    
    const colorLine = CheckExercise(results.poseLandmarks, exerciseName)
    
    console.log(colorLine)

    //Цвет точек и линий
    
    if (results.poseLandmarks) {
      drawLandmarks(
        canvasCtx,
        // results.poseLandmarks,  //- если нужны все точки
        results.poseLandmarks.map((value, index) => {            
            if (index === 11 || index === 12 ||
              index === 13 || index === 14 ||
              index === 15 || index === 16 ||
              index === 23 || index === 24 ||
              index === 25 || index === 26 ||
              index === 27 || index === 28) { 
              return(results.poseLandmarks[index])
            }
        }),
        {color: 'blue', lineWidth: 1});
      drawConnectors(
          canvasCtx,
          results.poseLandmarks.map((value, index) => {            
            if (index === 11 || index === 12 ||
              index === 13 || index === 14 ||
              index === 15 || index === 16 ||
              index === 23 || index === 24 ||
              index === 25 || index === 26 ||
              index === 27 || index === 28) { 
              return(results.poseLandmarks[index])
            }
          }), 
          POSE_CONNECTIONS,
          {color: 'white', lineWidth: 4});
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
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
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
    <center>
      <div className="drawBox">
        <Webcam
          width={"1280"}
          height={"720"}
          ref={webcamRef}
        />
        <canvas ref={canvasRef} className="draw"/>
      </div>
    </center>
  );
}

