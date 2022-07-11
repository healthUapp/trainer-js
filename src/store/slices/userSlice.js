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
            let localState = JSON.parse(localStorage.getItem('result'))
            const results =  action.payload.results
            const indexOfSet = action.payload.indexOfSet
            const date = action.payload.date

            state.results = results

                
            let newState = []

            newState.push(localState)
            newState.push({
                results:results,
                indexOfSet: indexOfSet,
                date: date
            })

            localStorage.setItem('results', JSON.stringify(newState));


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