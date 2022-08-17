import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    users: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { setUsers } = adminSlice.actions
export default adminSlice.reducer

export function getUsers(username) {
  return async function (dispatch) {
    try {
      const allusers = await axios.get(
        `http://127.0.0.1:3000/admin/searchU?username=${username}`
      )
      dispatch(setUsers(allusers.data))
      // console.log('redux', allPadelFields)
    } catch (error) {
      console.log(error)
    }
  }
}
