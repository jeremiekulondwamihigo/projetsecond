import React, { useContext } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation } from 'react-router-dom'

import DemoNavbar from 'components/Navbars/DemoNavbar.jsx'
import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

import { routes } from 'routes.jsx'
import { CreateContexte } from 'ContextAll'
import UserConnect from 'views/UserConnect'

var ps

function Dashboard(props) {
  const mainPanel = React.useRef()
  const location = useLocation()
  const { user } = useContext(CreateContexte)

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
    <UserConnect>
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes(user.fonction)}
          bgColor="black"
          activeColor="info"
        />
        <div className="main-panel" ref={mainPanel}>
          <DemoNavbar {...props} />
          <Switch>
            {routes(user.fonction).map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              )
            })}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    </UserConnect>
  )
}

export default Dashboard
