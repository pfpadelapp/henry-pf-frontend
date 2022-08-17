import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userDetail: []
    //userByGoogle: []
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload
    },
    setUsers: (state, action) => {
      state.userDetail = action.payload
    },
    setClearUserState: (state) => {
      state.userDetail = []
    },
    setUserInfoByGoogle: (state, action) => {
      state.userByGoogle = action.payload
    }
  }
})

export const { setUserInfoByGoogle, setUsers, setUser } = userSlice.actions

export default userSlice.reducer

export function fetchAllUsers() {
  return async function (dispatch) {
    try {
      const allUsers = await axios.get(
        'https://api-rest-server-padel.herokuapp.com/users'
      )
      dispatch(setUsers(allUsers.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const userId = await axios.get(`http://127.0.0.1:3000/user/${id}`)
      dispatch(setUsers(userId.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearUserDetail() {
  return function (dispatch) {
    dispatch(clearUserDetail)
  }
}

// export function getInfoLoginGoogle(infoObjGoogle) {
//   return async function (dispatch) {
//     try {
//       const infoGoogleUser = await infoObjGoogle
//       console.log('redux', infoGoogleUser)
//       dispatch(setUserInfoByGoogle(infoGoogleUser))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
