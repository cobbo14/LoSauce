import {Link} from 'react-router';

const enquiries = [
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'General Enquiries',
    description: 'Questions about our binders, recipes, or anything else — we\'re happy to help.',
    href: 'mailto:hello@locallysauced.co.uk?subject=General Enquiry',
    label: 'hello@locallysauced.co.uk',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Restaurant Partnerships',
    description: 'Own an independent restaurant? We\'d love to feature your recipes in an upcoming edition.',
    href: '/partner',
    label: 'Learn more about partnering',
    isLink: true,
  },
  {
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: 'Press & Media',
    description: 'For press enquiries, interviews, or media coverage, please get in touch.',
    href: 'mailto:hello@locallysauced.co.uk?subject=Press Enquiry',
    label: 'hello@locallysauced.co.uk',
  },
];

export const meta = () => {
  return [
    {title: 'Contact Us — Locally Sauced'},
    {
      name: 'description',
      content:
        'Get in touch with the Locally Sauced team. Whether you have a question, want to partner with us, or just want to say hello.',
    },
  ];
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Contact
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          We'd Love to Hear From You
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Whether you have a question about our binders, want to partner with
          us, or just want to say hello — drop us a line.
        </p>
      </div>

      <hr className="mb-16 border-border" />

      {/* Enquiry cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {enquiries.map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              {item.icon}
            </div>
            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {item.description}
            </p>
            {item.isLink ? (
              <Link
                to={item.href}
                className="text-sm font-medium text-secondary hover:underline"
              >
                {item.label} &rarr;
              </Link>
            ) : (
              <a
                href={item.href}
                className="text-sm font-medium text-secondary hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Direct email CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Prefer Email?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
          You can always reach us directly. We aim to respond within 48 hours.
        </p>
        <a
          href="mailto:hello@locallysauced.co.uk"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          hello@locallysauced.co.uk
        </a>
      </div>
    </div>
  );
}
