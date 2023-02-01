import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'assets/scss/paper-dashboard.scss?v=1.3.0'
import 'assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'

import AdminLayout from 'Kunafazi/layouts/Admin.jsx'
import LoginLayout from 'Kunafazi/layouts/LoginLayout.jsx'
import OtherRoutes from 'Kunafazi/layouts/OtherRoutes'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />
      <Route path="/params" render={(props) => <OtherRoutes {...props} />} />
      {/* <Route path="/essaie" component={ReactHookFormDemo} /> */}
      <Redirect to="/login/login" />
    </Switch>
  </BrowserRouter>,
)
