import {createSlice} from '@reduxjs/toolkit'
import {sendData} from "../../components/functions/firebaseFunctions";

const initialState = {
    email: null,
    token: null,
    id: null
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