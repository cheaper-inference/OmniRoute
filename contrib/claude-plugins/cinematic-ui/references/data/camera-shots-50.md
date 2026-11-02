# Camera Shots & Section Effects Library — 50+ Cinematic Transitions

Reference database mapping film camera techniques to CSS section entrance/transition/scroll/exit effects.

---

## Entrances — How Elements Appear

| # | Camera Technique | Film Reference | CSS Implementation | Best For |
|---|-----------------|----------------|-------------------|----------|
| 1 | Iris-in | Silent film era (Buster Keaton) | `clip-path: circle(0% at 50% 50%); transition: clip-path 1.5s ease-out; &.visible { clip-path: circle(75% at 50% 50%); }` | Opening hero sections, dramatic reveals |
| 2 | Fade from black | 2001: A Space Odyssey (Kubrick) | `opacity: 0; transition: opacity 2s ease; &.visible { opacity: 1; }` | Philosophical/slow-paced sections, chapter openings |
| 3 | Dolly-in (push forward) | Goodfellas Copacabana scene (Scorsese) | `transform: scale(0.85) translateZ(-50px); opacity: 0; transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); &.visible { transform: scale(1) translateZ(0); opacity: 1; }` | Hero sections, product reveals |
| 4 | Crane down | Touch of Evil opening (Welles) | `transform: translateY(-100vh); transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1); &.visible { transform: translateY(0); }` | Page headers, establishing shots |
| 5 | Whip pan entrance | Evil Dead (Raimi) | `transform: translateX(-120%); transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); &.visible { transform: translateX(0); }` | Action sections, call-to-action banners |
| 6 | Rack focus reveal | Citizen Kane deep focus (Welles) | `filter: blur(20px); transform: scale(1.1); transition: all 1s ease; &.visible { filter: blur(0); transform: scale(1); }` | Feature highlights, text content sections |
| 7 | Split diopter open | Blow Out (De Palma) | `.left { clip-path: inset(0 50% 0 0); } .right { clip-path: inset(0 0 0 50%); } &.visible .left, &.visible .right { clip-path: inset(0); transition: clip-path 1.2s ease; }` | Comparison sections, two-column reveals |
| 8 | Tilt up reveal | The Shining hallway (Kubrick) | `transform: perspective(800px) rotateX(5deg) translateY(60px); opacity: 0; transition: all 1.4s ease; &.visible { transform: perspective(800px) rotateX(0) translateY(0); opacity: 1; }` | Feature lists, scrolling content |
| 9 | Zoom burst | Jaws dolly zoom (Spielberg) | `transform: scale(3); opacity: 0; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); &.visible { transform: scale(1); opacity: 1; }` | Alert sections, important announcements |
| 10 | Curtain wipe | Star Wars horizontal wipe (Lucas) | `clip-path: inset(0 100% 0 0); transition: clip-path 1s ease-in-out; &.visible { clip-path: inset(0 0 0 0); }` | New chapter sections, narrative transitions |
| 11 | Venetian blind reveal | Film noir shadow (Wilder) | `background: repeating-linear-gradient(0deg, transparent 0px, transparent 4px, #000 4px, #000 40px); background-size: 100% 40px; transition: background-size 1.5s ease; &.visible { background-size: 100% 0px; }` | Noir-themed sections, dramatic reveals |
| 12 | Steadicam float-in | The Shining (Kubrick) | `transform: translateZ(-100px) translateY(30px); opacity: 0; transition: all 2s cubic-bezier(0.25, 0.1, 0.25, 1); &.visible { transform: translateZ(0) translateY(0); opacity: 1; }` | Long-form content, immersive sections |
| 13 | Bird's eye descent | Vertigo spiral (Hitchcock) | `transform: scale(0.3) rotate(180deg); opacity: 0; transition: all 1.5s cubic-bezier(0.68, -0.6, 0.32, 1.6); &.visible { transform: scale(1) rotate(0deg); opacity: 1; }` | Map/overview sections, data dashboards |
| 14 | Worm's eye rise | Citizen Kane low angle (Welles) | `transform: translateY(80px) perspective(600px) rotateX(-10deg); opacity: 0; transition: all 1.2s ease-out; &.visible { transform: translateY(0) perspective(600px) rotateX(0); opacity: 1; }` | Testimonials, authority sections |
| 15 | Dutch angle snap | Thor (Branagh) | `transform: rotate(-8deg) scale(0.9); opacity: 0; transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55); &.visible { transform: rotate(0) scale(1); opacity: 1; }` | Disruption sections, edgy content |
| 16 | Lens flare bloom | J.J. Abrams signature | `filter: brightness(3) saturate(0); transition: filter 1.5s ease; &.visible { filter: brightness(1) saturate(1); }` | Hero images, sunrise/opening sections |
| 17 | Film projector flicker | Cinema Paradiso (Tornatore) | `animation: flicker 0.1s steps(2) 5, fadein 1.5s ease forwards; @keyframes flicker { 0%,100% { opacity: 0; } 50% { opacity: 0.7; } }` | Vintage/retro sections, nostalgic content |
| 18 | Snap zoom in | Kung Fu Hustle (Stephen Chow) | `transform: scale(0.1); opacity: 0; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); &.visible { transform: scale(1); opacity: 1; }` | Comedy sections, surprise elements, pop-ups |

## Transitions — Between Sections

| # | Camera Technique | Film Reference | CSS Implementation | Best For |
|---|-----------------|----------------|-------------------|----------|
| 19 | Match cut dissolve | 2001 bone-to-satellite (Kubrick) | `.section-a { transition: opacity 0.8s, transform 0.8s; } .section-a.exiting { opacity: 0; transform: scale(0.95); } .section-b { opacity: 0; transform: scale(1.05); transition: all 0.8s 0.4s; } .section-b.entering { opacity: 1; transform: scale(1); }` | Thematic transitions between related content |
| 20 | Jump cut stagger | Breathless (Godard) | `.child { opacity: 0; transform: translateY(20px); transition: all 0.3s ease; } .child:nth-child(1) { transition-delay: 0s; } .child:nth-child(2) { transition-delay: 0.05s; } .child:nth-child(3) { transition-delay: 0.1s; } &.visible .child { opacity: 1; transform: translateY(0); }` | Card grids, list items, staggered galleries |
| 21 | Crossfade overlap | Wong Kar-wai transitions | `.outgoing { position: absolute; transition: opacity 1.5s ease; } .incoming { opacity: 0; transition: opacity 1.5s ease 0.5s; } &.active .outgoing { opacity: 0; } &.active .incoming { opacity: 1; }` | Story transitions, emotional section changes |
| 22 | Clock wipe | Old Hollywood transitions | `clip-path: polygon(50% 50%, 50% 0%, 50% 0%); transition: clip-path 1.5s ease-in-out; &.visible { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%); }` | Timeline sections, progress indicators |
| 23 | Morph cut | Fincher talking heads | `.morph-from { transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); } .morph-from.morphing { border-radius: 50%; transform: scale(0.5); } .morph-to { border-radius: 50%; transform: scale(0.5); transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s; } .morph-to.morphed { border-radius: 0; transform: scale(1); }` | Profile-to-detail transitions, card expansions |
| 24 | Smash cut | Every Edgar Wright film | `.section { transition: none; } .section.smash { animation: smashIn 0.15s steps(1) forwards; } @keyframes smashIn { 0% { opacity: 0; } 100% { opacity: 1; transform: scale(1); } }` | Comedic juxtaposition, jarring topic changes |
| 25 | L-cut / J-cut overlap | Spielberg dialogue scenes | `.bg-next { opacity: 0; position: absolute; transition: opacity 1s ease; } &.j-cut .bg-next { opacity: 0.3; } &.l-cut .content-current { opacity: 0.5; transition: opacity 0.5s; }` | Content where background changes before/after text |
| 26 | Invisible cut (Hitchcock rope) | Rope (Hitchcock) | `.panel { scroll-snap-align: start; } .seam { width: 100%; height: 10px; background: #000; margin: -5px 0; }` | Seamless section joins, continuous narratives |
| 27 | Wipe diagonal | Old Republic serials | `clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); transition: clip-path 1s ease; &.visible { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }` | Chapter transitions, adventure/action narratives |
| 28 | Texture dissolve (film grain) | Grindhouse (Rodriguez/Tarantino) | `.grain-overlay { background: url('grain.svg'); mix-blend-mode: multiply; opacity: 0; transition: opacity 0.5s; } &.dissolving .grain-overlay { opacity: 1; animation: grainShift 0.1s steps(4) infinite; }` | Retro/vintage transitions, grindhouse aesthetic |

## Scroll Behaviors — During Scroll

| # | Camera Technique | Film Reference | CSS Implementation | Best For |
|---|-----------------|----------------|-------------------|----------|
| 29 | Dolly zoom (Vertigo effect) | Vertigo (Hitchcock) / Jaws (Spielberg) | `.bg { transform: scale(calc(1 + var(--scroll) * 0.3)); } .fg { transform: scale(calc(1 - var(--scroll) * 0.15)); } /* Set --scroll via JS: 0-1 based on scroll position */` | Disorienting sections, anxiety-inducing reveals |
| 30 | Tracking shot (lateral) | Oldboy hallway fight (Park) | `.container { display: flex; overflow-x: hidden; } .content { transform: translateX(calc(var(--scroll) * -200%)); transition: transform 0.1s linear; }` | Horizontal story scrolls, timeline features |
| 31 | Tilt-shift miniature | Social Network (Fincher) | `.scene { filter: blur(calc((1 - var(--center-proximity)) * 8px)); transform: scale(calc(1 + var(--scroll) * 0.05)); }` | Overview/map sections, city views, data landscapes |
| 32 | Handheld shake | Bourne Identity (Greengrass) | `.content { animation: handheld 0.3s ease-in-out infinite; } @keyframes handheld { 0% { transform: translate(0,0) rotate(0); } 25% { transform: translate(1px,-1px) rotate(0.2deg); } 75% { transform: translate(-1px,1px) rotate(-0.2deg); } }` | Action/urgency sections, documentary feel |
| 33 | Parallax depth layers | Hero (Zhang Yimou) | `.layer-bg { transform: translateY(calc(var(--scroll) * -50px)); } .layer-mid { transform: translateY(calc(var(--scroll) * -100px)); } .layer-fg { transform: translateY(calc(var(--scroll) * -200px)); }` | Hero sections, landscape scenes, depth showcase |
| 34 | Time-lapse acceleration | Koyaanisqatsi (Reggio) | `.element { transition-duration: calc(2s - var(--scroll) * 1.8s); }` | Progress sections, city/data visualization |
| 35 | Slow motion deceleration | 300 speed ramp (Zack Snyder) | `.element { transition-duration: calc(0.2s + var(--scroll) * 2s); }` | Feature highlights, product detail sections |
| 36 | Crab shot (lateral track) | Grand Budapest Hotel (Anderson) | `.scene { transform: translateX(calc(var(--scroll) * -100vw)); } .bg { transform: translateX(calc(var(--scroll) * -50vw)); }` | Horizontal storytelling, dollhouse reveals |
| 37 | Zoom pull-out reveal | The Shining maze overhead (Kubrick) | `.container { transform: scale(calc(3 - var(--scroll) * 2)); transform-origin: 50% 50%; }` | Map reveals, context-building sections |
| 38 | Hitchcock zoom (subject stays, bg moves) | Vertigo (Hitchcock) | `.subject { position: sticky; top: 50%; z-index: 2; } .background { transform: scale(calc(1 + var(--scroll) * 0.5)); filter: blur(calc(var(--scroll) * 3px)); }` | Product showcases against changing backgrounds |
| 39 | 360 orbit | The Matrix bullet time (Wachowskis) | `.object { transform: perspective(800px) rotateY(calc(var(--scroll) * 360deg)); transition: transform 0.1s linear; }` | Product rotations, 3D object showcase |
| 40 | Crane ascending reveal | Gone with the Wind pullback (Fleming) | `.scene { transform-origin: bottom center; transform: scale(calc(1 + var(--scroll) * 2)) translateY(calc(var(--scroll) * -30%)); }` | Scale reveals, battlefield/landscape overviews |
| 41 | Speed ramp (fast-slow-fast) | 300 (Zack Snyder) | `/* JS: adjust scroll speed */ .section { scroll-behavior: smooth; } .highlight { scroll-snap-align: center; scroll-margin: 20vh; }` | Key moments within scrolling content |
| 42 | Film strip advance | Cinema Paradiso (Tornatore) | `.frame { scroll-snap-align: start; height: 100vh; border: 8px solid #000; border-radius: 12px; position: relative; } .frame::before { content: ''; position: absolute; left: -20px; top: 0; width: 15px; height: 100%; background: repeating-linear-gradient(transparent 0, transparent 10px, #000 10px, #000 15px); }` | Gallery sections, portfolio showcases |
| 43 | Freeze frame hold | Truffaut's The 400 Blows ending | `.element { position: sticky; top: 0; height: 100vh; } .spacer { height: 200vh; }` | Key statement sections, hero quotes, portraits |
| 44 | Depth of field shift on scroll | Terrence Malick nature shots | `.bg { filter: blur(calc(var(--scroll) * 10px)); } .mid { filter: blur(calc(abs(0.5 - var(--scroll)) * 6px)); } .fg { filter: blur(calc((1 - var(--scroll)) * 10px)); }` | Layered content, foreground/background storytelling |

## Exit Animations — How Elements Leave

| # | Camera Technique | Film Reference | CSS Implementation | Best For |
|---|-----------------|----------------|-------------------|----------|
| 45 | Iris-out | Looney Tunes / silent film | `&.exiting { clip-path: circle(0% at 50% 50%); transition: clip-path 1s ease-in; }` | Section closings, comedic endings |
| 46 | Fade to black | Every dramatic film ending | `&.exiting { opacity: 0; transition: opacity 1.5s ease-in; background: #000; }` | Chapter endings, dramatic closes |
| 47 | Whip pan exit | Evil Dead (Raimi) | `&.exiting { transform: translateX(120vw); transition: transform 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19); }` | Fast-paced exits, action sequences |
| 48 | Defocus exit | Wong Kar-wai memory fade | `&.exiting { filter: blur(20px); opacity: 0; transform: scale(1.05); transition: all 1.5s ease; }` | Dreamy/memory section closes, emotional fades |
| 49 | Collapse inward | Inception folding city (Nolan) | `&.exiting { transform: perspective(600px) rotateX(90deg); transform-origin: top center; opacity: 0; transition: all 0.8s cubic-bezier(0.6, 0, 0.7, 0.2); }` | 3D sections, reality-bending transitions |
| 50 | Shatter/disintegrate | Thanos snap (Avengers) | `&.exiting .fragment { animation: shatter 1s ease forwards; } @keyframes shatter { to { transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(0); opacity: 0; } } /* JS: split element into fragments with random --tx, --ty, --tr values */` | Dramatic removals, destruction themes |
| 51 | Vertical drop exit | Hitchcock falling motif | `&.exiting { transform: translateY(100vh) rotate(5deg); transition: transform 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19); }` | Gravity-themed exits, falling sequences |
| 52 | Flicker out | Projector dying (Cinema Paradiso) | `&.exiting { animation: flickerOut 0.8s steps(4) forwards; } @keyframes flickerOut { 0% { opacity: 1; } 20% { opacity: 0; } 30% { opacity: 0.6; } 50% { opacity: 0; } 60% { opacity: 0.3; } 80% { opacity: 0; } 100% { opacity: 0; } }` | Vintage sections, power-down effects |
| 53 | Pull-back to nothing | The Truman Show dome reveal (Weir) | `&.exiting { transform: scale(0.01); opacity: 0; transition: all 2s cubic-bezier(0.4, 0, 0.2, 1); }` | Revelation moments, zooming out to bigger picture |
| 54 | Curtain close | Theater curtain call | `&.exiting::before, &.exiting::after { content: ''; position: absolute; top: 0; width: 50%; height: 100%; background: #1a0000; transition: transform 1s ease; } &.exiting::before { left: 0; transform: translateX(-100%); } &.exiting::after { right: 0; transform: translateX(100%); } &.exiting.closing::before { transform: translateX(0); } &.exiting.closing::after { transform: translateX(0); }` | Theater-themed sections, act endings |
| 55 | Glitch exit | Spider-Verse dimension break | `&.exiting { animation: glitchExit 0.5s steps(1) forwards; } @keyframes glitchExit { 0% { transform: translate(0); filter: none; } 20% { transform: translate(-5px, 3px); filter: hue-rotate(90deg); } 40% { transform: translate(5px, -3px); filter: hue-rotate(180deg); } 60% { transform: translate(-3px, -5px); filter: hue-rotate(270deg); clip-path: inset(20% 0 30% 0); } 80% { clip-path: inset(50% 0 40% 0); } 100% { opacity: 0; transform: scale(0.8); } }` | Glitch aesthetics, sci-fi/digital exits |

---

**Total: 55 unique camera-to-CSS techniques across 4 categories**

Categories index: Entrances (1-18), Transitions (19-28), Scroll Behaviors (29-44), Exit Animations (45-55)
