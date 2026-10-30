# Anti-Garbage Rules

Use this checklist before writing code or approving a storyboard.

## Reference Drift — Social Platform Trap

When the user provides a reference site or image, the most common failure mode is drifting toward **social media / community platform aesthetics** instead of the chosen film language.

Reject these outcomes even when a reference seems to invite them:

- White or near-white backgrounds with card-heavy content grids that feel like a feed
- Bold sans-serif type used for engagement rather than cinematic authority
- Section rhythm that scrolls like a story or reel rather than advancing a scene
- Image grids that feel like Instagram, Pinterest, or Behance portfolios
- Profile-photo circles, follower counts, or social proof widgets as composition anchors
- Color blocking borrowed from a brand identity rather than derived from film palette
- Micro-animations that feel like UI feedback rather than cinematic motion
- A "content-first, shell-second" layout that flattens spatial depth in favor of legibility at scale

**The fix:** If the reference is a social platform, content aggregator, or community site — extract only the structural dimensions (rhythm, density, navigation posture) and rewrite them entirely through the chosen director and film. Do not let the reference's surface aesthetic overwrite the cinematic brief.

If the reference site's aesthetic is fundamentally incompatible with the chosen film language, say so explicitly and ask the user whether to keep the director/film or pivot to a different reference approach.

## Reject These Defaults

- Generic centered hero with gradient background and no spatial idea
- Repeating `translateY + fade` on every section
- The same card hover on every grid
- A visible two-by-two or three-column card matrix that could belong to any product-marketing site
- A flat page rhythm where every section has the same height and density
- Generic section order: `Hero -> Features -> Stats -> Testimonials -> CTA`
- Too many accent colors fighting for attention
- Decorative layers that do not support the chosen film language
- An expensive-looking hero followed by ordinary template sections
- Interior pages that fall back to generic templates while only the homepage carries the cinematic concept
- A shared section shell reused so aggressively that different page roles lose their scene identity
- A new demo that reuses the previous demo's wireframe with only different colors, copy, or decorative treatment

## Require Cinematic Structure

- Give each page a clear rhythm: spectacle, information, pause, and payoff.
- Define the site-wide cinematic grammar first.
- Then define each major page role as its own scene.
- Then lock each page's irreplaceable composition.
- Only after that, derive the shared system.
- Give each section a reason to exist inside the narrative arc.
- Let the director reference influence composition, not only colors.
- Add environmental layers such as grain, fog, frames, glows, scan lines, or separators when they fit the film language.
- Make one visual idea dominate the page. Supporting sections should echo it rather than introduce unrelated ideas.
- Make each major page role behave like a new scene in the same film, with its own composition logic.
- Let grid and flex handle alignment under the surface, but do not let them become the visible main composition by default.
- When the same user has previous outputs, actively break the prior shell before building the new one.

## Visual Density Rules

- Hero: minimum 3 visual elements beyond plain text.
- Standard content section: minimum 1-2 supporting visual elements.
- Empty space is allowed only when it is a deliberate breathing beat.

## Motion Rules

- Do not repeat the same entrance on adjacent sections.
- Use simple motion only when restraint is part of the chosen director's language.
- If an interaction library entry needs JavaScript, include the JavaScript in the compiled spec.
- If a page uses a heavy interaction, standout reveal, signature composition, or hero atmosphere device, the compiled spec must cite the corresponding library source id.
- If no library source id is cited for a major visual move, treat the spec as incomplete unless it is explicitly justified as `Custom`.
- Maximum 1 heavy interaction per page.
- Maximum 2 obviously showy motion moments per page.
- If motion can be removed without loss, remove it.

## Premium Rules

- Scale should feel intentional, not merely large.
- Typography should carry authority before decoration does.
- Surfaces should feel edited and tactile, not piled up.
- Empty space should feel deliberate, not unfinished.
- Every standout visual device must justify itself against the chosen film and director.
- Every major page role must have at least one signature composition that would break if replaced by a generic default grid.
- If a section can survive unchanged as a generic card grid, it has not been directed enough yet.

## Palette Rules

- Prefer a full token set instead of one accent color pasted onto a generic UI.
- Avoid pure black and pure white unless the chosen film genuinely calls for them.
- Carry color decisions through surfaces, borders, shadows, and atmospheric layers.

## Final Review

Ask these questions:

1. If the logo were removed, would the page still feel like the chosen film or director?
2. Would two adjacent sections still feel distinct in layout and motion?
3. Does the page have at least one memorable visual idea beyond typography and spacing?
4. Does the implementation follow the compiled spec instead of drifting back to generic web patterns?
5. Does the page feel expensive because of editing and control, not because of extra decoration?
6. Is there any section that looks like a stock creative template dropped into the page?
7. Do the interior pages still express the director through structure and pacing, or only through palette and type?
8. Would this page still have a unique identity if every card border and color treatment were removed?
9. Has the shared system supported the page scenes, or flattened them?
10. If this user's last demo sat beside this one in grayscale wireframe form, would they still feel clearly different?
11. Are the major interactions, reveals, compositions, and atmosphere layers traced back to library source ids or clearly justified custom moves?
12. If the user provided a reference site, does the output still feel like the chosen film — or has it drifted toward the reference's own aesthetic (social platform, brand grid, feed layout)?
