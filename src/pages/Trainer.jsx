import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import { Hands } from "@mediapipe/hands";
import { POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT, POSE_LANDMARKS_NEUTRAL} from "@mediapipe/pose";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import "@mediapipe/control_utils";
import {drawLandmarks, drawConnectors} from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";



export default function Trainer() {
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

    if (results.poseLandmarks) {
      drawLandmarks(
        canvasCtx,
        Object.values(POSE_LANDMARKS_LEFT)
            .map(index => results.poseLandmarks[index]),
        {color: 'blue', lineWidth: 1});
      drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_RIGHT)
              .map(index => results.poseLandmarks[index]),
          {color: 'yellow', lineWidth: 1});
      drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_NEUTRAL)
              .map(index => results.poseLandmarks[index]),
          {color: '#DFF', lineWidth: 1});
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
      smoothSegmentation: true,
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
          width={"1024"}
          height={"768"}
          ref={webcamRef}
        />
        <canvas
          ref={canvasRef}
          className="draw"
        />
      </div>
    </center>
  );
}

