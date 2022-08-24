import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'
const urlLocal = 'http://127.0.0.1:3000'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userDetail: []
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
    setUpdate: (state, action) => {
      state.userDetail = action.payload
    },
    setDetail: (state, action) => {
      state.userDetail = action.payload
    }
  }
})

export const { setUpdate, setDetail, setUsers, setUser, setClearUserState } =
  userSlice.actions

export default userSlice.reducer

export function fetchAllUsers() {
  return async function (dispatch) {
    try {
      const allUsers = await axios.get(`${urlDeploy}/user`)
      dispatch(setUser(allUsers.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const userId = await axios.get(`${urlDeploy}/user/${id}`)
      dispatch(setUsers(userId.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearUserDetail() {
  return function (dispatch) {
    dispatch(clearUserDetail())
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

export function getUpdateUser(userId, dataUser) {
  return async function (dispatch) {
    try {
      const userUpdate = await axios.put(
        `${urlDeploy}/user/${userId}`,
        dataUser
      )
      // console.log('actalizar usuario', userUpdate.data)
      dispatch(setUpdate(userUpdate.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDataDetail(email) {
  return async function (dispatch) {
    try {
      const allData = await axios.get(`${urlDeploy}/user`)
      const find = allData.data.find((user) => { return user.email === email })
      // console.log('en el rtk el find es  ', find)
      dispatch(setDetail(find))
    } catch (error) {
      console.log(error)
    }
  }
}

export function postUser(user) {
  return async function () {
    try {
      // console.log('input que recibo', input)
      console.log("consolelog del ", user)
      var usuarioGoogle =await axios.post(`${urlDeploy}/user/google`, user)
      console.log('input que muestro', usuarioGoogle)
    } catch (error) {
      console.log(error)
    }
  }
}

