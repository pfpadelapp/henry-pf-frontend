import { createSlice } from '@reduxjs/toolkit'
import { getPadelField } from './padelfieldSliceActions'

export const padelfieldSlice = createSlice({
  name: 'padelfield',
  initialState: {
    padelfield: []
  },
  reducers: {},
  extraReducers: {
    [getPadelField.fullfilled]: (state, action) => {
      state.padelfield = action.payload
    }
  }
})

export default padelfieldSlice.reducer
