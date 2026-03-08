const faqs = [
  {
    category: 'The Binder',
    items: [
      {
        question: 'What is Locally Sauced?',
        answer:
          'Locally Sauced is a premium recipe binder filled with exclusive recipes from the best independent restaurants in your city. Each recipe is printed on a beautiful card, ready to slot into your binder.',
      },
      {
        question: 'What does the binder include?',
        answer:
          'Each binder comes with a collection of printed recipe cards from restaurants in your chosen city. The binder itself is a high-quality, hardback design made to sit proudly on your kitchen shelf.',
      },
      {
        question: 'Can I add more recipe cards later?',
        answer:
          'Absolutely. We release new editions and expansion packs regularly. Your binder is designed to grow with your collection.',
      },
      {
        question: 'What size are the recipe cards?',
        answer:
          'Each card is A5 — large enough to read easily while cooking, small enough to stay neat in the binder.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    items: [
      {
        question: 'How long does delivery take?',
        answer:
          'UK orders typically arrive within 3–5 working days. We ship via Royal Mail tracked delivery.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Not yet — but we\'re working on it. Sign up to our mailing list and we\'ll let you know when international shipping is available.',
      },
      {
        question: 'Can I return my order?',
        answer:
          'Yes. If you\'re not happy with your order, you can return it within 30 days for a full refund. See our returns policy for details.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'You\'ll receive a tracking number by email once your order has shipped. You can also check your order status in your account.',
      },
    ],
  },
  {
    category: 'Restaurants & Recipes',
    items: [
      {
        question: 'How do you choose the restaurants?',
        answer:
          'We look for passionate, independent restaurants that serve genuinely great food. No Michelin stars required — just brilliant cooking and people who care about what they do.',
      },
      {
        question: 'Are the recipes the real ones from the restaurant?',
        answer:
          'Yes. Every recipe is shared directly by the chef or owner and verified before printing. These aren\'t simplified home versions — they\'re the real thing.',
      },
      {
        question: 'Can I suggest a restaurant to feature?',
        answer:
          'We\'d love that! Drop us an email at hello@locallysauced.uk with the restaurant name, location, and why you think they\'d be a great fit.',
      },
      {
        question: 'I\'m a restaurant owner. How do I get featured?',
        answer:
          'Head to our Partner page to learn more about what a partnership looks like, or email us directly at hello@locallysauced.uk.',
      },
    ],
  },
];

export const meta = () => {
  return [
    {title: 'FAQ — Locally Sauced'},
    {
      name: 'description',
      content:
        'Frequently asked questions about Locally Sauced binders, orders, shipping, and restaurant partnerships.',
    },
  ];
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          FAQ
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about Locally Sauced. Can't find what
          you're looking for?{' '}
          <a
            href="mailto:hello@locallysauced.uk"
            className="text-secondary hover:underline"
          >
            Get in touch
          </a>
          .
        </p>
      </div>

      {/* FAQ sections */}
      {faqs.map((section, i) => (
        <div key={i} className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-secondary">
            {section.category}
          </h2>
          <div className="space-y-6">
            {section.items.map((faq, j) => (
              <div key={j} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Still have questions CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
          We're always happy to help. Drop us an email and we'll get back to you
          as soon as we can.
        </p>
        <a
          href="mailto:hello@locallysauced.uk"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          hello@locallysauced.uk
        </a>
      </div>
    </div>
  );
}
