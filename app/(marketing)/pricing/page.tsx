import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Pricing from '@/components/pricing';

export const metadata = {
  title: 'Pricing',
};

const pricing = [
  {
    name: 'Eclipse',
    price: {
      monthly: '$39',
      annual: '$16',
      discount: '10%',
      original: '$24',
    },
    popular: false,
    features: [
      '4 calls/month',
      'Access to all mentors',
      'Chat with mentors before booking',
      'Slack community',
      'Customer support',
    ],
    button: {
      text: 'Get Started',
      link: '/',
    },
  },
  {
    name: 'Moon',
    price: {
      monthly: '$59',
      annual: '$16',
      discount: '10%',
      original: '$24',
    },
    popular: true,
    features: [
      'Everything in Eclipse',
      'Unlimited calls/month',
      'Personalized onboarding',
      'Unlimited Collaborators',
      'Priority Support',
    ],
    button: {
      text: 'Get Started',
      link: '#',
    },
  },
  {
    name: 'Sun',
    price: {
      monthly: '$79',
      annual: '$16',
      discount: '10%',
      original: '$24',
    },
    popular: false,
    features: [
      'Everything in Moon',
      'Access to deals on tools',
      'Dedicated Account Manager',
      '24/7 Phone Support',
    ],
    button: {
      text: 'Contact us',
      link: '/contact',
    },
  },
];

export default function PricingPage() {
  return (
    <section className="container">
      <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12"></div>
      <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
        {pricing.map((item, index) => (
          <Pricing plan={item} key={index} />
        ))}
      </div>
    </section>
  );
}
