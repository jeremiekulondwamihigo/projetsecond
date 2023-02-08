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
  option: [],
  readetablissement: '',
  readEtablissementError: '',
}

export const readOptions = createAsyncThunk(
  'option/readOptions',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        lien_read + '/optionEtablissement/' + id,
        config,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const OptionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {},
  extraReducers: {
    [readOptions.pending]: (state, action) => {
      return {
        ...state,
        readetablissement: 'pending',
        readEtablissementError: '',
      }
    },
    [readOptions.fulfilled]: (state, action) => {
      return {
        ...state,
        option: action.payload,
        readetablissement: 'success',
        readEtablissementError: '',
      }
    },
    [readOptions.rejected]: (state, action) => {
      return {
        ...state,
        readetablissement: 'rejected',
        readEtablissementError: action.payload,
      }
    },
  },
})

export default OptionSlice.reducer
