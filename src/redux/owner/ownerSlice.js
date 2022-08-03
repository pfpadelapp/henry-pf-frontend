import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const ownerSlice = createSlice({
  name: 'owners',
  initialState: {
    owner: []
  },
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload
    }
  },
})

export const { setOwner } = ownerSlice.actions;

export default ownerSlice.reducer;

export const fetchAllOwners = () => (dispatch) => {
  axios.get('https://api-rest-server-padel.herokuapp.com/owners')
  .then((response) => {
    dispatch(setOwner(response.data));
  })
  .catch((error) => console.log(error));
};
