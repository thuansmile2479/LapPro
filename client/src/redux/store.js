import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import userReducer from './slices/useSlide'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  }
})