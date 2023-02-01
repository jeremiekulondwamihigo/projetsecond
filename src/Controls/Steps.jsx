import React, { useContext } from 'react'
import { Steps } from 'primereact/steps'
import { ValeurContext } from 'views/Calendrier/Context'

const StepsDemo = () => {
  const { activeIndex, changeIndex } = useContext(ValeurContext)
  const items = [
    {
      label: 'Délimitation',
    },
    {
      label: 'Semestres',
    },
    {
      label: 'Périodes',
    },
    {
      label: 'Jours fériés',
    },
  ]

  return (
    <div className="steps-demo">
      <div className="card">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => changeIndex(e.index)}
          readOnly={true}
        />
      </div>
    </div>
  )
}
export default StepsDemo
