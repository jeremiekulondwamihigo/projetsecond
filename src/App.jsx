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

import AdminLayout from 'layouts/Admin.jsx'
import Other from 'layouts/Others.jsx'
import LoginLaYout from 'layouts/LoginLayout.jsx'
import ContexteAll from 'ContextAll'
import ReactHookFormDemo from 'Essaie'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ContexteAll>
    <BrowserRouter>
      <Switch>
        <Route path="/params" render={(props) => <Other {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/users" render={(props) => <LoginLaYout {...props} />} />
        <Route path="/essaie" component={ReactHookFormDemo} />
        <Redirect to="/users/login" />
      </Switch>
    </BrowserRouter>
  </ContexteAll>,
)
