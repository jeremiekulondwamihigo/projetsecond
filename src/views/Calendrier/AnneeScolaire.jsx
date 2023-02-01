import React, { useContext } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { CardTitle, Row, Col, Card } from 'reactstrap'
import { ValeurContext } from './Context'

const AnneeScolaire = () => {
  const { value, changeValue, joursScolaire, changeIndex } = useContext(
    ValeurContext,
  )
  let today = new Date()
  let month = today.getMonth()
  let year = today.getFullYear()
  let prevMonth = month === 0 ? 11 : month - 1
  let prevYear = prevMonth === 11 ? year - 1 : year
  let nextMonth = month === 11 ? 0 : month + 1
  let nextYear = nextMonth === 0 ? year + 1 : year

  let minDate = new Date()
  minDate.setMonth(prevMonth)
  minDate.setFullYear(prevYear)

  let maxDate = new Date()
  maxDate.setMonth(nextMonth)
  maxDate.setFullYear(nextYear)

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
          <Col md="6" lg="6" sm="12">
            <CardTitle tag="h6">Ouverture scolaire</CardTitle>

            <Calendar
              value={value.add}
              onChange={(e) => changeValue({ ...value, add: e.value })}
              inline
              showWeek
            />
          </Col>
          <Col md="6" lg="6" sm="12">
            <CardTitle tag="h6">Fermeture scolaire</CardTitle>
            <Calendar
              value={value.adf}
              onChange={(e) => changeValue({ ...value, adf: e.value })}
              inline
              showWeek
            />
            <div
              style={{
                margin: '20px',
                float: 'right',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              {joursScolaire > 1 && (
                <CardTitle
                  tag="h6"
                  style={{ margin: '0px 12px' }}
                  onClick={(e) => changeIndex(e, 1)}
                >
                  Suivant
                </CardTitle>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default AnneeScolaire
