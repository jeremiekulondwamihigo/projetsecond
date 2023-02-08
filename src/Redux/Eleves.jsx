import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { lien_update, lien_read } from 'Utils.jsx'

const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

const initialState = {
  eleve: [],
  addEleve: '',
  addEleveError: '',
  updateEleve: '',
  updateEleveError: '',
  deleteEleve: '',
  deleteEleveError: '',
  getEleves: '',
  getEleveError: '',
}

export const readEleveEt = createAsyncThunk(
  'eleve/readEleve',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        lien_read + '/singlerecherche/' + id,
        config,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const BloquerEleve = createAsyncThunk(
  'eleve/bloquer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        lien_update + '/bloqueleve',
        data,
        config,
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)

const eleveSlice = createSlice({
  name: 'eleve',
  initialState,
  reducers: {},
  extraReducers: {
    [readEleveEt.pending]: (state, action) => {
      return {
        ...state,
        addEleve: '',
        addEleveError: '',
        updateEleve: '',
        updateEleveError: '',
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: 'pending',
        getEleveError: '',
      }
    },
    [readEleveEt.fulfilled]: (state, action) => {
      return {
        ...state,
        eleve: action.payload,
        addEleve: '',
        addEleveError: '',
        updateEleve: '',
        updateEleveError: '',
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: 'success',
        getEleveError: '',
      }
    },
    [readEleveEt.rejected]: (state, action) => {
      return {
        ...state,
        addEleve: '',
        addEleveError: '',
        updateEleve: '',
        updateEleveError: '',
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: 'rejected',
        getEleveError: action.payload,
      }
    },
    [BloquerEleve.pending]: (state, action) => {
      return {
        ...state,
        addEleve: '',
        addEleveError: '',
        updateEleve: 'pending',
        updateEleveError: '',
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: '',
        getEleveError: '',
      }
    },
    [BloquerEleve.fulfilled]: (state, action) => {
      const updating = state.eleve.map((x) =>
        x.eleveinscrit._id === action.payload._id
          ? (x.eleveinscrit.libre = action.payload.libre)
          : x,
      )

      return {
        ...state,
        eleve: updating,
        addEleve: '',
        addEleveError: '',
        updateEleve: 'success',
        updateEleveError: '',
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: '',
        getEleveError: '',
      }
    },
    [BloquerEleve.rejected]: (state, action) => {
      return {
        ...state,
        addEleve: '',
        addEleveError: '',
        updateEleve: 'rejected',
        updateEleveError: action.payload,
        deleteEleve: '',
        deleteEleveError: '',
        getEleves: '',
        getEleveError: '',
      }
    },
  },
})

export default eleveSlice.reducer
