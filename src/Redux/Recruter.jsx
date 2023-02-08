import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { lien_update } from 'Utils'
import { lien_read, lien_create, lien_delete } from 'Utils.jsx'

const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

const initialState = {
  recrutement: [],
  addNewRecru: '',
  addNewRecruError: '',
  getRecru: '',
  getRecruError: '',
  deleteRecru: '',
  deleteRecruError: '',
  updateRecru: '',
  updateRecruError: '',
}

export const readRecru = createAsyncThunk(
  'recru/read',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(lien_read + '/eleveinfo/' + id, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
export const addElevePremiere = createAsyncThunk(
  'recru/addElevePremiere',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(lien_create + '/eleve', data, config)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)
export const deleteInfo = createAsyncThunk(
  'recru/deleteInfo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        lien_delete + '/eleveinfo/' + id,
        config,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
export const modifierInfo = createAsyncThunk(
  'recru/modifierInfo',
  async (donner, { rejectWithValue }) => {
    try {
      const { id, data } = donner
      const response = await axios.put(
        lien_update + '/eleve/' + id,
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
  name: 'recru',
  initialState,
  reducers: {},
  extraReducers: {
    [addElevePremiere.pending]: (state, action) => {
      return {
        ...state,
        addNewRecru: 'pending',
        addNewRecruError: '',
        getRecru: '',
        getRecruError: '',
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [addElevePremiere.fulfilled]: (state, action) => {
      return {
        ...state,
        recrutement: [action.payload, ...state.recrutement],
        addNewRecru: 'success',
        addNewRecruError: '',
        getRecru: '',
        getRecruError: '',
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [addElevePremiere.rejected]: (state, action) => {
      return {
        ...state,
        addNewRecru: 'rejected',
        addNewRecruError: action.payload,
        getRecru: '',
        getRecruError: '',
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [readRecru.pending]: (state, action) => {
      return {
        ...state,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: 'pending',
        getRecruError: '',
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [readRecru.fulfilled]: (state, action) => {
      return {
        ...state,
        recrutement: action.payload,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: 'success',
        getRecruError: '',
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [readRecru.rejected]: (state, action) => {
      return {
        ...state,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: 'rejected',
        getRecruError: action.payload,
        deleteRecru: '',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [deleteInfo.pending]: (state, action) => {
      return {
        ...state,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: '',
        getRecruError: '',
        deleteRecru: 'pending',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [deleteInfo.fulfilled]: (state, action) => {
      const curenteleve = state.recrutement.filter(
        (x) => x._id !== action.payload._id,
      )
      return {
        ...state,
        recrutement: curenteleve,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: '',
        getRecruError: '',
        deleteRecru: 'success',
        deleteRecruError: '',
        updateRecru: '',
        updateRecruError: '',
      }
    },
    [deleteInfo.rejected]: (state, action) => {
      return {
        ...state,
        addNewRecru: '',
        addNewRecruError: '',
        getRecru: '',
        getRecruError: '',
        deleteRecru: 'rejected',
        deleteRecruError: action.payload,
        updateRecru: '',
        updateRecruError: '',
      }
    },
  },
  [modifierInfo.pending]: (state, action) => {
    return {
      ...state,
      addNewRecru: '',
      addNewRecruError: '',
      getRecru: '',
      getRecruError: '',
      deleteRecru: '',
      deleteRecruError: '',
      updateRecru: 'pending',
      updateRecruError: '',
    }
  },
  [modifierInfo.fulfilled]: (state, action) => {
    const updatings = state.recrutement.map((x) =>
      x._id === action.payload._id ? action.payload : x,
    )
    return {
      ...state,
      recrutement: updatings,
      addNewRecru: '',
      addNewRecruError: '',
      getRecru: '',
      getRecruError: '',
      deleteRecru: '',
      deleteRecruError: '',
      updateRecru: 'success',
      updateRecruError: '',
    }
  },
  [modifierInfo.rejected]: (state, action) => {
    return {
      ...state,
      addNewRecru: '',
      addNewRecruError: '',
      getRecru: '',
      getRecruError: '',
      deleteRecru: '',
      deleteRecruError: '',
      updateRecru: 'rejected',
      updateRecruError: action.payload,
    }
  },
})

export default EleveRecru.reducer
