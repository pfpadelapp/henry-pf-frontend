import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const urlDeploy = 'https://pf-padel-app.herokuapp.com'
const urlLocal = 'http://127.0.0.1:3000'

export const padelfieldSlice = createSlice({
  name: 'padelFields',
  initialState: {
    padelField: [],
    detailPadelField: [],
    hoursByDatePadelField: [],
    postReserve: [],
    payReserve: []
  },
  reducers: {
    setPadelField: (state, action) => {
      state.padelField = action.payload
    },
    setPadelFieldFilter: (state, action) => {
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
    },
    setFilterPrice: (state, action) => {
      state.padelField = action.payload
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
      state.postReserve = action.payload
    },
    setPaymentPadelfield: (state, action) => {
      state.payReserve = action.payload
    },
    setCreatePAdelField: (state, action) => {
      state.padelField = action.payload
    }
  }
})

export const {
  setCreatePAdelField,
  setPaymentCheck,
  setPaymentPadelfield,
  setPadelFieldFilter,
  postReservePadelField,
  getCountPages,
  setCleanHoursByDate,
  setDateActual,
  setFilterPrice,
  setInfoByName,
  setPadelField,
  setPadelFieldById,
  setPadelFieldType,
  setPadelFieldOrderByPrice,
  setPadelFieldAvailability,
  cleanDetail
} = padelfieldSlice.actions

export default padelfieldSlice.reducer

export function fetchAllPadelFields() {
  return async function (dispatch) {
    try {

      const allPadelFields = await axios.get(`${urlDeploy}/field`)
      // console.log('REDUX desde fetchall', allPadelFields.data)
      dispatch(setPadelField(allPadelFields.data))
      // console.log('redux', allPadelFields)
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPadelFieldsById(idPadelField) {
  return async function (dispatch) {
    try {

      const padelFieldById = await axios.get(
        `${urlDeploy}/field/${idPadelField}`
      )


      dispatch(setPadelFieldById(padelFieldById.data))
      // console.log('REDUX', padelFieldById.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByType(type) {
  return async function (dispatch) {
    try {

      const padelFieldType = await axios.get(
        `${urlDeploy}/field/typeField?typeField=${type}`
      )

      dispatch(setPadelFieldType(padelFieldType.data))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByPrice(price) {
  return async function (dispatch) {
    try {
      const padelFieldType = await axios.get(
        `${urlDeploy}/field/sort?price=${price}`
      )
      dispatch(setPadelFieldType(padelFieldType.data))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderByAvailability(availability) {
  return async function (dispatch) {
    try {

      const padelFieldType = await axios.get(
        `${urlDeploy}/field/able?active=${availability}`
      )
      dispatch(setPadelFieldAvailability(padelFieldType.data))
      // console.log('REDUX', padelFieldType.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanDetailPadelField() {
  return function (dispatch) {
    dispatch(cleanDetail())
  }
}

export function getInfoByName(padelName) {
  return async function (dispatch) {
    try {
      const padelFieldSearch = await axios.get(
        `${urlDeploy}/field/search?name=${padelName}`
      )

      // console.log('REdux', padelFieldSearch.data.results)
      console.log('REDUX desde el searchBar', padelFieldSearch.data)
      if (padelName === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes ingresar el nombre de una cancha',
          confirmButtonColor: '#F27474'
        })
      } else if (padelFieldSearch.data.length === 0) {
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

export function getFilterPrice(minPrice, maxPrice) {
  return async function (dispatch) {
    try {

      const filterPrice = await axios.get(
        `${urlDeploy}/field/rangePrice?minPrice=${minPrice}&maxPrice=${maxPrice}`
      )

      // console.log(filterPrice.data.results)
      if (filterPrice.data.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'No hay ninguna cancha de padel en ese rango de precio',
          confirmButtonColor: '#FACEA8'
        })
      } else {
        dispatch(setFilterPrice(filterPrice.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function getHoursByDate(idPadelField, date) {
  return async function (dispatch) {
    try {
      const hoursByDate = await axios.get(
        `${urlDeploy}/booking/hours?idField=${idPadelField}&day=${date}`
      )

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
  return function (dispatch) {
    dispatch(setCleanHoursByDate())
  }
}

// export function getAllPagesPadelField() {
//   return async function(dispatch) {
//     try {
//       const countPages = await axios.get('https://pf-padel-app.herokuapp.com/field?page=1&limit=6')
//       // console.log('aca', countPages.data)
//       dispatch(getCountPages(countPages.data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export function postReserveHourPadelField(input) {
  // esta no
  return async function (dispatch) {
    try {
      const post = await axios.post(`${urlDeploy}/booking/`, input)

      // console.log('rtk, el id que devuelve es: ', post.data)
      dispatch(postReservePadelField(post.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPaymentPadelField(input) {
  return async function (dispatch) {
    try {
      const payment = await axios.post(
        `${urlDeploy}/payment/createPayment`,
        input
      )
      // console.log('Este es el pago ', payment.data)
      dispatch(setPaymentPadelfield(payment.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function setPaymentCheckout(checkId) {
  return async function (dispatch) {
    try {
      const checkIdPayment = await axios.get(
        `${urlDeploy}/payment/executePayment?token=${checkId}`
      )
      console.log('Y en el rtk es : ', checkIdPayment.data.msg)
      dispatch(setPaymentCheck(checkIdPayment.data.msg))
    } catch (error) {
      console.log(error)
    }
  }
}

export function createPadelField(input) {
  return async function (dispatch) {
    try {
      // console.log('input que recibo', input)
      const newPadelfield = await axios.post(`${urlDeploy}/field`, input)
      // console.log('input que muestro', newPadelfield.data)
      dispatch(setCreatePAdelField(newPadelfield.data))
    } catch (error) {
      console.log(error)
    }
  }
}
