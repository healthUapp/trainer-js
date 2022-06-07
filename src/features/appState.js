import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'appState',
  initialState: {
    completed: 0,
    all: 5
  },
  reducers: {
    addCompleted: (state) => {
      state.completed += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCompleted } = counterSlice.actions

export default counterSlice.reducer