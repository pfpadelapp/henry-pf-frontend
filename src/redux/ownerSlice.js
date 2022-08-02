import { createSlice } from '@reduxjs/toolkit';

export const ownerSlice = createSlice({
    name: 'owners',
    initialState:{
        owner: []
    },
    reducers:{
        getOwners: (state, action) => {
            state.owner = action.payload;
        }
    }
})
export const { getOwners } = ownerSlice.actions

export default ownerSlice.reducers