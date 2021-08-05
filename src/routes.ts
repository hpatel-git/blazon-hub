// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PagesIcon from '@material-ui/icons/Pages';
// core components/views for Admin layout
import DashboardPage from './views/Dashboard/Dashboard';
import UserProfile from './views/UserProfile/UserProfile';
import SocialAccounts from './views/SocialAccounts/SocialAccounts';
import SocialPages from './views/SocialPages/SocialPages';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    hidden: false,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/my_profile',
    name: 'User Profile',
    icon: Person,
    hidden: false,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/accounts',
    name: 'Social Accounts',
    icon: AccountTreeIcon,
    hidden: false,
    component: SocialAccounts,
    layout: '/admin'
  },
  {
    path: '/accounts/:accountId/pages',
    name: 'Social Pages',
    icon: PagesIcon,
    hidden: true,
    component: SocialPages,
    layout: '/admin'
  }
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: '/admin'
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: '/admin'
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: '/admin'
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: '/admin'
  // }
];

export default dashboardRoutes;
