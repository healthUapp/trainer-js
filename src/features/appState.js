import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'appState',
  initialState: {
    date: new Date(),
    results: [],
    stats: []
  },  
  reducers: {
    addResult: (state, action) => {
      state.results.push(action)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCompleted } = counterSlice.actions

export default counterSlice.reducer