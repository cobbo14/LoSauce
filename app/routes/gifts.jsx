import {Link} from 'react-router';

const occasions = [
  {
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 013 15.546V12a9 9 0 0118 0v3.546zM12 3v2m6.364 1.636l-1.414 1.414M21 12h-2M5.636 6.636L4.222 5.222M3 12H1" />
      </svg>
    ),
    title: 'Birthdays',
    description:
      'For the friend who has everything except a cookbook from their favourite neighbourhood restaurants.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Housewarmings',
    description:
      'Welcome someone to a new neighbourhood with recipes from the restaurants on their doorstep.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Anniversaries',
    description:
      'Recreate the meal from the restaurant where it all started. That\'s a gift with meaning.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: 'Christmas & Holidays',
    description:
      'A gift that keeps giving — long after the wrapping paper is gone, the recipes stay on the shelf.',
  },
];

const reasons = [
  'Beautifully designed — looks stunning on any kitchen shelf',
  'Unique — you won\'t find these recipes anywhere else',
  'Personal — choose the city edition that means something to them',
  'Lasting — not flowers, not chocolate, something they\'ll actually keep',
];

export const meta = () => {
  return [
    {title: 'Gift Guide — Locally Sauced'},
    {
      name: 'description',
      content:
        'Looking for the perfect gift for a food lover? A Locally Sauced binder is a unique, beautiful present for any occasion.',
    },
  ];
};

export default function GiftGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Gift Guide
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          The Perfect Gift for Food Lovers
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Looking for something special? A Locally Sauced binder is a unique,
          beautiful gift that any food lover will treasure.
        </p>
      </div>

      <hr className="mb-16 border-border" />

      {/* Why it makes a great gift */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            Why They'll Love It
          </span>
          <h2 className="text-3xl font-bold mt-3">Not Just Another Cookbook</h2>
        </div>
        <div className="max-w-xl mx-auto">
          <ul className="space-y-4">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-foreground/80 leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="mb-16 border-border" />

      {/* Perfect for every occasion */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            Perfect For
          </span>
          <h2 className="text-3xl font-bold mt-3">Every Occasion</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {occasions.map((occasion, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                {occasion.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{occasion.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {occasion.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-16 border-border" />

      {/* CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Make Their Day?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
          Browse our editions and find the perfect binder. Prices start from
          just £14.99.
        </p>
        <Link
          to="/collections/all"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
