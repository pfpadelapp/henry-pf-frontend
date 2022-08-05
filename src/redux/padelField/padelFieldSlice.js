import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const padelfieldSlice = createSlice({
  name: 'padelFields',
  initialState: {
    padelField: [],
    detailPadelField: [],
    padelFieldFilterByType: [],
    padelFieldOrderByPrice: [],
    padelFieldOrderByAvailability: []
  },
  reducers: {
    setPadelField: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldById: (state, action) => {
      state.detailPadelField = action.payload
    },
    setPadelFieldFilterByType: (state, action) => {
      state.padelFieldFilterByType = action.payload
    },
    setPadelFieldType: (state, action) => {
      state.padelFieldFilterByType = action.payload
    },

    setPadelFieldAvailability: (state, action) => {
      state.padelFieldFilterByType = action.payload
    },
    cleanDetail: (state) => {
      state.detailPadelField = []
    }
  }
})

export const { setPadelField, setPadelFieldById, setPadelFieldType, setPadelFieldOrderByPrice, setPadelFieldAvailability,  cleanDetail } = padelfieldSlice.actions

export default padelfieldSlice.reducer

export function fetchAllPadelFields() {
  return async function(dispatch) {
    try {
      const allPadelFields = await axios.get('http://127.0.0.1:3000/field?page=1&limit=6')
      dispatch(setPadelField(allPadelFields.data.results))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPadelFieldsById(idPadelField) {
  return async function(dispatch) {
    try {
      const padelFieldById = await axios.get(`http://127.0.0.1:3000/field/${idPadelField}`)
      dispatch(setPadelFieldById(padelFieldById.data.results))
      // console.log('REDUX', padelFieldById.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByType(type) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/typeField?typeField=${type}`)
      dispatch(setPadelFieldType(padelFieldType.data))
      console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByPrice(price) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/price?price=${price}`)
      dispatch(setPadelFieldType(padelFieldType.data))
      console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByAvailability(availability) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/able?active=${availability}`)
      dispatch(setPadelFieldAvailability(padelFieldType.data))
      console.log('REDUX', padelFieldType.data)
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
