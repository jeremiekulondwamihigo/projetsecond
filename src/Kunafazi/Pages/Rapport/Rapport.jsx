import React from 'react'
import CalculFin from './CalculFin'
import EvolutionFin from './EvolutionFin'
import BasicTabs from 'Kunafazi/Control/Tabs'
import { MonetizationOn, DeliveryDining } from '@mui/icons-material'
import Context from './Context'

function Rapport() {
  const titres = [
    { id: 0, label: 'Evolution Fin', icon: <MonetizationOn /> },
    { id: 1, label: 'Calcul Fin', icon: <DeliveryDining /> },
  ]
  const component = [
    { id: 0, component: <EvolutionFin /> },
    { id: 1, component: <CalculFin /> },
  ]
  return (
    <Context>
      <BasicTabs titres={titres} components={component} />
    </Context>
  )
}

export default Rapport
