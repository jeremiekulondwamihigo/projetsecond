import React, { useState, useContext } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { CardTitle, Row, Col } from 'reactstrap'
import SpeedDialDemo from 'Controls/SPeedDial.jsx'
import { InputTextarea } from 'primereact/inputtextarea'
import { ValeurContext } from './Context'
import ButtonDemo from 'Controls/Button'
import { getFullDate, difference } from 'Controls/Mois'

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

const JoursFerier = () => {
  const {
    changeIndex,
    changeObservation,
    uneSeule,
    value,
    joursScolaire,
    observation,
  } = useContext(ValeurContext)
  console.log(observation)

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
  const [loading, setLoading] = useState(false)
  const [observationstore, setObservationStore] = useState({
    observation: '',
    date1: null,
    date2: null,
  })
  const sendToContext = async () => {
    setLoading(true)
    await changeObservation(observationstore)
    setLoading(false)
  }
  const changeDate = (e) => {
    const tag = document.getElementsByTagName('text')
    tag.value = ''
    setObservationStore({
      ...observationstore,
      date1: e,
    })
  }
  const multipleDate = (data, id) => {
    if (id === 1) {
      setObservationStore({
        ...observationstore,
        date1: data,
      })
    }
    if (id === 2) {
      setObservationStore({
        ...observationstore,
        date2: data,
      })
    }
  }

  return (
    <div className="card" style={{ padding: '10px' }}>
      <Row>
        <Col md="6" lg="6" sm="12">
          <div>
            <SpeedDialDemo actions={actions} />
          </div>

          {uneSeule ? (
            <Calendar
              onChange={(e) => changeDate(e.target.value)}
              inline
              showWeek
            />
          ) : (
            <div className="affiche">
              {' '}
              <p>Ouverture scolaire : {getFullDate(value.add)}</p>
              <p>Cloture scolaire : {getFullDate(value.adf)}</p>
              <p className="soit">soit {joursScolaire} jours</p>
              <hr />
              <p>Premier semestre : {getFullDate(value.dpsm)}</p>
              <p>Second semestre : {getFullDate(value.fpsm)}</p>
              <p className="soit">
                soit {difference(value.dpsm, value.fpsm)} jours
              </p>
              <hr />
              <p style={{ textAlign: 'justify' }}>
                Premiere Période : {getFullDate(value.dpp)} au{' '}
                {getFullDate(value.fpp)}{' '}
                <span className="soit">
                  soit {difference(value.dpp, value.fpp)} jours
                </span>
              </p>
              <p style={{ textAlign: 'justify' }}>
                Deuxieme Période : {getFullDate(value.ddp)} au{' '}
                {getFullDate(value.fdp)}{' '}
                <span className="soit">
                  soit {difference(value.ddp, value.fdp)} jours
                </span>
              </p>
              <p style={{ textAlign: 'justify' }}>
                Troisieme Période : {getFullDate(value.dtp)} au{' '}
                {getFullDate(value.ftp)}{' '}
                <span className="soit">
                  soit {difference(value.dtp, value.ftp)} jours
                </span>
              </p>
              <p style={{ textAlign: 'justify' }}>
                Troisieme Période : {getFullDate(value.dqp)} au{' '}
                {getFullDate(value.fqp)}{' '}
                <span className="soit">
                  soit {difference(value.dqp, value.fqp)} jours
                </span>
              </p>
              <hr />
              <p className="soit">Jours fériers</p>
              {observation.map((index, key) => {
                return (
                  <p key={key}>
                    <span className="date">
                      {key + 1}. {getFullDate(index.dateDebut)}
                      {index.dateFin &&
                        ` Au ${getFullDate(index.dateFin)} soit ${difference(
                          index.dateDebut,
                          index.dateFin,
                        )} jours`}
                    </span>
                    {` ---------> `} {index.observation}
                  </p>
                )
              })}
            </div>
          )}
        </Col>
        <Col md="6" lg="6" sm="12">
          {/* SI PLUS D'UN JOUR */}
          {!uneSeule && (
            <div style={{ margin: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <Calendar
                  id="basic"
                  style={{ width: '95%' }}
                  placeholder="Allant du"
                  onChange={(e) => multipleDate(e.target.value, 1)}
                />
              </div>
              <div>
                <Calendar
                  id="basic2"
                  style={{ width: '95%' }}
                  placeholder="jusqu'au"
                  onChange={(e) => multipleDate(e.target.value, 2)}
                />
              </div>
            </div>
          )}

          {/* FIN PLUS D'UN JOUR */}
          <div style={{ marginTop: '20px' }}>
            <InputTextarea
              value={observationstore.observation}
              onChange={(e) =>
                setObservationStore({
                  ...observationstore,
                  observation: e.target.value,
                })
              }
              rows={3}
              cols={47}
              placeholder="Observation"
              name="text"
            />
          </div>

          <div style={{ width: '93%' }}>
            <ButtonDemo
              loading={loading}
              label="Ajouter"
              executer={() => sendToContext()}
            />
          </div>
          <CardTitle
            tag="div"
            style={{
              margin: '0px 12px',
              right: '20px',
              bottom: '10px',
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={(e) => changeIndex(e, 2)}
          >
            Retour
          </CardTitle>
        </Col>
      </Row>
    </div>
  )
}
export default JoursFerier
