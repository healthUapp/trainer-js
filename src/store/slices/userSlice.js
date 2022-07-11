import {createSlice} from '@reduxjs/toolkit'
import { getDatabase, ref, set } from "firebase/database";
import {database} from "../../firebase";


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
            const indexOfSet = action.payload.indexOfSet

            state.results = results

            // writeUserDataForFirebase(state.id, results)
            localStorage.getItem('result')
            
            const date = new Date().toLocaleString("by-BY", {year: 'numeric', month: '2-digit', day: 'numeric' })
            const id = `date-${date}-set-${indexOfSet}`
            localStorage.setItem(`${id}`, JSON.stringify(results));


            




            function clearResults(){
                state.id += 1
                state.results = []
            }

            // function writeUserDataForFirebase(id, exercisesResults) {
            //     console.log(exercisesResults, id)
            //     database.ref('exercises/' + id).push({
            //         results: {
            //             name: exercisesResults[0].name,
            //             value: exercisesResults[0].value,
            //         }
            //     })
            // }
              
            clearResults()
        
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;