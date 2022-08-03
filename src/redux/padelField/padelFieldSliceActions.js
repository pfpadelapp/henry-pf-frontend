/* import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPadelField = createAsyncThunk(
  'padelField/getPadelField',
  async (thunkAPI) => {
    try {
      const padelFields = await axios.get('https://api-rest-server-padel.herokuapp.com/padelFields')
      return padelFields.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
 */