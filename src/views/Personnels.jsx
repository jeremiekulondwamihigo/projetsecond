import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import Table from './Agent/Table'

function Personnels() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Table />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Personnels
