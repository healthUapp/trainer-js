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

    if(!poseLandmarks) return colors;

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

    function goodMorning() {
        const angle = findAngle(12, 14, 16, poseLandmarks)
        if ((angle > 70 && angle < 90) || angle >= 100 && angle < 120) {
            colors.arm.right = 'yellow'
        }
        if (angle >= 90 && angle < 100) {
            colors.arm.right = 'green'
        }
        if (angle <= 70 || angle >= 120) {
            colors.arm.right = 'red'
        }
    }
    
    return {
        colors: colors,
    }
}


export default CheckExercise


