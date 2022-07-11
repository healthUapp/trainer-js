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

            const results =  action.payload.results
            const setIndex = action.payload.setIndex

            state.results = results

            // writeUserDataForFirebase(state.id, results)

            
            localStorage.setItem(`${setIndex}`, JSON.stringify(results));

            function clearResults(){
                state.id += 1
                state.results = []
            }


            function writeUserDataForFirebase(id, exercisesResults) {
                const db = getDatabase();
                console.log(exercisesResults)
                set(ref(db, 'exercises/' + id), {
                  results: {
                    name: exercisesResults[0].name,
                    value: exercisesResults[0].value,
                  }
                });

            }
              
            clearResults()
        
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;