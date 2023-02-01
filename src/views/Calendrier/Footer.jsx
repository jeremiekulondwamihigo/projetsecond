import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import './style.css'
import ButtonDemo from 'Controls/Button'

function Footer(props) {
  return (
    <Container>
      <div className="card">
        <div className="content-btn">
          <div className="boutton1">
            <ButtonDemo loading={false} label="Enregistrer" />
          </div>
          <div>
            <ButtonDemo loading={true} label="Publier" />
          </div>
        </div>
      </div>
    </Container>
  )
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
