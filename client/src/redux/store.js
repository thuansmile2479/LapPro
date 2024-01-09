import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import userReducer from './slices/useSlide'

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  }
})