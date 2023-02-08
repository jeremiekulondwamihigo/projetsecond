import { configureStore } from '@reduxjs/toolkit'
import todoReducer from 'Redux/Read'
import Eleve from 'Redux/Eleves'
import OptionEtab from 'Redux/Option'
import infoEtab from 'Redux/InfoEtab'
import AnneeActive from 'Redux/YearActive'
import EleveRecru from 'Redux/Recruter'

export const store = configureStore({
  reducer: {
    todostate: todoReducer,
    eleve: Eleve,
    optionEtab: OptionEtab,
    infoEtab: infoEtab,
    active: AnneeActive,
    recru: EleveRecru,
  },
})
