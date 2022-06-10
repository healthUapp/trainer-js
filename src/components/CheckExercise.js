function CheckExercise(poseLandmarks, exerciseName) {

    //arms
    const left_shoulder=poseLandmarks[11]
    const right_shoulder=poseLandmarks[12]
    const left_elbow=poseLandmarks[13]
    const right_elbow=poseLandmarks[14]
    const left_wrist=poseLandmarks[15]
    const right_wrist=poseLandmarks[16]
    //legs
    const left_hip=poseLandmarks[23]
    const right_hip=poseLandmarks[24]
    const left_knee=poseLandmarks[25]
    const right_knee=poseLandmarks[26]
    const left_ankle=poseLandmarks[27]
    const right_ankle=poseLandmarks[28]
    const left_foot=poseLandmarks[31]
    const right_foot=poseLandmarks[32]
   
    let colors = {
        arm:{
            left: {
                up: '',
                down: ''
            },
            right: {
                up: '',
                down: ''
            }
        },
        body:{
            up: '',
            down: '',
            left: '',
            right: ''
        },
        leg:{
            left: {
                up: '',
                down: ''
            },
            right: {
                up: '',
                down: ''
            }
        }
    }

    // function radians_to_degrees(radians) {
    //     return radians * (180 / Math.PI);
    // }
    
    // // Function to find the distance between 2 points in a 3D plane
    // function dist(p1, p2) {
    //     return Math.sqrt(
    //         Math.pow(p1[0] - p2[0], 2) +
    //         Math.pow(p1[1] - p2[1], 2) +
    //         Math.pow(p1[2] - p2[2], 2)
    //     ); 
    // }
    
    // // Function to find the angle in 3D space
    // function find_angle(p1, p2, p3) {
    //     const ab = dist(a, b);
    //     const bc = dist(b, c);
    //     const ac = dist(a, c);
    
    //     const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / 
    // (2 * ab * bc);
    //     return radians_to_degrees(Math.acos(angle));
    // }  

    
    
    switch (exerciseName) {
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
    }

    return colors
}


export default CheckExercise