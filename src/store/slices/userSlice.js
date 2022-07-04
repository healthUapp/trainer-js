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

            const results =  action.payload
            console.log(results)
            state.results = results

            writeUserData(state.id, results)

            state.id += 1
            state.results = []


            function writeUserData(id, exercisesResults) {
                set(ref("https://healtuapp-fit-default-rtdb.europe-west1.firebasedatabase.app/exercises"), {
                  id: id,
                  results: exercisesResults
                });

            }
              

        
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;