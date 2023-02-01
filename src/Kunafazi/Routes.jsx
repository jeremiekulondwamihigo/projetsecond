import Dashboard from './Pages/Dashboard'
import Clients from './Pages/Clients'
import Agent from './Pages/Agent'
import Comptabilite from './Pages/Comptabilite'
import Rapport from './Pages/Rapport'
import Recu from './Pages/Recu'
import Quartier from './Pages/Quartier'

var route = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/comptabilites',
    name: 'Comptabilité',
    icon: 'nc-icon nc-bank',
    component: Comptabilite,
    layout: '/admin',
    fonction: 'comptable',
  },
  {
    path: '/clients',
    name: 'Clients',
    icon: 'nc-icon nc-bank',
    component: Clients,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/agents',
    name: 'agent',
    icon: 'nc-icon nc-bank',
    component: Agent,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/recus',
    name: 'Facturation',
    icon: 'nc-icon nc-bank',
    component: Recu,
    layout: '/admin',
    fonction: 'comptable',
  },
  {
    path: '/rapports',
    name: 'Rapport',
    icon: 'nc-icon nc-bank',
    component: Rapport,
    layout: '/admin',
    fonction: 'all',
  },
]
export function routes(e) {
  let table = []
  for (let i = 0; i < route.length; i++) {
    if (route[i].fonction === 'all' || route[i].fonction === e) {
      table.push(route[i])
    }
  }
  return table
}
