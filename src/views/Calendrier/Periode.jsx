import React, { useContext } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { CardTitle, Row, Col } from 'reactstrap'
import './style.css'
import { ValeurContext } from './Context'
import { difference } from 'Controls/Mois'

const Periode = () => {
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
            <CardTitle tag="div">
              Premiere periode soit{' '}
              <strong>{difference(value.dpp, value.fpp)} jours</strong>
            </CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                placeholder="Du"
                className="inPut"
                id="basic"
                value={value.dpp}
                onChange={(e) => changeValue({ ...value, dpp: e.value })}
              />

              <Calendar
                placeholder="Au"
                id="basic"
                className="inPut"
                value={value.fpp}
                onChange={(e) => changeValue({ ...value, fpp: e.value })}
              />
            </div>
            <CardTitle tag="div">
              Deuxieme periode soit{' '}
              <strong>{difference(value.ddp, value.fdp)} jours</strong>
            </CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                placeholder="Du"
                id="basic"
                className="inPut"
                value={value.ddp}
                onChange={(e) => changeValue({ ...value, ddp: e.value })}
              />

              <Calendar
                placeholder="Au"
                id="basic"
                className="inPut"
                value={value.fdp}
                onChange={(e) => changeValue({ ...value, fdp: e.value })}
              />
            </div>
          </Col>
          <Col md="6" lg="6" sm="12" style={{ padding: '10px' }}>
            <CardTitle tag="h6">
              Second semestre soit <strong>222 jours</strong>
            </CardTitle>
            <CardTitle tag="div">
              Troisieme periode soit{' '}
              <strong>{difference(value.dtp, value.ftp)} jours</strong>
            </CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                placeholder="Du"
                id="basic"
                className="inPut"
                value={value.dtp}
                onChange={(e) => changeValue({ ...value, dtp: e.value })}
              />

              <Calendar
                placeholder="Au"
                id="basic"
                className="inPut"
                value={value.ftp}
                onChange={(e) => changeValue({ ...value, ftp: e.value })}
              />
            </div>
            <CardTitle tag="div">
              Quatrieme periode soit{' '}
              <strong>{difference(value.dqp, value.fqp)} jours</strong>
            </CardTitle>
            <div
              className="field col-12 md:col-12"
              style={{ marginBottom: '10px' }}
            >
              <Calendar
                id="basic"
                placeholder="Du"
                value={value.dqp}
                className="inPut"
                onChange={(e) => changeValue({ ...value, dqp: e.value })}
              />

              <Calendar
                placeholder="Au"
                id="basic"
                className="inPut"
                value={value.fqp}
                onChange={(e) => changeValue({ ...value, fqp: e.value })}
              />
            </div>

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
                style={{ margin: '0px 12px' }}
                onClick={(e) => changeIndex(e, 1)}
              >
                Retour
              </CardTitle>
              <CardTitle
                tag="h6"
                style={{ margin: '0px 12px' }}
                onClick={(e) => changeIndex(e, 3)}
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
export default Periode
