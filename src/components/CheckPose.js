import { color } from "d3";
import findAngle from "./findAngle";
import checkBody from "./checkBody";

function CheckExercise(poseLandmarks, exerciseValue) {
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

    if (!poseLandmarks) return colors;

    if (exerciseValue === 0) {
        
        if(checkBody(poseLandmarks)){
            goodMorning()
        }
    };

    if (exerciseValue === 1) cabaret();
    if (exerciseValue === 2) march_in_place();
    if (exerciseValue === 3) leg_push();
    if (exerciseValue === 4) high_knee_march();
    if (exerciseValue === 5) squat();



    function goodMorning() {
        const angle_back_right = findAngle(12, 24, 26, poseLandmarks)
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)


        let stage = "DOWN"

        if (stage === "UP" && angle_leg_right >= 120 && angle_leg_right <= 160) {
            colors.leg.left = "green"
            colors.leg.right = "green"
            stage = "DOWN"
        }


        if (stage === "DOWN" && angle_back_right >= 90 && angle_back_right <= 130) {
            colors.body.up = "green"
            colors.body.down = "green"
            stage = "UP"
        }

    }

    function cabaret() {

        let stage = "START"
        let side = ""
        let counter = 0

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_knee_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_knee_left = findAngle(23, 25, 27, poseLandmarks)

        const angle_leg_right = findAngle(12, 24, 28, poseLandmarks)
        const angle_leg_left = findAngle(11, 23, 27, poseLandmarks)

        if (counter % 2 === 0) {
            side = "LEFT"
            colors.arm.left = "yellow"
            colors.leg.right = "yellow"
        }
        else {
            side = "RIGHT"
            colors.arm.right = "yellow"
            colors.leg.left = "yellow"
        }


        if (angle_shoulder_left >= 80 && angle_shoulder_right >= 80) {
            colors.arm.left = "green"
            colors.arm.right = "green"
            stage = "KNEE"
        }
        else {
            colors.arm.left = "red"
            colors.arm.right = "red"
        }


        if (side === "LEFT") {
            if (stage === "KNEE" && angle_knee_right >= 80 && angle_knee_right <= 100) {
                stage = "LEG"
                colors.leg.right = "green"
            }
            if (stage === "LEG" && angle_leg_right >= 90 && angle_leg_right <= 110) {
                stage = "STAND"
                counter += 1
                colors.leg.right = "green"
            }
        }


        if (side === "RIGHT") {
            if (stage === "KNEE" && angle_knee_left >= 80 && angle_knee_left <= 100) {
                stage = "LEG";
                colors.leg.left = "green"
            }

            if (stage === "LEG" && angle_leg_left >= 90 && angle_leg_left <= 110) {
                stage = "STAND";
                counter += 1;
                colors.leg.left = "green"
            }
        }

    }

    function march_in_place() {

        let stage = "START"
        let side = ""
        let counter = 0

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

    function leg_push(){
        let stage = "START"
        let side = ""
        let counter = 0

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
            colors.arm.right="yellow"
            colors.leg.left="yellow"
          }

          else {
            side = "RIGHT"
            colors.arm.left="yellow"
            colors.leg.right="yellow"
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

    function high_knee_march(){
        
    }

    function squat(){
        let counter = 0
        let stage =null;
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_leg_left = findAngle(23, 25, 27, poseLandmarks)

        colors.leg.right="yellow"
        colors.leg.left="yellow"
        if (angle_leg_left > 150 && angle_leg_right > 150) {
            stage = "DOWN";
          }
          
          if (stage === "DOWN" && angle_leg_left <= 110 && angle_leg_left >= 90 && angle_leg_right <= 110 && angle_leg_right >= 90) {
            stage = "UP";
            colors.leg.right="green"
            colors.leg.left="green"
            counter += 1;
          }

    }

    
    return {
        colors: colors,
    }
}


export default CheckExercise


