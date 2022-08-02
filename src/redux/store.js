import { configureStore } from '@reduxjs/toolkit'
import owner from './ownerSlice.js'

export default configureStore({
    reducer: {
        owner: owner,
        paddleFields: paddleFields,
        users: users,
    }
})
