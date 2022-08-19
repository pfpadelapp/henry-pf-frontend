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
    setPutPadelfiled: (state, action) => {
      state.ownerDetail = action.payload
    },
    setHidePadelfiled: (state, action) => {
      state.ownerDetail = action.payload
    },
    setUpdate: (state, action) => {
      state.ownerDetail = action.payload
    }
  }
})

export const { setUpdate, setHidePadelfiled, setOwnerDetail, setOwner } = ownerSlice.actions

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

export function updatePadelfieldOwner(idPadelfield) {
  return async function (dispatch) {
    try {
      const padelFieldHide = axios.post(`${urlDeploy}/field/${idPadelfield}`)
      dispatch(setHidePadelfiled(padelFieldHide))
    } catch (error) {
      console.log(error)
    }
  }
}

export function removePadelfieldOwner(idPadelfield, inputUpdate) {
  return async function (dispatch) {
    try {
      const padelFieldUpdate = axios.put(`${urlDeploy}/field/${idPadelfield}`, inputUpdate)
      dispatch(setHidePadelfiled(padelFieldUpdate))
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
