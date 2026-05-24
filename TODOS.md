# TODOS

Deferred work surfaced by reviews, sized by trigger condition rather than priority.

## From /plan-design-review (baymac-website-redesign, 2026-05-24)

### Dedicated `/dj` page
Mix archive, past gigs list, current setup. Revisit if DJ practice becomes more than a hobby (first paid gig, regular monthly slot, or first original mix release). Footer Mixcloud embed (Pass 3.C) covers the casual case.
- **Trigger:** first paid gig OR original mix release
- **Depends on:** decision to make DJ public-facing
- **Blocked by:** none

### Dedicated `/nomad` page
World map, past cities, recommendations per city. Append-only data structure means low staleness risk. Pull recommendations from existing posts (`why-i-left-bengaluru`, future Hanoi/Da Nang posts).
- **Trigger:** 5+ cities lived in, OR blog post tag taxonomy stabilizes
- **Depends on:** map library selection (Mapbox vs Leaflet vs SVG static), nomad recommendations content
- **Blocked by:** none

### Blog post comments (Giscus)
GitHub-issues-as-comments via Giscus. Low-overhead choice for a technical blog with GitHub-using readers. Posts on Cardano, Minswap, GSoC would benefit most from corrections.
- **Trigger:** first useful reader email/X DM that should have been a comment thread
- **Depends on:** Giscus repo + category setup
- **Blocked by:** none

### Blog search (Pagefind)
Client-side static search. Tag filter scales to ~25 posts; search becomes valuable beyond that. Pagefind index is ~75kb gzipped for ~50 posts.
- **Trigger:** post count crosses 25
- **Depends on:** none
- **Blocked by:** none

### Reading-progress bar on long posts
Scroll-driven progress indicator at top of post page, only on posts ≥ 7min. Reduces bounce on long technical reads.
- **Trigger:** next long post (≥ 10min) ships
- **Depends on:** header design stability
- **Blocked by:** none
