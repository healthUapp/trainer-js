import { configureStore } from '@reduxjs/toolkit'
import appState from './features/appState'

export default configureStore({
    reducer: {
        appState: appState,
    },
})