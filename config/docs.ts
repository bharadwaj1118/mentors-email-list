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

    {
      title: 'Blog',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Build your own',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Writing Posts',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
  ],
};
