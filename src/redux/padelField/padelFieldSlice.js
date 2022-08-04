import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const padelfieldSlice = createSlice({
  name: 'padelFields',
  initialState: {
    padelField: [],
    detailPadelField: []
  },
  reducers: {
    setPadelField: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldById: (state, action) => {
      state.detailPadelField = action.payload
    },
    cleanDetail: (state) => {
      state.detailPadelField = []
    }
  }
})

export const { setPadelField, setPadelFieldById, cleanDetail } = padelfieldSlice.actions

export default padelfieldSlice.reducer

export function fetchAllPadelFields() {
  return async function(dispatch) {
    try {
      const allPadelFields = await axios.get('http://127.0.0.1:3000/field')
      dispatch(setPadelField(allPadelFields.data))
      // console.log(allPadelFields.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPadelFieldsById(idPadelField) {
  return async function(dispatch) {
    try {
      const padelFieldById = await axios.get(`http://127.0.0.1:3000/field/${idPadelField}`)
      dispatch(setPadelFieldById(padelFieldById.data))
      // console.log('REDUX', padelFieldById.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanDetailPadelField() {
  return function(dispatch) {
    dispatch(cleanDetail())
  }
}
