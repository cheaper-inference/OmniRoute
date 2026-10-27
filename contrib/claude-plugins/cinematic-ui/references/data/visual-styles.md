# Visual Style Library — 60 Film & Design Aesthetics

Not "what genre" but "what visual language." Two thrillers can look completely different: one German Expressionist, one French New Wave.

---

## Classic Film Movements

| # | Style | Era | Visual Signature | Color | Typography | CSS Translation |
|---|-------|-----|-----------------|-------|------------|-----------------|
| 1 | German Expressionism | 1920s | Diagonal shadows, distorted angles, painted sets | High contrast B&W, no midtones | Gothic/Blackletter, angular | `transform: skewX(-3deg)`, extreme `box-shadow`, sharp angles |
| 2 | Soviet Montage | 1920s | Rapid juxtaposition, propaganda bold, geometric | Red + Black + White only | Constructivist sans-serif, all-caps | Fast transitions, jarring color cuts, bold typography |
| 3 | Film Noir | 1940s | Venetian blind shadows, femme fatale silhouettes | B&W + single color accent | Serif headline + mono body | Diagonal light stripes, high contrast, 0px radius |
| 4 | Italian Neorealism | 1945-55 | Documentary rawness, street locations, available light | Desaturated, grainy, warm grey | Simple serif, modest sizes | Grain overlay heavy, natural spacing, no decorations |
| 5 | French New Wave | 1960s | Jump cuts, handheld energy, breaking 4th wall | High contrast, vivid primaries | Avant-garde display, mixed sizes | Intentionally broken grid, overlapping elements, playful |
| 6 | Psychedelic | 1960s-70s | Melting forms, vibrant swirls, op-art patterns | Neon rainbow, clashing | Bubble letters, Art Nouveau curves | `conic-gradient`, `hue-rotate` animation, wavy borders |
| 7 | Blaxploitation | 1970s | Bold funk aesthetic, street grit, larger-than-life | Warm browns + hot orange + gold | Funky display fonts, huge sizes | Warm gradient bg, retro rounded corners, textured |
| 8 | Giallo | 1970s | Stylized violence, opera lighting, colored gels | Deep red + blue-green + gold | Italic serif, dramatic | Colored light overlays, dramatic shadows from colored sources |
| 9 | VHS / Analog Horror | 1980s | Tracking lines, CRT glow, scan artifacts | Warm oversaturated, bleeding edges | Courier/mono, VCR display | Scan lines, chromatic aberration, `steps()` animation |
| 10 | Cyberpunk | 1980s+ | Neon in rain, megacity, tech-organic fusion | Dark blue/purple + neon pink/cyan | Mono + Japanese katakana | Neon `text-shadow`, rain particles, glass reflection |
| 11 | Dogme 95 | 1995 | Handheld DV, no artificial light, raw emotion | Natural, often ugly, no grading | System fonts, no styling | Zero decoration, system fonts, raw HTML aesthetic |
| 12 | Mumblecore | 2000s | Ultra low-budget, improvised, intimate | Flat natural, no post-processing | Simple sans, small | Minimal CSS, plain layout, authenticity over polish |

## Modern Cinematic Styles

| # | Style | Visual Signature | Color | CSS Translation |
|---|-------|-----------------|-------|-----------------|
| 13 | Neon Noir | Wet streets + neon reflections, modern noir | Dark + saturated neon | `box-shadow: 0 0 30px` neon colors, dark bg, reflective surfaces |
| 14 | Pastel Surrealism | Candy colors + unsettling content | Soft pastels (pink/mint/lavender) | Pastel palette, rounded shapes, but uncanny valley content |
| 15 | Maximalist Baroque | Overwhelming detail, gold everything, ornate | Gold + deep red + marble white | Ornamental borders, complex `background-image` patterns, serif |
| 16 | Brutalist | Raw concrete, exposed structure, anti-beauty | Grey + raw material colors | System fonts, visible borders, no border-radius, raw |
| 17 | Vaporwave | 80s nostalgia + internet culture, Roman busts | Pink/purple gradient + cyan | `linear-gradient(135deg, #ff71ce, #01cdfe)`, grid lines, retro |
| 18 | Cottagecore | Rustic warmth, nature, handmade | Warm earth + wildflower colors | Linen texture, serif body, hand-drawn borders, rounded |
| 19 | Dark Academia | Old library, leather books, candlelight | Deep brown + forest green + gold | Aged paper texture, serif everything, warm vignette |
| 20 | Solarpunk | Optimistic future, nature + tech harmony | Bright green + warm gold + sky blue | Organic shapes, gradient meshes, rounded, light |
| 21 | Afrofuturism | African heritage + sci-fi technology | Gold + deep purple + electric blue | Geometric tribal patterns, bold display fonts, metallic accents |
| 22 | Wabi-Sabi | Imperfect beauty, aged patina, asymmetry | Muted earth + weathered materials | Intentional asymmetry, worn textures, negative space |
| 23 | Scandinavian Minimal | Clean function, natural light, hygge | White + pale wood + single accent | Max whitespace, thin borders, subtle, functional |
| 24 | Memphis Design | Anti-minimalist, geometric chaos, 1980s Milan | Bold primaries + pastels + B&W patterns | Squiggly borders, clashing shapes, geometric patterns |
| 25 | Swiss/International | Grid perfection, Helvetica, systematic | Neutral + single bright accent | Perfect grid, Helvetica/Inter, mathematical spacing |
| 26 | Art Deco | Geometric luxury, Gatsby era | Gold + black + cream | Fan shapes, geometric borders, Poiret One font, symmetry |
| 27 | Ukiyo-e | Japanese woodblock, flat layers, nature | Limited palette (5-6 colors), no gradient | Flat color blocks, layered depth, organic outlines |
| 28 | Chinoiserie | Chinese-inspired Western decoration | Red + gold + jade green + silk white | Ornamental frames, silk texture, decorative patterns |
| 29 | Nordic Noir | Scandinavian crime, bleak landscapes | Desaturated blue-grey, almost monochrome | Cold filter, wide sections, isolated elements, silence |
| 30 | K-Drama Visual | Korean TV aesthetic, emotional lighting | Warm amber indoor + cool blue outdoor | Warm/cool split, generous space, intimate framing |

## Design System Styles

| # | Style | Visual Signature | CSS Translation |
|---|-------|-----------------|-----------------|
| 31 | Glassmorphism | Frosted glass, depth layers, background blur | `backdrop-filter: blur(16px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2)` |
| 32 | Neumorphism | Soft extruded UI, same-color shadows | `box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff; border-radius: 12px` |
| 33 | Claymorphism | 3D clay/plasticine feel, playful depth | `background: #f5f5f5; border-radius: 24px; box-shadow: inset 0 -4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)` |
| 34 | Neubrutalism | Raw borders, system fonts, visible structure | `border: 3px solid #000; box-shadow: 4px 4px 0 #000; font-family: system-ui; border-radius: 0` |
| 35 | Bento Grid | Apple-style modular cards, varied sizes | `display: grid; grid-template: repeat(3, 1fr) / repeat(4, 1fr); gap: 8px` with varied `grid-column: span N` |
| 36 | Editorial | Magazine-style, strong typographic hierarchy | Large display headings, multi-column body, pull quotes, drop caps |
| 37 | Dashboard | Data-dense, dark bg, metric cards, charts | Dark bg, small font, lots of data, chart components, compact spacing |
| 38 | Terminal/Hacker | Command line aesthetic, green on black | `background: #0a0a0a; color: #00ff00; font-family: monospace;` cursor blink |
| 39 | Luxury E-commerce | Product hero, white space, price prominence | Ultra-clean, one product per viewport, subtle animation only |
| 40 | Zine/Punk | Cut-and-paste, ransom note, DIY aesthetic | Mixed fonts, rotated elements, torn edges, collage |

## Era-Specific Design Languages

| # | Era | Visual Signature | Color | CSS Key |
|---|-----|-----------------|-------|---------|
| 41 | 1920s Art Deco | Geometric patterns, gold lines, symmetry | Gold + black + cream | `linear-gradient` chevrons, Poiret One font |
| 42 | 1950s Mid-Century | Atomic age, boomerang shapes, optimism | Teal + orange + cream + olive | Organic shapes, `clip-path`, warm palette |
| 43 | 1960s Mod | Op-art, go-go, geometric minimalism | B&W + single bold color | Geometric patterns, high contrast, Futura font |
| 44 | 1970s Disco | Mirror balls, metallics, excess | Gold + silver + purple + hot pink | Metallic gradients, sparkle effects, thick fonts |
| 45 | 1980s Synthwave | Grid floors, sunsets, chrome text | Purple + pink + cyan + orange gradient | `background: linear-gradient(#0a0020, #1a0040)`, neon grid |
| 46 | 1990s Grunge | Dirty, distressed, anti-corporate | Muted earth + single bright | Noise heavy, torn textures, lowercase type |
| 47 | Y2K (2000) | Metallic chrome, translucent plastic, digital | Silver + iridescent + baby blue | Chrome gradients, transparent layers, bubbly shapes |
| 48 | 2010s Flat Design | No shadows, no gradients, bright flat colors | Flat bold colors, material palette | `box-shadow: none; border-radius: 4px; background: solid` |
| 49 | 2020s Neomorphism | Soft shadows, monochrome, subtle depth | Single hue light + dark shadows | Dual shadow (light + dark), same-color palette |
| 50 | 2025 AI Aesthetic | Gradient meshes, blur, floating elements | Iridescent + dark + glow | `conic-gradient`, heavy blur, floating cards |

## Cultural Aesthetics

| # | Culture | Visual Signature | Color | CSS Key |
|---|---------|-----------------|-------|---------|
| 51 | Japanese Zen | Ma (空間), asymmetry, nature | White + stone grey + moss green | Maximum negative space, asymmetric, organic |
| 52 | Chinese Imperial | Red lacquer, gold dragon, symmetry | Red + gold + black | Symmetrical, ornamental borders, red accent |
| 53 | Korean Hanbok | Jeogori lines, soft curves, tradition meets modern | Soft pastels + deep jewel tones | Curved section dividers, gentle color blocks |
| 54 | Indian Rangoli | Intricate patterns, vibrant, layered | Saffron + magenta + turquoise + gold | Complex `background-image` patterns, vibrant |
| 55 | Moroccan Zellige | Geometric tile, tessellation, jewel tones | Cobalt + terracotta + emerald + gold | `repeating-linear-gradient` tiles, rich palette |
| 56 | Scandinavian Hygge | Cozy, candle, wool, simplicity | Warm cream + soft grey + wood | Warm whites, minimal, rounded, inviting |
| 57 | Brazilian Tropical | Lush, vibrant, organic, carnival | Tropical green + hot pink + orange + yellow | Bold colors, organic shapes, energetic |
| 58 | Mediterranean | Sun-bleached, terracotta, sea blue | Terracotta + ocean blue + white | Warm filter, textured surfaces, arch shapes |
| 59 | West African Kente | Bold geometric woven patterns, symbolic | Primary colors in geometric blocks | Striped patterns, bold color blocks, geometric |
| 60 | Persian Miniature | Intricate detail, flat perspective, garden motifs | Lapis blue + gold + rose + green | Detailed borders, flat layered depth, ornamental |
