import {createSlice} from '@reduxjs/toolkit'

import { getDatabase, ref, set } from "firebase/database";

const initialState = {
    email: null,
    token: null,
    id: null
};

const userSlice = createSlice({
    id: 0,
    name: "user_id",
    initialState,
    results: [],
    reducers: {
        addResult(state, action){

            console.log('s')

            let localState = JSON.parse(localStorage.getItem('result'))
            console.log(localState)
            const results =  action.payload.results
            const indexOfSet = action.payload.indexOfSet

            state.results = results

            
                
            let newState = []

            console.log(newState)

            if(localState) newState.push(localState)

            newState.push({
                results:results,
                indexOfSet: indexOfSet,
                date: new Date().toString()
            })


            localStorage.setItem('results', JSON.stringify(newState));

            function clearResults(){
                state.id += 1
                state.results = []
            }
            clearResults()
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;