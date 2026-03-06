import {Link} from 'react-router';

const values = [
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Celebrating Local',
    description:
      'Independent restaurants are the heartbeat of every great city. We exist to celebrate them and put their cooking in your hands.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    title: 'Real Partnerships',
    description:
      'We work directly with chefs and owners. Every recipe is verified, tested, and approved by the restaurant before it goes to print.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Quality You Can Feel',
    description:
      'From the recipe cards to the binder itself — every element of Locally Sauced is designed to look beautiful on your kitchen shelf.',
  },
];

const steps = [
  {
    number: '01',
    title: 'We Find the Restaurants',
    description:
      'We scout the best independent restaurants in each city — the hidden gems, the neighbourhood favourites, the places locals swear by.',
  },
  {
    number: '02',
    title: 'We Collect the Recipes',
    description:
      'We sit down with the chefs and owners, and they share the dishes they\'re most proud of. Not simplified versions — the real recipes.',
  },
  {
    number: '03',
    title: 'We Create the Binder',
    description:
      'Those recipes become beautifully printed cards, collected in a premium binder — one edition per city, something to keep and hand down.',
  },
];

export const meta = () => {
  return [
    {title: 'Our Story — Locally Sauced'},
    {
      name: 'description',
      content:
        'Locally Sauced started with a simple frustration: the best food in any city is hiding in plain sight.',
    },
  ];
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          The Cookbook Your City Deserves
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Locally Sauced started with a simple frustration: the best food in any
          city is hiding in plain sight, and most of us only experience a
          fraction of it.
        </p>
      </div>

      <hr className="mb-16 border-border" />

      {/* Story */}
      <div className="max-w-none space-y-6 text-foreground/80 leading-relaxed text-base mb-16">
        <p>
          We've always believed that the greatest cookbooks aren't written by TV
          chefs — they're written by the people behind the pass at your favourite
          neighbourhood restaurant. The chef who's been perfecting their mum's
          recipe for twenty years. The owner who sources their ingredients from a
          farm ten miles away. The kitchen that feeds the same regulars every
          Friday night.
        </p>
        <p>
          Locally Sauced is our way of capturing that. We go to the restaurants
          you love, we sit down with the people who run them, and we ask them to
          share the recipe they're most proud of. Not a simplified version. The
          real one.
        </p>
        <p>
          Those recipes become beautiful printed cards, collected in a premium
          binder — one edition per city, one collection per neighbourhood.
          Something to keep, to use, and to hand down.
        </p>
        <p>
          We're a small team who care deeply about good food and the communities
          built around it. Every restaurant we partner with is chosen because we
          genuinely love it — not because of Michelin stars or Instagram
          followings, but because the food is brilliant and the people behind it
          are passionate.
        </p>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            How It Works
          </span>
          <h2 className="text-3xl font-bold mt-3">From Kitchen to Your Shelf</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <span className="text-4xl font-bold text-secondary/30">{step.number}</span>
              <h3 className="font-semibold text-lg mt-2 mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-16 border-border" />

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map((value, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              {value.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <hr className="mb-16 border-border" />

      {/* Partnership CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Are You a Restaurant Owner?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
          We're always looking for passionate independent restaurants to partner
          with. If you'd like your recipes featured in the next edition, we'd
          love to talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/partner"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Learn About Partnering
          </Link>
          <Link
            to="/collections"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md border border-border font-medium hover:bg-muted transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
