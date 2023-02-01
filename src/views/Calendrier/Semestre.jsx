import React, { useContext } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { CardTitle, Row, Col } from 'reactstrap'
import './style.css'
import { ValeurContext } from './Context'
import { difference } from 'Controls/Mois'

const Semestre = () => {
  const { changeIndex, value, changeValue } = useContext(ValeurContext)
  addLocale('fr', {
    firstDayOfWeek: 1,
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['Dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
    monthNamesShort: [
      'jan',
      'fev',
      'mar',
      'avr',
      'mai',
      'jun',
      'jul',
      'aou',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  })
  return (
    <div>
      <div className="card">
        <Row>
          <Col md="6" lg="6" sm="12" style={{ padding: '10px' }}>
            <CardTitle tag="h6">Premier semestre</CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                placeholder="Du"
                className="inPut"
                id="basic"
                value={value.dpsm}
                onChange={(e) => changeValue({ ...value, dpsm: e.value })}
              />
            </div>
            <div className="field col-12 md:col-12">
              <Calendar
                id="basic"
                placeholder="Au"
                className="inPut"
                value={value.fpsm}
                onChange={(e) => changeValue({ ...value, fpsm: e.value })}
              />
            </div>
            <label htmlFor="basic" className="soit">
              Soit {difference(value.dpsm, value.fpsm)} jours
            </label>
          </Col>
          <Col md="6" lg="6" sm="12" style={{ padding: '10px' }}>
            <CardTitle tag="h6">second semestre</CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                className="inPut"
                placeholder="Du"
                id="basic"
                value={value.dssm}
                onChange={(e) => changeValue({ ...value, dssm: e.value })}
              />
            </div>
            <div className="field col-12 md:col-12">
              <Calendar
                placeholder="Au"
                className="inPut"
                id="basic"
                value={value.fssm}
                onChange={(e) => changeValue({ ...value, fssm: e.value })}
              />
            </div>
            <label htmlFor="basic" className="soit">
              Soit {difference(value.dssm, value.fssm)} jours
            </label>
            <div
              style={{
                margin: '20px',
                float: 'right',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <CardTitle
                tag="h6"
                style={{ margin: '0px 12px', cursor: 'pointer' }}
                onClick={(e) => changeIndex(e, 0)}
              >
                Retour
              </CardTitle>
              <CardTitle
                tag="h6"
                style={{ margin: '0px 12px', cursor: 'pointer' }}
                onClick={(e) => changeIndex(e, 2)}
              >
                Suivant
              </CardTitle>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Semestre
