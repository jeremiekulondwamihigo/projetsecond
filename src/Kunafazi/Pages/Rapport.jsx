import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import RapportComponent from './Rapport/Rapport'

function Rapport() {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <RapportComponent />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Rapport
