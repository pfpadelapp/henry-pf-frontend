import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const padelfieldSlice = createSlice({
  name: 'padelFields',
  initialState: {
    padelField: [],
    detailPadelField: [],
    padelFieldFilterByType: [],
    padelFieldOrderByPrice: [],
    padelFieldOrderByAvailability: [],
    errores: ['No se encontro']
  },
  reducers: {
    setPadelField: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldById: (state, action) => {
      state.detailPadelField = action.payload
    },
    setPadelFieldFilterByType: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldType: (state, action) => {
      state.padelField = action.payload
    },

    setPadelFieldAvailability: (state, action) => {
      state.padelField = action.payload
    },
    cleanDetail: (state) => {
      state.detailPadelField = []
    },
    setInfoByName: (state, action) => {
      state.padelField = action.payload
    }
  }
})

export const { setInfoByName, setPadelField, setPadelFieldById, setPadelFieldType, setPadelFieldOrderByPrice, setPadelFieldAvailability,  cleanDetail } = padelfieldSlice.actions

export default padelfieldSlice.reducer

export function fetchAllPadelFields() {
  return async function(dispatch) {
    try {
      const allPadelFields = await axios.get('http://127.0.0.1:3000/field?page=1&limit=6')
      dispatch(setPadelField(allPadelFields.data.results))
      // console.log('redux', allPadelFields)
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

export function filterByType(type) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/typeField?typeField=${type}&page=1&limit=6`)
      dispatch(setPadelFieldType(padelFieldType.data.results))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByPrice(price) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/sort?price=${price}&page=1&limit=6`)
      dispatch(setPadelFieldType(padelFieldType.data.results))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByAvailability(availability) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/able?active=${availability}&page=1&limit=6`)
      dispatch(setPadelFieldAvailability(padelFieldType.data.results))
      // console.log('REDUX', padelFieldType.data)
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

export function getInfoByName(padelName) {
  return async function(dispatch) {
    try {
      const padelFieldSearch = await axios.get(`http://127.0.0.1:3000/field/search?name=${padelName}&page=1&limit=6`)
      if (padelName === '') return alert('Ingresa un nombre por favor')
      if (padelFieldSearch.data.results.length === 0) return alert('La cancha de padel no ha sido encontrada')
      dispatch(setInfoByName(padelFieldSearch.data.results))
    } catch (error) {
      console.log(error)
    }
  }
}
