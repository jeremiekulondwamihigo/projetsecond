import CalendrierScolaire from 'views/CalendrierScolaire.jsx'
import OptionSection from 'views/OptionSection/OptionSection.jsx'
import Classes from 'views/Classes/Classes.jsx'
import Personnels from 'views/Personnels.jsx'
import Province from 'views/Province.jsx'
import Etablissement from 'views/Etablissement'
import ButtonDemo from 'Controls/Button.jsx'
import InfoAgent from 'views/Agent/InforAgent'
import InformationEleve from 'views/Etablissement/InformationEleve.jsx'
import InfoEtablissement from 'views/Etablissement/InfoEtablissement'

var routeOther = [
  {
    path: '/calendrier',
    component: CalendrierScolaire,
    layout: '/params',
    brandName: 'Calendrier Scolaire',
  },
  {
    path: '/options',
    component: OptionSection,
    layout: '/params',
    brandName: 'Option et Section',
  },
  {
    path: '/classe',
    component: Classes,
    layout: '/params',
    brandName: 'Classe',
  },
  {
    path: '/province',
    component: Province,
    layout: '/params',
    brandName: 'Province',
  },
  {
    path: '/personnels',
    component: Personnels,
    layout: '/params',
    brandName: 'Personnels',
  },
  {
    path: '/etablissement',
    component: Etablissement,
    layout: '/params',
    brandName: 'Etablissement',
  },
  {
    path: '/informationAgent/:codeAgent',
    component: InfoAgent,
    layout: '/params',
    brandName: 'Information Agent',
  },
  {
    path: '/essaie',
    component: ButtonDemo,
    layout: '/params',
    brandName: 'Essaie',
  },
  {
    path: '/informationEleve/:codeEleve',
    component: InformationEleve,
    layout: '/params',
    brandName: 'Information élève',
  },
  {
    path: '/infoEtablissement',
    component: InfoEtablissement,
    layout: '/params',
    brandName: 'Information',
  },
]
export default routeOther
