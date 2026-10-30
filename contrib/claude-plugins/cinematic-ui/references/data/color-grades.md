# Color Grading Library — 100 Film LUT Presets

CSS filter combinations that replicate cinema color grading. Apply to images, sections, or full-page overlays via `filter:` or as pseudo-element overlays with `mix-blend-mode`.

**Usage:** Apply directly as `filter` on `<img>`, `<section>`, or a `::before`/`::after` overlay. Combine with `background-blend-mode` or `mix-blend-mode` for layered effects.

---

## Classic Hollywood (1-10)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 1 | Golden Age Warmth | Casablanca (1942) | `filter: sepia(0.25) contrast(1.1) brightness(1.05) saturate(0.9);` | nostalgic elegance |
| 2 | Technicolor Vivid | The Wizard of Oz (1939) | `filter: saturate(1.6) contrast(1.15) brightness(1.05) hue-rotate(-5deg);` | hyperreal fantasy |
| 3 | Bleach Bypass | Saving Private Ryan (1998) | `filter: contrast(1.35) saturate(0.45) brightness(1.08) grayscale(0.1);` | gritty war realism |
| 4 | Three-Strip Technicolor | Singin' in the Rain (1952) | `filter: saturate(1.8) contrast(1.2) brightness(0.95) hue-rotate(5deg);` | musical exuberance |
| 5 | Silver Nitrate | Citizen Kane (1941) | `filter: grayscale(0.85) contrast(1.4) brightness(1.05) sepia(0.08);` | dramatic monochrome |
| 6 | Autochrome Pastel | A Room with a View (1985) | `filter: saturate(0.7) brightness(1.15) contrast(0.9) sepia(0.15) hue-rotate(10deg);` | faded romance |
| 7 | Eastmancolor Fade | The Godfather (1972) | `filter: sepia(0.3) saturate(0.8) contrast(1.1) brightness(0.95) hue-rotate(-8deg);` | amber crime drama |
| 8 | VistaVision Clarity | Vertigo (1958) | `filter: contrast(1.15) saturate(1.3) brightness(1.0) hue-rotate(-3deg);` | suspenseful clarity |
| 9 | Dye Transfer Print | Gone with the Wind (1939) | `filter: saturate(1.5) contrast(1.1) brightness(1.0) sepia(0.1) hue-rotate(8deg);` | epic grandeur |
| 10 | Studio Glamour | Sunset Boulevard (1950) | `filter: contrast(1.25) brightness(1.15) saturate(0.6) grayscale(0.15);` | old Hollywood shine |

## Noir (11-18)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 11 | Hard Boiled Noir | Double Indemnity (1944) | `filter: grayscale(1) contrast(1.6) brightness(0.85);` | stark shadow drama |
| 12 | Venetian Blind | The Big Sleep (1946) | `filter: grayscale(1) contrast(1.45) brightness(0.9) sepia(0.05);` | sliced light tension |
| 13 | Neo-Noir Teal | Blade Runner (1982) | `filter: saturate(0.6) contrast(1.3) brightness(0.85) hue-rotate(160deg) sepia(0.15);` | dystopian night |
| 14 | Smoke-Filled Room | Chinatown (1974) | `filter: sepia(0.35) contrast(1.2) brightness(0.9) saturate(0.65);` | corrupt amber |
| 15 | Midnight Silhouette | The Third Man (1949) | `filter: grayscale(1) contrast(1.7) brightness(0.75);` | extreme shadow |
| 16 | Neon Noir | Drive (2011) | `filter: contrast(1.3) saturate(0.8) brightness(0.88) hue-rotate(-15deg) sepia(0.1);` | stylish nightlife |
| 17 | Rain-Slicked Streets | Dark City (1998) | `filter: grayscale(0.6) contrast(1.35) brightness(0.82) sepia(0.1) hue-rotate(190deg);` | wet urban dread |
| 18 | Low-Key Portrait | Touch of Evil (1958) | `filter: grayscale(0.9) contrast(1.5) brightness(0.8) sepia(0.05);` | intimate menace |

## Asian Cinema (19-30)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 19 | Wong Kar-wai Neon | In the Mood for Love (2000) | `filter: saturate(1.4) contrast(1.15) brightness(0.9) hue-rotate(-10deg) sepia(0.12);` | yearning warmth |
| 20 | Chungking Express Teal | Chungking Express (1994) | `filter: saturate(0.85) contrast(1.2) brightness(0.92) hue-rotate(170deg) sepia(0.08);` | urban loneliness |
| 21 | Japanese Cool Precision | Shoplifters (2018) | `filter: saturate(0.75) contrast(1.05) brightness(1.02) hue-rotate(195deg) sepia(0.05);` | understated truth |
| 22 | Korean Muted Drama | Parasite (2019) | `filter: saturate(0.7) contrast(1.15) brightness(0.98) hue-rotate(5deg) sepia(0.08);` | social tension |
| 23 | Anime Hypercolor | Akira (1988) aesthetic | `filter: saturate(1.9) contrast(1.25) brightness(1.05) hue-rotate(-8deg);` | explosive energy |
| 24 | Wuxia Jade | Crouching Tiger, Hidden Dragon (2000) | `filter: saturate(0.85) contrast(1.1) brightness(0.95) hue-rotate(120deg) sepia(0.1);` | graceful combat |
| 25 | Zhang Yimou Red | Raise the Red Lantern (1991) | `filter: saturate(1.5) contrast(1.2) brightness(0.92) hue-rotate(-15deg) sepia(0.18);` | passionate crimson |
| 26 | Thai Golden Dusk | Uncle Boonmee (2010) | `filter: sepia(0.3) saturate(1.1) contrast(1.05) brightness(1.0) hue-rotate(-5deg);` | mystical amber |
| 27 | Bollywood Vibrant | Devdas (2002) | `filter: saturate(1.7) contrast(1.15) brightness(1.08) hue-rotate(5deg);` | lavish spectacle |
| 28 | Hong Kong Neon | Fallen Angels (1995) | `filter: saturate(1.2) contrast(1.35) brightness(0.82) hue-rotate(-20deg) sepia(0.08);` | nocturnal chaos |
| 29 | Studio Ghibli Pastoral | My Neighbor Totoro (1988) aesthetic | `filter: saturate(1.15) contrast(0.95) brightness(1.1) hue-rotate(15deg) sepia(0.05);` | gentle wonder |
| 30 | Taiwanese New Wave | Yi Yi (2000) | `filter: saturate(0.8) contrast(1.08) brightness(1.0) hue-rotate(5deg) sepia(0.06);` | quiet observation |

## European Arthouse (31-42)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 31 | Scandinavian Cold | Let the Right One In (2008) | `filter: saturate(0.5) contrast(1.1) brightness(1.05) hue-rotate(200deg) sepia(0.05);` | frozen isolation |
| 32 | French Warm Glow | Amelie (2001) | `filter: sepia(0.2) saturate(1.3) contrast(1.1) brightness(1.0) hue-rotate(-12deg);` | whimsical charm |
| 33 | German Expressionist | Metropolis (1927) aesthetic | `filter: grayscale(0.95) contrast(1.65) brightness(0.88) sepia(0.08);` | angular dread |
| 34 | Italian Neorealist | Bicycle Thieves (1948) aesthetic | `filter: grayscale(0.5) contrast(1.15) brightness(0.95) sepia(0.15);` | street-level truth |
| 35 | Bergman Existential | The Seventh Seal (1957) | `filter: grayscale(0.8) contrast(1.35) brightness(0.92) sepia(0.03);` | spiritual weight |
| 36 | Almodovar Pop | Talk to Her (2002) | `filter: saturate(1.55) contrast(1.15) brightness(1.02) hue-rotate(8deg);` | melodramatic color |
| 37 | Tarkovsky Earth | Stalker (1979) | `filter: sepia(0.35) saturate(0.55) contrast(1.1) brightness(0.9);` | decayed transcendence |
| 38 | Danish Dogme Raw | Festen (1998) | `filter: saturate(0.65) contrast(1.05) brightness(1.08) grayscale(0.12);` | handheld honesty |
| 39 | Kieslowski Blue | Three Colors: Blue (1993) | `filter: saturate(0.7) contrast(1.1) brightness(0.95) hue-rotate(210deg) sepia(0.08);` | melancholic azure |
| 40 | Greek Weird Wave | Dogtooth (2009) | `filter: saturate(0.55) contrast(1.2) brightness(1.1) hue-rotate(5deg) sepia(0.05);` | clinical unease |
| 41 | British Kitchen Sink | Saturday Night and Sunday Morning (1960) | `filter: grayscale(0.4) contrast(1.15) brightness(0.92) sepia(0.12);` | working-class grit |
| 42 | Sorrentino Opulent | The Great Beauty (2013) | `filter: saturate(1.2) contrast(1.15) brightness(1.05) sepia(0.1) hue-rotate(-5deg);` | decadent splendor |

## Modern Blockbuster (43-54)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 43 | Teal & Orange | Transformers (2007) | `filter: saturate(1.2) contrast(1.2) brightness(0.95) hue-rotate(-15deg) sepia(0.12);` | popcorn spectacle |
| 44 | Desaturated Action | The Dark Knight (2008) | `filter: saturate(0.55) contrast(1.3) brightness(0.92) sepia(0.08);` | brooding realism |
| 45 | Neon Blockbuster | John Wick (2014) | `filter: saturate(1.1) contrast(1.35) brightness(0.82) hue-rotate(-20deg);` | stylized violence |
| 46 | Marvel Daylight | The Avengers (2012) | `filter: saturate(1.15) contrast(1.1) brightness(1.08) hue-rotate(0deg);` | heroic clarity |
| 47 | Snyder Crushed Blacks | 300 (2006) | `filter: contrast(1.5) saturate(0.65) brightness(0.82) sepia(0.2);` | mythic brutality |
| 48 | Bay Golden Hour | Bad Boys (1995) | `filter: saturate(1.3) contrast(1.15) brightness(1.05) sepia(0.15) hue-rotate(-10deg);` | sunset swagger |
| 49 | Villeneuve Dust | Dune (2021) | `filter: sepia(0.25) saturate(0.6) contrast(1.15) brightness(1.05) hue-rotate(-5deg);` | desert grandeur |
| 50 | Cameron Deep Blue | The Abyss (1989) | `filter: saturate(0.8) contrast(1.15) brightness(0.88) hue-rotate(200deg) sepia(0.05);` | oceanic depth |
| 51 | Nolan Silver | Interstellar (2014) | `filter: saturate(0.65) contrast(1.2) brightness(1.02) sepia(0.08) hue-rotate(5deg);` | cerebral cool |
| 52 | Fury Road Chrome | Mad Max: Fury Road (2015) | `filter: saturate(1.4) contrast(1.4) brightness(1.0) hue-rotate(-8deg) sepia(0.1);` | scorched frenzy |
| 53 | Matrix Green | The Matrix (1999) | `filter: saturate(0.7) contrast(1.2) brightness(0.9) hue-rotate(85deg) sepia(0.15);` | simulated reality |
| 54 | Spielberg Warm | E.T. (1982) | `filter: sepia(0.15) saturate(1.1) contrast(1.05) brightness(1.08) hue-rotate(-5deg);` | suburban wonder |

## Horror (55-64)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 55 | Autopsy Green | Saw (2004) | `filter: hue-rotate(75deg) saturate(0.6) contrast(1.25) brightness(0.82) sepia(0.1);` | sickly dread |
| 56 | High Contrast Terror | The Exorcist (1973) | `filter: contrast(1.55) saturate(0.4) brightness(0.85) sepia(0.05);` | religious horror |
| 57 | Desaturated Dread | The Ring (2002) | `filter: saturate(0.3) contrast(1.2) brightness(0.88) hue-rotate(195deg) sepia(0.08);` | waterlogged fear |
| 58 | Giallo Yellow | Suspiria (1977) | `filter: saturate(1.6) contrast(1.3) brightness(0.85) hue-rotate(-25deg) sepia(0.12);` | psychedelic nightmare |
| 59 | Found Footage Grain | The Blair Witch Project (1999) | `filter: saturate(0.5) contrast(1.1) brightness(1.12) grayscale(0.2) sepia(0.08);` | lo-fi panic |
| 60 | Ari Aster Daylight | Midsommar (2019) | `filter: saturate(0.8) contrast(1.05) brightness(1.2) hue-rotate(10deg) sepia(0.03);` | bright horror |
| 61 | J-Horror Pale | Ju-On: The Grudge (2002) | `filter: saturate(0.35) contrast(1.15) brightness(1.05) hue-rotate(200deg) sepia(0.05);` | ghostly pallor |
| 62 | Slasher Night | Halloween (1978) | `filter: saturate(0.55) contrast(1.4) brightness(0.72) hue-rotate(-10deg) sepia(0.1);` | suburban darkness |
| 63 | Gothic Crimson | Crimson Peak (2015) | `filter: saturate(1.1) contrast(1.3) brightness(0.82) hue-rotate(-20deg) sepia(0.18);` | romantic decay |
| 64 | Paranormal Infrared | Paranormal Activity (2007) | `filter: grayscale(0.7) contrast(1.15) brightness(1.15) hue-rotate(110deg) sepia(0.05);` | surveillance unease |

## Romance (65-72)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 65 | Warm Soft Focus | The Notebook (2004) | `filter: sepia(0.2) saturate(1.15) contrast(0.9) brightness(1.12) hue-rotate(-5deg);` | tender longing |
| 66 | Dreamy Overexposed | Eternal Sunshine (2004) | `filter: brightness(1.2) contrast(0.85) saturate(1.1) sepia(0.1) hue-rotate(10deg);` | fragile memory |
| 67 | Golden Hour Kiss | Before Sunset (2004) | `filter: sepia(0.25) saturate(1.2) contrast(1.05) brightness(1.08) hue-rotate(-8deg);` | European warmth |
| 68 | Pastel Romance | The Grand Budapest Hotel (2014) | `filter: saturate(0.85) contrast(0.92) brightness(1.12) hue-rotate(15deg) sepia(0.08);` | confectionery charm |
| 69 | Autumn Love | When Harry Met Sally (1989) | `filter: sepia(0.18) saturate(1.05) contrast(1.08) brightness(1.02) hue-rotate(-12deg);` | cozy seasonal |
| 70 | Moonlit Blue | La La Land (2016) | `filter: saturate(0.9) contrast(1.1) brightness(0.88) hue-rotate(210deg) sepia(0.05);` | bittersweet night |
| 71 | Cherry Blossom Soft | Your Name (2016) aesthetic | `filter: saturate(1.1) contrast(0.95) brightness(1.15) hue-rotate(5deg) sepia(0.05);` | wistful beauty |
| 72 | Candlelight Amber | Pride and Prejudice (2005) | `filter: sepia(0.35) saturate(0.9) contrast(1.1) brightness(0.95) hue-rotate(-5deg);` | period warmth |

## Sci-Fi (73-80)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 73 | Cyan Shift | Ex Machina (2014) | `filter: saturate(0.65) contrast(1.15) brightness(0.95) hue-rotate(180deg) sepia(0.08);` | artificial calm |
| 74 | Cold Blue Future | Minority Report (2002) | `filter: saturate(0.5) contrast(1.2) brightness(1.05) hue-rotate(210deg) sepia(0.05);` | pre-crime chill |
| 75 | Neon Glow Cyberpunk | Blade Runner 2049 (2017) | `filter: saturate(1.2) contrast(1.25) brightness(0.78) hue-rotate(-25deg) sepia(0.12);` | synthetic amber |
| 76 | Alien Isolation | Alien (1979) | `filter: saturate(0.45) contrast(1.35) brightness(0.78) hue-rotate(30deg) sepia(0.1);` | industrial terror |
| 77 | Sterile White | 2001: A Space Odyssey (1968) | `filter: saturate(0.4) contrast(1.1) brightness(1.2) sepia(0.03);` | clinical wonder |
| 78 | Cosmic Purple | Annihilation (2018) | `filter: saturate(0.9) contrast(1.15) brightness(0.88) hue-rotate(270deg) sepia(0.08);` | alien shimmer |
| 79 | Hologram Blue | Tron: Legacy (2010) | `filter: saturate(0.7) contrast(1.4) brightness(0.82) hue-rotate(200deg) sepia(0.05);` | digital grid |
| 80 | Solar Flare | Sunshine (2007) | `filter: saturate(1.1) contrast(1.3) brightness(1.15) hue-rotate(-15deg) sepia(0.15);` | blinding awe |

## Documentary (81-86)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 81 | Natural Clarity | Planet Earth II (2016) | `filter: saturate(1.1) contrast(1.08) brightness(1.02) hue-rotate(0deg);` | vivid observation |
| 82 | High Clarity Sharp | Free Solo (2018) | `filter: contrast(1.2) saturate(1.05) brightness(1.05) sepia(0.02);` | razor focus |
| 83 | Vintage Film Stock | Woodstock (1970) | `filter: sepia(0.2) saturate(0.85) contrast(1.1) brightness(1.05) grayscale(0.1);` | archival charm |
| 84 | War Correspondent | Restrepo (2010) | `filter: saturate(0.6) contrast(1.15) brightness(1.08) sepia(0.1) grayscale(0.15);` | embedded urgency |
| 85 | True Crime Flat | Making a Murderer (2015) | `filter: saturate(0.55) contrast(1.05) brightness(1.0) sepia(0.08) hue-rotate(5deg);` | institutional boredom |
| 86 | Nature Lush | Our Planet (2019) | `filter: saturate(1.35) contrast(1.1) brightness(1.02) hue-rotate(8deg);` | biodiversity awe |

## Music Video (87-92)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 87 | High Saturation Pop | Beyonce Lemonade visuals | `filter: saturate(1.8) contrast(1.2) brightness(1.0) hue-rotate(10deg);` | visual anthem |
| 88 | Split Tone Retro | Daft Punk around the world era | `filter: saturate(1.1) contrast(1.15) brightness(0.95) sepia(0.2) hue-rotate(-20deg);` | disco nostalgia |
| 89 | Cross-Process Acid | 90s Bjork music videos | `filter: saturate(1.5) contrast(1.3) brightness(0.92) hue-rotate(30deg) sepia(0.08);` | experimental chaos |
| 90 | Lo-Fi VHS | Vaporwave aesthetic | `filter: saturate(1.3) contrast(0.9) brightness(1.1) hue-rotate(-10deg) sepia(0.15);` | retro degradation |
| 91 | Noir Performance | Beyonce Single Ladies aesthetic | `filter: grayscale(1) contrast(1.35) brightness(1.05);` | stark choreography |
| 92 | Chromatic Aberration | A$AP Rocky LSD era | `filter: saturate(1.6) contrast(1.1) brightness(1.08) hue-rotate(25deg);` | psychedelic trip |

## Social Media Era (93-96)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 93 | Matte Film | Instagram early aesthetic | `filter: contrast(0.9) brightness(1.1) saturate(0.85) sepia(0.1);` | curated casual |
| 94 | VSCO Fade | VSCO A6 preset style | `filter: contrast(0.88) brightness(1.12) saturate(0.75) sepia(0.12) hue-rotate(5deg);` | effortless cool |
| 95 | Faded Film Print | Hipstamatic era | `filter: contrast(0.85) brightness(1.08) saturate(0.7) sepia(0.18) grayscale(0.08);` | analog nostalgia |
| 96 | Clean Minimal | Modern product photography | `filter: contrast(1.05) brightness(1.08) saturate(0.95) sepia(0.02);` | polished perfection |

## Regional Cinema (97-100)

| # | Name | Film Reference | CSS Filter | Mood |
|---|------|---------------|------------|------|
| 97 | Nollywood Warm Earth | The Figurine (2009) | `filter: sepia(0.22) saturate(1.15) contrast(1.1) brightness(1.02) hue-rotate(-8deg);` | West African warmth |
| 98 | Thai Temple Gold | Tropical Malady (2004) | `filter: sepia(0.28) saturate(1.05) contrast(1.08) brightness(1.0) hue-rotate(-12deg);` | Southeast Asian mystique |
| 99 | Latin Passionate | Amores Perros (2000) | `filter: saturate(1.35) contrast(1.25) brightness(0.92) hue-rotate(-10deg) sepia(0.12);` | raw Latin heat |
| 100 | Iranian Desert Light | A Separation (2011) | `filter: sepia(0.15) saturate(0.75) contrast(1.12) brightness(1.1) hue-rotate(-3deg);` | sun-bleached honesty |

---

## Usage Notes

### As image overlay
```css
.graded-image {
  filter: contrast(1.35) saturate(0.45) brightness(1.08) grayscale(0.1); /* Bleach Bypass */
}
```

### As section overlay (pseudo-element)
```css
.section-graded {
  position: relative;
}
.section-graded::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: contrast(1.35) saturate(0.45) brightness(1.08) grayscale(0.1);
  mix-blend-mode: color;
  pointer-events: none;
  z-index: 1;
}
```

### Combining grades
Layer two grades using nested elements or multiple pseudo-elements for complex looks. Use `opacity` on the overlay to control intensity (e.g., `opacity: 0.6` for a subtle grade).

### Animation transitions
```css
.hero-image {
  filter: sepia(0.25) contrast(1.1) brightness(1.05) saturate(0.9);
  transition: filter 1.2s ease;
}
.hero-image:hover {
  filter: saturate(1.4) contrast(1.15) brightness(0.9) hue-rotate(-10deg) sepia(0.12);
}
```
