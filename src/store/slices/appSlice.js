import {createSlice} from '@reduxjs/toolkit'
import {sendData} from "components/functions/firebaseFunctions";

//exImg
import halfjack from 'assets/exImg/halfjack.png'
import squat from 'assets/exImg/squat.png'
import stepsidejack from 'assets/exImg/step_side_jack.png'
import side_leg_raises from 'assets/exImg/side_leg_raises.png'
import side_arm_raises from 'assets/exImg/side_arm_raises.png'
import chest_expansion from 'assets/exImg/chest_expansion.png'
import jumping_jack from 'assets/exImg/jumping_jack.png'

//video
import goodMorningMp from '../../assets/video/5.mp4'
import armStorony from '../../assets/video/4.mp4'
import armVverh from '../../assets/video/3.mp4'
import kylaki from '../../assets/video/2.mp4'
import plechi from '../../assets/video/6.mp4'
import golova from '../../assets/video/7.mp4'

//PNG
import day1 from 'assets/png/day1.png'
import day2 from 'assets/png/day2.png'
import day3 from 'assets/png/day3.png'
import day4 from 'assets/png/day4.png'
import day5 from 'assets/png/day7.png'
import day6 from 'assets/png/blocked.png'

const trainerData = {
    allExercises: [
        {
            name: "GOOD MORNING",
            mp4: goodMorningMp
        },
        {
            name: "CANCAN LEFT",
        },
        {
            name: "MARCH IN PLACE",
        },
        {
            name: "LEG PUSH",
        },
        {
            name: "SQUAT",
        },
        {
            name: "REVERSE LUNGE",
        },
        {
            name: "CALF RISES",
        },
        {
            name: "JUMPING JACK",
        },
        {
            name: "HALF JACK",
        },
        {
            name: "CANCAN RIGHT",
        },
        {
            name: "SIDE LEG RISES",
        },
        {
            name: "STEP SIDE JACK",
        },
        {
            name: "CHEST EXPANSION",
        },
        {
            name: "SIDE ARM RISES",
        },
        {
            name: "SHRUGS SEATED",
            mp4: plechi
        },
        {
            name: "HEAD TILTS LR SEATED",
            mp4: golova
        },
        {
            name: "OVERHEAD SHOULDER STRETCH SEATED",
        },

        {
            name: "PUNCHES SEATED",
            mp4: kylaki
        },

        {
            name: "OVERHEAD PUNCHES SEATED",
        },

        {
            name: "ARM CHOPS SEATED",
            mp4: armVverh
        },

        {
            name: "ARM SCISSORS SEATED",
            mp4: armStorony
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
    ],

    allDays: {
        names: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        images: [day1, day2, day3, day4, day5, day6],
    }
}

const initialState = {
    data: trainerData,
    chosenCourceIndex: null,
    chosenSetIndex: null,
    showResults: false
};


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCourceIndex(state, action) {
            state.chosenCourceIndex = action.payload.index
        },
        setSetIndex(state, action) {
            state.chosenSetIndex = action.payload.index
        },
        setShowResults(state,action){
            state.showResults = action.payload.status
        }
        
    }
})

export const {setCourceIndex, setSetIndex, setShowResults} = appSlice.actions;

export default appSlice.reducer;
