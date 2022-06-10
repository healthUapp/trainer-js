function CheckExercise(poseLandmarks, exerciseName) {
    const left_shoulder = [poseLandmarks[11].x, poseLandmarks[11].y, poseLandmarks[11].z]
    const right_shoulder = [poseLandmarks[12].x, poseLandmarks[12].y, poseLandmarks[12].z]
    const left_elbow = [poseLandmarks[13].x, poseLandmarks[13].y, poseLandmarks[13].z]
    const right_elbow = [poseLandmarks[14].x, poseLandmarks[14].y, poseLandmarks[14].z]
    const left_wrist = [poseLandmarks[15].x, poseLandmarks[15].y, poseLandmarks[15].z]
    const right_wrist = [poseLandmarks[16].x, poseLandmarks[16].y, poseLandmarks[16].z]
    const left_hip = [poseLandmarks[23].x, poseLandmarks[23].y, poseLandmarks[23].z]
    const right_hip = [poseLandmarks[24].x, poseLandmarks[24].y, poseLandmarks[24].z]
    const left_knee = [poseLandmarks[25].x, poseLandmarks[25].y, poseLandmarks[25].z]
    const right_knee = [poseLandmarks[26].x, poseLandmarks[26].y, poseLandmarks[26].z]
    const left_ankle = [poseLandmarks[27].x, poseLandmarks[27].y, poseLandmarks[27].z]
    const right_ankle = [poseLandmarks[28].x, poseLandmarks[28].y, poseLandmarks[28].z]
    const left_foot = [poseLandmarks[31].x, poseLandmarks[31].y, poseLandmarks[31].z]
    const right_foot = [poseLandmarks[32].x, poseLandmarks[32].y, poseLandmarks[32].z]

    // Function to find the angle in 3D space
    function find_angle(p1, p2, p3) {
        function radians_to_degrees(radians) {
            return radians * (180 / Math.PI);
        }
        function dist(p1, p2) {
            let one = Math.pow(p1[0] - p2[0], 2)
            let two = Math.pow(p1[1] - p2[1], 2)
            return Math.sqrt(one + two)
        }

        const ab = dist(p1, p2);
        const bc = dist(p2, p3);
        const ac = dist(p1, p3);

        const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);

        return radians_to_degrees(Math.acos(angle));
    }

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
            left: {
                up: 'white',
                down: 'white'
            },
            right: {
                up: 'white',
                down: 'white'
            }
        }
    }

    if (exerciseName === 1) goodMorning();

    function goodMorning() {
        const angle = find_angle(right_shoulder, right_elbow, right_wrist)


        if (angle > 30 && angle < 90) {
            colors.arm.right.up = 'yellow'
            colors.arm.right.down = 'yellow'
        }

        if (angle >= 90 && angle < 100) {
            colors.arm.right.up = 'green'
            colors.arm.right.down = 'green'

        }

        if (angle <= 30 || angle >= 100) {
            colors.arm.right.up = 'red'
            colors.arm.right.down = 'red'
        }

    }


    return colors
}


export default CheckExercise


