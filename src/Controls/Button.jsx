import React from 'react'
import { Button } from 'primereact/button'
import './style.css'

const ButtonDemo = ({ loading, executer, label }) => {
  return (
    <div className="button-demo" style={{ marginTop: '15px' }}>
      <div className="card">
        <Button
          label={label}
          iconPos="right"
          loading={loading}
          onClick={(e) => executer(e)}
        />
      </div>
    </div>
  )
}
export default ButtonDemo
