import {createSlice} from '@reduxjs/toolkit'
import {sendData} from "components/functions/firebaseFunctions";

//GIF
import marchGif from 'assets/gif/March in place.gif'
import goodMorningGif from 'assets/gif/Good morning.gif'
import cancanGif from 'assets/gif/Cancan.gif'
import lungeGif from 'assets/gif/Back lunge.gif'
import SLDLGif from 'assets/gif/SLDL with chair.gif'
import armChopsSeatGif from 'assets/gif/Arm Chops on chair.gif'
import armScissorsSeatGif from 'assets/gif/Arm scissors on chair.gif'
import headTiltisGif from 'assets/gif/Head tilts.gif'
import overheadPunchesSeatedGif from 'assets/gif/Overhead punches seated.gif'
import overheadShouldersStretchGif from 'assets/gif/Overhead shoulders strech.gif'
import punchesSeatedGif from 'assets/gif/Punches.gif'
import shrugsGif from 'assets/gif/Shrugs.gif'

//exImg
import halfjack from 'assets/exImg/halfjack.png'
import squat from 'assets/exImg/squat.png'
import stepsidejack from 'assets/exImg/step_side_jack.png'
import side_leg_raises from 'assets/exImg/side_leg_raises.png'
import side_arm_raises from 'assets/exImg/side_arm_raises.png'
import chest_expansion from 'assets/exImg/chest_expansion.png'
import jumping_jack from 'assets/exImg/jumping_jack.png'

const trainerData = {
    allExercises: [
        {
            name: "GOOD MORNING",
            gif: goodMorningGif
        },
        {
            name: "CANCAN LEFT",
            gif: cancanGif
        },
        {
            name: "MARCH IN PLACE",
            gif: marchGif
        },
        {
            name: "LEG PUSH",
            gif: SLDLGif
        },
        {
            name: "SQUAT",
            gif: squat
        },
        {
            name: "REVERSE LUNGE",
            gif: lungeGif
        },
        {
            name: "CALF RISES",
        },
        {
            name: "JUMPING JACK",
            gif: jumping_jack
        },
        {
            name: "HALF JACK",
            gif: halfjack
        },
        {
            name: "CANCAN RIGHT",
            gif: cancanGif
        },
        {
            name: "SIDE LEG RISES",
            gif: side_leg_raises
        },
        {
            name: "STEP SIDE JACK",
            gif: stepsidejack
        },
        {
            name: "CHEST EXPANSION",
            gif: chest_expansion
        },
        {
            name: "SIDE ARM RISES",
            gif: side_arm_raises
        },
        {
            name: "SHRUGS SEATED",
            gif:shrugsGif
        },
        {
            name: "HEAD TILTS LR SEATED",
            gif:headTiltisGif
        },
        {
            name: "OVERHEAD SHOULDER STRETCH SEATED",
            gif:overheadShouldersStretchGif
        },

        {
            name: "PUNCHES SEATED",
            gif:punchesSeatedGif
        },

        {
            name: "OVERHEAD PUNCHES SEATED",
            gif:overheadPunchesSeatedGif
        },

        {
            name: "ARM CHOPS SEATED",
            gif:armChopsSeatGif
        },

        {
            name: "ARM SCISSORS SEATED",
            gif:armScissorsSeatGif
        },

        {
            name: "ARM CHOPS",
        },

        {
            name: "ARM SCISSORS",
        },
        {
            name: "ELBOW CLICKS SEATED",
        },
        {
            name: "SHOULDER TAPS SEATED",
        },
        {
            name: "ELBOW CLICKS ",
        },
        {
            name: "SHOULDER TAPS",
        },
        {
            name: "BICEPS EXTENSION SEATED",
        },
        {
            name: "W EXTENSION SEATED",
        },
        {
            name: "BICEPS EXTENSION",
        },

        {
            name: "W EXTENSION",
        }
        
    ],

    allSetsNames: [
        "Seated stretch",
        "Chop Scissors Punches seated",
        "Legs & Core"
    ],

    allSets: [

        [
            { exerciseIndex: 14, time: 30 },
            { exerciseIndex: 15, time: 30 },
            { exerciseIndex: 16, time: 30 },
        ],

        [
            { exerciseIndex: 19, time: 30 },
            { exerciseIndex: 20, time: 30 },
            { exerciseIndex: 17, time: 30 },
            { exerciseIndex: 18, time: 30 },
        ],

        [
            //По этому индексу вытаскивается упражнение из allExercises
            { exerciseIndex: 0, time: 30 },
            { exerciseIndex: 2, time: 30 },
            { exerciseIndex: 1, time: 30 },
            { exerciseIndex: 9, time: 30 },
            { exerciseIndex: 5, time: 30 },
            { exerciseIndex: 3, time: 30 },
        ],

        [
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 4, time: 10 },

        ],

        [
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 8, time: 10 },
            { exerciseIndex: 7, time: 10 },

        ],

        [
            { exerciseIndex: 5, time: 15 },
            { exerciseIndex: 8, time: 15 },
            { exerciseIndex: 4, time: 15 },
            { exerciseIndex: 8, time: 15 },
        ],

        [
            { exerciseIndex: 11, time: 10 },
            { exerciseIndex: 7, time: 10 },
            { exerciseIndex: 11, time: 10 },
            { exerciseIndex: 7, time: 10 },
        ],

        [
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            { exerciseIndex: 7, exValue: 20 },
            { exerciseIndex: 11, exValue: 4 },
            { exerciseIndex: 12, exValue: 4 },
            //2 минуты отдыха и так 3 раза
        ],

    ],

    allCources: [
        [0,1,2],
        [0,1,2],
        [0,1,2],
        [0,1,2],
        [0,1,2],
        []
    ]
}

const initialState = {
    email: null,
    token: null,
    id: null,
    data: trainerData
};



const userSlice = createSlice({
    name: "user_id",
    initialState,
    results: [],
    reducers: {
        addResult(state, action){

            function getLocalState(){
                let localState = JSON.parse(localStorage.getItem('results'))
                console.log(localState)
                const results =  action.payload.results
                const indexOfSet = action.payload.indexOfSet
    
                state.results = results
    
                let newState = []
    
                console.log(newState)
    
                if(localState) newState = localState.slice()
    
                newState.push({
                    results:results,
                    indexOfSet: indexOfSet,
                    date: new Date().toString()
                })
    
                localStorage.setItem('results', JSON.stringify(newState));
                sendData(JSON.stringify(newState))
            }

            function clearResults(){
                state.results = []
            }

            getLocalState()
            clearResults()
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;