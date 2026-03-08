import {NavLink} from 'react-router';

export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-secondary font-bold text-lg tracking-wider uppercase mb-3">
              Locally Sauced
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Celebrating the restaurants that make your neighbourhood delicious
              — one recipe at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold tracking-wide text-sm uppercase mb-3 text-secondary">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <NavLink
                  to="/restaurants"
                  className="hover:text-secondary transition-colors"
                >
                  Restaurants
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className="hover:text-secondary transition-colors"
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="hover:text-secondary transition-colors"
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections/all"
                  className="hover:text-secondary transition-colors"
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold tracking-wide text-sm uppercase mb-3 text-secondary">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <NavLink
                  to="/about"
                  className="hover:text-secondary transition-colors"
                >
                  Our Story
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className="hover:text-secondary transition-colors"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gifts"
                  className="hover:text-secondary transition-colors"
                >
                  Gift Guide
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold tracking-wide text-sm uppercase mb-3 text-secondary">
              Get Involved
            </h4>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Are you a restaurant owner who wants to be featured? We'd love to
              hear from you.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <NavLink
                to="/partner"
                className="text-sm text-secondary hover:underline"
              >
                Partner with us &rarr;
              </NavLink>
              <a
                href="mailto:hello@locallysauced.uk"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                hello@locallysauced.uk
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Locally Sauced. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/locallysaucedHQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://tiktok.com/@locallysauced"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on TikTok"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://facebook.com/locallysauced"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://x.com/locallysauced"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4l7.07 9.34L4 20h1.6l6.06-5.71L16.4 20H20l-7.4-9.76L19.5 4H18l-5.6 5.28L8 4H4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
