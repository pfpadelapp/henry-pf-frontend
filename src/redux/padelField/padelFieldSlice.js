import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const padelfieldSlice = createSlice({
  name: 'padelfield',
  initialState: {
    padelfield: []
  },
  reducers: {
    setPadelfield: (state, action) => {
      state.padelfield = action.payload
    }
  },
})

export const { setPadelField } = padelfieldSlice.actions;

export default padelfieldSlice.reducer;

export const fetchAllPadelFields = () => (dispatch) => {
  axios.get('https://api-rest-server-padel.herokuapp.com/padelFields')
  .then((response) => {
    dispatch(setPadelField(response.data));
  })
  .catch((error) => console.log(error));
};
