import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const padelfieldSlice = createSlice({
  name: 'padelFields',
  initialState: {
    padelField: [],
    detailPadelField: [],
    hoursByDatePadelField: [],
    allPages: [],
    padelFieldFilter: []
  },
  reducers: {
    setPadelField: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldById: (state, action) => {
      state.detailPadelField = action.payload
    },
    setPadelFieldFilterByType: (state, action) => {
      state.padelFieldFilter = action.payload
    },
    setPadelFieldType: (state, action) => {
      state.padelFieldFilter = action.payload
    },
    setPadelFieldAvailability: (state, action) => {
      state.padelFieldFilter = action.payload
    },
    cleanDetail: (state) => {
      state.detailPadelField = []
    },
    setInfoByName: (state, action) => {
      state.padelFieldFilter = action.payload
    },
    setFilterPrice: (state, action) => {
      state.padelFieldFilter = action.payload
    },
    setDateActual: (state, action) => {
      state.hoursByDatePadelField = action.payload
    },
    setCleanHoursByDate: (state) => {
      state.hoursByDatePadelField = []
    },
    getCountPages: (state, action) => {
      state.allPages = action.payload
    },
    postReservePadelField: (state, action) => {
      state.allPages = action.payload
    }
  }
})

export const { postReservePadelField, getCountPages, setCleanHoursByDate, setDateActual, setFilterPrice, setInfoByName, setPadelField, setPadelFieldById, setPadelFieldType, setPadelFieldOrderByPrice, setPadelFieldAvailability,  cleanDetail } = padelfieldSlice.actions

export default padelfieldSlice.reducer

export function fetchAllPadelFields(currentPage) {
  return async function(dispatch) {
    try {
      const allPadelFields = await axios.get(`http://127.0.0.1:3000/field?page=${currentPage}&limit=6`)
      // console.log('REDUX ALL : ', allPadelFields.data)
      dispatch(setPadelField(allPadelFields.data))
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

export function filterByType(type, currentPage) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/typeField?typeField=${type}&page=${currentPage}&limit=6`)
      dispatch(setPadelFieldType(padelFieldType.data.results))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByPrice(price, currentPage) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/sort?price=${price}&page=${currentPage}&limit=6`)
      dispatch(setPadelFieldType(padelFieldType.data.results))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByAvailability(availability, currentPage) {
  return async function(dispatch) {
    try {
      const padelFieldType = await axios.get(`http://127.0.0.1:3000/field/able?active=${availability}&page=${currentPage}&limit=6`)
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
      // console.log('REdux', padelFieldSearch.data.results)
      // console.log('REDUX 2', padelFieldSearch.data)
      if (padelName === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes ingresar el nombre de una cancha',
          confirmButtonColor: '#F27474'
        })
      } else if (padelFieldSearch.data.results.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'La cancha de padel no ha sido encontrada',
          confirmButtonColor: '#FACEA8'
        })
      } else {
        // console.log('rtk ', padelFieldSearch.data)
        dispatch(setInfoByName(padelFieldSearch.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function getFilterPrice(minPrice, maxPrice, currentPage) {
  return async function(dispatch) {
    try {
      const filterPrice = await axios.get(`http://127.0.0.1:3000/field/rangePrice?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}&limit=6`)
      // console.log(filterPrice.data.results)
      if (filterPrice.data.results.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'No hay ninguna cancha de padel en ese rango de precio',
          confirmButtonColor: '#FACEA8'
        })
      } else {
        dispatch(setFilterPrice(filterPrice.data.results))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function getHoursByDate(idPadelField, date) {
  return async function(dispatch) {
    try {
      const hoursByDate = await axios.get(`http://127.0.0.1:3000/booking/hours?idField=${idPadelField}&day=${date}`)
      // console.log(hoursByDate.data)
      // console.log(idPadelField)
      // console.log(date)
      dispatch(setDateActual(hoursByDate.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanHoursByDate() {
  return function(dispatch) {
    dispatch(setCleanHoursByDate())
  }
}

export function getAllPagesPadelField() {
  return async function(dispatch) {
    try {
      const countPages = await axios.get('http://127.0.0.1:3000/field?page=1&limit=6')
      // console.log('aca', countPages.data)
      dispatch(getCountPages(countPages.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function postReserveHourPadelField(input) {
  return async function(dispatch) {
    try {
      const post = await axios.post('http://127.0.0.1:3000/booking/', input)
      // console.log(post)
      dispatch(postReservePadelField(post))
    } catch (error) {
      console.log(error)
    }
  }
}
