import { configureStore } from '@reduxjs/toolkit'
import owners from './owner/ownerSlice'
import users from './users/usersSlice'
import padleFields from './padelField/padelFieldSlice'

export default configureStore({
  reducer: {
    owners,
    users,
    padleFields
  }
})
