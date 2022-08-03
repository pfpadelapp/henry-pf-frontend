import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const ownerSlice = createSlice({
  name: 'owners',
  initialState: {
    owner: []
  },
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload
    }
  }
})

export const { setOwner } = ownerSlice.actions

export default ownerSlice.reducer

// export const fetchAllOwners = () => (dispatch) => {
//   axios.get('https://api-rest-server-padel.herokuapp.com/owners')
//   .then((response) => {
//     dispatch(setOwner(response.data))
//   })
//   .catch((error) => console.log(error))
// }
export function fetchAllOwners() {
  return async function(dispatch) {
    try {
      const allOwners = await axios.get('https://api-rest-server-padel.herokuapp.com/owners')
      dispatch(setOwner(allOwners.data))
    } catch (error) {
      console.log(error)
    }
  }
}
