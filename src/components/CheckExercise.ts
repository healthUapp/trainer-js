import React from 'react'

function CheckExercise(poseLandmarks: any, exerciseName: Number) {

    

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