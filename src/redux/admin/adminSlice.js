import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'
const urlLocal = 'http://127.0.0.1:3000'

export const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: []
  },
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload
    }
  }
})

export const { setAdmins } = adminSlice.actions
export default adminSlice.reducer

export function getAdmins() {
  return async function (dispatch) {
    try {
      const alladmins = await axios.get(
        `${urlDeploy}/admin/`
      )
      dispatch(setAdmins(alladmins.data))
      console.log('redux', alladmins)
    } catch (error) {
      console.log(error)
    }
  }
}
