import Dashboard from 'views/Dashboard.jsx'
import Notifications from 'views/Notifications.jsx'
import Icons from 'views/Icons.jsx'
import Typography from 'views/Typography.jsx'
import TableList from 'views/Tables.jsx'
import UserPage from 'views/User.jsx'
import Eleves from 'views/Eleves'

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
    path: '/icons',
    name: 'Icons',
    icon: 'nc-icon nc-diamond',
    component: Icons,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'nc-icon nc-bell-55',
    component: Notifications,
    layout: '/admin',
  },
  {
    path: '/user-page',
    name: 'User Profile',
    icon: 'nc-icon nc-single-02',
    component: UserPage,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Table List',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'nc-icon nc-caps-small',
    component: Typography,
    layout: '/admin',
  },
  {
    path: '/eleves',
    name: 'Eleves',
    icon: 'nc-icon nc-single-02',
    component: Eleves,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/resultat',
    name: 'Résultats(1,2,3)', //Bulletin
    icon: 'nc-icon nc-user-run',
    component: Dashboard,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/communication',
    name: 'Communication(1,2,3)',
    icon: 'nc-icon nc-chat-33',
    component: Dashboard,
    layout: '/admin',
    fonction: 'all',
  },
  {
    path: '/inscriptionspetiale',
    name: 'Inscription Spétiale(1,2)',
    icon: 'nc-icon nc-paper',
    component: Dashboard,
    layout: '/admin',
    fonction: 'nationale',
  },
  {
    path: '/affectation',
    name: 'Affectation(3)',
    icon: 'nc-icon nc-ruler-pencil',
    component: Dashboard,
    layout: '/admin',
    fonction: 'etablissement',
  },
  {
    path: '/tuteur',
    name: 'Tuteurs(1,2,3)',
    icon: 'nc-icon nc-single-02',
    component: Dashboard,
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
