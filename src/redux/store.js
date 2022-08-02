import { configureStore } from '@reduxjs/toolkit'
import owners from './ownerSlice.js'

export default configureStore({
  reducer: {
    owner: owners
    // paddleFields: paddleFields,
    // users: users
  }
})
