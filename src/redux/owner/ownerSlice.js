import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'
const urlLocal = 'http://127.0.0.1:3000'

export const ownerSlice = createSlice({
  name: 'owners',
  initialState: {
    allOwners: [],
    ownerDetail: []
  },
  reducers: {
    setOwner: (state, action) => {
      state.allOwners = action.payload
    },
    setOwnerDetail: (state, action) => {
      state.ownerDetail = action.payload
    },
    setUpdate: (state, action) => {
      state.ownerDetail = action.payload
    }
  }
})

export const { setUpdate, setOwnerDetail, setOwner } = ownerSlice.actions

export default ownerSlice.reducer

export function fetchAllOwners() {
  return async function (dispatch) {
    try {
      const allOwners = await axios.get(`${urlDeploy}/owner`)
      dispatch(setOwner(allOwners.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getOwnerById(idOwner) {
  return async function (dispatch) {
    try {
      const ownerData = await axios.get(`${urlDeploy}/owner/${idOwner}`)
      dispatch(setOwnerDetail(ownerData))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getUpdateOwner(ownerId, dataOwner) {
  return async function (dispatch) {
    try {
      const ownerUpdate = await axios.put(`${urlDeploy}/owner/${ownerId}`, dataOwner)
      console.log('actalizar owner', ownerUpdate.data)
      dispatch(setUpdate(ownerUpdate))
    } catch (error) {
      console.log(error)
    }
  }
}
