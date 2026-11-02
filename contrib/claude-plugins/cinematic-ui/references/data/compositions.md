# Layout Composition Library — 80 Section Patterns

Specific visual composition patterns derived from film, photography, and design theory. Each includes exact CSS implementation and a cinematic reference.

**Usage:** Apply to `<section>` elements. Combine with color grades and font moods for a complete cinematic design system. Each pattern assumes a section wrapper with `max-width` and `padding` already set.

---

## Symmetrical (1-8)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 1 | Center-weighted monument | Single content block centered, wide margins breathing on both sides | `display: grid; grid-template-columns: 1fr minmax(auto, 680px) 1fr; > * { grid-column: 2; }` | Hero statements, manifestos | 2001: A Space Odyssey monolith — single object commands the frame |
| 2 | Bilateral mirror | Two equal columns mirroring each other in content structure | `display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;` | Comparisons, before/after, versus | The Shining twins — perfect bilateral symmetry creates unease |
| 3 | Centered stack | Vertically stacked elements, all centered on the same axis | `display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2rem; max-width: 720px; margin: 0 auto;` | Testimonials, features list, pricing header | Wes Anderson frontal compositions — everything on the center axis |
| 4 | Radial burst | Central element with items radiating outward in a circular pattern | `display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 1.5rem; > :nth-child(1) { grid-area: 2/2; } > :nth-child(2) { grid-area: 1/2; } > :nth-child(3) { grid-area: 2/3; } > :nth-child(4) { grid-area: 3/2; } > :nth-child(5) { grid-area: 2/1; }` | Feature highlights around a logo, team around a mission | Kubrick overhead shots — radial symmetry from above |
| 5 | Triptych | Three equal panels side by side like an altarpiece | `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;` | Photo galleries, service tiers, triple testimonial | The Good, the Bad and the Ugly three-way standoff |
| 6 | Pyramid hierarchy | Wide base row, medium middle row, single top element | `display: grid; gap: 2rem; > :nth-child(1) { text-align: center; } > :nth-child(2) { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; } > :nth-child(3) { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }` | Organizational hierarchy, feature tiers | Metropolis city stratification — society in vertical layers |
| 7 | Cross axis | Horizontal and vertical content crossing at center point | `display: grid; grid-template: "a b c" auto "d e f" auto "g h i" auto / 1fr auto 1fr; > .center { grid-area: e; } > .top { grid-area: b; } > .right { grid-area: f; } > .bottom { grid-area: h; } > .left { grid-area: d; }` | Dashboard widgets, navigation hub | Rear Window grid of apartment windows |
| 8 | Floating center card | Card element floating in center of a full-bleed background image | `display: grid; place-items: center; min-height: 80vh; background: url() center/cover; > .card { max-width: 560px; padding: 3rem; backdrop-filter: blur(20px); background: rgba(255,255,255,0.1); border-radius: 1rem; }` | Login, signup, single CTA | Lost in Translation — solitary figure against vast backdrop |

## Asymmetrical (9-20)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 9 | Rule of thirds — content left | Content occupies left 2/3, breathing space or image on right 1/3 | `display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: center;` | Hero with side image, about section | Every Kubrick wide shot — subject placed on the left third line |
| 10 | Rule of thirds — content right | Breathing space or image left 1/3, content occupies right 2/3 | `display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: center;` | Features with illustration, narrative sections | In the Mood for Love — characters framed right through doorways |
| 11 | Golden ratio split | Content split at approximately 61.8% / 38.2% | `display: grid; grid-template-columns: 1.618fr 1fr; gap: 3rem; align-items: start;` | Blog with sidebar, product with specs | Vermeer paintings — figures positioned on the golden spiral |
| 12 | Golden ratio reverse | 38.2% narrow column / 61.8% wide column | `display: grid; grid-template-columns: 1fr 1.618fr; gap: 3rem; align-items: start;` | Navigation sidebar + main content, table of contents + article | Barry Lyndon candlelit interiors — tight foreground, open background |
| 13 | Dynamic diagonal — top-left to bottom-right | Content flows diagonally using staggered grid positioning | `display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; > :nth-child(1) { grid-column: 1/7; } > :nth-child(2) { grid-column: 4/10; margin-top: 2rem; } > :nth-child(3) { grid-column: 7/13; margin-top: 4rem; }` | Timeline, progressive disclosure, step flows | Hitchcock diagonal compositions — creating directional tension |
| 14 | Dynamic diagonal — bottom-left to top-right | Content ascends diagonally from bottom-left to top-right | `display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; > :nth-child(1) { grid-column: 1/7; margin-top: 4rem; } > :nth-child(2) { grid-column: 4/10; margin-top: 2rem; } > :nth-child(3) { grid-column: 7/13; }` | Growth narratives, upward momentum sections | Rocky staircase run — ascending diagonal energy |
| 15 | Weighted left anchor | Heavy visual element anchored left, lighter text content right | `display: grid; grid-template-columns: 55% 1fr; gap: 2rem; > :first-child { aspect-ratio: 4/3; } > :last-child { padding: 2rem 0; }` | Product showcase, portfolio piece detail | There Will Be Blood — Daniel plainview dominates left frame |
| 16 | Weighted right anchor | Lighter intro text left, heavy visual anchored right | `display: grid; grid-template-columns: 1fr 55%; gap: 2rem; > :last-child { aspect-ratio: 4/3; } > :first-child { padding: 2rem 0; }` | Case study intro, feature deep-dive | No Country for Old Men — threat emerging from frame right |
| 17 | L-shape composition | Full-width element on top, content indented below-right creating an L | `display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: auto auto; gap: 2rem; > :first-child { grid-column: 1/-1; } > :nth-child(2) { grid-column: 2; }` | Article with full-width hero then indented body | Blade Runner 2049 — landscape establishing shot then intimate detail |
| 18 | T-shape composition | Full-width header, then centered narrow column below | `display: grid; grid-template-columns: 1fr minmax(auto, 640px) 1fr; > :first-child { grid-column: 1/-1; margin-bottom: 3rem; } > :nth-child(n+2) { grid-column: 2; }` | Blog post, article layout, documentation | Citizen Kane deep focus — wide shot narrowing to subject |
| 19 | Fibonacci spiral flow | Content blocks sized according to Fibonacci sequence, spiraling inward | `display: grid; grid-template-columns: 8fr 5fr; grid-template-rows: 5fr 3fr; gap: 1rem; > :nth-child(1) { grid-row: 1/3; } > :nth-child(2) { } > :nth-child(3) { }` | Portfolio, image gallery, project showcase | Tarkovsky compositions — organic spiraling eye movement |
| 20 | Power diagonal | Content aligned to the diagonal from top-left to bottom-right with CSS clip-path | `display: grid; grid-template-columns: 1fr 1fr; > :first-child { clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%); } > :last-child { clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%); margin-left: -15%; }` | Split hero, dramatic reveals | The Dark Knight — Batman/Joker split poster |

## Full-Bleed (21-26)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 21 | Edge-to-edge immersion | Content spans full viewport width with no padding | `width: 100vw; margin-left: calc(-50vw + 50%); padding: 0; overflow: hidden;` | Full-width images, video sections, maps | Lawrence of Arabia desert panorama — nothing but horizon |
| 22 | Full-bleed with inset text | Full-width background with a centered text column floating over it | `width: 100vw; margin-left: calc(-50vw + 50%); display: grid; grid-template-columns: 1fr min(65ch, 90%) 1fr; > * { grid-column: 2; } background: url() center/cover; padding: 6rem 0;` | Quote sections, call to action over imagery | Terrence Malick nature shots with voiceover |
| 23 | Viewport fill | Section fills entire viewport height and width | `width: 100vw; height: 100vh; margin-left: calc(-50vw + 50%); display: grid; place-items: center; overflow: hidden;` | Landing hero, splash screen, full-screen statement | Gravity opening shot — filling the entire visual field |
| 24 | Horizontal overflow reveal | Content wider than viewport with horizontal scroll hint | `width: 100vw; margin-left: calc(-50vw + 50%); overflow-x: auto; scroll-snap-type: x mandatory; display: flex; gap: 1rem; padding: 2rem; > * { scroll-snap-align: start; flex: 0 0 85vw; }` | Image carousel, portfolio pieces, testimonial slider | Oldboy hallway fight — the camera keeps tracking sideways |
| 25 | Parallax layer stack | Full-bleed background with foreground content creating depth | `width: 100vw; margin-left: calc(-50vw + 50%); min-height: 100vh; background-attachment: fixed; background-size: cover; display: grid; place-items: center; > .content { position: relative; z-index: 1; }` | Storytelling sections, narrative scrolling | Inception dream layers — each layer has different physics |
| 26 | Bleed with guttered columns | Full-width background but content inside is columned with gutters | `width: 100vw; margin-left: calc(-50vw + 50%); padding: 4rem max(2rem, calc((100vw - 1200px) / 2)); display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;` | Feature grids, service blocks over background | Grand Budapest Hotel — ornate content within a wider frame |

## Constrained (27-32)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 27 | Narrow column — reading width | Single column at optimal reading width (55-75 characters) | `max-width: 65ch; margin: 0 auto; padding: 0 1.5rem;` | Long-form articles, documentation, blog posts | My Dinner with Andre — intimate frame, nothing else needed |
| 28 | Card within card | Outer container with padded inner card creating layered depth | `padding: 3rem; background: var(--surface-1); border-radius: 1.5rem; > .inner { padding: 2rem; background: var(--surface-2); border-radius: 1rem; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }` | Pricing cards, feature highlights, testimonials | The Grand Budapest Hotel nested storytelling frames |
| 29 | Sidebar + main constrained | Fixed narrow sidebar with constrained main content area | `display: grid; grid-template-columns: 240px minmax(0, 65ch); gap: 3rem; margin: 0 auto; max-width: 1000px;` | Documentation, settings page, dashboard with nav | The Shawshank Redemption — confined space, world within |
| 30 | Boxed island | Small floating content box centered in vast empty space | `min-height: 60vh; display: grid; place-items: center; > .island { max-width: 400px; padding: 2.5rem; text-align: center; }` | 404 pages, confirmation screens, minimal CTAs | Lost in Translation hotel room — small figure, big space |
| 31 | Inset margin columns | Content with extra-wide margins creating a framed feel | `display: grid; grid-template-columns: 2fr 5fr 2fr; gap: 2rem; > :only-child { grid-column: 2; }` | Quotes, highlighted paragraphs, aside content | A Single Man — Tom Ford's meticulously framed compositions |
| 32 | Progressive narrowing | Each row narrower than the previous, funneling attention | `display: flex; flex-direction: column; align-items: center; gap: 2rem; > :nth-child(1) { width: 100%; } > :nth-child(2) { width: 85%; } > :nth-child(3) { width: 70%; } > :nth-child(4) { width: 55%; }` | Funnels, step processes, converging narratives | Vertigo spiral — visual narrowing toward the center |

## Split (33-40)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 33 | Clean 50/50 | Two equal halves, one image, one text | `display: grid; grid-template-columns: 1fr 1fr; min-height: 80vh; > * { display: grid; place-items: center; padding: 3rem; }` | Hero splits, product + description, feature sections | Fight Club duality — two halves of the same whole |
| 34 | 60/40 editorial | Wider content column with supporting sidebar | `display: grid; grid-template-columns: 3fr 2fr; gap: 3rem; align-items: start;` | Blog with sidebar, news with related, product with specs | All the President's Men — newsroom desk layouts |
| 35 | 70/30 dominant | Dominant content with narrow accent column | `display: grid; grid-template-columns: 7fr 3fr; gap: 2rem; align-items: center;` | Portfolio item, case study with metadata | Zodiac — Jake Gyllenhaal dominates frame, evidence board narrow right |
| 36 | Diagonal split | Two sections divided by an angled line | `display: grid; grid-template-columns: 1fr 1fr; > :first-child { clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); } > :last-child { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); margin-left: -8%; }` | Contrasts, dual offerings, light/dark themes | Kill Bill split screen — Bride vs adversary |
| 37 | Vertical split | Top and bottom halves of the viewport | `display: grid; grid-template-rows: 1fr 1fr; min-height: 100vh; > * { display: grid; place-items: center; padding: 2rem; }` | Impact statements, dramatic contrast, scroll-into reveals | Dunkirk land/sea/air — stacked horizontal narratives |
| 38 | Uneven triple split | Three columns at 25% / 50% / 25% | `display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1.5rem; align-items: start;` | Article with dual sidebars, featured with flanking content | The Grand Budapest Hotel concierge desk — center stage flanked |
| 39 | Z-split alternating | Rows alternate which side has image vs text (zigzag) | `display: grid; gap: 4rem; > .row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; } > .row:nth-child(even) > :first-child { order: 2; }` | Feature lists, process steps, timeline events | Any Wes Anderson tracking shot — subjects alternate sides |
| 40 | Corner split | Four quadrants with different content in each corner | `display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; min-height: 100vh; > * { display: grid; place-items: center; padding: 2rem; }` | Dashboard overview, four-value proposition, team quadrants | Timecode (2000) — four simultaneous frames |

## Layered (41-48)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 41 | Overlapping cards cascade | Cards overlapping each other in a cascading stack | `display: grid; grid-template-columns: repeat(3, 1fr); > * { box-shadow: -4px 4px 20px rgba(0,0,0,0.1); border-radius: 1rem; padding: 2rem; } > :nth-child(2) { margin-top: 2rem; margin-left: -1rem; position: relative; z-index: 1; } > :nth-child(3) { margin-top: 4rem; margin-left: -2rem; position: relative; z-index: 2; }` | Feature tiers, timeline, layered information | Inception — each dream layer stacks on the previous |
| 42 | Background text with foreground content | Large decorative text behind, normal-sized content in front | `position: relative; > .bg-text { font-size: clamp(6rem, 15vw, 20rem); opacity: 0.05; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; } > .content { position: relative; z-index: 1; }` | Section headers, brand statement, emphasis | Se7en title sequence — text as texture and meaning |
| 43 | Sticky image with scrolling text | Image stays fixed while text paragraphs scroll past | `display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; > .media { position: sticky; top: 2rem; height: fit-content; } > .text-scroll { display: flex; flex-direction: column; gap: 4rem; }` | Product tours, storytelling, feature deep-dives | Any documentary — talking head stays while B-roll changes |
| 44 | Floating elements on gradient | Multiple elements positioned absolutely over a gradient background | `position: relative; min-height: 80vh; background: linear-gradient(135deg, var(--c1), var(--c2)); > * { position: absolute; } > :nth-child(1) { top: 10%; left: 15%; } > :nth-child(2) { top: 30%; right: 10%; } > :nth-child(3) { bottom: 15%; left: 25%; }` | Creative portfolios, agency landing, art direction | Fantasia — elements dancing freely in abstract space |
| 45 | Depth stack with parallax offsets | Three layers at different z-depths creating parallax on scroll | `position: relative; perspective: 1000px; min-height: 100vh; > .layer-back { transform: translateZ(-200px) scale(1.2); } > .layer-mid { transform: translateZ(-100px) scale(1.1); } > .layer-front { transform: translateZ(0); } > * { position: absolute; inset: 0; display: grid; place-items: center; }` | Immersive hero, storytelling, brand experience | Citizen Kane deep focus — multiple planes of action simultaneously |
| 46 | Ghost card peek | Card partially hidden behind the section edge, suggesting more content | `overflow: hidden; display: flex; gap: 2rem; padding: 3rem; > :last-child { flex: 0 0 200px; opacity: 0.5; transform: translateX(40%); }` | Carousel hint, content preview, scroll invitation | The Conversation — only seeing part of the truth |
| 47 | Offset grid overlap | Grid items intentionally overlap their neighbors using negative margins | `display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; > * { padding: 2rem; } > :nth-child(2) { margin: 1rem -1rem; position: relative; z-index: 1; background: var(--surface); box-shadow: 0 8px 32px rgba(0,0,0,0.12); border-radius: 1rem; }` | Highlighted center feature, pricing emphasis | The Godfather — Don Corleone centered, others overlapping into frame |
| 48 | Paper stack | Cards stacked slightly offset like shuffled papers | `position: relative; max-width: 600px; margin: 0 auto; > * { position: relative; background: var(--surface); padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); } > :nth-child(1) { transform: rotate(-2deg); } > :nth-child(2) { transform: rotate(1deg); margin-top: -3rem; z-index: 1; } > :nth-child(3) { transform: rotate(-0.5deg); margin-top: -3rem; z-index: 2; }` | Testimonials, notes, casual collection | Memento — scattered Polaroids building a narrative |

## Scattered / Broken Grid (49-54)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 49 | Intentional chaos | Items placed at seemingly random positions within a grid | `display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(6, 80px); > :nth-child(1) { grid-area: 1/1/3/5; } > :nth-child(2) { grid-area: 2/6/4/10; } > :nth-child(3) { grid-area: 4/3/6/8; } > :nth-child(4) { grid-area: 1/9/3/13; } > :nth-child(5) { grid-area: 5/8/7/12; }` | Creative portfolio, art gallery, experimental layouts | Jean-Luc Godard jump cuts — intentional discontinuity |
| 50 | Broken grid with overlap | Grid items break out of their cells and overlap neighbors | `display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; > :nth-child(1) { grid-column: 1/4; grid-row: 1/3; } > :nth-child(2) { grid-column: 3/7; grid-row: 2/4; position: relative; z-index: 1; }` | Magazine layouts, editorial design, lookbooks | Pulp Fiction non-linear timeline — things overlap out of order |
| 51 | Mosaic irregular | Different-sized tiles filling space with no consistent rhythm | `display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 1rem; > :nth-child(1) { grid-column: span 2; grid-row: span 2; } > :nth-child(4) { grid-column: span 2; }` | Image galleries, portfolio, mood boards | Wong Kar-wai — fragmented glimpses of the same moment |
| 52 | Organic scatter with rotation | Items scattered and slightly rotated as if dropped on a table | `position: relative; min-height: 500px; > * { position: absolute; width: fit-content; } > :nth-child(1) { top: 5%; left: 10%; transform: rotate(-3deg); } > :nth-child(2) { top: 25%; right: 15%; transform: rotate(2deg); } > :nth-child(3) { bottom: 20%; left: 30%; transform: rotate(-1deg); } > :nth-child(4) { top: 40%; left: 55%; transform: rotate(4deg); }` | Craft brands, creative agencies, personal blogs | Wes Anderson overhead desk shot — objects artfully arranged |
| 53 | Staggered masonry | Two columns with items at different heights creating visual rhythm | `columns: 2; gap: 1.5rem; > * { break-inside: avoid; margin-bottom: 1.5rem; }` | Blog feed, image gallery, resource library | Pinterest-style waterfall — varied content heights |
| 54 | Exploded grid | Grid items pushed outward from center with gaps between clusters | `display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; padding: 2rem; > :nth-child(1) { transform: translate(-10%, -10%); } > :nth-child(2) { transform: translateY(-5%); } > :nth-child(3) { transform: translate(10%, -10%); } > :nth-child(4) { transform: translate(-10%, 10%); } > :nth-child(5) { transform: translateY(5%); } > :nth-child(6) { transform: translate(10%, 10%); }` | Feature explainer, product ecosystem, mind map | Memento evidence board — fragments spread across the wall |

## Horizontal Flow (55-60)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 55 | Filmstrip scroll | Horizontal series of equal-width panels like a film strip | `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 0; > * { flex: 0 0 100vw; scroll-snap-align: start; min-height: 80vh; display: grid; place-items: center; padding: 3rem; }` | Full-page storytelling, portfolio showcase | Actual cinema — one frame after another |
| 56 | Card carousel with peek | Horizontally scrolling cards that peek at next/previous | `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1.5rem; padding: 2rem calc(50vw - 180px); > * { flex: 0 0 340px; scroll-snap-align: center; border-radius: 1rem; padding: 2rem; }` | Testimonials, team members, product cards | Annie Hall — characters sliding in and out of frame |
| 57 | Horizontal scroll with sticky header | Horizontal scroll sections under a sticky descriptive header | `> .header { position: sticky; top: 0; z-index: 10; padding: 1rem; } > .track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 2rem; padding: 2rem; > * { flex: 0 0 300px; scroll-snap-align: start; } }` | Category browsing, timeline, portfolio sections | Oldboy corridor fight — continuous horizontal tracking |
| 58 | Infinite marquee | Continuously scrolling content band (CSS animation, no JS) | `overflow: hidden; > .track { display: flex; gap: 2rem; animation: marquee 20s linear infinite; width: max-content; } @keyframes marquee { to { transform: translateX(-50%); } }` | Logo walls, client lists, ticker announcements | Stock exchange tickers in Wall Street |
| 59 | Horizontal timeline | Connected points on a horizontal line with content above/below alternating | `display: flex; align-items: center; gap: 0; overflow-x: auto; padding: 4rem 2rem; > * { flex: 0 0 250px; text-align: center; position: relative; padding: 2rem 1rem; } > *::after { content: ''; position: absolute; top: 50%; left: 100%; width: 100%; height: 2px; background: var(--border); }` | Company history, project timeline, process flow | Boyhood — progression through time |
| 60 | Side-scroll gallery with caption | Images scroll horizontally with captions anchored below | `> .gallery { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1rem; > figure { flex: 0 0 80vw; scroll-snap-align: center; > img { width: 100%; aspect-ratio: 16/9; object-fit: cover; } > figcaption { padding: 1rem 0; } } }` | Photography portfolio, project case studies | National Geographic documentary — image after image with narration |

## Sticky Compositions (61-66)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 61 | Sticky sidebar scroll | Left sidebar sticks while right content scrolls | `display: grid; grid-template-columns: 300px 1fr; gap: 3rem; > .sidebar { position: sticky; top: 2rem; height: fit-content; } > .main { min-height: 200vh; }` | Documentation, long-form with navigation, settings | Control room scenes — fixed monitors, changing data |
| 62 | Sticky hero dissolve | Hero section sticks and fades as content scrolls over it | `> .hero { position: sticky; top: 0; height: 100vh; z-index: -1; display: grid; place-items: center; } > .content { position: relative; background: var(--surface); border-radius: 2rem 2rem 0 0; margin-top: 100vh; padding: 4rem; z-index: 1; }` | Landing pages, product launches, portfolios | Any film opening — establishing shot dissolves to scene |
| 63 | Progressive sticky stack | Multiple sections stick on top of each other as user scrolls | `> section { position: sticky; top: 0; min-height: 100vh; display: grid; place-items: center; } > section:nth-child(1) { z-index: 1; } > section:nth-child(2) { z-index: 2; } > section:nth-child(3) { z-index: 3; }` | Multi-step narratives, feature reveals, presentations | Vertigo spiral staircase — each floor reveals the next |
| 64 | Sticky media swap | Media column sticks, swaps image on scroll position | `display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; > .media { position: sticky; top: 2rem; height: fit-content; } > .steps { display: flex; flex-direction: column; gap: 100vh; }` | Product feature walkthroughs, app screenshots, tutorials | Rear Window — fixed view, changing scenes |
| 65 | Sticky progress reveal | Background element sticks and reveals (via clip-path or opacity) as scrolling continues | `position: relative; > .bg { position: sticky; top: 0; height: 100vh; clip-path: inset(0 100% 0 0); transition: clip-path 0.3s; } > .bg.revealed { clip-path: inset(0); }` | Before/after reveals, transformation showcases | Wizard of Oz — Kansas to color Oz reveal |
| 66 | Sticky table of contents | Content scrolls, TOC sidebar highlights current section | `display: grid; grid-template-columns: 200px 1fr; gap: 3rem; > nav { position: sticky; top: 2rem; height: fit-content; } > nav a.active { font-weight: 700; color: var(--accent); }` | Long documentation, legal pages, research papers | Zodiac evidence timeline — tracking the current position |

## Typographic (67-72)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 67 | Giant letter background | Single oversized letter as structural background element | `position: relative; min-height: 60vh; display: grid; place-items: center; > .letter { font-size: clamp(20rem, 40vw, 50rem); position: absolute; opacity: 0.04; font-weight: 900; line-height: 1; pointer-events: none; } > .content { position: relative; z-index: 1; max-width: 600px; }` | Chapter openings, category headers, brand sections | Citizen Kane opening K — the letter defines the space |
| 68 | Text as horizontal divider | Oversized text spans full width as a section break | `overflow: hidden; padding: 1rem 0; > .divider-text { font-size: clamp(4rem, 10vw, 12rem); white-space: nowrap; font-weight: 900; opacity: 0.1; text-transform: uppercase; letter-spacing: 0.2em; }` | Section transitions, chapter breaks, topic changes | Star Wars crawl — text IS the transition |
| 69 | Stacked oversized heading | Words of a heading stacked vertically, each on its own line at large size | `> h1 { font-size: clamp(3rem, 8vw, 8rem); line-height: 0.9; font-weight: 900; } > h1 span { display: block; }` | Hero headlines, manifesto statements, brand landing | Saul Bass title sequences — stacked bold typography |
| 70 | Mixed-weight text composition | Single sentence with dramatically different font weights creating visual hierarchy | `> p { font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; } > p strong { font-weight: 900; font-size: 1.3em; } > p em { font-weight: 200; opacity: 0.7; }` | Taglines, value propositions, brand statements | Trainspotting opening monologue — emphasis shifts meaning |
| 71 | Vertical text rail | Text running vertically along the left or right edge | `display: grid; grid-template-columns: 3rem 1fr; gap: 2rem; > .rail { writing-mode: vertical-rl; text-orientation: mixed; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.5; } > .content { padding: 2rem 0; }` | Portfolio sections, gallery labels, sidebar annotations | Japanese film posters — vertical title text alongside imagery |
| 72 | Quote-pull composition | Large pull quote dominates the center with smaller text flowing around it | `display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 2rem; > .quote { grid-column: 2; font-size: clamp(1.8rem, 3.5vw, 3rem); line-height: 1.3; font-style: italic; text-align: center; padding: 2rem 0; border-top: 2px solid; border-bottom: 2px solid; } > .before { grid-column: 1/-1; } > .after { grid-column: 1/-1; }` | Editorial features, interview highlights, testimonials | The Shawshank Redemption — Morgan Freeman's voice dominates |

## Cinematic (73-80)

| # | Name | Visual | CSS Grid/Flex | Best For | Film Reference |
|---|------|--------|--------------|----------|---------------|
| 73 | Letterbox frame | Content constrained with black bars top and bottom like widescreen cinema | `position: relative; min-height: 100vh; display: grid; place-items: center; > .content { width: 100%; padding: 2rem; } &::before, &::after { content: ''; position: fixed; left: 0; right: 0; height: 12vh; background: #000; z-index: 100; } &::before { top: 0; } &::after { bottom: 0; }` | Cinematic hero, dramatic landing, trailer-style pages | Every 2.39:1 aspect ratio film — the black bars mean cinema |
| 74 | Widescreen panorama strip | Ultra-wide content strip with extreme horizontal cropping | `width: 100vw; margin-left: calc(-50vw + 50%); height: 40vh; overflow: hidden; display: grid; place-items: center; > img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }` | Landscape photography, location establisher, brand imagery | Lawrence of Arabia desert vistas — extreme wide shots |
| 75 | Viewport-filling Ken Burns | Image fills viewport and slowly zooms (Ken Burns effect) | `width: 100vw; height: 100vh; margin-left: calc(-50vw + 50%); overflow: hidden; > img { width: 100%; height: 100%; object-fit: cover; animation: kenBurns 20s ease-in-out infinite alternate; } @keyframes kenBurns { from { transform: scale(1) translate(0, 0); } to { transform: scale(1.1) translate(-2%, -1%); } }` | Photo essays, documentary style, memorial pages | Ken Burns documentaries — the signature slow zoom on stills |
| 76 | Title card sequence | Full-screen solid color with centered text, like a film title card | `width: 100vw; height: 100vh; margin-left: calc(-50vw + 50%); display: grid; place-items: center; background: var(--bg-dark); color: var(--text-light); > .title { text-align: center; max-width: 80%; } > .title h1 { font-size: clamp(2rem, 5vw, 5rem); margin-bottom: 1rem; } > .title p { font-size: clamp(0.875rem, 1.5vw, 1.25rem); opacity: 0.6; }` | Landing hero, chapter opener, dramatic statement | Every Kubrick title card — white text on black, nothing more |
| 77 | Shot/reverse-shot | Alternating perspectives — left-facing content, then right-facing | `display: flex; flex-direction: column; gap: 0; > .shot { display: grid; grid-template-columns: 1fr 1fr; min-height: 50vh; align-items: center; } > .shot:nth-child(odd) > :first-child { order: 0; } > .shot:nth-child(even) > :first-child { order: 2; }` | Conversations, debates, feature comparisons | Any dialogue scene — camera alternates between speakers |
| 78 | Opening crawl | Text that scrolls upward in perspective like a film crawl | `perspective: 300px; overflow: hidden; height: 80vh; > .crawl { animation: crawl 60s linear forwards; transform-origin: 50% 100%; text-align: center; max-width: 600px; margin: 0 auto; } @keyframes crawl { from { transform: rotateX(20deg) translateY(100%); } to { transform: rotateX(20deg) translateY(-200%); } }` | Timelines, story intros, dramatic history sections | Star Wars opening crawl — text receding into space |
| 79 | Tracking shot scroll | Content that moves horizontally as user scrolls vertically (CSS transforms) | `height: 300vh; position: relative; > .track { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; > * { flex: 0 0 100vw; display: grid; place-items: center; } }` | Storytelling, product journey, process walkthrough | Goodfellas Copacabana tracking shot — continuous lateral movement |
| 80 | Fade to black transition | Content fades into solid black as user scrolls past | `position: relative; min-height: 100vh; display: grid; place-items: center; > .content { position: relative; z-index: 1; } &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, black 100%); pointer-events: none; }` | Section endings, dramatic conclusions, page transitions | Every film fade-to-black — the scene is over |

---

## Usage Notes

### Responsive adaptation
Most compositions collapse to single-column on mobile. Use media queries:
```css
@media (max-width: 768px) {
  .grid-composition {
    grid-template-columns: 1fr;
  }
}
```

### Combining with color grades
Apply color grades to background images within compositions:
```css
.hero-composition img {
  filter: contrast(1.35) saturate(0.45) brightness(1.08); /* Bleach Bypass */
}
```

### Combining with font moods
Pair composition energy with font mood energy. Symmetrical compositions pair with elegant/academic fonts. Scattered compositions pair with playful/handmade fonts. Cinematic compositions pair with power/dark fonts.

### Performance notes
- Sticky compositions require `overflow: visible` on all parent containers
- Parallax with `perspective` is GPU-accelerated and more performant than scroll-based parallax JS
- `scroll-snap-type` horizontal layouts should include `scroll-behavior: smooth` on the container
- `clip-path` compositions may need `will-change: clip-path` for smooth animation
- Ken Burns animation uses `transform` which is GPU-composited and won't cause layout thrashing

### Nesting compositions
Compositions can be nested. A full-bleed (#21) can contain a triptych (#5). A sticky sidebar (#61) main area can use a Z-split alternating (#39). Design at the section level and compose sections into pages.
