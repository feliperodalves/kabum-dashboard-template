export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Vendas'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Vendas',
    to: '/sales',
    icon: 'cil-dollar',
  },
];
