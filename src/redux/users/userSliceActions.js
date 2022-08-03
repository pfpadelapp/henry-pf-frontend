/* import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk(
  'user/getUser',
  async (thunkAPI) => {
    try {
      const users = await axios.get('https://api-rest-server-padel.herokuapp.com/users')
      return users.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
 */