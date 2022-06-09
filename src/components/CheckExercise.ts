import React from 'react'

function CheckExercise(poseLandmarks: any, exerciseName: Number) {

    console.log(poseLandmarks, exerciseName)

    return {
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
}

export default CheckExercise