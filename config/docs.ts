import { DocsConfig } from '@/types';

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Guides',
      href: '/guides',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ],
  sidebarNav: [
    {
      title: 'Profile',
      items: [
        {
          title: 'Edit',
          href: '/profile',
        },
      ],
    },
    {
      title: 'Bookings',
      items: [
        {
          title: 'Manage',
          href: '/bookings/manage',
        },
        {
          title: 'History',
          href: '/bookings/history',
        },
      ],
    },
  ],
};
