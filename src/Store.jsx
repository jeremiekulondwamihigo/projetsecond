import { configureStore } from '@reduxjs/toolkit'
import OptionEtab from 'Redux/Option'
import infoEtab from 'Redux/InfoEtab'
import AnneeActive from 'Redux/YearActive'
import EleveRecru from 'Redux/Recruter'
import Inscription from 'Redux/Inscription'

export const store = configureStore({
  reducer: {
    optionEtab: OptionEtab,
    infoEtab: infoEtab,
    active: AnneeActive,
    recru: EleveRecru,
    inscrit: Inscription,
  },
})
