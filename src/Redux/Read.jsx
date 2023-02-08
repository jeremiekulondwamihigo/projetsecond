import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { lien_delete, lien_update, lien_create, lien_read } from 'Utils.jsx'

const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

const initialState = {
  todos: [],
  addAnnee: '',
  addAnneeError: '',
  deleteAnnee: '',
  deleteAnneeError: '',
  updateAnnee: '',
  updateAnneeError: '',
  getAnnee: '',
  getAnneeError: '',
}
export const todoAdd = createAsyncThunk(
  'todos/todoAdd',
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(lien_create + '/addyear', todo, config)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)
export const getAnnees = createAsyncThunk(
  'todos/getAnnee',
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(lien_read + '/readyear', config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
export const updateYear = createAsyncThunk(
  'todos/update',
  async (todo, { rejectWithValue }) => {
    try {
      const { _id, active } = todo
      const response = await axios.put(
        lien_update + '/updateyear/' + _id,
        { valeur: { active: !active } },
        config,
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)
export const deleteYear = createAsyncThunk(
  'todos/delete',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(lien_delete + '/year/' + _id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [todoAdd.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: 'pending',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [todoAdd.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        addAnnee: 'success',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [todoAdd.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: 'rejected',
        addAnneeError: action.payload,
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [getAnnees.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: 'pending',
        getAnneeError: '',
      }
    },
    [getAnnees.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: 'success',
        getAnneeError: '',
      }
    },
    [getAnnees.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: 'rejected',
        getAnneeError: action.payload,
      }
    },
    [updateYear.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: 'pending',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [updateYear.fulfilled]: (state, action) => {
      const updating = state.todos.map((x) =>
        x._id === action.payload._id ? action.payload : x,
      )
      return {
        ...state,
        todos: updating,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: 'success',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [updateYear.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: '',
        deleteAnneeError: '',
        updateAnnee: 'rejected',
        updateAnneeError: action.payload,
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [deleteYear.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: 'pending',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [deleteYear.fulfilled]: (state, action) => {
      const curentYear = state.todos.filter((x) => x._id !== action.payload._id)
      return {
        ...state,
        todos: curentYear,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: 'success',
        deleteAnneeError: '',
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
    [deleteYear.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        deleteAnnee: 'rejected',
        deleteAnneeError: action.payload,
        updateAnnee: '',
        updateAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
      }
    },
  },
})
export default todoSlice.reducer
