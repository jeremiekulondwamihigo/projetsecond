import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { lien_read, lien_create, lien_delete, lien_update } from 'Utils.jsx'

const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

const initialState = {
  inscrit: [],
  addNewInscrit: '',
  addNewInscritError: '',
  getInscrit: '',
  getInscritError: '',
  bloquerInscrit: '',
  bloquerInscritError: '',
  libererInscrit: '',
  libererInscritError: '',
}

export const addNewInscrit = createAsyncThunk(
  'inscrit/addNewInscrit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        lien_create + '/inscription',
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

export const readEleve = createAsyncThunk(
  'inscrit/readEleve',
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
export const bloquerEleve = createAsyncThunk(
  'inscrit/bloquerEleve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        lien_update + '/bloqueleve',
        data,
        config,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const EleveRecru = createSlice({
  name: 'inscrit',
  initialState,
  reducers: {},
  extraReducers: {
    [readEleve.pending]: (state, action) => {
      return {
        ...state,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: 'pending',
        getInscritError: '',
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [readEleve.fulfilled]: (state, action) => {
      return {
        ...state,
        inscrit: action.payload,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: 'success',
        getInscritError: '',
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [readEleve.rejected]: (state, action) => {
      return {
        ...state,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: 'rejected',
        getInscritError: action.payload,
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [bloquerEleve.pending]: (state, action) => {
      return {
        ...state,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: 'pending',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [bloquerEleve.fulfilled]: (state, action) => {
      const updatings = state.inscrit.map((x) =>
        x._id === action.payload._id ? action.payload : x,
      )
      return {
        ...state,
        inscrit: updatings,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: 'success',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [bloquerEleve.rejected]: (state, action) => {
      return {
        ...state,
        addNewInscrit: '',
        addNewInscritError: '',
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: 'rejected',
        bloquerInscritError: action.payload,
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [addNewInscrit.pending]: (state, action) => {
      return {
        ...state,
        addNewInscrit: 'pending',
        addNewInscritError: '',
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [addNewInscrit.fulfilled]: (state, action) => {
      return {
        ...state,
        inscrit: [...action.payload, ...state.inscrit],
        addNewInscrit: 'success',
        addNewInscritError: '',
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
    [addNewInscrit.rejected]: (state, action) => {
      return {
        ...state,
        addNewInscrit: 'rejected',
        addNewInscritError: action.payload,
        getInscrit: '',
        getInscritError: '',
        bloquerInscrit: '',
        bloquerInscritError: '',
        libererInscrit: '',
        libererInscritError: '',
      }
    },
  },
})

export default EleveRecru.reducer
