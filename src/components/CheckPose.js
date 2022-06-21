import { color } from "d3";
import findAngle from "./findAngle";
import checkBody from "./checkBody";
import findAngleMidPoint from "./findAngleMidPoint";

function CheckExercise(poseLandmarks, exerciseValue, peviousStage) {
    const colors = {
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
    }

    let stage;
    if(peviousStage){stage = peviousStage}

    let counter=0

    if (!poseLandmarks) return colors;

    if (exerciseValue === 0) goodMorning();
    if (exerciseValue === 1) cabaret_left();
    if (exerciseValue === 2) march_in_place();
    if (exerciseValue === 3) leg_push();
    if (exerciseValue === 4) squat();
    if (exerciseValue === 5) lunges();
    if (exerciseValue === 6) calf_rises();
    if (exerciseValue === 7) junmping_jack();
    if (exerciseValue === 8) half_jack();
    if (exerciseValue === 9) cabaret_right();
    if (exerciseValue === 10) side_leg_rises();

    function goodMorning() {
        const angle_back_right = findAngle(12, 24, 26, poseLandmarks)
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)

        angle_elbow_left=findAngle(15, 13, 11, poseLandmarks)
        angle_elbow_right=findAngle(16, 14, 12, poseLandmarks)

        if (angle_elbow_left >= 40 && angle_elbow_right >= 40 && angle_elbow_left <= 80 && angle_elbow_right <= 80) {
            colors.arm.left="green"
            colors.arm.right="green"
            stage = "KNEE";
          }
          
          if (stage === "KNEE" && angle_leg_right >= 120 && angle_leg_right <= 160) {
            colors.leg.left="green"
            colors.leg.right="green"
            stage = "DOWN";
          }
          
          if (stage === "DOWN" && angle_back_right >= 90 && angle_back_right <= 130) {
            colors.body.left="green"
            colors.body.right="green"
            colors.body.down="green"
            colors.body.up="green"
            stage = "UP"
            counter +=1
          }
          

    }

    function cabaret_left() {

        //stage = "START"

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_knee_right = findAngle(24, 26, 28, poseLandmarks)
        //const angle_knee_left = findAngle(23, 25, 27, poseLandmarks)

        const angle_leg_right = findAngle(12, 24, 28, poseLandmarks)
        //const angle_leg_left = findAngle(11, 23, 27, poseLandmarks)

            colors.arm.left = "yellow"
            colors.arm.right = "yellow"
            colors.leg.right = "yellow"

            if ( angle_knee_right >= 80 && angle_knee_right <= 100) {
                stage = "LEG"
                colors.leg.right = "green"
            }
            if (stage === "LEG" && angle_leg_right >= 70 && angle_leg_right <= 110) {
                stage = "KNEE"
                counter += 1
                colors.leg.right = "green"
            }
        

        if (angle_shoulder_left >= 80 && angle_shoulder_right >= 80) {
            colors.arm.left = "green"
            colors.arm.right = "green"
        }
        else {
            colors.arm.left = "red"
            colors.arm.right = "red"
        }

        
    }


    function cabaret_right(){

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_knee_left = findAngle(23, 25, 27, poseLandmarks)
        const angle_leg_left = findAngle(11, 23, 27, poseLandmarks)

        colors.arm.right = "yellow"
        colors.leg.left = "yellow"
        if ( angle_knee_left >= 80 && angle_knee_left <= 100) {
            stage = "LEG";
            colors.leg.left = "green"
        }
        if (stage === "LEG" && angle_leg_left >= 70 && angle_leg_left <= 110) {
            stage = "KNEE";
            counter += 1;
            colors.leg.left = "green"
        }
    

    if (angle_shoulder_left >= 80 && angle_shoulder_right >= 80) {
        colors.arm.left = "green"
        colors.arm.right = "green"
    }
    else {
        colors.arm.left = "red"
        colors.arm.right = "red"
    }


    }

    function march_in_place() {

        stage = "START"
        let side = ""

        const angle_arm_left = findAngle(11, 13, 15, poseLandmarks)
        const angle_arm_right = findAngle(12, 14, 16, poseLandmarks)

        const angle_leg_left = findAngle(23, 25, 27, poseLandmarks)
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)

        if (counter % 2 == 0) {
            side = "LEFT"
            stage = "UP"
            colors.arm.left = "yellow"
            colors.leg.right = "yellow"
        }
        else {
            side = "RIGHT"
            stage = "UP"
            colors.arm.right = "yellow"
            colors.leg.left = "yellow"
        }


        if (side === "LEFT" && angle_arm_left >= 20 && angle_arm_left <= 80 && angle_leg_right >= 70 && angle_leg_right <= 100) {
            colors.arm.left = "green"
            colors.leg.right = "green"
            stage = "DOWN";
            counter += 1;
        }


        if (side === "RIGHT" && angle_arm_right >= 20 && angle_arm_right <= 80 && angle_leg_left >= 70 && angle_leg_left <= 100) {
            colors.arm.right = "green"
            colors.leg.left = "green"
            stage = "DOWN";
            counter += 1;
        }

    }

    function leg_push() {
        stage = "START"
        let side = ""

        const angle_body_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_body_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_back = findAngle(12, 24, 26, poseLandmarks)

        const angle_leg_r = findAngle(12, 24, 28, poseLandmarks)
        const angle_leg_l = findAngle(11, 23, 27, poseLandmarks)

        if (angle_body_right >= 160 && angle_body_left >= 160) {
            colors.arm.left = "green"
            colors.arm.right = "green"
            stage = "DOWN";
        }

        if (stage === "DOWN" && angle_back >= 130 && angle_back <= 150) {
            stage = "PUSH"
        }

        if (counter % 2 === 0) {
            side = "LEFT"
            colors.arm.right = "yellow"
            colors.leg.left = "yellow"
        }

        else {
            side = "RIGHT"
            colors.arm.left = "yellow"
            colors.leg.right = "yellow"
        }

        if (side === "LEFT" && stage === "PUSH" && angle_leg_l >= 110 && angle_leg_l <= 140) {
            stage = "UP";
            counter += 1;
        }

        if (side === "RIGHT" && stage === "PUSH" && angle_leg_r >= 110 && angle_leg_r <= 140) {
            stage = "UP";
            counter += 1;
        }

    }

    function squat() {
        
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_leg_left = findAngle(23, 25, 27, poseLandmarks)

        colors.leg.right = "yellow"
        colors.leg.left = "yellow"
        if (angle_leg_left > 150 && angle_leg_right > 150) {
            stage = "DOWN";
        }

        if (stage === "DOWN" && angle_leg_left <= 110 && angle_leg_left >= 90 && angle_leg_right <= 110 && angle_leg_right >= 90) {
            stage = "UP";
            colors.leg.right = "green"
            colors.leg.left = "green"
            counter += 1;
        }

    }

    function lunges() {
        let side = ""
        let status_left=""
        let status_right=""
        const angle_left = findAngle(23, 25, 27, poseLandmarks)
        const angle_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_l_sh = findAngle(11, 23, 25, poseLandmarks)
        const angle_r_sh = findAngle(12, 24, 26, poseLandmarks)


        if (counter % 2 === 0) {
            side = "LEFT";
        } else {
            side = "RIGHT";
        }

        if (side === "LEFT") {
            
            colors.body.left = "orange"
            colors.leg.left = "orange"


            if (angle_l_sh >= 150 && angle_l_sh <= 180) {
                colors.body.left = "green"
            } else {
                colors.body.left = "red"
            }
        }

        if (side === "RIGHT") {
            
            colors.body.right = "blue"
            colors.leg.right = "blue"

            if (angle_r_sh >= 150 && angle_r_sh <= 180) {
                colors.body.right = "green"
            } else {
                colors.body.right = "red"
            }
        }

        if (angle_left >= 80 && angle_left <= 110) {
            colors.leg.left = "green"
            status_left = "OK";
        } else {
            status_left = "not ok";
        }

        if (angle_right >= 80 && angle_right <= 110) {
            colors.leg.right = "green"
            status_right = "OK";
        } else {
            status_right = "not ok";
        }

        if (status_right === "OK" && status_left === "OK") {
            stage = "up";
        }

        if (angle_left > 110 && angle_right > 110 && stage === "up") {
            colors.leg.left = "green"
            colors.leg.right = "green"
            stage = "down";
            counter += 1;
        }

    }

    function calf_rises(){

       const angle_ankle_right = findAngle(32, 28, 26, poseLandmarks)
       const angle_ankle_left = findAngle(31, 27, 25, poseLandmarks)

        if (stage === "UP" && angle_ankle_left >= 120) {
            stage = "DOWN";
        }

        if (stage === "DOWN" && angle_ankle_left <= 115) {
            stage = "UP";
        counter += 1;
}

    }

    function junmping_jack(){

        const arm_left=findAngle(23, 11, 13,poseLandmarks)
        const arm_right=findAngle(24, 12, 14,poseLandmarks)
        const center_angle=findAngleMidPoint(23,24,25,26,poseLandmarks)//находим середину между бёдрами,затем считаем угол мжде серединой и коленями
        
        let arm_status=""

        if (center_angle < 10) {
            stage = "SPREAD LEG AND ARMS";
          }
          
          if (arm_left > 170 && arm_right > 170) {
            arm_status = "ok";
          } else {
            arm_status = "not ok";
          }
          
          if (stage === "SPREAD LEG AND ARMS" && center_angle >= 15 && arm_status === "ok") {
            stage = "SHIFT";
            colors.arm.left="green"
            colors.arm.right="green"
            colors.leg.left="green"
            colors.leg.right="green"
            counter += 1;
          }

    }

    function half_jack(){

        const center_angle=findAngleMidPoint(23,24,25,26,poseLandmarks)//находим середину между бёдрами,затем считаем угол мжде серединой и коленями

        if (center_angle < 10) {
            stage = "SPREAD LEG";
          }
           
          if (stage === "SPREAD LEG" && center_angle >= 15) {
            stage = "SHIFT";
            colors.leg.left="green"
            colors.leg.right="green"
            counter += 1;
          }          

    }


    function side_leg_rises(){

    const center_angle=findAngleMidPoint(23,24,25,26,poseLandmarks)
    
    let side ="LEFT"

    if (center_angle < 30) {
    stage = "UP";
        }

    if (side === "LEFT") {
   colors.leg.left="yellow"
} 

if (side === "RIGHT") {
    colors.leg.right="yellow"
 } 

 if (side === "LEFT") {
    if (center_angle > 100 && stage === "UP") {
      stage = "SHIFT";
      counter += 1;
      side="LEFT"
      colors.leg.right="green"
    }
  }
  
  if (side === "RIGHT") {
    if (center_angle > 100 && stage === "UP") {
      stage = "SHIFT";
      counter += 1;
      side="LEFT"
      colors.leg.right="green"
    }
  }
  


    }

    return {
        colors: colors,
        stage: stage,
        counter:counter
    }
}


export default CheckExercise


