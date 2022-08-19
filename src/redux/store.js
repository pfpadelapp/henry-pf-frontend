import { configureStore } from '@reduxjs/toolkit'
import owners from './owner/ownerSlice'
import users from './users/usersSlice'
import padelFields from './padelField/padelFieldSlice'
import admins from './admin/adminSlice'

export default configureStore({
  reducer: {
    owners,
    users,
    padelFields,
    admins
  }
})
