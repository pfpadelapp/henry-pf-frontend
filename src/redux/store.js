import { configureStore } from '@reduxjs/toolkit'
import owners from ''
import users from './users/usersSlice'
import paddleFields from './padelField/padelFieldSlicejs'

export default configureStore({
  reducer: {
    owner: owners,
    //users: users
    //paddleFields: paddleFields,
  }
})
