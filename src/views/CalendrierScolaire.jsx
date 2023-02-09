import React from 'react'
import Footer from './Calendrier/Footer'
import './Calendrier/style.css'
import Context from './Calendrier/Context'
import Index from './Calendrier/Index.jsx'
import { Row, Col } from 'reactstrap'

function CalendrierScolaire() {
  return (
    <Context>
        <div className="content">
          <Row>
            <Col md="12">
              <Index />
              <div className="footerall">
                <Footer fluid />
              </div>
            </Col>
          </Row>
        </div>
    </Context>
  )
}

export default CalendrierScolaire
