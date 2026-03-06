const benefits = [
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Exposure to New Customers',
    description:
      'Your restaurant is featured in a premium binder that sits on kitchen shelves across the city — a lasting reminder of your food.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Beautifully Printed Recipes',
    description:
      'Your signature dishes are professionally photographed and designed into collectible recipe cards that do your food justice.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Join a Community',
    description:
      'Be part of a growing network of independent restaurants celebrated for doing what they do best — making incredible food.',
  },
];

const criteria = [
  'You run an independent restaurant, café, or food venue',
  'You\'re passionate about the food you serve',
  'You have signature dishes you\'re proud to share',
  'You\'re based in one of our featured cities (or want us to come to yours)',
];

export const meta = () => {
  return [
    {title: 'Partner With Us — Locally Sauced'},
    {
      name: 'description',
      content:
        'We\'re looking for passionate independent restaurants to feature in our next edition. Learn what partnering with Locally Sauced looks like.',
    },
  ];
};

export default function PartnerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Partner With Us
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          Get Your Restaurant Featured
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          We partner with independent restaurants to turn their best dishes into
          beautifully printed recipe cards. No cost to you — just great food and
          a willingness to share it.
        </p>
      </div>

      <hr className="mb-16 border-border" />

      {/* What We Offer */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            What You Get
          </span>
          <h2 className="text-3xl font-bold mt-3">Why Restaurants Partner With Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-16 border-border" />

      {/* What We're Looking For */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            Who We Work With
          </span>
          <h2 className="text-3xl font-bold mt-3">What We're Looking For</h2>
        </div>
        <div className="max-w-xl mx-auto">
          <ul className="space-y-4">
            {criteria.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-foreground/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="mb-16 border-border" />

      {/* How to Apply */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Involved?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-lg mx-auto">
          Drop us an email with a bit about your restaurant — where you are, what
          you serve, and what makes your food special. We'll take it from there.
        </p>
        <a
          href="mailto:hello@locallysauced.co.uk?subject=Restaurant Partnership Enquiry"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Get In Touch
        </a>
        <p className="text-muted-foreground text-sm mt-4">
          hello@locallysauced.co.uk
        </p>
      </div>
    </div>
  );
}
