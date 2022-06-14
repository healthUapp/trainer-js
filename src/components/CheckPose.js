import findAngle from "./findAngle";

function CheckExercise(poseLandmarks, exerciseName, find_angle) {

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

    // const left_shoulder = [poseLandmarks[11]?.x, poseLandmarks[11]?.y, poseLandmarks[11]?.z]
    // const right_shoulder = [poseLandmarks[12].x, poseLandmarks[12].y, poseLandmarks[12].z]
    // const left_elbow = [poseLandmarks[13].x, poseLandmarks[13].y, poseLandmarks[13].z]
    // const right_elbow = [poseLandmarks[14].x, poseLandmarks[14].y, poseLandmarks[14].z]
    // const left_wrist = [poseLandmarks[15].x, poseLandmarks[15].y, poseLandmarks[15].z]
    // const right_wrist = [poseLandmarks[16].x, poseLandmarks[16].y, poseLandmarks[16].z]
    // const left_hip = [poseLandmarks[23].x, poseLandmarks[23].y, poseLandmarks[23].z]
    // const right_hip = [poseLandmarks[24].x, poseLandmarks[24].y, poseLandmarks[24].z]
    // const left_knee = [poseLandmarks[25].x, poseLandmarks[25].y, poseLandmarks[25].z]
    // const right_knee = [poseLandmarks[26].x, poseLandmarks[26].y, poseLandmarks[26].z]
    // const left_ankle = [poseLandmarks[27].x, poseLandmarks[27].y, poseLandmarks[27].z]
    // const right_ankle = [poseLandmarks[28].x, poseLandmarks[28].y, poseLandmarks[28].z]
    // const left_foot = [poseLandmarks[31].x, poseLandmarks[31].y, poseLandmarks[31].z]
    // const right_foot = [poseLandmarks[32].x, poseLandmarks[32].y, poseLandmarks[32].z]

    // Function to find the angle in 3D space


    if (exerciseName === 1) goodMorning();
    if (exerciseName === 2) cabaret();
    if (exerciseName === 3) march_in_place();

    function goodMorning() {

        const angle_elbow_left = findAngle(15, 13, 11, poseLandmarks)
        const angle_elbow_right = findAngle(16, 14, 12, poseLandmarks)

        const angle_back_right = findAngle(12, 24, 26, poseLandmarks)

        //const angle_leg_left=findAngle(23, 25, 27, poseLandmarks)
        const angle_leg_right = findAngle(24, 26, 28, poseLandmarks)

        let stage = "START"

        if (angle_elbow_left >= 40 && angle_elbow_right >= 40 && angle_elbow_left <= 80 && angle_elbow_right <= 80) {
            colors.arm.left = "green"
            colors.arm.right = "green"
            stage = "KNEE"
        }


        if (stage === "KNEE" && angle_leg_right >= 120 && angle_leg_right <= 160) {
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

        if (counter % 2 == 0) {
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
            stage == "UP"
            colors.arm.left = "yellow"
            colors.leg.right = "yellow"
        }
        else {
            side = "RIGHT"
            stage == "UP"
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
    return {
        colors: colors,
    }
}


export default CheckExercise


