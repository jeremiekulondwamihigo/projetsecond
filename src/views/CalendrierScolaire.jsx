import React from 'react'
import Footer from './Calendrier/Footer'
import './Calendrier/style.css'
import Context from './Calendrier/Context'
import Index from './Calendrier/Index.jsx'
import { Row, Col } from 'reactstrap'
import UserConnect from './UserConnect'

function CalendrierScolaire() {
  return (
    <Context>
      <UserConnect>
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
      </UserConnect>
    </Context>
  )
}

export default CalendrierScolaire
