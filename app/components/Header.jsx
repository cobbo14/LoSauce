import {Suspense, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import logoImg from '~/assets/logo.png';

const NAV_LINKS = [
  {to: '/restaurants', label: 'Restaurants'},
  {to: '/recipes', label: 'Recipes'},
  {to: '/about', label: 'Our Story'},
  {to: '/contact', label: 'Contact'},
  {to: '/collections/all', label: 'Shop'},
];

export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          prefetch="intent"
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <img src={logoImg} alt="Locally Sauced" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold tracking-wider uppercase text-secondary">
            Locally Sauced
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
            const isShop = link.label === 'Shop';
            return (
              <NavLink
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={[
                  'px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors',
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-primary-foreground hover:bg-primary-foreground/10',
                  isShop && !isActive && 'ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/90',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {link.label}
              </NavLink>
            );
          })}
          <CartToggle cart={cart} />
        </nav>

        {/* Mobile menu button + cart */}
        <div className="flex md:hidden items-center gap-2">
          <CartToggle cart={cart} />
          <button
            className="p-2 rounded-md hover:bg-primary-foreground/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-primary-foreground/20 bg-primary">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  prefetch="intent"
                  className={[
                    'px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-colors',
                    isActive
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-primary-foreground hover:bg-primary-foreground/10',
                  ].join(' ')}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

// Keep HeaderMenu export for the mobile aside (used by PageLayout)
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const {close} = useAside();
  return (
    <nav className="flex flex-col gap-4 p-4" role="navigation">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={close}
          prefetch="intent"
          className="text-lg font-medium hover:text-secondary transition-colors"
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
    >
      Cart{count > 0 ? ` (${count})` : ''}
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
