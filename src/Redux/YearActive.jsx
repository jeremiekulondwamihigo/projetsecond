import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { lien_read } from 'Utils.jsx'

const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

const initialState = {
  year: [],
  getYear: '',
  geyYearError: '',
}
export const readActiveYear = createAsyncThunk(
  'activeYear/readActiveYear',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(lien_read + '/yearuse', config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const ActiveYearSlice = createSlice({
  name: 'activeYear',
  initialState,
  reducers: {},
  extraReducers: {
    [readActiveYear.pending]: (state, action) => {
      return {
        ...state,
        getYear: 'pending',
        geyYearError: '',
      }
    },
    [readActiveYear.fulfilled]: (state, action) => {
      return {
        ...state,
        year: action.payload,
        getYear: 'success',
        geyYearError: '',
      }
    },
    [readActiveYear.rejected]: (state, action) => {
      return {
        ...state,
        getYear: 'rejected',
        geyYearError: action.payload,
      }
    },
  },
})

export default ActiveYearSlice.reducer
