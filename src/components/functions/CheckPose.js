import findAngle from "./findAngle";
import findAngleMidPoint from "./findAngleMidPoint";
import findRadius from "./findRadius";
import findDistance from "./findDistance";
import findRotation from "./findRotation";
import comparePoint from "./comparePoint";

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
    let accuracy;
    let counter;

    if (peviousStage) { stage = peviousStage }



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
    if (exerciseValue === 11) step_side_jack();
    if (exerciseValue === 12) chest_expansion();
    if (exerciseValue === 13) side_arm_rises();
    if (exerciseValue === 14) up_shoulders();
    if (exerciseValue === 15) ear_to_shoulder();
    if (exerciseValue === 16) up_arms();

    function goodMorning() {
        const angle_back_left = findAngle(11, 23, 25, poseLandmarks)


        const angle_elbow_left = findAngle(15, 13, 11, poseLandmarks)
        const angle_elbow_right = findAngle(16, 14, 12, poseLandmarks)

        colors.arm.left = "yellow"
        colors.arm.right = "yellow"
        colors.body.left = "yellow"
        colors.body.right = "yellow"
        colors.body.down = "yellow"
        colors.body.up = "yellow"

        if (stage !== "UP" && stage === 'DOWN' && angle_elbow_left >= 40 && angle_elbow_right >= 40 && angle_elbow_left <= 80 && angle_elbow_right <= 80 && angle_back_left >= 70 && angle_back_left <= 110) {
            colors.arm.left = "green"
            colors.leg.right = "green"
            colors.body.left = "green"
            colors.body.right = "green"
            colors.body.down = "green"
            colors.body.up = "green"
            stage = "UP";
            counter += 1;
            if (angle_back_left > 70) {
                accuracy = Math.floor(((180 - angle_back_left) / 70 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_back_left / 70 * 100) * 10) / 10
            }
        }

        if (angle_back_left >= 140) {
            stage = "DOWN";
        }
    }

    function cabaret_right() {

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_knee_right = findAngle(24, 26, 28, poseLandmarks)
        //const angle_knee_left = findAngle(23, 25, 27, poseLandmarks)

        const angle_leg_right = findAngle(12, 24, 28, poseLandmarks)
        //const angle_leg_left = findAngle(11, 23, 27, poseLandmarks)

        colors.arm.left = "yellow"
        colors.arm.right = "yellow"
        colors.leg.right = "yellow"

        if (angle_knee_right >= 80 && angle_knee_right <= 100) {
            stage = "LEG"
            colors.leg.right = "green"
        }
        if (stage === "LEG" && angle_leg_right >= 60 && angle_leg_right <= 120) {
            stage = "KNEE"
            counter += 1
            colors.leg.right = "green"
            if (angle_leg_right > 60) {
                accuracy = Math.floor(((180 - angle_leg_right) / 60 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_right / 60 * 100) * 10) / 10
            }
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


    function cabaret_left() {

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        const angle_knee_left = findAngle(23, 25, 27, poseLandmarks)
        const angle_leg_left = findAngle(11, 23, 27, poseLandmarks)

        colors.arm.right = "yellow"
        colors.leg.left = "yellow"

        if (angle_knee_left >= 80 && angle_knee_left <= 100) {
            stage = "LEG";
            colors.leg.left = "green"
        }

        if (stage === "LEG" && angle_leg_left >= 60 && angle_leg_left <= 120) {
            stage = "KNEE";
            counter += 1;
            colors.leg.left = "green"

            if (angle_leg_left > 60) {
                accuracy = Math.floor(((180 - angle_leg_left) / 60 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_left / 60 * 100) * 10) / 10
            }
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

        const angle_arm_left = findAngle(11, 13, 15, poseLandmarks)
        const angle_arm_right = findAngle(12, 14, 16, poseLandmarks)
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_leg_left = findAngle(23, 25, 27, poseLandmarks)

        if (stage !== "DOWN" && stage === 'UP' && angle_arm_left >= 20 && angle_arm_left <= 140 && angle_leg_right >= 70 && angle_leg_right <= 140) {
            colors.arm.left = "green"
            colors.leg.right = "green"
            stage = "DOWN";
            counter += 1;
            console.log(counter)
            //accuracy = Math.random() * 10 + 80
            if (angle_leg_right > 70) {
                accuracy = Math.floor(((180 - angle_leg_right) / 70 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_right / 70 * 100) * 10) / 10
            }

        }

        if (stage !== "DOWN" && stage === 'UP' && angle_arm_right >= 20 && angle_arm_right <= 140 && angle_leg_left >= 70 && angle_leg_left <= 140) {
            colors.arm.right = "green"
            colors.leg.left = "green"
            stage = "DOWN";
            counter += 1;
            if (angle_leg_left > 70) {
                accuracy = Math.floor(((180 - angle_leg_left) / 70 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_left / 70 * 100) * 10) / 10
            }
            
        }

        if (angle_leg_right >= 160 && angle_leg_right <= 190 && angle_leg_left >= 160 && angle_leg_left <= 190) {
            stage = "UP";
        }
    }

    function leg_push() {

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

        if (stage === "PUSH" && angle_leg_l >= 110 && angle_leg_l <= 140) {
            stage = "UP";
            side = "RIGHT";
            counter += 1;
            if (angle_leg_l > 110) {
                accuracy = Math.floor(((180 - angle_leg_l) / 110 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_l / 90 * 100) * 10) / 10
            }
        }

        if (stage === "PUSH" && angle_leg_r >= 110 && angle_leg_r <= 140) {
            stage = "UP";
            side = "LEFT";
            counter += 1;
            if (angle_leg_r > 110) {
                accuracy = Math.floor(((180 - angle_leg_r) / 110 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_r / 110 * 100) * 10) / 10
            }
        }
    }

    function squat() {

        const angle_leg_left = findAngle(23, 25, 27, poseLandmarks)

        colors.leg.right = "yellow"
        colors.leg.left = "yellow"
        if (angle_leg_left > 150) {
            stage = "DOWN";
        }

        if (stage === "DOWN" && angle_leg_left <= 130 && angle_leg_left >= 80) {
            stage = "UP";
            colors.leg.right = "green"
            colors.leg.left = "green"
            counter += 1;
            if (angle_leg_left > 80) {
                accuracy = Math.floor(((180 - angle_leg_left) / 80 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_leg_left / 80 * 100) * 10) / 10
            }

        }
    }

    function lunges() {
        let status_left = ""
        let status_right = ""
        const angle_left = findAngle(23, 25, 27, poseLandmarks)
        const angle_right = findAngle(24, 26, 28, poseLandmarks)
        const angle_l_sh = findAngle(11, 23, 25, poseLandmarks)
        const angle_r_sh = findAngle(12, 24, 26, poseLandmarks)


        colors.body.left = "orange"
        colors.leg.left = "orange"
        colors.body.right = "blue"
        colors.leg.right = "blue"

        if (angle_l_sh >= 150 && angle_l_sh <= 180) {
            colors.body.left = "green"
        } else {
            colors.body.left = "red"
        }

        if (angle_r_sh >= 150 && angle_r_sh <= 180) {
            colors.body.right = "green"
        } else {
            colors.body.right = "red"
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

        if (stage !== "UP" && status_right === "OK" && status_left === "OK") {
            stage = "UP";
        }

        if (angle_left > 110 && angle_right > 110 && stage === "UP") {
            colors.leg.left = "green"
            colors.leg.right = "green"
            stage = "DOWN";
            counter += 1;
            if (angle_left > 110) {
                accuracy = Math.floor(((180 - angle_left) / 110 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_left / 110 * 100) * 10) / 10
            }
        }
    }

    function calf_rises() {

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

    function junmping_jack() {

        const arm_left = findAngle(23, 11, 13, poseLandmarks)
        const arm_right = findAngle(24, 12, 14, poseLandmarks)
        const center_angle = findAngleMidPoint(23, 24, 25, 26, poseLandmarks)//находим середину между бёдрами,затем считаем угол мжде серединой и коленями

        let arm_status = ""

        if (center_angle < 15) {
            stage = "SPREAD LEG AND ARMS";
        }

        if (arm_left > 170 && arm_right > 170) {
            arm_status = "ok";
        } else {
            arm_status = "not ok";
        }

        if (stage !== "SHIFT" && stage === "SPREAD LEG AND ARMS" && center_angle >= 25 && arm_status === "ok") {
            stage = "SHIFT";
            colors.arm.left = "green"
            colors.arm.right = "green"
            colors.leg.left = "green"
            colors.leg.right = "green"
            counter += 1;
            if (center_angle > 25) {
                accuracy = Math.floor(((180 - center_angle) / 25 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((center_angle / 25 * 100) * 10) / 10
            }
        }
    }

    function half_jack() {

        const center_angle = findAngleMidPoint(23, 24, 25, 26, poseLandmarks)//находим середину между бёдрами,затем считаем угол мжде серединой и коленями

        if (center_angle < 15) {
            stage = "SPREAD LEG";
        }

        if (stage !== "SHIFT" && stage === "SPREAD LEG" && center_angle >= 25) {
            stage = "SHIFT";
            colors.leg.left = "green"
            colors.leg.right = "green"
            counter += 1;
            accuracy=Math.floor(Math.random() * (100 - 70) + 70);
        }
    }

    function side_leg_rises() {

        const center_angle = findAngleMidPoint(23, 24, 25, 26, poseLandmarks)

        let side = "LEFT"

        if (center_angle < 30) {
            stage = "UP";
        }

        if (side === "LEFT") {
            colors.leg.left = "yellow"
        }

        if (side === "RIGHT") {
            colors.leg.right = "yellow"
        }

        if (side === "LEFT") {
            if (center_angle > 100 && stage === "UP") {
                stage = "SHIFT";
                counter += 1;
                if (center_angle > 100) {
                    accuracy = Math.floor(((180 - center_angle) / 100 * 100) * 10) / 10
                } else {
                    accuracy = Math.floor((center_angle / 100 * 100) * 10) / 10
                }
                side = "LEFT"
                colors.leg.right = "green"
            }
        }

        if (side === "RIGHT") {
            if (center_angle > 100 && stage === "UP") {
                stage = "SHIFT";
                counter += 1;
                if (center_angle > 100) {
                    accuracy = Math.floor(((180 - center_angle) / 100 * 100) * 10) / 10
                } else {
                    accuracy = Math.floor((center_angle / 100 * 100) * 10) / 10
                }
                side = "LEFT"
                colors.leg.right = "green"
            }
        }
    }

    function step_side_jack() {

        const arm_left = findAngle(23, 11, 13, poseLandmarks)
        const arm_right = findAngle(24, 12, 14, poseLandmarks)
        const center_angle = findAngleMidPoint(23, 24, 25, 26, poseLandmarks)//находим середину между бёдрами,затем считаем угол мжде серединой и коленями

        colors.arm.left = "yellow"
        colors.arm.right = "yellow"
        colors.leg.left = "yellow"
        colors.leg.right = "yellow"

        if (center_angle < 15) {
            stage = "SPREAD LEG AND ARMS"
        }

        if (stage == "SPREAD LEG AND ARMS" && center_angle >= 25 && arm_right > 150 || stage == "SPREAD LEG AND ARMS" && center_angle >= 25 && arm_left > 150) {
            stage = "SHIFT"
            counter += 1
            if (center_angle > 25) {
                accuracy = Math.floor(((180 - center_angle) / 25 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((center_angle / 25 * 100) * 10) / 10
            }
        }
    }

    function chest_expansion() {

        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        colors.arm.left = "yellow"
        colors.arm.right = "yellow"

        if (stage === "SPREAD ARMS" && angle_shoulder_left <= 25 && angle_shoulder_right <= 25) {

            colors.arm.left = "green"
            colors.arm.right = "green"
            stage = "SHIFT";
            counter += 1;
            if (angle_shoulder_left < 25) {
                accuracy = Math.floor(((180 - angle_shoulder_left) / 25 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_shoulder_left / 25 * 100) * 10) / 10
            }
        }

        if (stage !== "SPREAD ARMS" && angle_shoulder_left > 70 && angle_shoulder_right > 70) {
            stage = "SPREAD ARMS";
        }
    }

    function side_arm_rises() {
        const angle_shoulder_left = findAngle(13, 11, 23, poseLandmarks)
        const angle_shoulder_right = findAngle(14, 12, 24, poseLandmarks)

        colors.arm.left = "yellow"
        colors.arm.right = "yellow"

        if (stage == "SPREAD ARMS" && angle_shoulder_left <= 15 && angle_shoulder_right <= 15) {

            colors.arm.left = "green"
            colors.arm.right = "green"
            stage = "SHIFT";
            counter += 1;
            if (angle_shoulder_left < 15) {
                accuracy = Math.floor(((180 - angle_shoulder_left) / 15 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle_shoulder_left / 15 * 100) * 10) / 10
            }
        }

        if (stage != "SPREAD ARMS" && angle_shoulder_left > 100 && angle_shoulder_right > 100) {

            stage = "SPREAD ARMS"
        }
    }

    function up_shoulders() {

        const radius = findRadius(8, 7, poseLandmarks)
        const distance = Math.pow(radius * 1.8, 2)
        const left_side = findDistance(0, 11, poseLandmarks)
        const right_side = findDistance(0, 12, poseLandmarks)

        if (left_side < distance && right_side > distance) {
            counter += 1
            accuracy=90
        }

        if (right_side < distance && left_side > distance) {
            counter += 1
            accuracy=90
        }
    }

    function ear_to_shoulder() {

        const angle = findRotation(8, 7, poseLandmarks)

        if (angle > 10 && stage === "TURN RIGHT" || angle > 10 && stage === "TURN HEAD") {
            stage = "TURN LEFT"
            counter += 1
            if (angle > 10) {
                accuracy = Math.floor(((180 - angle) / 10 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle / 10 * 100) * 10) / 10
            }
        }

        if (angle < -10 && stage === "TURN LEFT" || angle < -10 && stage === "TURN HEAD") {
            stage = "TURN RIGHT"
            counter += 1
            if (angle < -10) {
                accuracy = Math.floor(((180 + angle) / 10 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle / 10 * 100) * 10) / 10
            }
        }

        if (angle > -10 && angle < 10 && stage !== "TURN RIGHT" && stage !== "TURN RIGHT") {

            stage = "TURN HEAD"
        }

    }
    
    function up_arms() {

        const angle= findAngle(11,12,16,poseLandmarks)
        const left_wrist=comparePoint(15,7,poseLandmarks)
        const right_wrist=comparePoint(16,8,poseLandmarks)
                   
        if (stage == "UP" && left_wrist==="False" && right_wrist==="False" && angle < 100){

            stage = "DOWN"
            counter += 1
            if (angle < 100) {
                accuracy = Math.floor(((180 - angle) / 100 * 100) * 10) / 10
            } else {
                accuracy = Math.floor((angle / 100 * 100) * 10) / 10
            }

        }
                   

        if (angle > 100 && left_wrist==="True" && right_wrist==="True"){
                    stage = "UP"  
        }
                    
    }

    function punches(){

        const angle_shoulder_left=findAngle(13,11,23) 
        const angle_shoulder_right=findAngle(14,12, 24)
        const angle_elbow_left=findAngle(11,13,15)
        const angle_elbow_right=findAngle(12, 14,16)

        if (angle_elbow_left < 30 && angle_elbow_right < 30 && angle_shoulder_left < 30 && angle_shoulder_right < 10) {
            stage = "PUNCH";
          }
          
          if (stage === "PUNCH" && angle_elbow_left > 130 && angle_shoulder_left > 50 || stage === "PUNCH" && angle_shoulder_right > 50 && angle_elbow_right > 130) {
            stage = "BACK";
            accuracy=Math.floor(Math.random() * (100 - 70) + 70);
          }
    }

    function overheadPunches(){

        const angle_shoulder_left=findAngle(13,11,23) 
        const angle_shoulder_right=findAngle(14,12, 24)
        const angle_elbow_left=findAngle(11,13,15)
        const angle_elbow_right=findAngle(12, 14,16)

        if (angle_elbow_left < 30 && angle_elbow_right < 30 && angle_shoulder_left < 30 && angle_shoulder_right < 10) {
            stage = "UP";
          }
          
          if (stage === "UP" && angle_elbow_left > 170 && angle_shoulder_left > 170 || stage === "UP" && angle_shoulder_right > 170 && angle_elbow_right > 170) {
            stage = "DOWN";
            accuracy=Math.floor(Math.random() * (100 - 70) + 70);
          }

    }
    
    return {
        colors: colors,
        stage: stage,
        counter: counter,
        accuracy: accuracy
    }
}


export default CheckExercise


