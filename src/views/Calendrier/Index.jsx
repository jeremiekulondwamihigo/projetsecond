import React, { useContext } from 'react'
import StepsDemo from 'Controls/Steps.jsx'
import AnneeScolaire from './AnneeScolaire.jsx'
import JoursFerier from './JoursFerier.jsx'
import Periode from './Periode.jsx'
import Semestre from './Semestre.jsx'
import './style.css'
import { ValeurContext } from './Context'
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap'

function Index() {
  const { activeIndex } = useContext(ValeurContext)

  const getElement = () => {
    switch (activeIndex) {
      case 0:
        return <AnneeScolaire />
      case 1:
        return <Semestre />
      case 2:
        return <Periode />
      case 3:
        return <JoursFerier />
      default:
        return
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <StepsDemo />
                {getElement()}
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Index
