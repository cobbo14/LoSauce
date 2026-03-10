# Locally Sauced (LoSauce)

## What This Is
A binder-based cookbook brand that collects real, exclusive recipes from independent restaurants and presents them in beautifully designed, city-specific binders. The product is both a cookbook and a marketing channel for independent restaurants.

## Brand Guidelines
**Always consult `brand-workbook.md` in the project root before writing any copy, marketing text, or user-facing content.**

Key brand principles:
- **Purpose:** Celebrate and support independent restaurants
- **Voice:** Warm, conversational, genuine — like a trusted neighbour recommending a local spot
- **Never sound:** Corporate, pretentious, hard-sell, or virtuous/self-righteous
- **Personality:** Nurturing, capable, welcoming, community-proud, generous
- **Values:** Celebrate Local, Authenticity, Quality, Community, Accessibility, Heritage
- **USP:** The only cookbook with real recipes from independent restaurants on your doorstep
- **Tagline:** "The Cookbook Your Community Built"

### Brand Colors
- Primary: Burgundy `#5C1A1A` / `oklch(0.27 0.13 15)`
- Secondary: Gold `#C9A84C` / `oklch(0.73 0.12 75)`
- Background: Cream

## Tech Stack
- **Framework:** Shopify Hydrogen 2026.1 (React 18, React Router 7, Vite 6)
- **Styling:** Tailwind CSS 4
- **Commerce:** Shopify Storefront API (cart, checkout, customer accounts, orders)
- **Database:** Supabase (server-side only — see `app/lib/supabase.server.js`)
- **Hosting:** Shopify Oxygen (Cloudflare Workers)
- **Language:** JavaScript (JSX) — not TypeScript

## Dev Commands
- `npm run dev` — Start dev server with codegen
- `npm run build` — Production build with codegen
- `npm run preview` — Preview production build
- `npm run codegen` — Generate Storefront API types
- `npm run lint` — Run ESLint

## Project Structure
```
app/
├── components/     # Reusable UI components (Header, Footer, Cart, Product, Search)
├── data/           # Static data files (regions, restaurants, recipes, blog)
├── graphql/        # Storefront API GraphQL queries
├── lib/            # Utilities (session, supabase, search, variants, discounts)
├── routes/         # File-based routing (React Router 7)
├── styles/         # Global CSS (app.css, reset.css)
├── entry.client.jsx
├── entry.server.jsx
├── root.jsx
└── routes.js       # Route configuration
```

## Data Architecture
- **Static data:** Regions, restaurants, and recipes are defined in `app/data/` as JS files
- **Shopify data:** Products, collections, cart, and customer accounts come from the Storefront API
- **Supabase:** Server-side only (discount codes, order webhooks)
- Currently: 3 regions, 9 restaurants, 18 recipes

## Key Routes
- `/` — Homepage
- `/regions/:id` — Region detail (e.g., SW London)
- `/restaurants/:id` — Restaurant detail
- `/recipes/:id` — Recipe detail
- `/collections/:handle` — Shopify product collection
- `/products/:handle` — Shopify product detail
- `/partner` — Restaurant partnership page
- `/gifts` — Gift guide
- `/about` — Brand story
- `/contact` — Contact form
- `/faq` — FAQ
- `/blog` — Blog index and posts

## Important Notes
- All route files use `.jsx` extension — keep consistent
- Logo file is at `/Users/willcobbett/Library/CloudStorage/OneDrive-Personal/Code/Locally Sauced Logo.png`
- Social handles: @locallysaucedHQ (Instagram), @locallysauced (TikTok, Facebook, X)
- Contact: hello@locallysauced.uk
