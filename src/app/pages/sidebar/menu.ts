import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: '',
    isTitle: true,
  },
  {
    label: 'menu.home',
    icon: 'home',
    link: '/dashboard',
  },
  {
    label: 'menu.leadsRegister',
    icon: 'filter',
    link: '/efta-leasing/leads-register/list-leads',
  },
  {
    label: 'menu.repossessions',
    icon: 'truck',
    link: '/efta-leasing/repossessions/repossessions-list',
  },
  {
    label: 'menu.documents',
    icon: 'book',
    subItems: [
      {
        label: 'menu.invoices',
        link: '/efta-leasing/invoices/list-invoices',
      },
      {
        label: 'menu.lpos',
        link: '/efta-leasing/LPOs/list-lpo',
      },
      {
        label: 'menu.insurance',
        link: '/efta-leasing/insurance/list-insurance',
      },
      {
        label: 'menu.tracking',
        link: '/efta-leasing/tracking/list-tracking',
      },
    ],
  },
  {
    label: '',
    isTitle: true,
  },
  {
    label: '',
    isTitle: true,
  },
  {
    label: '',
    isTitle: true,
  },
  {
    label: '',
    isTitle: true,
  },
];