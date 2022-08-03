import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const fetchAllUsers = () => (dispatch) => {
  axios.get('https://api-rest-server-padel.herokuapp.com/users')
  .then((response) => {
    dispatch(setUser(response.data));
  })
  .catch((error) => console.log(error));
};
