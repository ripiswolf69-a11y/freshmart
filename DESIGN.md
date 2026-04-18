# Design Brief

## Direction

FreshMart — Premium organic food and vegetable general store with professional, clean, modern retail aesthetic.

## Tone

Light, spacious, editorial elegance combined with contemporary minimalism; rejecting warm/rustic clichés in favor of refined approachability.

## Differentiation

Fresh forest green accents on warm cream background create vibrant, natural energy that mimics organic produce freshness while maintaining premium positioning.

## Color Palette

| Token      | OKLCH             | Role                             |
| ---------- | ----------------- | -------------------------------- |
| background | 0.97 0.01 90      | Warm cream base, welcoming       |
| foreground | 0.18 0.02 110     | Deep neutral text, high contrast |
| card       | 0.99 0.005 90     | Product cards, elevated surfaces |
| primary    | 0.52 0.18 155     | Fresh forest green, CTAs & badge |
| accent     | 0.58 0.12 165     | Muted sage, secondary actions    |
| muted      | 0.92 0.015 90     | Subtle backgrounds, borders      |

## Typography

- Display: Lora (serif) — category headers, hero titles, product names
- Body: Figtree (sans-serif) — product descriptions, UI labels, navigation
- Scale: hero 5xl/font-bold, h2 3xl/font-bold, label text-sm/uppercase, body text-base

## Elevation & Depth

Three-tier surface hierarchy: content on muted backgrounds, cards with subtle 8px borders and delicate shadows, interactive elements elevated with slight shadow on hover for tactile feedback.

## Structural Zones

| Zone    | Background       | Border       | Notes                          |
| ------- | ---------------- | ------------ | ------------------------------ |
| Header  | card (0.99)      | muted (0.88) | Light border-bottom, cart icon |
| Content | background (0.97)| —            | Main grid and product layout   |
| Footer  | muted (0.92)     | muted (0.88) | Subtle top border, contact info|

## Spacing & Rhythm

Spacious 2rem section gaps, 1rem product card spacing, 0.5rem micro-spacing for text and icons; alternating section backgrounds create rhythm without weight.

## Component Patterns

- Buttons: rounded-md primary green with hover opacity transition, secondary light grey for less critical actions
- Cards: rounded-md product cards with subtle shadow, hover lift effect (shadow-elevated + -translate-y-1)
- Badges: rounded-full primary background with white text for categories/tags

## Motion

- Entrance: fade-in on page load (0.3s ease-out)
- Hover: smooth opacity and shadow transitions (0.3s cubic-bezier), minor 2px lift on cards
- Decorative: none — focus on functional clarity for e-commerce

## Constraints

- No gradients, no decorative effects — pure geometric clarity
- Green primary used sparingly: CTAs, badges, active states only
- All text contrast tested for WCAG AA+ readability
- Mobile-first responsive (sm, md, lg breakpoints)

## Signature Detail

Fresh forest green primary on warm cream background — the unexpected color pairing signals premium organic positioning and differentiates from competitor commodity retailing.

