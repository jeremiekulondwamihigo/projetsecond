import React from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation } from 'react-router-dom'

import DemoNavbar from '../NavBar/NavBar.jsx'
import Sidebar from '../SideBar/SideBar.jsx'
import { routes } from '../Routes.jsx'
import { Loading, lien_read } from 'Kunafazi/Static/Liens.jsx'
import { isEmpty } from 'Kunafazi/Static/Liens.jsx'

var ps

function Admin(props) {
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

  const [item, loading] = Loading(`${lien_read}/readuser`)
  const { login } = item

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes(!isEmpty(login) && login.fonction)}
        bgColor="black"
        activeColor="info"
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes(!isEmpty(login) && login.fonction).map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            )
          })}
        </Switch>
      </div>
    </div>
  )
}

export default Admin
