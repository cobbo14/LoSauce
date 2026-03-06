import {NavLink} from 'react-router';

export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Links */}
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
                  to="/about"
                  className="hover:text-secondary transition-colors"
                >
                  Our Story
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections"
                  className="hover:text-secondary transition-colors"
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold tracking-wide text-sm uppercase mb-3 text-secondary">
              Get Involved
            </h4>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Are you a restaurant owner who wants to be featured? We'd love to
              hear from you.
            </p>
            <a
              href="mailto:hello@locallysauced.co.uk"
              className="inline-block mt-3 text-sm text-secondary hover:underline"
            >
              hello@locallysauced.co.uk
            </a>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/20" />

        <p className="text-center text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} Locally Sauced. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
