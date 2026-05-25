# baymac.lol design system

The rules behind the site. Contributors and AI agents should read this before adding
or changing anything visual. When you see a decision that doesn't match the rules
below, the rules win — file an issue if a rule needs to change, don't sneak around
it in a component.

## Origin

This design system was extracted from the 2026-05-24 nomad-journal redesign, which
went through `/plan-design-review` (5/10 → 9/10, 23 decisions) and
`/plan-eng-review` (14 issues + 4 outside-voice tensions, all resolved). The plan
lives at `.context/plans/baymac-website-redesign.md`. Read that for the full
decision history; read this for the rules to follow.

## Voice

A nomad journal: hand-drawn, paper, sticky notes, polaroid, washi tape, scrapbook
composition. The aesthetic isn't "personal blog template" — it's "this person
keeps an actual journal and the site is what fell out of it." The cat carries
identity; everything else either earns its pixels or comes out.

## Palette

The chassis is the original blue from `--first-color: hsl(230, 70%, 60%)`. The cat,
postits, polaroid, and modal paper are warm islands sitting on the cool page —
complementary-color editorial direction, like Penguin Classics covers.

`PALETTES.journal` (paper + tomato) was considered for the brand chassis and
explicitly rejected (Pass 5.A). It stays defined in the prototype as a documented
alternate. Do NOT switch the chassis palette without a new review.

### Token mapping (prototype → production)

Tokens for paper-island elements (postits, polaroid, tape, wobble) are added to
`styles/global.css` under the "REDESIGN TOKENS" comment block. Everything else
reuses the existing `--first-color`, `--body-color`, `--text-color`, `--bs`, etc.
already in `:root`.

| Prototype name | Production token | Notes |
|--|--|--|
| `--accent` | `--first-color` | The blue chassis accent |
| `--paper` | `--body-color` | Page background |
| `--ink` | `--text-color` | Body text |
| `--accent-soft` | `--nav-items-hover-color` | Soft tint for highlighted bg |
| `--postit-1..5` | `--postit-1..5` | New: postit color ramp |
| `--postit-ink` | `--postit-ink` | New: warm ink that works on any postit |
| `--polaroid-paper` | `--polaroid-paper` | New: polaroid frame paper |
| `--tape-bg` | `--tape-bg` | New: washi-tape decoration |
| `--modal-paper` | `--modal-paper` | New: BuyMeCrypto lined-paper modal |
| `--shadow-polaroid` | `--polaroid-shadow` | New |
| `--shadow-card` | `--shadow-card` | New |
| `--shadow-modal` | `--shadow-modal` | New |

## Type stack

Four fonts, four jobs. All loaded via `next/font/google` (per T-fonts) and exposed
as CSS variables:

| Role | Variable | Stack | When |
|--|--|--|--|
| Sans | `--font-sans-stack` | Inter | UI chrome — nav, buttons, metadata, body for non-blog content |
| Mono | `--font-mono-stack` | JetBrains Mono | Code, addresses, timestamps, micro-copy labels |
| Hand | `--font-hand-stack` | Caveat | Headings on home/blog/sections — the personality voice |
| Blog | `--font-blog-stack` | Atkinson Hyperlegible | Single-post body — reading-optimized |

Never use a system-ui or `-apple-system` font as the primary face. Those exist only
as fallbacks inside the stacks.

### Type scale

| Token | Size | Used for |
|--|--|--|
| `--text-hero` | clamp(2.75rem, 5vw, 4rem) | Hero name on home (44px → 64px) |
| `--text-section` | clamp(2rem, 3.5vw, 2.75rem) | "where i've been" / "things i've built" / "the blog" |
| `--text-card-title` | 1.5rem (24px) | Blog card titles, timeline ticket headlines |
| `--text-body` | 1rem | Default body text |
| `--text-meta` | 0.875rem | Card metadata, timestamps |
| `--text-micro` | 0.6875rem | Labels (READ IT →, dates, mono captions) |

Cross-page hierarchy rule: home hero is always the loudest text on the site. Blog
list "the blog" heading is `--text-section`, NOT `--text-hero`.

## Spacing

Named scale `--space-1` through `--space-9`: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
pixels. Use these, not raw rem/px values. The existing `--mb-*` margin-bottom scale
is kept for backwards compatibility with the current pre-redesign components.

## Wobble (hand-drawn filter)

The signature visual move. SVG turbulence + displacement, defined once in
`app/layout.tsx` and applied via `data-wobble` attribute.

### The "paper elements only" rule

**Wobble goes on paper, not chrome.** Apply `data-wobble` to:

- Project cards
- Timeline tickets
- Blog sticky-note cards
- Hero polaroid frame
- BuyMeCrypto modal paper

**Do NOT apply wobble to:**

- Buttons (filter pills, copy buttons, modal close, etc.)
- Nav chrome (header bar, mobile drawer)
- Footer
- Icons
- AI badge
- Skip link

Reason: when everything wobbles, wobble stops being intentional and becomes
decorative noise (Krug: "if everything shouts, nothing is heard"). The rule makes
wobble a meaningful signal: "this is a paper thing."

### Reduced motion

The global `@media (prefers-reduced-motion: reduce)` rule in `global.css`
automatically disables wobble. No per-component opt-out needed. Use the
`.motion-essential` class only when motion is information (focus indicators).

## AI disclosure badge

One component, one treatment, both surfaces. Use `components/Blog/AiBadge.tsx`
on both blog list cards and post pages. The decorative inverted-black "sticker"
treatment from the prototype is forbidden — AI disclosure is content metadata,
not decoration.

## Postit color rotation

Five postit colors, used cyclically per consumer:

- `--postit-1` warm yellow (start)
- `--postit-2` mint green
- `--postit-3` coral pink
- `--postit-4` powder blue
- `--postit-5` dusty pink

Blog list cards rotate through these in order. Hero postits use specific picks
(currently-in: `--postit-1`, dj sets: `--postit-2`). Always pair postits with
`color: var(--postit-ink)` — never use the page `--text-color` on a postit.

## Component primitives

`Postit` and `Tape` are shared primitives in `components/Common/` (per CQ 2B). Use
them; do NOT inline postit/tape markup per consumer. The wobble filter is NOT
extracted as a component — it's a `data-wobble` attribute on whatever wants it.

`WobbleBox` from the prototype is intentionally not ported as a component.

## Layout

### Section order on home (`app/page.tsx`)

`<Hero /> <Projects /> <Timeline />`. Skills section is permanently cut (Pass 1.D).
About section is replaced by Hero (more than just an avatar + bio block).

### Hero composition

**Desktop:** scrapbook spread — polaroid overlaps the handwritten name; postits
tuck into negative space; positioned together so they read as one arrangement.

**Mobile:** stacked — polaroid centered at top; name + signal sentence below
center-aligned; postits inline below the name (NOT absolute-positioned).

Both compositions render in the same Server Component; CSS `@media` queries hide
the wrong one at each breakpoint (Arch 1A — pure CSS, no JS hook).

### Projects hierarchy

Two-tier grid:

- **Featured** (3 cards: `featured: true` flag): 2x size, prize amount + grant
  context displayed
- **Secondary** (remaining 11): 4-col on desktop, 2-col on tablet, 1-col on
  mobile, denser padding, smaller titles

The `featured` flag drives layout. Star icon (`★`) and `+$prize` annotation are
derived consequences, not the primary signal.

### Section order on `/blog`

Sticky-note cards in a 2-col grid; tag filter row at top; "the blog (things i
wrote down)" heading at `--text-section` scale.

## Accessibility baseline

WCAG AA. The Pass 6.B bundle is non-negotiable for any new component:

1. **Touch targets** ≥ 44×44px (including padding) for every interactive element
2. **Contrast** ≥ 4.5:1 on body text against background, in both light and dark
3. **Skip-to-content** link present on every page (`<a href="#main-content"
   className="skip-link">`); `<main id="main-content">` landmark wraps page content
4. **Meaningful alt text** on identity-carrying images (hero polaroid:
   `"Parichay's avatar — a red tabby cat wearing DJ headphones"`)
5. **`prefers-reduced-motion`** honored via the global rule in `global.css` —
   never override locally
6. **Semantic headings** — section titles are `<h2>`, never `<div>` with `font-size`
7. **Focus management** — open modals and drawers use `focus-trap-react` with
   `returnFocusOnDeactivate` enabled; `<div id="app-root">` gets `aria-hidden`
   while a dismissible overlay is open

## Server vs client components

Default to server. Mark `'use client'` only for the leaf that needs state or
handlers. The full table is in the plan file under "CQ 2A — Server vs client
component table".

## What we don't do (anti-patterns)

If you find yourself reaching for any of these, stop. Each is on the AI-slop
blacklist:

- Purple/violet gradient backgrounds
- 3-column feature grid with icons-in-colored-circles
- Centered everything
- Uniform large border-radius on every element
- Decorative blobs, floating circles, wavy SVG dividers
- Emoji as design elements
- Colored left-border on cards (`border-left: 3px solid <accent>`)
- Generic hero copy ("Welcome to...", "Unlock the power of...")
- Default font stacks (system-ui, -apple-system as the primary face)

The wobble filter and sticky-note metaphor exist precisely because the page would
otherwise look like every other AI-generated personal site. Don't lose that.

## When to revisit this document

- New section types added (e.g. `/dj` page from `TODOS.md` ships)
- New components extracted to `components/Common/`
- Token system grows (e.g. new color ramp)
- Accessibility violations found in production

When you revise: update the affected section, bump the date below, link the
related plan/PR.

---

Last revised: 2026-05-24 (initial extraction from `/plan-eng-review` T1)
