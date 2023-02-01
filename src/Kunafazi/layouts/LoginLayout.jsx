import React from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation } from 'react-router-dom'

import { RouteLogin } from '../RouteLogin.jsx'

var ps

function Admin() {
  const mainPanel = React.useRef()
  const location = useLocation()

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current)
      document.body.classList.toggle('perfect-scrollbar-on')
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.body.classList.toggle('perfect-scrollbar-on')
      }
    }
  })
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [location])

  return (
    <div ref={mainPanel}>
      <Switch>
        {RouteLogin.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          )
        })}
      </Switch>
      {/* <Footer fluid /> */}
    </div>
  )
}

export default Admin
