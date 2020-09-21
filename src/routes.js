import { lazy } from 'react';

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));
const Sales = lazy(() => import('./views/sales/Sales'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sales', name: 'Vendas', component: Sales },
];

export default routes;
