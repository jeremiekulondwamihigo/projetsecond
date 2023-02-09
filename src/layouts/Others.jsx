import React, { useContext, useLayoutEffect } from 'react'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import DemoNavbar from 'components/Navbars/DemoNavbar.jsx'
// import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'
import routeOther from 'routesOther.jsx'
import { routes } from 'routes.jsx'
import { CreateContexte } from 'ContextAll'

var ps

function Dashboard(props) {
  const { user } = useContext(CreateContexte)
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
  const history = useHistory()

  useLayoutEffect(() => {
    if (
      (user && user === 'Not authorization to access this id') ||
      user === 'Not authorization to access this route' ||
      !user.fonction
    ) {
      history.push('/users/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
          {routeOther.map((prop, key) => {
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
    </div>
  )
}

export default Dashboard
