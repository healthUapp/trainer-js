import {createSlice} from '@reduxjs/toolkit'


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
            state.results = [...state.results, action.payload.results]
            console.log(state)
        },
    }
})

export const {addResult} = userSlice.actions;

export default userSlice.reducer;