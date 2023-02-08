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
  info: [],
  infoEtab: '',
  infoEtabError: '',
}
export const readInfoEtab = createAsyncThunk(
  'infoEtab/readInfoEtab',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(lien_read + '/eleveAnnee/' + id, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const InfoSlice = createSlice({
  name: 'infoEtab',
  initialState,
  reducers: {},
  extraReducers: {
    [readInfoEtab.pending]: (state, action) => {
      return {
        ...state,
        infoEtab: 'pending',
        infoEtabError: '',
      }
    },
    [readInfoEtab.fulfilled]: (state, action) => {
      return {
        ...state,
        info: action.payload,
        infoEtab: 'success',
        infoEtabError: '',
      }
    },
    [readInfoEtab.rejected]: (state, action) => {
      return {
        ...state,
        infoEtab: 'rejected',
        infoEtabError: action.payload,
      }
    },
  },
})

export default InfoSlice.reducer
