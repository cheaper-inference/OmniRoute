# Typography as Cinema — 文字即電影

文字不是放在頁面上的標籤。文字是演員、是建築、是光。

**Read this library during Step 4 storyboard.** Every hero and key section MUST use at least one of these typography techniques — not just "font-size: 3rem; text-align: center".

A film has loud scenes AND quiet scenes. Use Category 6 for the quiet moments.

---

## Category 1: Text as Architecture (文字即建築)

Text fills the entire viewport width, becoming the structure of the page.

### 1.1 Full-Width Display (滿版大字)
```css
/* Like: Arpeggio, David Clark, Bellevoire */
.type-fullwidth {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  width: 100%;
}
```
**Film**: Opening titles of Saul Bass — text IS the poster
**When to use**: Hero sections, bold brand statements
**When NOT to use**: Subheadings, body content, anything needing nuance

### 1.2 Viewport-Spanning Headline (跨越視口)
```css
.type-span {
  font-size: 20vw;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 800;
  line-height: 0.8;
}
```
**Film**: Tarantino chapter cards — bold, unapologetic
**When to use**: Single-word or two-word statements that define a section
**When NOT to use**: Multi-word headlines, anything that needs to wrap

### 1.3 Stacked Letters (堆疊字)
```css
.type-stacked {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.75;
  letter-spacing: -0.06em;
  font-weight: 900;
}
```
**Film**: Kubrick's The Shining — ALL WORK AND NO PLAY
**When to use**: Two-to-four line headings that feel like a wall of text
**When NOT to use**: Single lines, readability-critical text

### 1.4 Monumental (紀念碑式)
```css
.type-monument {
  font-size: clamp(5rem, 18vw, 15rem);
  font-weight: 100;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}
```
**Film**: 2001: A Space Odyssey — sparse, monumental
**When to use**: Luxury, space, silence — when emptiness is the message
**When NOT to use**: Dense content, startup energy, anything fast

### 1.5 Split Headline (斷行標題)
```css
.type-split-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.0;
}
.type-split-headline .line-accent {
  font-style: italic;
  font-weight: 300;
  display: block;
}
```
**Film**: Wes Anderson intertitles — structured, deliberate line breaks
**When to use**: Headlines where one line is bold and the other is italic/light for contrast
**When NOT to use**: When all words carry equal weight

### 1.6 Oversized Single Word (巨型單字)
```css
.type-giant-word {
  font-size: clamp(6rem, 25vw, 20rem);
  font-weight: 900;
  line-height: 0.75;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}
```
**Film**: Gaspar Noe's Enter the Void — title swallows the screen
**When to use**: One-word impact, brand name, chapter marker
**When NOT to use**: Anything over two syllables — it loses impact

### 1.7 Justified Block (齊行文字塊)
```css
.type-justified-block {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  text-align: justify;
  text-justify: inter-word;
  max-width: 900px;
  line-height: 1.1;
  hyphens: auto;
}
```
**Film**: Newspaper headlines in All the President's Men — columns of truth
**When to use**: Multi-line headlines that need to feel like a typeset block
**When NOT to use**: Short text, narrow containers where justify creates rivers

### 1.8 Stepped Text (階梯排列)
```css
.type-stepped {
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 1.0;
}
.type-stepped .line:nth-child(1) { padding-left: 0; }
.type-stepped .line:nth-child(2) { padding-left: 8vw; }
.type-stepped .line:nth-child(3) { padding-left: 16vw; }
```
**Film**: Bauhaus posters — diagonal energy through horizontal lines
**When to use**: Three-line headings that need diagonal momentum
**When NOT to use**: Single lines, centered layouts

### 1.9 Text Column Grid (文字柱列)
```css
.type-column-grid {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  line-height: 0.95;
}
.type-column-grid .col-right {
  text-align: right;
}
```
**Film**: Godard's title cards — text as graphic composition across a grid
**When to use**: Two-part headlines, bilingual text, comparison statements
**When NOT to use**: Single-thought headings

### 1.10 Compressed Ultra-Wide (壓縮超寬)
```css
.type-compressed {
  font-size: clamp(4rem, 14vw, 11rem);
  font-weight: 900;
  font-stretch: ultra-condensed;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 0.85;
}
```
**Film**: Racing title sequences — compressed for speed
**When to use**: When you need big text but have a long word
**When NOT to use**: Short words — they look pinched

### 1.11 Mixed Weight Headline (混合字重)
```css
.type-mixed-weight {
  font-size: clamp(3rem, 9vw, 7rem);
  line-height: 0.95;
}
.type-mixed-weight .thin { font-weight: 100; }
.type-mixed-weight .bold { font-weight: 900; }
```
**Film**: French New Wave posters — light and heavy in one sentence
**When to use**: Emphasizing one word in a phrase by weight contrast
**When NOT to use**: When every word matters equally

### 1.12 Indented Quote Block (縮排引言)
```css
.type-indent-quote {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.3;
  margin-left: 15vw;
  max-width: 60vw;
  border-left: 3px solid currentColor;
  padding-left: 2rem;
}
```
**Film**: The opening quote in every Coen Brothers film
**When to use**: Testimonials, pull quotes, epigraphs
**When NOT to use**: Body copy, CTAs, anything needing center stage

### 1.13 Flush-Right Headline (右齊標題)
```css
.type-flush-right {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  text-align: right;
  line-height: 0.9;
  padding-right: 5vw;
}
```
**Film**: End title cards — closing statement anchored right
**When to use**: Secondary hero text, closing sections, right-aligned layouts
**When NOT to use**: Primary heroes in LTR reading cultures (feels unnatural as first read)

### 1.14 Layered Depth Headlines (層疊深度標題)
```css
.type-layered {
  position: relative;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
}
.type-layered .shadow-layer {
  position: absolute;
  top: 6px; left: 6px;
  color: rgba(0,0,0,0.1);
  z-index: 0;
}
.type-layered .main-layer {
  position: relative;
  z-index: 1;
}
```
**Film**: Letterpress printing — physical ink impression depth
**When to use**: Retro, tactile, editorial feel
**When NOT to use**: Clean modern / minimal layouts

### 1.15 Alternating Size Lines (交替大小行)
```css
.type-alt-size {
  line-height: 1.0;
}
.type-alt-size .large {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  display: block;
}
.type-alt-size .small {
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: block;
}
```
**Film**: Theatre playbill — big name, small role, big name, small role
**When to use**: Hero sections with title + subtitle + descriptor stacked
**When NOT to use**: When hierarchy needs to be gentle, not theatrical

### 1.16 Full-Bleed Edge Text (滿出邊緣)
```css
.type-bleed {
  font-size: clamp(5rem, 20vw, 16rem);
  font-weight: 900;
  line-height: 0.8;
  margin-left: -2vw;
  margin-right: -2vw;
  overflow: hidden;
}
```
**Film**: Barbara Kruger — text that refuses to be contained
**When to use**: Rebellious, bold, breaking-the-frame energy
**When NOT to use**: Orderly, corporate, contained layouts

---

## Category 2: Text Over Image (文字覆蓋影像)

### 2.1 Text on Photo — Blend Mode (混合模式)
```css
.type-blend {
  position: relative;
  z-index: 2;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  color: #ff5500;
  mix-blend-mode: multiply;
}
.type-blend-container {
  position: relative;
}
.type-blend-container img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
```
**Film**: Movie posters — text and image are ONE composition
**When to use**: When text and image should fuse into a single graphic
**When NOT to use**: When text must be clearly readable over any image

### 2.2 Text Behind Image (文字在圖片後面)
```css
.type-behind {
  font-size: 15vw;
  font-weight: 900;
  color: #222;
  position: absolute;
  z-index: 0;
}
.image-in-front {
  position: relative;
  z-index: 1;
}
```
**Film**: Marvel title sequences — hero walks in front of their name
**When to use**: Product shots, portrait photography, hero images with depth
**When NOT to use**: When the text must be read first

### 2.3 Text at Bottom Edge (底部壓字)
```css
.type-bottom-edge {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  color: white;
  line-height: 0.9;
  padding: 0 40px 30px;
}
```
**Film**: Documentary title cards — text grounds the image
**When to use**: Image heroes where the headline anchors the composition
**When NOT to use**: Images with important detail at the bottom

### 2.4 Text with Image Mask (文字做遮罩)
```css
.type-mask {
  font-size: 15vw;
  font-weight: 900;
  background-image: url('photo.jpg');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
**Film**: Title sequences — landscape seen THROUGH the letters
**When to use**: Visual spectacle, large single words, brand moments
**When NOT to use**: Small text, long sentences, readability-first sections

### 2.5 Text Cut by Image (圖像穿透文字)
```css
.type-cut {
  position: relative;
  font-size: 10vw;
  font-weight: 900;
  color: white;
}
.type-cut .image-overlay {
  position: absolute;
  clip-path: polygon(30% 0, 70% 0, 65% 100%, 25% 100%);
  z-index: 2;
}
```
**Film**: Split-screen techniques — two realities in one frame
**When to use**: Creative agency work, editorial, art direction pieces
**When NOT to use**: Corporate, conservative layouts

### 2.6 Knockout Text on Solid (挖空文字)
```css
.type-knockout {
  position: relative;
  background: #000;
  padding: 2rem 4rem;
}
.type-knockout h1 {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  color: transparent;
  background: url('photo.jpg') center/cover;
  -webkit-background-clip: text;
  background-clip: text;
}
```
**Film**: Saul Bass credits — shape cut to reveal the world behind
**When to use**: Solid color block with text revealing an image beneath
**When NOT to use**: When the image detail is too fine to read through letterforms

### 2.7 Gradient Overlay Text (漸層遮罩上的文字)
```css
.type-gradient-overlay {
  position: relative;
}
.type-gradient-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
  z-index: 1;
}
.type-gradient-overlay .text {
  position: relative;
  z-index: 2;
  color: white;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  padding: 2rem;
  align-self: flex-end;
}
```
**Film**: Every Netflix thumbnail — text readable via gradient scrim
**When to use**: Any text over a photo that must be readable
**When NOT to use**: When the gradient kills the mood of the image

### 2.8 Frosted Glass Text Panel (毛玻璃文字面板)
```css
.type-frosted {
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 2rem 3rem;
  color: white;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 500;
}
```
**Film**: Apple product reveals — floating glass panel over blurred product
**When to use**: Modern, premium UI feel, text blocks over busy backgrounds
**When NOT to use**: When you need full contrast, or browser support is a concern

### 2.9 Text Overlapping Image Edge (文字跨越圖片邊緣)
```css
.type-overlap-edge {
  position: relative;
}
.type-overlap-edge .heading {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  position: relative;
  z-index: 2;
  transform: translateY(50%);
}
.type-overlap-edge .image {
  position: relative;
  z-index: 1;
}
```
**Film**: Magazine cover layout — headline breaks the boundary
**When to use**: Editorial layouts, magazine-style sections
**When NOT to use**: Grid-strict layouts where overlap feels broken

### 2.10 Duotone Image + Text (雙色調影像加文字)
```css
.type-duotone-container {
  position: relative;
  filter: grayscale(1);
  mix-blend-mode: normal;
}
.type-duotone-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0066ff, #ff0066);
  mix-blend-mode: color;
}
.type-duotone-container .text {
  position: relative;
  z-index: 3;
  color: white;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
}
```
**Film**: Spotify Wrapped — vibrant duotone with bold type
**When to use**: Music, lifestyle, youth-oriented brands
**When NOT to use**: Photojournalism, corporate, where image fidelity matters

### 2.11 Text Shadow Lift (文字陰影浮起)
```css
.type-shadow-lift {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  color: white;
  text-shadow:
    0 2px 4px rgba(0,0,0,0.3),
    0 8px 30px rgba(0,0,0,0.4);
}
```
**Film**: Classic Hollywood title cards — text floats above the scene
**When to use**: Quick-and-simple text-over-image readability
**When NOT to use**: Dark images where shadow is invisible

### 2.12 Halftone Image + Text (半色調影像加文字)
```css
.type-halftone-bg {
  position: relative;
  background: #111;
}
.type-halftone-bg img {
  filter: grayscale(1) contrast(1.5);
  mix-blend-mode: screen;
  opacity: 0.4;
}
.type-halftone-bg .text {
  position: relative;
  z-index: 2;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  color: white;
}
```
**Film**: Sin City — high-contrast graphic novel frames
**When to use**: Dark, gritty, high-contrast editorial
**When NOT to use**: Soft, pastel, or friendly brands

### 2.13 Diagonal Text Over Image (斜角文字覆蓋)
```css
.type-diagonal-over {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-12deg);
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
```
**Film**: Russian Constructivism posters — dynamic diagonal energy
**When to use**: Action, energy, disruption, sale banners
**When NOT to use**: Calm, balanced, readable layouts

### 2.14 Masked Scroll Image Text (遮罩捲動影像文字)
```css
.type-mask-scroll {
  font-size: 15vw;
  font-weight: 900;
  background-attachment: fixed;
  background-image: url('photo.jpg');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
**Film**: Parallax title reveals — the world moves behind the letters
**When to use**: Immersive scroll experiences, full-page typographic moments
**When NOT to use**: Mobile (background-attachment: fixed has poor mobile support)

### 2.15 Video Background Text (影片背景文字)
```css
.type-video-bg {
  position: relative;
}
.type-video-bg video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}
.type-video-bg .text {
  position: relative;
  z-index: 2;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  color: white;
  mix-blend-mode: difference;
}
```
**Film**: Music video intros — text lives inside moving imagery
**When to use**: High-energy heroes, brand films, immersive landing pages
**When NOT to use**: Slow connections, text-heavy content, accessibility-first pages

---

## Category 3: Text Effects (文字特效)

### 3.1 Glitch Text (故障文字)
```css
.type-glitch {
  position: relative;
  font-size: 8vw;
  font-weight: 900;
}
.type-glitch::before,
.type-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
.type-glitch::before {
  color: #ff0033;
  animation: glitch-1 2s infinite linear;
  clip-path: inset(20% 0 30% 0);
}
.type-glitch::after {
  color: #00ffcc;
  animation: glitch-2 2s infinite linear;
  clip-path: inset(50% 0 10% 0);
}
@keyframes glitch-1 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
}
@keyframes glitch-2 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(3px); }
  40% { transform: translateX(-3px); }
  60% { transform: translateX(2px); }
}
```
**Film**: Fight Club — Tyler Durden's subliminal frames
**When to use**: Tech, cyberpunk, edgy brands, error states
**When NOT to use**: Luxury, wellness, anything calming

### 3.2 Text Reveal on Scroll (滾動揭露文字)
```css
.type-reveal {
  font-size: 6vw;
  font-weight: 700;
  overflow: hidden;
}
.type-reveal span {
  display: inline-block;
  transform: translateY(100%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-reveal.visible span {
  transform: translateY(0);
}
.type-reveal span:nth-child(2) { transition-delay: 0.1s; }
.type-reveal span:nth-child(3) { transition-delay: 0.2s; }
```
**Film**: End credits rolling up — text emerges from below
**When to use**: Scroll-triggered headlines, section reveals
**When NOT to use**: Above-the-fold content that must be visible immediately

### 3.3 Text Scramble/Decode (文字解碼)
```js
function scrambleText(el, finalText, duration = 2000) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let frame = 0;
  const totalFrames = duration / 30;
  const interval = setInterval(() => {
    el.textContent = finalText.split('').map((char, i) => {
      if (i < frame * (finalText.length / totalFrames)) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    frame++;
    if (frame > totalFrames) clearInterval(interval);
  }, 30);
}
```
**Film**: The Matrix — green code resolving into readable text
**When to use**: Data reveals, tech products, loading states
**When NOT to use**: Content that needs to be read quickly

### 3.4 Typewriter (打字機效果)
```css
.type-writer {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem;
  border-right: 2px solid currentColor;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 3s steps(40) forwards, blink 0.8s step-end infinite;
  width: 0;
}
@keyframes typing { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
```
**Film**: Old detective reports, Se7en notebooks
**When to use**: Terminal vibes, command-line products, storytelling
**When NOT to use**: Multi-line text, responsive layouts (width animation is fragile)

### 3.5 Gradient Text (漸層文字)
```css
.type-gradient {
  font-size: 8vw;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
**Film**: Neon signs in Blade Runner
**When to use**: Modern headings, SaaS heroes, brand statements
**When NOT to use**: Body text, small sizes, where it becomes illegible

### 3.6 Outline Text (描邊空心字)
```css
.type-outline {
  font-size: 12vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
}
.type-outline:hover {
  color: #ffffff;
  -webkit-text-stroke: 0;
  transition: all 0.5s ease;
}
```
**Film**: Neon signs turning on — outline to filled
**When to use**: Hover states, secondary headlines, ghost text
**When NOT to use**: Small text (stroke becomes illegible below 2rem)

### 3.7 Text Shadow Depth (文字陰影深度)
```css
.type-depth {
  font-size: 8vw;
  font-weight: 900;
  color: #1a1a2e;
  text-shadow:
    1px 1px 0 #16213e,
    2px 2px 0 #16213e,
    3px 3px 0 #16213e,
    4px 4px 0 #0f3460,
    5px 5px 0 #0f3460,
    6px 6px 20px rgba(0,0,0,0.5);
}
```
**Film**: Retro 3D movie titles — physical depth
**When to use**: Retro, playful, bold brands
**When NOT to use**: Minimalist, modern, flat design systems

### 3.8 Split Color Text (分裂色彩)
```css
.type-split {
  font-size: 10vw;
  font-weight: 900;
  position: relative;
  color: #ff4444;
}
.type-split::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  color: #4444ff;
  clip-path: inset(0 50% 0 0);
}
```
**Film**: Anaglyph 3D — red/blue split
**When to use**: Art direction, music, creative portfolios
**When NOT to use**: Readability-first, corporate, accessibility-sensitive

### 3.9 Text Color Shift on Scroll (滾動色彩變化)
```css
.type-color-shift {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  transition: color 0.1s linear;
}
```
```js
const el = document.querySelector('.type-color-shift');
window.addEventListener('scroll', () => {
  const progress = Math.min(1, window.scrollY / (document.body.scrollHeight - window.innerHeight));
  const hue = Math.round(progress * 360);
  el.style.color = `hsl(${hue}, 70%, 60%)`;
});
```
**Film**: Fantasia — colors shifting with the music
**When to use**: Scroll storytelling, mood transitions, creative portfolios
**When NOT to use**: Short pages, accessibility-critical content, fixed headers

### 3.10 Text Weight Animation (字重動畫)
```css
.type-weight-animate {
  font-size: clamp(3rem, 8vw, 6rem);
  font-variation-settings: 'wght' 100;
  transition: font-variation-settings 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-weight-animate.visible {
  font-variation-settings: 'wght' 900;
}
```
**Film**: Morphing title cards — identity shifting
**When to use**: Variable font headings, dramatic reveals, interactive hovers
**When NOT to use**: Without a variable font loaded, body text

### 3.11 Text Stroke Animation — Outline to Filled (描邊到填滿動畫)
```css
.type-stroke-fill {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px #fff;
  transition: color 0.8s ease, -webkit-text-stroke 0.8s ease;
}
.type-stroke-fill.visible {
  color: #fff;
  -webkit-text-stroke: 0px #fff;
}
```
**Film**: Neon sign turning on — wireframe becomes solid
**When to use**: Loading sequences, scroll reveals, hover states
**When NOT to use**: When outline text is already used nearby

### 3.12 Blur-to-Sharp Reveal (模糊到清晰)
```css
.type-blur-reveal {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  filter: blur(20px);
  opacity: 0.3;
  transition: filter 1s ease, opacity 1s ease;
}
.type-blur-reveal.visible {
  filter: blur(0px);
  opacity: 1;
}
```
**Film**: Focus pull in cinematography — background becomes foreground
**When to use**: Dramatic reveals, depth-of-field storytelling
**When NOT to use**: Fast-reading content, multiple blur elements competing

### 3.13 Mirror / Reflection Text (鏡像反射文字)
```css
.type-mirror {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  position: relative;
}
.type-mirror::after {
  content: attr(data-text);
  position: absolute;
  top: 100%; left: 0;
  transform: scaleY(-1);
  opacity: 0.15;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%);
}
```
**Film**: Water reflection shots — Narcissus
**When to use**: Luxury, water themes, reflective surfaces
**When NOT to use**: Dense layouts, small text, multiple stacked headings

### 3.14 Perspective / 3D Rotated Text (透視3D旋轉文字)
```css
.type-perspective {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  transform: perspective(500px) rotateY(-15deg) rotateX(5deg);
  transform-origin: left center;
}
```
**Film**: Star Wars opening crawl — text disappearing into space
**When to use**: Dramatic reveals, hero intros, immersive storytelling
**When NOT to use**: Body text, sidebars, anything needing flat readability

### 3.15 Neon Flicker (霓虹閃爍)
```css
.type-neon {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa,
    0 0 92px #0fa;
  animation: neon-flicker 3s infinite;
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.4; }
}
```
**Film**: Blade Runner — flickering bar signs in the rain
**When to use**: Night themes, cyberpunk, entertainment, nightlife
**When NOT to use**: Daylight themes, corporate, accessibility-first (flicker triggers seizures at high frequency — keep slow)

### 3.16 Hand-Drawn Underline Animation (手繪底線動畫)
```css
.type-hand-underline {
  position: relative;
  display: inline;
}
.type-hand-underline::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 8px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 8'%3E%3Cpath d='M0,5 Q40,0 80,5 T160,5 T200,5' stroke='%23ff6b35' stroke-width='3' fill='none'/%3E%3C/svg%3E") repeat-x;
  background-size: 200px 8px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-hand-underline.visible::after {
  transform: scaleX(1);
}
```
**Film**: Wes Anderson handwritten notes — the human touch
**When to use**: Emphasis, editorial highlights, warm/human brands
**When NOT to use**: Multiple underlines on one page (loses impact)

### 3.17 Highlighted / Marker Effect (螢光筆效果)
```css
.type-highlight {
  background: linear-gradient(to right, #ffe066 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.5s ease;
  padding: 0.1em 0.2em;
  margin: 0 -0.2em;
  font-weight: 600;
}
.type-highlight.visible {
  background-position: 0% 0;
}
```
**Film**: Detective's case board — clues circled and highlighted
**When to use**: Inline emphasis, key phrases in paragraphs, testimonials
**When NOT to use**: Full headings (too much highlight kills it), dark backgrounds

### 3.18 Strikethrough Reveal — Crossed Out to Uncrossed (刪除線揭示)
```css
.type-strike-reveal {
  position: relative;
  display: inline-block;
}
.type-strike-reveal::after {
  content: '';
  position: absolute;
  top: 50%; left: -2%;
  width: 104%; height: 3px;
  background: currentColor;
  transform: scaleX(1);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-strike-reveal.revealed::after {
  transform: scaleX(0);
  transform-origin: right;
}
```
**Film**: Redacted documents being declassified — truth emerging
**When to use**: Pricing (old price struck through), before/after, reveals
**When NOT to use**: Large headings, critical content that must be read immediately

### 3.19 Letter Spacing Expansion (字距擴張動畫)
```css
.type-spacing-expand {
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  transition: letter-spacing 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-spacing-expand.visible {
  letter-spacing: 0.5em;
}
```
**Film**: Interstellar title sequence — words expanding into the void
**When to use**: Dramatic reveal, luxury brands, space themes
**When NOT to use**: Long words (overflow issues), body text

### 3.20 Animated Gradient Text (動態漸層文字)
```css
.type-animated-gradient {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(90deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 6s ease infinite;
}
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
**Film**: Aurora borealis timelapses — color always moving
**When to use**: Eye-catching hero text, creative brands, music
**When NOT to use**: More than one per page, body text, where it distracts from content

### 3.21 Text Clip Path Reveal (文字裁切揭示)
```css
.type-clip-reveal {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-clip-reveal.visible {
  clip-path: inset(0 0% 0 0);
}
```
**Film**: Theatrical curtain opening — text revealed from left to right
**When to use**: Directional reveals, section intros
**When NOT to use**: When the reveal direction conflicts with reading direction in RTL

### 3.22 Bouncing Letter Entry (彈跳字母進場)
```css
.type-bounce span {
  display: inline-block;
  opacity: 0;
  transform: translateY(-60px);
  animation: letter-bounce 0.6s forwards;
}
@keyframes letter-bounce {
  0% { opacity: 0; transform: translateY(-60px); }
  60% { opacity: 1; transform: translateY(8px); }
  80% { transform: translateY(-3px); }
  100% { opacity: 1; transform: translateY(0); }
}
/* JS: split text into spans, add animation-delay per letter */
```
**Film**: Pixar opening titles — playful letters dropping in
**When to use**: Playful brands, children's content, fun headings
**When NOT to use**: Serious, corporate, long headings (too many bounces become annoying)

### 3.23 Text Rotation Entrance (文字旋轉進場)
```css
.type-rotate-in {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  opacity: 0;
  transform: rotateX(90deg);
  transform-origin: bottom center;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-rotate-in.visible {
  opacity: 1;
  transform: rotateX(0deg);
}
```
**Film**: Airport departure boards flipping — information arriving
**When to use**: Single-line headings, dramatic section transitions
**When NOT to use**: Multi-line text, subtle pages

### 3.24 Text Elastic Snap (文字彈性回彈)
```css
.type-elastic {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  transform: scaleX(2);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.type-elastic.visible {
  transform: scaleX(1);
  opacity: 1;
}
```
**Film**: Looney Tunes title card — elastic, snapping into place
**When to use**: Playful intros, surprise moments, comedic tone
**When NOT to use**: Elegant, serious, minimal layouts

### 3.25 CSS Counter Animation (CSS計數器動畫)
```js
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const initial = 0;
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(initial + (target - initial) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```
```css
.type-counter {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
```
**Film**: Mission briefing screens — numbers ticking up
**When to use**: Stats, metrics, dashboard heroes, achievement numbers
**When NOT to use**: Non-numeric content, when numbers lack impact

### 3.26 Circular Text (環形文字)
```css
.type-circular {
  position: relative;
  width: 200px; height: 200px;
  animation: rotate-circle 15s linear infinite;
}
@keyframes rotate-circle {
  to { transform: rotate(360deg); }
}
```
```js
// Use JS to position each letter along a circle using transform: rotate + translateY
function circularText(el, text, radius) {
  const chars = text.split('');
  const angleStep = 360 / chars.length;
  el.innerHTML = chars.map((c, i) =>
    `<span style="position:absolute;left:50%;top:50%;transform:rotate(${i * angleStep}deg) translateY(-${radius}px);transform-origin:0 ${radius}px">${c}</span>`
  ).join('');
}
```
**Film**: Vinyl record labels spinning — text orbiting a center
**When to use**: Badges, decorative flourishes, "scroll down" indicators
**When NOT to use**: Primary content, readability-first, large amounts of text

### 3.27 Distortion/Wave Text (波浪扭曲文字)
```css
.type-wave span {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
}
.type-wave span:nth-child(2n) { animation-delay: 0.1s; }
.type-wave span:nth-child(3n) { animation-delay: 0.2s; }
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
```
**Film**: Underwater scenes — text rippling like water surface
**When to use**: Playful, musical, water/nature themes
**When NOT to use**: Readable body text, more than one heading, serious content

### 3.28 Text Inversion on Scroll (滾動反色文字)
```css
.type-invert-section {
  color: #000;
  background: #fff;
  transition: color 0.3s, background 0.3s;
}
.type-invert-section.inverted {
  color: #fff;
  background: #000;
}
```
```js
const section = document.querySelector('.type-invert-section');
const observer = new IntersectionObserver(([e]) => {
  section.classList.toggle('inverted', e.intersectionRatio > 0.5);
}, { threshold: [0, 0.5, 1] });
observer.observe(section);
```
**Film**: Black-to-white scene transitions in Memento — reality flipping
**When to use**: Section transitions, dramatic mood shifts, dark/light toggle
**When NOT to use**: Subtle pages, when it fights with the site's color scheme

---

## Category 4: Text as Decoration (文字作為裝飾)

### 4.1 Watermark Text (浮水印大字)
```css
.type-watermark {
  font-size: 25vw;
  font-weight: 900;
  color: rgba(255,255,255,0.03);
  position: absolute;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
```
**Film**: Background graffiti in a scene — felt but not read
**When to use**: Background atmosphere, section numbers, brand reinforcement
**When NOT to use**: When it interferes with foreground readability

### 4.2 Marquee Text (滾動字幕)
```css
.type-marquee {
  overflow: hidden;
  white-space: nowrap;
}
.type-marquee-inner {
  display: inline-flex;
  gap: 4rem;
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}
```
**Film**: News ticker in broadcast — information flows
**When to use**: Client logos, testimonial snippets, ambient information
**When NOT to use**: Critical content that must be read on first pass

### 4.3 Vertical Text (直排文字)
```css
.type-vertical {
  writing-mode: vertical-rl;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}
```
**Film**: Japanese cinema credits — vertical elegance
**When to use**: Side labels, decorative borders, section indicators
**When NOT to use**: Primary content, languages that don't support vertical well

### 4.4 Rotated Label (旋轉標籤)
```css
.type-rotated {
  transform: rotate(-90deg);
  transform-origin: left center;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  position: absolute;
  left: 20px;
}
```
**Film**: Magazine spines, film canisters
**When to use**: Section labels, sidebar annotations, metadata
**When NOT to use**: Anything that needs quick readability

### 4.5 Repeating Background Text (重複背景文字)
```css
.type-repeat-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}
.type-repeat-bg span {
  display: block;
  font-size: 5vw;
  font-weight: 900;
  color: rgba(255,255,255,0.02);
  white-space: nowrap;
  line-height: 1.1;
}
.type-repeat-bg span:nth-child(even) {
  transform: translateX(-20%);
}
```
**Film**: Warhol's repetition — same image/text in a grid
**When to use**: Background texture, brand saturation, editorial sections
**When NOT to use**: Clean minimal layouts, when it competes with foreground

### 4.6 Scattered Text Elements (散落文字元素)
```css
.type-scattered {
  position: absolute;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.15);
  pointer-events: none;
}
.type-scattered:nth-child(1) { top: 10%; left: 5%; transform: rotate(-12deg); }
.type-scattered:nth-child(2) { top: 30%; right: 8%; transform: rotate(8deg); }
.type-scattered:nth-child(3) { bottom: 15%; left: 12%; transform: rotate(-5deg); }
```
**Film**: Detective crime board — notes pinned at angles
**When to use**: Creative/art direction, editorial, mood-setting
**When NOT to use**: Clean, structured, data-driven layouts

### 4.7 Outlined Background Numbers (描邊背景數字)
```css
.type-bg-number {
  font-size: 30vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  position: absolute;
  right: -5vw;
  top: -5vw;
  pointer-events: none;
  user-select: none;
  line-height: 0.8;
}
```
**Film**: Sports jerseys behind players — number as identity
**When to use**: Section numbering, feature grids, step indicators
**When NOT to use**: Pages without clear numerical order

### 4.8 Ticker Tape (股票跑馬燈)
```css
.type-ticker {
  display: flex;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem 0;
}
.type-ticker-inner {
  display: flex;
  gap: 3rem;
  animation: ticker 30s linear infinite;
  white-space: nowrap;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}
.type-ticker-inner .separator {
  color: rgba(255,255,255,0.15);
}
@keyframes ticker {
  to { transform: translateX(-50%); }
}
```
**Film**: Bloomberg terminal — data flowing constantly
**When to use**: Tech features, stats, client names, ambient data
**When NOT to use**: When it looks like an ad banner

### 4.9 Diagonal Stripe Text (斜線條紋文字)
```css
.type-diagonal-stripe {
  font-size: 8vw;
  font-weight: 900;
  background: repeating-linear-gradient(
    -45deg,
    currentColor 0px,
    currentColor 2px,
    transparent 2px,
    transparent 6px
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
**Film**: Vintage warning labels — text as texture
**When to use**: Decorative headings, retro themes, editorial art
**When NOT to use**: Small text, readability-critical content

### 4.10 Bracket-Framed Text (括號框架文字)
```css
.type-bracketed {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255,255,255,0.4);
}
.type-bracketed::before { content: '['; font-size: 1.2em; }
.type-bracketed::after { content: ']'; font-size: 1.2em; }
```
**Film**: Technical readouts on HUD displays — bracketed data
**When to use**: Labels, metadata, decorative category tags
**When NOT to use**: Primary content, large text

### 4.11 Double Marquee — Opposite Directions (雙向跑馬燈)
```css
.type-double-marquee {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}
.type-double-marquee .row-1 { animation: marquee-left 25s linear infinite; }
.type-double-marquee .row-2 { animation: marquee-right 25s linear infinite; }
@keyframes marquee-left { to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```
**Film**: City highway traffic — two lanes flowing in opposite directions
**When to use**: Section dividers, decorative interludes, client logos
**When NOT to use**: Content that must be read, single-direction flow suffices

---

## Category 5: Text Animation on Scroll (滾動文字動畫)

### 5.1 Scale on Scroll (滾動縮放)
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 based on section position */;
  el.style.transform = `scale(${1 + progress * 2})`;
  el.style.opacity = 1 - progress * 0.8;
});
```
**Film**: Hitchcock Vertigo zoom — dolly zoom text
**When to use**: Immersive single-section moments, chapter transitions
**When NOT to use**: Pages with many sections (too much motion)

### 5.2 Horizontal Scroll Text (水平滾動文字)
```css
.type-hscroll {
  font-size: 20vw;
  white-space: nowrap;
  transform: translateX(100vw);
}
```
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  el.style.transform = `translateX(${100 - progress * 200}vw)`;
});
```
**Film**: Star Wars opening crawl — but horizontal
**When to use**: Large decorative text that scrolls across the viewport
**When NOT to use**: Text that must be read carefully

### 5.3 Parallax Text Layers (視差文字層)
```css
.type-parallax-back {
  font-size: 15vw;
  opacity: 0.05;
  transform: translateY(calc(var(--scroll) * 0.3));
}
.type-parallax-front {
  font-size: 3rem;
  transform: translateY(calc(var(--scroll) * -0.1));
}
```
**Film**: Opening credits with depth — foreground/background text
**When to use**: Hero sections with layered depth, brand name behind content
**When NOT to use**: Content-heavy sections where parallax distracts

### 5.4 Sticky Fade Sequence (黏性淡入序列)
```css
.type-sticky-container { height: 300vh; }
.type-sticky-text {
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  transition: opacity 0.5s;
}
```
```js
// JS: change text content at scroll thresholds
const texts = ['Innovation', 'Design', 'Execution'];
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 within container */;
  const index = Math.min(Math.floor(progress * texts.length), texts.length - 1);
  el.textContent = texts[index];
});
```
**Film**: Chapter interstitials — one word at a time
**When to use**: Value propositions, storytelling sequences, manifesto statements
**When NOT to use**: When users need to scroll fast past this section

### 5.5 Character Stagger Reveal (逐字揭露)
```css
.type-char-reveal span {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) rotateX(90deg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-char-reveal.visible span {
  opacity: 1;
  transform: none;
}
/* JS: split text into <span> per character, stagger delay */
```
**Film**: Title card where each letter drops into place
**When to use**: Hero headings, section titles on first view
**When NOT to use**: Repeated reveals (stagger fatigue), body text

### 5.6 Word-by-Word Opacity (逐詞透明度)
```css
.type-word-reveal span {
  opacity: 0.15;
  transition: opacity 0.4s ease;
}
.type-word-reveal span.active {
  opacity: 1;
}
```
```js
const words = el.querySelectorAll('span');
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  const activeIndex = Math.floor(progress * words.length);
  words.forEach((w, i) => w.classList.toggle('active', i <= activeIndex));
});
```
**Film**: Karaoke subtitles — words lighting up in sequence
**When to use**: Manifesto sections, storytelling, emphasizing each word
**When NOT to use**: Short text, when scroll range is too tight for word count

### 5.7 Scroll-Linked Rotation (滾動連結旋轉)
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  el.style.transform = `rotate(${progress * 360}deg)`;
});
```
**Film**: Vertigo spirals — spinning into obsession
**When to use**: Single decorative element, badge, circular text
**When NOT to use**: Readable text, anything longer than one word

### 5.8 Pinned Section with Changing Text (釘選區域文字變換)
```css
.type-pinned-section {
  height: 400vh;
  position: relative;
}
.type-pinned-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.type-pinned-content .text-item {
  position: absolute;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}
.type-pinned-content .text-item.active {
  opacity: 1;
  transform: translateY(0);
}
```
**Film**: Film chapter titles — pinned frame, changing words
**When to use**: Feature lists, process steps, value statements
**When NOT to use**: Short sections, when users expect normal scrolling

### 5.9 Text Stroke Fill on Scroll (滾動描邊填充)
```css
.type-scroll-stroke {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  -webkit-text-stroke: 2px #fff;
  color: transparent;
  transition: color 0.1s linear;
}
```
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  if (progress > 0.5) {
    el.style.color = '#fff';
    el.style.webkitTextStroke = '0px';
  } else {
    el.style.color = 'transparent';
    el.style.webkitTextStroke = '2px #fff';
  }
});
```
**Film**: Lights turning on as a character walks through a dark room
**When to use**: Dramatic mid-scroll moment, outline-to-solid transition
**When NOT to use**: When 3.11 (non-scroll version) is already used on the same page

### 5.10 Scroll-Triggered Counter (滾動觸發計數器)
```js
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    animateCounter(el, parseInt(el.dataset.target), 2000);
    observer.unobserve(el);
  }
}, { threshold: 0.5 });
observer.observe(el);
```
**Film**: Mission briefing countdown — numbers becoming real
**When to use**: Statistics sections, achievement numbers, dashboards
**When NOT to use**: Non-numeric content, when there are too many counters (>6)

### 5.11 Text Unmasking on Scroll (滾動揭幕文字)
```css
.type-unmask {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  position: relative;
  overflow: hidden;
}
.type-unmask .mask {
  position: absolute;
  inset: 0;
  background: var(--bg-color);
  transform: scaleX(1);
  transform-origin: right;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-unmask.visible .mask {
  transform: scaleX(0);
}
```
**Film**: Curtain rising on a stage — the reveal
**When to use**: Section headings, dramatic one-time reveals
**When NOT to use**: Repeated elements, content that scrolls in and out of view

### 5.12 Zoom + Fade Through (穿越縮放淡出)
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  el.style.transform = `scale(${1 + progress * 5})`;
  el.style.opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;
  el.style.filter = `blur(${progress * 10}px)`;
});
```
**Film**: Approaching a portal — text grows, blurs, and disappears
**When to use**: Transitions between major sections, immersive moments
**When NOT to use**: Multiple per page, content-heavy sections

### 5.13 Split Scroll — Left Fixed, Right Scrolls (分屏滾動)
```css
.type-split-scroll {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}
.type-split-scroll .left {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem;
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
}
.type-split-scroll .right {
  padding: 4rem;
}
```
**Film**: Split-screen conversations in 500 Days of Summer
**When to use**: Feature explanations, before/after, title + content pairs
**When NOT to use**: Mobile (needs a stacked fallback), simple layouts

### 5.14 Scroll Progress Line Under Text (滾動進度底線)
```css
.type-progress-line {
  position: relative;
  display: inline-block;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
}
.type-progress-line::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  height: 3px;
  background: currentColor;
  width: 0%;
  transition: width 0.1s linear;
}
```
```js
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 within section */;
  el.querySelector('::after') // Use JS to set width
  el.style.setProperty('--progress', `${progress * 100}%`);
});
/* CSS: width: var(--progress); on the ::after */
```
**Film**: Loading bar before a mission starts
**When to use**: Section headings that show reading progress
**When NOT to use**: Decorative headings that are not progress-related

### 5.15 Typewriter on Scroll (滾動打字機)
```js
const text = el.dataset.text;
window.addEventListener('scroll', () => {
  const progress = /* 0 to 1 */;
  const charCount = Math.floor(progress * text.length);
  el.textContent = text.substring(0, charCount);
});
```
```css
.type-scroll-typewriter {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.2rem;
  min-height: 3em;
  border-right: 2px solid currentColor;
}
```
**Film**: Decrypting a message as time passes
**When to use**: Storytelling sections, code reveals, manifesto statements
**When NOT to use**: Long paragraphs (scroll distance becomes absurd)

---

## Category 6: Quiet / Functional Typography (安靜/功能性排版)

A film has quiet scenes too. Not every section needs drama. These techniques handle body text, labels, data, and supporting content with precision and care. They are JUST AS IMPORTANT as the dramatic techniques above.

### 6.1 Perfect Body Text (完美本文)
```css
.type-body {
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.7;
  max-width: 65ch;
  color: rgba(255,255,255,0.8);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.type-body p + p {
  margin-top: 1.5em;
}
```
**Film**: A quiet conversation in Lost in Translation — nothing showy, but every word lands
**When to use**: Any paragraph text, descriptions, about sections
**When NOT to use**: Never skip this for body content. Even dramatic pages need readable paragraphs.

### 6.2 Small Caps Labels (小型大寫標籤)
```css
.type-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  font-variant: small-caps;
}
```
**Film**: Museum plaques beside paintings — informative, invisible
**When to use**: Form labels, section overlines, metadata, category tags
**When NOT to use**: Large text, headings, anything meant to grab attention

### 6.3 Readable Letter-Spacing (可讀性字距)
```css
.type-spaced-readable {
  font-size: clamp(0.85rem, 1vw, 1rem);
  letter-spacing: 0.03em;
  line-height: 1.8;
  font-weight: 400;
  color: rgba(255,255,255,0.7);
  max-width: 60ch;
}
```
**Film**: Subtitles on a foreign film — must be instantly readable
**When to use**: Body text that needs extra airiness, long-form reading
**When NOT to use**: Headings (letter-spacing at this level kills impact)

### 6.4 Monospace for Data (等寬字體資料區)
```css
.type-mono-data {
  font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  padding: 1.5rem 2rem;
  overflow-x: auto;
  tab-size: 2;
}
```
**Film**: The Social Network — code on screens, data on whiteboards
**When to use**: Code snippets, API responses, data tables, terminal output
**When NOT to use**: Prose, marketing copy, anything meant to feel warm

### 6.5 Caption Text (圖片說明文字)
```css
.type-caption {
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.4);
  font-weight: 400;
  margin-top: 0.75rem;
  max-width: 50ch;
}
.type-caption strong {
  color: rgba(255,255,255,0.6);
  font-weight: 600;
}
```
**Film**: Photo captions in National Geographic — small, precise, respectful of the image
**When to use**: Below images, charts, diagrams, embedded media
**When NOT to use**: Standalone text blocks, anything needing prominence

### 6.6 Footnote Style (註腳樣式)
```css
.type-footnote {
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.35);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1rem;
  margin-top: 3rem;
  max-width: 50ch;
}
.type-footnote sup {
  color: rgba(255,255,255,0.5);
  font-weight: 600;
  margin-right: 0.3em;
}
```
**Film**: Academic text in A Beautiful Mind — the fine print that matters
**When to use**: Legal disclaimers, source citations, supplementary info
**When NOT to use**: Primary content, anything the user must read first

### 6.7 Breadcrumb / Nav Text (麵包屑/導覽文字)
```css
.type-breadcrumb {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.type-breadcrumb a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s ease;
}
.type-breadcrumb a:hover {
  color: rgba(255,255,255,0.8);
}
.type-breadcrumb .separator {
  color: rgba(255,255,255,0.2);
  font-size: 0.65rem;
}
```
**Film**: Chapter headings at the top of each page in a novel
**When to use**: Navigation, wayfinding, page hierarchy indicators
**When NOT to use**: As decoration, in hero sections

### 6.8 Balanced Subheading (平衡副標題)
```css
.type-subhead {
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  font-weight: 500;
  line-height: 1.5;
  color: rgba(255,255,255,0.6);
  max-width: 55ch;
  text-wrap: balance;
}
```
**Film**: The supporting actor — not the star, but essential to the scene
**When to use**: Below hero headings, section intros, feature descriptions
**When NOT to use**: Where it competes with the heading above it

### 6.9 List / Bullet Text (列表文字)
```css
.type-list {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.7);
  padding-left: 0;
  list-style: none;
}
.type-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}
.type-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
}
```
**Film**: Mission briefing checklist — clear, sequential, no fuss
**When to use**: Feature lists, benefits, specs, any enumerated content
**When NOT to use**: When items need visual weight (use cards instead)

### 6.10 Inline Code / Highlight (行內代碼/標記)
```css
.type-inline-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875em;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 0.15em 0.4em;
  color: rgba(255,255,255,0.8);
}
```
**Film**: Terminal readouts in war rooms — small, precise, coded
**When to use**: Inline technical terms, variable names, keyboard shortcuts
**When NOT to use**: Non-technical content, marketing copy

### 6.11 Muted Overline (淡化眉標)
```css
.type-overline {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.75rem;
}
```
**Film**: "Chapter 3" above a chapter title — context, not content
**When to use**: Above headings to add category/context, section labels
**When NOT to use**: Below headings (that is a subtitle, not an overline)

### 6.12 Centered Pull Quote (置中引言)
```css
.type-pull-quote {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  color: rgba(255,255,255,0.6);
  text-align: center;
  max-width: 45ch;
  margin: 3rem auto;
  position: relative;
}
.type-pull-quote::before {
  content: '\201C';
  font-size: 3em;
  color: rgba(255,255,255,0.1);
  position: absolute;
  top: -0.3em; left: -0.3em;
  font-style: normal;
}
```
**Film**: The quiet moment in a drama where someone speaks truth
**When to use**: Testimonials, customer quotes, editorial pull quotes
**When NOT to use**: Multiple back-to-back quotes, hero sections

### 6.13 Table Header Text (表格標題文字)
```css
.type-table-header {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  text-align: left;
}
.type-table-cell {
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255,255,255,0.7);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-variant-numeric: tabular-nums;
}
```
**Film**: Spreadsheets in Moneyball — data that tells a story quietly
**When to use**: Pricing tables, comparison grids, spec sheets
**When NOT to use**: Marketing copy formatted as a table

### 6.14 Tag / Chip Text (標籤/碎片文字)
```css
.type-tag {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px;
  padding: 0.3em 0.8em;
  display: inline-block;
}
```
**Film**: File folder tabs in an office — categorization
**When to use**: Blog post tags, feature badges, filter chips
**When NOT to use**: Primary navigation, CTAs

### 6.15 Timestamp / Metadata (時間戳/元資料)
```css
.type-timestamp {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255,255,255,0.3);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}
```
**Film**: "3 days earlier" title cards — temporal context
**When to use**: Blog dates, last-updated indicators, event times
**When NOT to use**: As a decorative element

### 6.16 Button / CTA Text (按鈕/行動呼籲文字)
```css
.type-button {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: none; /* Sentence case for friendliness */
  line-height: 1;
}
.type-button-sm {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
}
```
**Film**: "Press any key to continue" — clear, actionable, no drama
**When to use**: All buttons, links, CTAs
**When NOT to use**: Never style buttons like headings or decorative text

---

## Usage Rules

1. **Every hero section** must use at least ONE technique from Categories 1-5
2. **Every content section** must use at least ONE technique from Category 6
3. **No two adjacent sections** should use the same typography technique
4. **Full-width text** (Category 1) should appear at most 2 times per page
5. **Text effects** (Category 3) should be used sparingly — 2-3 per page max
6. **Decorative text** (Category 4) can repeat as atmospheric elements
7. **Quiet typography** (Category 6) is the backbone — it should cover 60% of any page
8. Always ask: "Is this text being READ or being SEEN?" — READ = Category 6, SEEN = Categories 1-5
9. **Scroll animations** (Category 5) should not exceed 3 per page or the site feels like a theme park
10. **Mix dramatic and quiet** — a page that is ALL Category 1 is as bad as a page that is ALL Category 6
