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
import { Provider } from 'react-redux'
import { store } from 'Store.jsx'
import moment from 'moment'

moment.locale('fr', {
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: ' un an',
    yy: '%d ans',
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ContexteAll>
        <Switch>
          <Route path="/params" render={(props) => <Other {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/users" render={(props) => <LoginLaYout {...props} />} />
          <Route path="/essaie" component={ReactHookFormDemo} />
          <Redirect to="/users/login" />
        </Switch>
      </ContexteAll>
    </BrowserRouter>
  </Provider>,
)
