import { createSlice } from '@reduxjs/toolkit'

export const readEtablissement = createSlice({
  name: 'etablissement',
  initialState: { value: [] },
  reducers: {
    readEtablissement: (state, action) => {
      console.log(action.payload)
      //Code pour ajouter l'utilisateur
    },
  },
})
export default readEtablissement.reducer
