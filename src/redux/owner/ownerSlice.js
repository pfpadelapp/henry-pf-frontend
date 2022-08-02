import { createSlice } from '@reduxjs/toolkit'
import { getOwner } from './ownerSliceActions'

export const ownerSlice = createSlice({
  name: 'owners',
  initialState: {
    owner: []
  },
  reducers: {},
  extraReducers: {
    [getOwner.fullfilled]: (state, action) => {
      state.owner = action.payload
    }
  }
})

export default ownerSlice.reducer
