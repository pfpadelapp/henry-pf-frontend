import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getOwner = createAsyncThunk(
  'owner/getOwner',
  async (thunkAPI) => {
    try {
      const owners = await axios.get('https://api-rest-server-padel.herokuapp.com/owners')
      console.log(owners.data)
      return owners.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
