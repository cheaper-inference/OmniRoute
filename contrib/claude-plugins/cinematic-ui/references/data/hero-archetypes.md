# Hero Archetypes Library — 30 Cinematic Hero Structures

> ⚠️ Every hero MUST include visual elements beyond text. See `visual-elements.md` for the library.
> Minimum 2 visual elements per hero. Text-only heroes are GARBAGE (see anti-garbage.md).

Every hero section must start from an archetype. Archetypes define the **skeleton** (locked) while leaving **skin** (flex) to the director + DNA system.

**Usage:** Step 3.9 — after Director's Brief, before Storyboard. Select archetype via Director Preference Pool mechanism.

---

## How This Works

```
1. Filter: keep only archetypes where chosen director is Tier 1 or Tier 2
2. Pool: typically 12-18 archetypes survive filtering
3. Select: use site-name hash to pick starting position, walk the pool
4. Resolve flex: each flex dimension enters Director's Preference Pool for validation
5. Record in storyboard.md before Scene 1
```

### Archetype Entry Format

- **Locked** = structural skeleton, cannot be changed by director/DNA
- **Flex** = options that go through director pool validation ("would this director use this?")
- **Forbidden** = combinations that break this archetype's logic
- **Director Fit** = Tier 1 (perfect) / Tier 2 (works with adaptation) / Tier 3 (avoid)

---

## Hero Composition Patterns (空間構圖參考)

> ⚠️ 這些是**起點和靈感**，不是模板。禁止原封不動照抄。
> 你必須根據 Archetype + Director + Niche **混搭、變形、組合**這些 Pattern。
> 例如：S+D = 左文字右產品預覽 / C+L = 居中文字但三層深度 / F+G = 框架內全出血背景
> 每次使用都要問自己：「這個導演會怎麼重新詮釋這個佈局？」

### Pattern S: Split Showcase（分割展示）
```
┌─────────────────────────────────────┐
│  [文字區]          │  [視覺區]       │
│  標題              │  浮動卡片 ×2-3  │
│  副標題            │  漸層光球       │
│  CTA 按鈕組        │  幾何裝飾       │
│  Stats bar         │  產品預覽(CSS)  │
└─────────────────────────────────────┘
```
**CSS:** `display: grid; grid-template-columns: 1fr 1fr;`
**適合 Archetype:** #13, #14, #15 (Split family), #9
**視覺元素放右側**，文字放左側（RTL 語言反轉）。右側是「舞台」，放 3-5 個浮動元素。

### Pattern C: Centered with Satellites（中心 + 衛星）
```
┌─────────────────────────────────────┐
│        [浮動卡]          [Badge]    │
│                                     │
│    [裝飾]    標題      [光球]       │
│              副標題                 │
│              CTA                    │
│                                     │
│  [Stats]                [浮動卡]    │
└─────────────────────────────────────┘
```
**CSS:** `position: relative;` 所有浮動元素用 `position: absolute` + 百分比定位
**適合 Archetype:** #1, #2, #3, #7, #8, #10, #11, #18, #25
**文字居中，4-6 個浮動元素分佈在四周**。像行星繞太陽。元素要有 `animation: float` 微動。

### Pattern L: Layered Depth（層次深度）
```
┌─────────────────────────────────────┐
│ [背景層] 漸層光球 ×2 + 幾何形狀     │
│ ┌─────────────────────────────────┐ │
│ │ [中景層] 裝飾框線 / 角括號       │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │ [前景層] 標題 + CTA + Stats │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```
**CSS:** 多層 `position: absolute` + z-index 分層，`backdrop-filter` 在中景
**適合 Archetype:** #2, #4, #5, #6, #17, #28
**三層結構**：背景（氛圍）→ 中景（裝飾框架）→ 前景（內容）。每層至少 1 個視覺元素。

### Pattern D: Dashboard Preview（產品預覽）
```
┌─────────────────────────────────────┐
│          Badge + 標題 + 副標題       │
│          CTA 按鈕組                  │
│          Stats bar                   │
│  ┌───────────────────────────────┐  │
│  │    CSS 模擬的產品介面截圖      │  │
│  │    (dashboard / editor / app)  │  │
│  │    浮動 metric 卡 ×2          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```
**CSS:** 上下結構，下半部是 `border + border-radius + inner grid` 模擬產品 UI
**適合 Archetype:** #19, #20, #22, #24, #26 + 任何 SaaS 網站
**用純 CSS 畫一個迷你產品預覽**（色塊、假進度條、假甘特圖、假 sidebar）。是 SaaS hero 最強的視覺錨點。

### Pattern F: Framed Stage（框架舞台）
```
┌─────────────────────────────────────┐
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  │
│  ╎  [Badge]                     ╎  │
│  ╎       標題                   ╎  │
│  ╎       副標題                 ╎  │
│  ╎       CTA                   ╎  │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  │
│  [浮動卡突出框外]    [裝飾突出框外] │
│          Stats bar                  │
└─────────────────────────────────────┘
```
**CSS:** `border: 1px solid` 框架 + 部分元素用 negative margin 突出框外
**適合 Archetype:** #4, #18, #21, #29, #30
**核心內容在框內，部分浮動元素故意突出框外**。創造「打破第四面牆」的感覺。

### Pattern G: Full-Bleed Impact（全出血衝擊）
```
┌─────────────────────────────────────┐
│ ██████████████████████████████████  │
│ █ 全屏背景（漸層/材質/動態）     █  │
│ █                                █  │
│ █        超大標題                █  │
│ █     [浮動 Badge]  [Stats]     █  │
│ █                                █  │
│ ██████████████████████████████████  │
│         ↓ Scroll indicator          │
└─────────────────────────────────────┘
```
**CSS:** 全屏深色/飽和背景 + 最少 UI + 強烈對比的浮動元素
**適合 Archetype:** #5, #6, #10, #12, #23, #27
**背景本身就是視覺元素**（材質、動態漸層、粒子）。浮動元素要少而精（1-2 個高對比 badge）。

### 使用規則
1. Phase 2 選定 Archetype 後，選 1-2 個 Pattern 作為**混搭起點**（記錄在 storyboard.md）
2. **必須變形**：改變比例、旋轉方向、合併兩個 Pattern、移動元素位置、加入導演特色
3. Phase 3 compile 時，寫出**具體的、已經混搭變形過的** CSS grid/position 佈局
4. 浮動元素的**數量、位置、大小**都要根據導演風格調整：
   - Wes Anderson → 元素嚴格對稱、等距、精確定位
   - Villeneuve → 元素稀疏、大量留白、偏移到邊緣
   - Tarantino → 元素大膽重疊、不規則、高對比
   - Miyazaki → 元素有機散佈、大小不一、像風吹過的
5. **禁止**：兩個不同站用完全相同的 Pattern 佈局 — 必須有可見的結構差異

---

## Family A: Immersive (全屏沉浸) — #1-6

The user is enveloped. Screen = world. No UI chrome feeling.

---

### #1 The Void Entry

**Core:** Screen starts near-empty. Content materializes from nothing.

**Locked**
- Structure: 100vh, near-empty initial state
- Narrative: genesis — something emerges from void
- Initial state: background color/texture only, no visible content
- Animation: content fades/grows/assembles into view (duration 2s+)

**Flex**
- Materialization method: [fade from black | particle assembly | blur-to-sharp | draw-on SVG stroke | typewriter letter-by-letter]
- Background: [solid dark | solid light | subtle texture | gradient atmosphere]
- Content that appears: [headline only | headline + subtext | image/logo | video frame]
- Text position after reveal: [center | bottom-left | bottom-center | top-left]

**Forbidden**
- ❌ Instant content visibility (defeats void concept)
- ❌ Busy background (must feel empty first)
- ❌ Multiple simultaneous reveals (one focal point)

**Director Fit**
- Tier 1: Kubrick (2001 monolith), Villeneuve (Dune sandstorm reveal), Tarkovsky (slow emergence)
- Tier 2: Fincher (dark patience), Nolan (darkness to light), Malick (nature from black)
- Tier 3: Guy Ritchie, Edgar Wright (too fast-paced for void)

**Reference:** 2001: A Space Odyssey star gate sequence, Apple product launch black-to-product

**Required visual elements (min 2):** #15 (Gradient Fog Layer), #17 (Floating Orb), #27 (Animated Underline)

---

### #2 Atmosphere Bath

**Core:** Full-bleed visual environment — the user walks INTO a world. Not a page, a place.

**Locked**
- Structure: 100vh full-bleed, no max-width container
- Narrative: world-building — establishing the universe before any message
- Visual priority: environment > text (text is secondary, floating in the atmosphere)
- Must have: light source direction + atmospheric layers (fog/gradient/grain)

**Flex**
- Atmosphere type: [fog + distant light | gradient sky | grain + vignette | bokeh lights | rain/snow particle]
- Text role: [small corner label | large but low-opacity watermark | mid-size floating | no text initially]
- Light source: [top-right warm | bottom cool | center glow | side shaft | ambient diffuse]
- Depth layers: [2 layers (bg + fg) | 3 layers (bg + mid + fg) | parallax scroll layers]

**Forbidden**
- ❌ Contained max-width box (breaks immersion)
- ❌ Standard nav overlaying the atmosphere (nav must integrate or hide)
- ❌ Multiple CTA buttons

**Director Fit**
- Tier 1: Villeneuve (Dune desert), Zhang Yimou (Hero color worlds), Malick (nature immersion)
- Tier 2: Ridley Scott (Blade Runner rain), Cuarón (Gravity space), del Toro (underwater/dark)
- Tier 3: Wes Anderson (too structured for raw atmosphere), Tarantino (dialogue > environment)

**Reference:** Blade Runner 2049 orange wasteland, Dune Arrakis establishing shot

**Required visual elements (min 2):** #14 (Radial Gradient Blob), #18 (Grain Texture Overlay), #29 (Subtle Grid Lines)

---

### #3 Slow Reveal

**Core:** Content is hidden. Scrolling progressively uncovers it.

**Locked**
- Structure: 100vh sticky wrapper with 200-400vh scroll height
- Narrative: suspense — information withheld, then revealed at user's pace
- Scroll: mandatory — scroll drives the reveal (no auto-play)
- Must have: visible scroll hint or progress cue

**Flex**
- Reveal method: [mask-image wipe | clip-path expand | opacity layers | blur-to-sharp | scale zoom-in]
- What's hidden: [hero image | video | text message | data visualization | illustration]
- Text position: [bottom-left | top-right | center-overlay | appears after reveal | split sides]
- CTA timing: [appears at 80% reveal | after full reveal | no CTA]

**Forbidden**
- ❌ All content visible on load
- ❌ Non-scrolling static layout
- ❌ Multiple competing scroll animations

**Director Fit**
- Tier 1: Villeneuve (patience), Nolan (information layering), Fincher (controlled release)
- Tier 2: Kubrick (deliberate pacing), Hitchcock (suspense master), Cuarón (long take)
- Tier 3: Edgar Wright (smash cuts ≠ slow reveal), Michael Bay (too impatient)

**Reference:** Apple Vision Pro hero, Zajno.com scroll reveals

**Required visual elements (min 2):** #16 (Aurora Gradient Band), #28 (Horizontal Rule Accent), #32 (Scroll Progress Indicator), #7 (Floating Circle)

---

### #4 Letterbox Cinema

**Core:** Cinematic aspect ratio with black bars. The page IS a movie frame.

**Locked**
- Structure: 100vh with horizontal black bars (top + bottom), content in 2.39:1 or 2.76:1 window
- Narrative: cinematic authority — "this is a film, not a website"
- Must have: black or near-black bars, content inside the frame
- Typography must be within the letterbox frame

**Flex**
- Aspect ratio: [2.39:1 widescreen | 2.76:1 ultra-wide | 1.85:1 standard wide | 4:3 retro]
- Content inside frame: [video | still image with text | pure text | animated scene]
- Bar treatment: [pure black | subtle gradient to content | textured | contains metadata]
- Text position inside frame: [lower-third subtitle | center | rule-of-thirds left]

**Forbidden**
- ❌ Content outside the bars (breaks the frame metaphor)
- ❌ Rounded corners on the frame
- ❌ Bright/white bars

**Director Fit**
- Tier 1: Nolan (IMAX to letterbox), Villeneuve (2.39:1 signature), Leone (wide landscapes)
- Tier 2: Kubrick (framing master), Wes Anderson (aspect ratio conscious), PTA (anamorphic)
- Tier 3: Found footage directors, vlog-style (wrong format)

**Reference:** Any Nolan IMAX-to-scope transition, Tarantino's The Hateful Eight 70mm

**Required visual elements (min 2):** #26 (Thin Divider Line), #30 (Corner Bracket Frames), #8 (Rotating Square), #19 (Noise Particle Field)

---

### #5 Video Wall

**Core:** Full-screen video or looping motion as THE hero. Text is a guest, not the host.

**Locked**
- Structure: 100vh with background video/animation covering entire viewport
- Narrative: motion > words — the moving image tells the story
- Video must autoplay, muted, looped (or scroll-controlled)
- Text overlay must be minimal and non-blocking

**Flex**
- Motion source: [pre-shot video | CSS animation | canvas/WebGL | scroll-frame sequence | lottie]
- Text treatment: [corner small text | center minimal | lower-third | no text, only logo | delayed text fade-in]
- Overlay: [none | dark scrim | gradient from bottom | vignette | color grade filter]
- Scroll behavior: [parallax video | scroll-paused video | video plays on scroll | static background]

**Forbidden**
- ❌ Text covering >30% of frame
- ❌ Visible video controls
- ❌ Autoplay with sound
- ❌ Low-quality/pixelated video

**Director Fit**
- Tier 1: Malick (nature footage), Cuarón (long-take immersion), Refn (neon motion)
- Tier 2: Fincher (dark motion), Ridley Scott (atmospheric footage), Gondry (creative motion)
- Tier 3: Wes Anderson (static compositions), dialogue-heavy directors

**Reference:** Tesla.com car footage, Nike campaign heroes, Apple product motion

**Required visual elements (min 2):** #15 (Gradient Fog Layer), #31 (Animated Border Stroke)

---

### #6 Parallax Depth Stage

**Core:** Multiple visual layers at different scroll speeds. The screen has Z-depth.

**Locked**
- Structure: 100vh+ with 3+ parallax layers
- Narrative: depth — the world has foreground, midground, background
- Scroll drives layer movement at different rates
- Must create visual sense of "looking through" layers

**Flex**
- Layer content: [landscape illustration | abstract shapes | photo layers | text at different depths | UI elements at depths]
- Parallax intensity: [subtle (10-30px diff) | moderate (50-100px) | dramatic (100-200px)]
- Foreground element: [text headline | dark gradient | UI frame | decorative element]
- Background element: [image | gradient | texture | pattern | color field]

**Forbidden**
- ❌ Single-layer flat layout
- ❌ All layers moving at same speed
- ❌ Mobile without fallback (parallax must degrade gracefully)

**Director Fit**
- Tier 1: Zhang Yimou (layered bamboo forest), Wes Anderson (dollhouse depth), Miyazaki (multi-plane)
- Tier 2: Nolan (Inception layers), del Toro (layered dark worlds), Spielberg (depth staging)
- Tier 3: Minimalists like Jarmusch (flat composition preference)

**Reference:** Firewatch game site, any Disney multi-plane camera scene

**Required visual elements (min 2):** #9 (Dotted Grid Pattern), #17 (Floating Orb)

---

## Family B: Editorial (編輯排版) — #7-12

Typography IS the design. No hero image needed. The arrangement of text creates the impact.

---

### #7 Type Monument

**Core:** One massive headline dominates the viewport. Scale IS the statement.

**Locked**
- Structure: 100vh, single headline as the visual center of gravity
- Narrative: proclamation — the words are so important they fill the room
- Font size: clamp(4rem, 15vw, 12rem) or larger
- No competing visual elements — text is the only "image"

**Flex**
- Weight: [ultra-light 100-200 (whisper that fills room) | ultra-bold 800-900 (shout) | variable (animated weight)]
- Alignment: [center monument | left-anchored | right-aligned | diagonal]
- Color treatment: [solid | gradient fill | outlined/stroke only | masked with image | knockout (text reveals bg)]
- Supporting text: [none | tiny subtitle below | date/label above | scattered metadata]

**Forbidden**
- ❌ Hero image alongside text (text IS the image)
- ❌ Font size below clamp(3rem, 10vw, 8rem)
- ❌ Multiple paragraphs in the hero

**Director Fit**
- Tier 1: Kubrick (title cards), Godard (text as cinema), Wes Anderson (centered titles)
- Tier 2: Tarantino (chapter titles), Fincher (Se7en credits), Saul Bass (title design)
- Tier 3: Malick (nature > text), action directors (visual > textual)

**Reference:** Bloomberg Businessweek covers, Huge Inc website, any Kubrick title card

**Required visual elements (min 2):** #10 (Half-Circle Arc), #26 (Thin Divider Line), #33 (Hover Glow Effect), #37 (Cursor Trail Particles)

---

### #8 Split Headline Stack

**Core:** Multiple headline lines, each with different typographic treatment. Visual rhythm through text variety.

**Locked**
- Structure: min-height 80vh, stacked headline lines
- Narrative: layered message — each line adds a new dimension
- Each line MUST differ in at least 2 of: size, weight, font, color, spacing, alignment
- Lines stack vertically with intentional spacing variation

**Flex**
- Line count: [2 lines | 3 lines | 4+ lines]
- Variation axis: [weight shifts (light→bold→light) | size shifts (big→small→big) | font family alternation | color shifts]
- Alignment pattern: [all left | alternating left/right | cascading indent | center then left]
- Animation: [stagger line-by-line | all at once | reveal on scroll per line]

**Forbidden**
- ❌ All lines same size/weight/color (defeats the purpose)
- ❌ Hero image (text variety IS the visual interest)
- ❌ More than 6 words per line (this is headlines, not paragraphs)

**Director Fit**
- Tier 1: Godard (playful text), Wes Anderson (typographic precision), Kubrick (title sequences)
- Tier 2: Tarantino (chapter titles), Fincher (credit sequences), Spike Lee (bold text)
- Tier 3: Nature/atmosphere directors (Malick, Villeneuve — prefer image > text)

**Reference:** Studio Feixen, Huge Inc, editorial magazine covers

**Required visual elements (min 2):** #11 (Triangle Pointer), #28 (Horizontal Rule Accent), #34 (Magnetic Button), #14 (Radial Gradient Blob)

---

### #9 Editorial Grid

**Core:** Newspaper/magazine front-page layout. Content arranged in editorial columns and blocks.

**Locked**
- Structure: min-height 90vh, multi-column grid (3+ columns)
- Narrative: authority — "we have so much to say, here's how we organize it"
- Must feel like a designed publication, not a web page
- Requires: hierarchy through type size, not color/image

**Flex**
- Grid type: [classic 3-col broadsheet | modern 4-col asymmetric | modular blocks | masonry]
- Lead story: [large headline spanning 2 cols | full-width top banner | oversized pull quote]
- Image role: [no images (pure text) | small inset photos | one large editorial photo | illustration accents]
- Ornaments: [rule lines | column dividers | drop caps | section labels]

**Forbidden**
- ❌ Single column layout (not editorial)
- ❌ Cards with shadows (too web-UI)
- ❌ Centered everything (editorial = asymmetric hierarchy)

**Director Fit**
- Tier 1: Wes Anderson (graphic design sensibility), Fincher (Zodiac newspaper), Godard (editorial mixing)
- Tier 2: Coen Brothers (literary quality), Kubrick (magazine ad compositions), Spike Lee (text + image)
- Tier 3: Pure atmosphere directors (Villeneuve, Malick — too minimal for editorial density)

**Reference:** New York Times homepage, Bloomberg, Pitchfork

**Required visual elements (min 2):** #12 (Diamond / Rhombus), #29 (Subtle Grid Lines), #30 (Corner Bracket Frames)

---

### #10 Single Word

**Core:** ONE word. That's it. Fill the screen with a single word or very short phrase (2-3 words max).

**Locked**
- Structure: 100vh, single word/phrase scaled to fill viewport
- Narrative: distillation — the message is so clear it needs only one word
- Font size: viewport-relative (10vw+), word IS the layout
- Everything else on screen serves this one word

**Flex**
- Typography: [serif monumental | sans geometric | handwritten | outlined | variable animated]
- Scale method: [static fill | scale-on-scroll | breathing (subtle pulse) | morph from small]
- Context: [word alone | tiny descriptor below | metadata scattered around word | word as texture/pattern]
- Color: [high contrast (black on white / white on black) | tone-on-tone subtle | gradient through text | image-masked text]

**Forbidden**
- ❌ More than 3 words
- ❌ Small font size
- ❌ Competing visual elements
- ❌ Body text paragraphs in hero

**Director Fit**
- Tier 1: Kubrick (minimal title cards), Godard (word as image), Jarmusch (deadpan minimal)
- Tier 2: Wes Anderson (single-word chapters), Fincher (reductive), Refn (minimal + impact)
- Tier 3: Verbose/busy directors (Scorsese, Spielberg — too much happening)

**Reference:** Supreme branding, Kanye album covers, museum exhibition titles

**Required visual elements (min 2):** #7 (Floating Circle), #27 (Animated Underline), #16 (Aurora Gradient Band), #35 (Parallax Micro-Shift)

---

### #11 Manifesto Block

**Core:** A long-form text statement as hero. Not a headline — a paragraph or manifesto that IS the design.

**Locked**
- Structure: min-height 80vh, text block as dominant element
- Narrative: declaration — reading the text IS the experience
- Typography: carefully set body text at reading scale (not headline scale)
- Reading experience: max-width 55-70ch, generous line-height

**Flex**
- Text length: [3-5 sentences | full paragraph | multi-paragraph with breaks]
- Presentation: [all visible on load | typewriter reveal | scroll-reveal per sentence | fade-in stagger]
- Layout: [centered narrow column | left-aligned with wide right margin | pull quote + body | indented from left edge]
- Decoration: [none (pure text) | drop cap | highlight/underline key phrases | marginal annotations]

**Forbidden**
- ❌ Headline-scale font size (this is body text as hero)
- ❌ Images as main element
- ❌ CTA before the text is consumed
- ❌ Line-height below 1.6 (must be comfortable reading)

**Director Fit**
- Tier 1: Malick (voiceover as cinema), Tarkovsky (philosophical slowness), Wong Kar-wai (narrative voice)
- Tier 2: Coen Brothers (literary opening), Wes Anderson (narrator text), Kubrick (A Clockwork Orange opening text)
- Tier 3: Action directors (text patience ≠ their style)

**Reference:** Medium article heroes, literary journal sites, brand manifesto pages

**Required visual elements (min 2):** #13 (Cross / Plus Mark), #15 (Gradient Fog Layer), #27 (Animated Underline), #3 (Testimonial Quote Card), #36 (Text Scramble Effect)

---

### #12 Kinetic Type

**Core:** Text is animated — the typography itself moves, morphs, or reacts.

**Locked**
- Structure: 100vh, text animation as primary visual spectacle
- Narrative: energy — the message has motion, not just meaning
- Animation: text must move with purpose (not random floating)
- Must work without animation (static fallback must still look designed)

**Flex**
- Animation type: [scroll-driven position shifts | character-by-character stagger | word-by-word reveal | weight/size morphing | path-following text]
- Trigger: [auto-play on load | scroll-driven | hover-responsive | intersection-triggered]
- Text quantity: [single headline | multiple words scattered | sentence that assembles | counter/number]
- Motion style: [smooth ease | bouncy spring | mechanical steps | liquid organic]

**Forbidden**
- ❌ Random/purposeless floating
- ❌ Animation that makes text unreadable
- ❌ Animation longer than 5s before readable state
- ❌ No reduced-motion fallback

**Director Fit**
- Tier 1: Edgar Wright (kinetic energy), Gondry (creative motion), Wes Anderson (precise choreography)
- Tier 2: Fincher (Se7en credits), Tarantino (chapter reveals), Guy Ritchie (snap typography)
- Tier 3: Slow-pace directors (Tarkovsky, Malick — kinetic energy contradicts their stillness)

**Reference:** Spotify Wrapped, Apple keynote text animations, award show title cards

**Required visual elements (min 2):** #8 (Rotating Square), #33 (Hover Glow Effect), #19 (Noise Particle Field), #36 (Text Scramble Effect)

---

## Family C: Split & Tension (分割對比) — #13-18

The screen is divided. Two or more forces create visual tension.

---

### #13 Clean Bisect

**Core:** Screen divided exactly in half. Image vs. text, or two contrasting elements.

**Locked**
- Structure: 100vh, two equal halves (vertical or horizontal split)
- Narrative: duality — two sides of the same story
- Each half must be visually distinct (different bg, content type, or treatment)
- No gap between halves (clean seam)

**Flex**
- Split direction: [vertical left/right | horizontal top/bottom]
- Content pairing: [image + text | dark + light | photo + solid color | two images | video + text]
- Text side: [left | right | top | bottom]
- Seam treatment: [invisible clean cut | thin line | diagonal angle | overlapping element bridging both]

**Forbidden**
- ❌ Both halves looking the same
- ❌ Gap/gutter between halves (not a grid, it's a split)
- ❌ More than 2 divisions

**Director Fit**
- Tier 1: De Palma (split diopter), Kubrick (symmetry), Nolan (duality themes)
- Tier 2: Fincher (Fight Club duality), Park Chan-wook (Oldboy), Denis Villeneuve (Arrival mirroring)
- Tier 3: Wes Anderson (prefers centered, not split), Malick (organic, not geometric)

**Reference:** Fashion brand lookbooks, Fight Club poster, any De Palma split-screen

**Required visual elements (min 2):** #38 (Feature Highlight Panel), #1 (Floating Badge), #26 (Thin Divider Line)

---

### #14 Diagonal Clash

**Core:** Angled division cuts across the screen. Dynamic, aggressive tension.

**Locked**
- Structure: 100vh with clip-path or transform-based diagonal division
- Narrative: conflict — two forces meeting at an angle
- The angle itself is a design element, not decoration
- Must have contrast across the divide (color, content, energy)

**Flex**
- Angle: [subtle 5-10° | moderate 15-25° | steep 35-45°]
- Division method: [clip-path polygon | rotated overlay | SVG mask | pseudo-element]
- Content split: [image vs text | dark vs light | two images | before/after]
- Animation: [static | diagonal slides on scroll | angle changes on scroll | hover-responsive]

**Forbidden**
- ❌ Horizontal or vertical split (that's #13)
- ❌ Rounded/curved division (that's Family D territory)
- ❌ Same content on both sides

**Director Fit**
- Tier 1: Guy Ritchie (dynamic angles), Edgar Wright (geometric energy), Tarantino (Kill Bill split)
- Tier 2: Nolan (perspective shifts), Spike Lee (Dutch angles), Michael Mann (diagonal compositions)
- Tier 3: Symmetry directors (Wes Anderson, Kubrick — diagonals disrupt their axis)

**Reference:** Nike campaign splits, Kill Bill poster, sports brand heroes

**Required visual elements (min 2):** #11 (Triangle Pointer), #32 (Scroll Progress Indicator), #18 (Grain Texture Overlay)

---

### #15 Asymmetric Weight

**Core:** Unequal division — one side dominates (60/40, 70/30, or 80/20). Power through imbalance.

**Locked**
- Structure: 100vh or min-height 80vh, visually unequal sides
- Narrative: hierarchy — one element has authority, the other supports
- Dominant side must be clearly heavier (larger image, bolder type, or deeper color)
- Ratio must be intentionally asymmetric (not "almost 50/50")

**Flex**
- Ratio: [60/40 | 70/30 | 80/20]
- Dominant side content: [large image | video | bold typography | illustration]
- Supporting side content: [text + CTA | metadata | white space | small details]
- Dominant side: [left | right]

**Forbidden**
- ❌ Equal 50/50 split (that's #13)
- ❌ Dominant side being text-only unless it's Type Monument scale
- ❌ Supporting side competing for attention

**Director Fit**
- Tier 1: Villeneuve (vast landscape + small human), Kubrick (one-point perspective + asymmetric subject), Fincher (weighted frames)
- Tier 2: Scorsese (character dominance), PTA (There Will Be Blood framing), Spielberg (depth staging)
- Tier 3: Symmetry-first directors in symmetric mode

**Reference:** Portfolio case study heroes, product pages with large product + specs

**Required visual elements (min 2):** #2 (Status Pill), #39 (Code/Terminal Block), #16 (Aurora Gradient Band)

---

### #16 Multi-Panel Grid

**Core:** Screen divided into 3+ distinct panels. Comic-book or film-strip energy.

**Locked**
- Structure: 100vh, 3+ visible panels/cells
- Narrative: multiplicity — many things happening simultaneously or many facets of one story
- Each panel must have distinct content (not repeated cards)
- Panels must feel like a composed grid, not a generic card layout

**Flex**
- Grid pattern: [equal columns | unequal (1 large + 2 small) | 2x2 quadrant | irregular mosaic]
- Panel content: [photos | text blocks | mixed media | numbered items]
- Gap treatment: [no gap (touching panels) | thin hairline | thick gutter | gap as design element]
- Hover behavior: [individual panel zoom | panel expansion pushing others | spotlight (others dim)]

**Forbidden**
- ❌ All panels same size AND same content type (that's a card grid, not a hero)
- ❌ Standard card styling (shadow + radius + padding)
- ❌ Generic grid gap (must be intentional)

**Director Fit**
- Tier 1: Wes Anderson (quadrant compositions), Park Chan-wook (Oldboy/Sympathy triptych), Ang Lee (Hulk comic panels)
- Tier 2: Tarantino (multi-story), Nolan (Dunkirk multi-thread), Soderbergh (Traffic multi-frame)
- Tier 3: Single-focus directors (minimalists who frame one thing at a time)

**Reference:** Virgin Hyperloop site panels, comic-style portfolio sites, Bento grid heroes

**Required visual elements (min 2):** #4 (Mini Feature Card), #40 (Comparison Table Snippet), #10 (Half-Circle Arc)

---

### #17 Overlap Tension

**Core:** Elements deliberately overlap each other. Layers create depth and visual friction.

**Locked**
- Structure: min-height 80vh, at least 2 elements with intentional overlap
- Narrative: collision — elements invade each other's space, creating energy
- Overlap must look intentional (not broken layout)
- Z-index must create clear reading order

**Flex**
- Overlapping elements: [image + text | card + card | headline over image | UI element over content]
- Overlap amount: [slight 10-20% | moderate 30-40% | aggressive 50%+]
- Depth cue: [shadow | blur | opacity | scale difference]
- Animation: [static overlap | scroll-driven separation | hover-responsive shift | parallax layers]

**Forbidden**
- ❌ Accidental-looking overlap (must feel designed)
- ❌ Overlap that makes text unreadable
- ❌ More than 3 overlapping elements (becomes noise)

**Director Fit**
- Tier 1: Wong Kar-wai (layered frames), De Palma (visual complexity), Godard (collage)
- Tier 2: Scorsese (layered compositions), Spike Lee (confrontational overlap), Refn (stylized)
- Tier 3: Clean minimalists (Jarmusch, Ozu — deliberate separation, not overlap)

**Reference:** Fashion editorial layouts, David Carson graphic design, deconstructed portfolio sites

**Required visual elements (min 2):** #5 (Pricing Snippet Card), #14 (Radial Gradient Blob)

---

### #18 Framed Viewport

**Core:** Content is inside a visible frame or border. The screen has a "window" looking into the content.

**Locked**
- Structure: 100vh with visible border/frame inset from edges
- Narrative: gallery — content is displayed, curated, presented within a frame
- Frame must be visible (border, inset margin, or architectural element)
- Content exists inside the frame; outside is neutral/dark

**Flex**
- Frame type: [thin border | thick architectural border | rounded window | arch shape | device frame]
- Frame color: [white on dark | dark on light | accent color | gradient]
- Content inside: [image | video | scene | text composition]
- Frame animation: [static | expands on scroll | shrinks to focus | rotate/tilt]

**Forbidden**
- ❌ Frame that looks like a browser window or phone mockup (too literal)
- ❌ No visible frame edge (then it's just a full-bleed hero)
- ❌ Frame covering content

**Director Fit**
- Tier 1: Wes Anderson (frame-within-frame obsession), Kubrick (doorway framing), Hitchcock (Rear Window)
- Tier 2: Wong Kar-wai (framed through doorways), PTA (architectural framing), Ozu (frame compositions)
- Tier 3: Handheld/chaotic directors (Greengrass — anti-frame aesthetic)

**Reference:** Grand Budapest Hotel nested frames, gallery/museum websites, Ozu doorway shots

**Required visual elements (min 2):** #30 (Corner Bracket Frames), #13 (Cross / Plus Mark), #17 (Floating Orb)

---

## Family D: Interactive (互動驅動) — #19-24

The hero responds to user action. Not passive viewing — active participation.

---

### #19 Cursor Reactive

**Core:** The hero visually responds to mouse/cursor position in real-time.

**Locked**
- Structure: 100vh with JS cursor tracking
- Narrative: presence — the page acknowledges the user's existence
- Must respond immediately (<16ms) to cursor movement
- Must have graceful mobile fallback (gyroscope or static)

**Flex**
- Reaction type: [parallax layers follow cursor | spotlight/flashlight effect | 3D tilt perspective | magnetic elements | cursor-driven particle field]
- Intensity: [subtle ambient (5-15px movement) | moderate interactive (20-50px) | dramatic (50px+)]
- Content: [text + interactive bg | 3D object responds | entire scene tilts | elements scatter/attract]
- Visual style: [dark + light reveal | layered depth | color shift | distortion]

**Forbidden**
- ❌ Laggy response (must be requestAnimationFrame smooth)
- ❌ No reduced-motion alternative
- ❌ Cursor effects without content substance
- ❌ Custom cursor that replaces system cursor without reason

**Director Fit**
- Tier 1: Gondry (interactive imagination), Spike Jonze (user-as-character), Edgar Wright (reactive energy)
- Tier 2: Fincher (controlled precision), Nolan (interactive puzzles), Villeneuve (environment responds)
- Tier 3: Non-interactive aesthetic directors (Ozu, Jarmusch — stillness > reaction)

**Reference:** Apple AirPods Pro spatial audio page, Stripe homepage, Linear app

**Required visual elements (min 2):** #37 (Cursor Trail Particles), #9 (Dotted Grid Pattern), #7 (Floating Circle)

---

### #20 Scroll-Triggered Sequence

**Core:** Scroll position controls a frame-by-frame sequence — like scrubbing through a video.

**Locked**
- Structure: sticky wrapper (200-500vh scroll height), content changes with scroll %
- Narrative: control — user directs the pace of revelation
- Scroll must feel 1:1 responsive (no delayed/debounced reactions)
- Clear visual feedback that scroll is progressing

**Flex**
- Sequence content: [image sequence (product rotation) | text stages (step 1→2→3) | scene transformation | illustration build-up | data/chart progression]
- Frame count: [10-30 for simple | 30-60 for smooth | 60+ for video-like]
- Transition between frames: [hard cut | crossfade | morph | slide]
- Supporting content: [side text that changes | progress indicator | stage labels | none]

**Forbidden**
- ❌ Automatic playback (scroll must control)
- ❌ Jarring frame jumps (needs enough frames for smoothness)
- ❌ No scroll progress indication
- ❌ Entire page locked in scroll sequence (must end and release)

**Director Fit**
- Tier 1: Nolan (time manipulation), Kubrick (precise control), Fincher (methodical sequence)
- Tier 2: Villeneuve (slow build), Apple-style (product reveal), Wes Anderson (choreographed movement)
- Tier 3: Chaotic/handheld directors (Greengrass — anti-control aesthetic)

**Reference:** Apple product pages (iPhone, Mac Pro), Porsche Taycan configurator

**Required visual elements (min 2):** #32 (Scroll Progress Indicator), #20 (Single Stat Counter), #8 (Rotating Square)

---

### #21 Choice Fork

**Core:** User makes a choice that determines what they see. Two or more paths.

**Locked**
- Structure: 100vh with 2-4 selectable options/paths
- Narrative: agency — user shapes their own experience
- Each choice must visibly alter the hero (not just navigate away)
- Default state must be inviting (not empty/broken-looking)

**Flex**
- Choice count: [2 binary | 3 options | 4 quadrant]
- Choice presentation: [side-by-side panels | hover to preview | tab/toggle | spatial regions]
- Transition on choice: [crossfade | slide | morph | expand chosen / collapse others]
- Content change: [background + text | entire layout shift | color theme | content focus]

**Forbidden**
- ❌ Choices that just navigate to other pages (must transform the hero)
- ❌ No visual difference between choices
- ❌ More than 4 options (decision paralysis)
- ❌ Unappealing default state

**Director Fit**
- Tier 1: Nolan (Memento/Tenet audience-as-detective), Spike Jonze (Being John Malkovich portal), Gondry (dream paths)
- Tier 2: Park Chan-wook (narrative branching), Fincher (Gone Girl dual truth), Linklater (choice-driven)
- Tier 3: Linear narrative directors (most auteurs — film is one path)

**Reference:** Netflix interactive specials, financial product comparison heroes, "What type are you?" quiz landing pages

**Required visual elements (min 2):** #34 (Magnetic Button), #12 (Diamond / Rhombus), #38 (Feature Highlight Panel)

---

### #22 Hover Mosaic

**Core:** Grid of elements that transform on hover, creating a living mosaic.

**Locked**
- Structure: 100vh filled with interactive grid cells (4+ cells)
- Narrative: exploration — user discovers content by probing the grid
- Each cell must react to hover independently
- Grid must look composed and interesting even without hover

**Flex**
- Cell count: [4 (2x2) | 6 (2x3) | 9 (3x3) | irregular]
- Hover reaction: [expand + detail | color shift | image reveal | content swap | play video]
- Default state: [images with overlay | colored blocks | text labels | abstract patterns]
- Grid gap: [none (touching) | thin (2px) | thick (1rem)]

**Forbidden**
- ❌ Generic card grid with shadow hover (that's a UI component, not a hero)
- ❌ All cells identical in behavior
- ❌ Mobile without tap-to-reveal alternative
- ❌ Hover content that's essential for understanding (discoverability must be optional)

**Director Fit**
- Tier 1: Wes Anderson (symmetric grids), Wong Kar-wai (fragmented moments), Park Chan-wook (grid compositions)
- Tier 2: Fincher (Zodiac evidence wall), Kubrick (systematic), Nolan (Inception totems)
- Tier 3: Single-focus directors who avoid fragmentation

**Reference:** Portfolio grids (Awwwards sites), Airbnb experience grids, Nike SNKRS

**Required visual elements (min 2):** #33 (Hover Glow Effect), #10 (Half-Circle Arc), #6 (Social Proof Stack)

---

### #23 Draggable Canvas

**Core:** User drags/scrolls within a wider canvas. Content extends beyond viewport.

**Locked**
- Structure: viewport-sized window into a larger canvas (wider or taller or both)
- Narrative: discovery — there's more than what's visible, user must explore
- Must have clear affordance that dragging/scrolling reveals more
- Must have boundary feedback (elastic edge or loop)

**Flex**
- Canvas type: [horizontal overflow | free 2D drag | infinite loop scroll | zoomable]
- Content on canvas: [portfolio pieces | timeline | map/spatial layout | text journey | scattered elements]
- Navigation aid: [minimap | dots | arrows | scroll indicator | none (exploration)]
- Interaction: [drag | horizontal scroll | trackpad swipe | arrow keys]

**Forbidden**
- ❌ No affordance that more content exists
- ❌ Content that's essential only accessible via drag (critical path must be findable)
- ❌ Broken on trackpad/touch devices

**Director Fit**
- Tier 1: Wes Anderson (lateral tracking), Park Chan-wook (Oldboy corridor), Kubrick (The Shining maze)
- Tier 2: Spielberg (Indiana Jones map travel), Edgar Wright (lateral pan), Nolan (layered exploration)
- Tier 3: Static/minimal directors (Jarmusch, Ozu)

**Reference:** Horizontal scrolling portfolio sites, Google Arts & Culture virtual tours

**Required visual elements (min 2):** #35 (Parallax Micro-Shift), #11 (Triangle Pointer), #29 (Subtle Grid Lines)

---

### #24 Generative / Data-Driven

**Core:** Hero content generated in real-time from data, algorithms, or APIs.

**Locked**
- Structure: 100vh with dynamic/generative visual content
- Narrative: liveness — this is happening NOW, not a static design
- Must show something genuinely dynamic (not pseudo-random decoration)
- Must function even if data/API fails (meaningful fallback)

**Flex**
- Data source: [live API data | time-based | user data | algorithmic/generative art | randomized from pool]
- Visual output: [numbers/counters | generative canvas | live chart | dynamic text | particle system]
- Refresh behavior: [real-time streaming | on-load randomized | periodic update | scroll-triggered recalculation]
- Text integration: [headline with live number | generative bg + static text | fully dynamic text]

**Forbidden**
- ❌ Fake data pretending to be live
- ❌ Decorative generative art with no content connection
- ❌ Broken state when data unavailable
- ❌ Performance-heavy canvas that kills scroll performance

**Director Fit**
- Tier 1: Fincher (data/surveillance aesthetic), Nolan (time-based), Kubrick (HAL 9000 data)
- Tier 2: Ridley Scott (Blade Runner interfaces), Villeneuve (Arrival language data), Spike Jonze (Her AI)
- Tier 3: Analog-feeling directors (Wes Anderson, Malick — organic over digital)

**Reference:** Stripe checkout visualizations, crypto/finance dashboards, Spotify data-driven features

**Required visual elements (min 2):** #21 (Metric Bar Chart), #19 (Noise Particle Field)

---

## Family E: Narrative (敘事推進) — #25-30

The hero tells a story. There's a beginning, development, and hook for what's next.

---

### #25 Question Hook

**Core:** Opens with a provocative question. The hero IS the question, and the site IS the answer.

**Locked**
- Structure: min-height 80vh, question text as primary element
- Narrative: curiosity gap — ask something the user must know the answer to
- Question must be visible without scrolling
- Answer must NOT be in the hero (that's what the rest of the page is for)

**Flex**
- Question scale: [giant headline question | conversational size question | whispered small question]
- Supporting context: [none (just the question) | brief setup line above | atmospheric background | subtle imagery]
- CTA: [scroll hint | "Find out" button | no CTA (curiosity is enough) | down arrow]
- Tone: [provocative | empathetic | data-backed ("Did you know...?") | philosophical]

**Forbidden**
- ❌ Answering the question in the hero
- ❌ Multiple questions (one is enough)
- ❌ Rhetorical question with no payoff below
- ❌ Generic question ("Ready to transform your business?")

**Director Fit**
- Tier 1: Nolan (puzzle opener), Fincher (provocative opening), Hitchcock (suspense question)
- Tier 2: Coen Brothers (literary opener), Kubrick (philosophical), Spike Jonze (existential)
- Tier 3: Visual-first directors (Zhang Yimou — image > question)

**Reference:** Campaign landing pages, editorial longform, TED talk opening slides

**Required visual elements (min 2):** #3 (Testimonial Quote Card), #22 (Percentage Ring), #15 (Gradient Fog Layer), #28 (Horizontal Rule Accent)

---

### #26 Data Punch

**Core:** A big number, statistic, or data point as the hero's visual anchor.

**Locked**
- Structure: min-height 70vh, one dominant numerical/data element
- Narrative: proof — the number speaks louder than any headline
- Number must be large-scale typography (largest element on screen)
- Number must be real/meaningful (not decorative)

**Flex**
- Number presentation: [static large | count-up animation | counter with unit | comparison (X → Y)]
- Supporting text: [label below number | context sentence | source citation | none]
- Animation: [count-up on enter | scroll-driven counter | odometer roll | none (static impact)]
- Layout: [number centered | number left + text right | number as background + text overlay | number in editorial grid]

**Forbidden**
- ❌ Fake or exaggerated numbers
- ❌ Multiple competing numbers in hero (one punch, one number)
- ❌ Small font size for the number
- ❌ Number without context (what does "47" mean?)

**Director Fit**
- Tier 1: Fincher (Social Network metrics), Nolan (Interstellar countdown), Kubrick (2001 precision)
- Tier 2: Scorsese (money/stakes), Spielberg (Schindler's List count), Adam McKay (Big Short data)
- Tier 3: Poetic/abstract directors (Malick, Tarkovsky — numbers ≠ their language)

**Reference:** Annual reports, NGO impact pages, SaaS metrics heroes, GitHub stats

**Required visual elements (min 2):** #20 (Single Stat Counter), #23 (Mini Sparkline), #1 (Floating Badge)

---

### #27 Before / After

**Core:** Two states shown side by side or in sequence. Transformation is the story.

**Locked**
- Structure: min-height 80vh, two distinct visual states
- Narrative: transformation — look how different things become
- Both states must be clearly comparable (same framing, different content)
- The contrast must be dramatic and immediate

**Flex**
- Comparison method: [horizontal slider | side-by-side | toggle switch | scroll-driven morph | fade crossfade]
- Content type: [images | text (old way→new way) | data (before metrics→after metrics) | code | design]
- Transition: [user-controlled slider | auto-animated | scroll-driven | hover-triggered]
- Labels: [explicit "Before/After" | contextual ("2020 / 2025") | none (visual is enough)]

**Forbidden**
- ❌ Subtle difference (transformation must be obvious)
- ❌ Both states looking bad (one must be clearly better or at least different)
- ❌ No way to compare simultaneously

**Director Fit**
- Tier 1: Nolan (time contrast), Fincher (Zodiac timeline), Park Chan-wook (revenge transformation)
- Tier 2: Kubrick (A Clockwork Orange before/after), Villeneuve (Arrival time perception), Scorsese (rise and fall)
- Tier 3: Atemporal directors (Malick — no clear before/after narrative)

**Reference:** Renovation/remodel sites, SaaS "old vs new" pages, fitness transformation pages

**Required visual elements (min 2):** #24 (Progress Step Tracker), #6 (Social Proof Stack), #31 (Animated Border Stroke)

---

### #28 Chapter Zero

**Core:** A short prologue/prelude before the "real" hero. Creates anticipation through delay.

**Locked**
- Structure: brief first screen (50-100vh) + actual hero below
- Narrative: prologue — "before we begin, let me set the mood"
- Chapter Zero must be minimal (1-2 elements max)
- Scroll or time-based transition to the actual hero section

**Flex**
- Prologue content: [logo only | date/chapter label | short quote | ambient visual | loading metaphor]
- Transition to hero: [scroll dissolve | auto-advance after 3-5s | click to proceed | fade to next]
- Prologue mood: [mysterious | elegant | urgent | contemplative]
- Duration: [fixed 3s auto | scroll-controlled | click-to-proceed]

**Forbidden**
- ❌ Essential content in prologue (it's a mood-setter, not information)
- ❌ Long text passages
- ❌ Forced wait >5s without skip option
- ❌ Prologue that looks like the site is broken/loading

**Director Fit**
- Tier 1: Kubrick (long pre-title sequences), Nolan (cold opens), Tarantino (prologue obsession)
- Tier 2: Villeneuve (slow build), Fincher (Se7en credits), Coen Brothers (No Country prologue)
- Tier 3: Impatient directors (Michael Bay), direct/functional directors

**Reference:** Film studio logo sequences, luxury brand sites, Kubrick pre-title darkness

**Required visual elements (min 2):** #17 (Floating Orb), #26 (Thin Divider Line), #36 (Text Scramble Effect)

---

### #29 Sequence Strip

**Core:** Horizontal or time-based sequence of panels/moments. The hero IS a short visual story.

**Locked**
- Structure: 100vh with horizontal scroll or animated sequence (3-6 frames)
- Narrative: micro-story — beginning → middle → end compressed into hero space
- Must have sequential order (not random grid)
- Must have pacing (not all frames equal duration/emphasis)

**Flex**
- Direction: [horizontal scroll | auto-advance slideshow | vertical scroll frames | card flip sequence]
- Frame count: [3 (classic arc) | 4-5 (extended) | 6 (detailed sequence)]
- Frame content: [images | text scenes | mixed media | illustrated panels]
- Pacing: [equal frames | hero frame larger | accelerating | decelerating]

**Forbidden**
- ❌ Random order (must be sequential narrative)
- ❌ More than 6 frames (too long for hero)
- ❌ No visual distinction between frames
- ❌ Standard carousel/slider UI

**Director Fit**
- Tier 1: Edgar Wright (rhythmic sequences), Wes Anderson (tracking shot sequences), Guy Ritchie (rapid sequence)
- Tier 2: Park Chan-wook (Oldboy), Tarantino (chapter structure), Scorsese (Goodfellas sequence)
- Tier 3: Single-take directors (Cuarón, Iñárritu — anti-sequence)

**Reference:** Film strip portfolio sites, Instagram Stories style heroes, comic-style landing pages

**Required visual elements (min 2):** #4 (Mini Feature Card), #2 (Status Pill), #25 (Rating Stars Display)

---

### #30 Countdown / Teaser

**Core:** Something is coming. The hero creates urgency or anticipation for an event/launch/reveal.

**Locked**
- Structure: min-height 80vh with temporal element (countdown, date, or "coming" state)
- Narrative: anticipation — the best is yet to come, wait for it
- Must have time-based or sequential tension
- Must reward the anticipation eventually (either below fold or on a future date)

**Flex**
- Temporal device: [literal countdown clock | "Coming [date]" text | progress bar | partially revealed content | blurred preview]
- Reveal strategy: [scroll down reveals now | time-locked until date | partial reveals over time | teaser fragments]
- Tone: [exciting/hype | mysterious/dark | elegant/sophisticated | urgent/FOMO]
- Supporting content: [email signup | social links | ambient visuals | nothing but the countdown]

**Forbidden**
- ❌ Countdown to nothing (there MUST be payoff)
- ❌ Permanent "coming soon" with no date
- ❌ Cluttered layout around the countdown
- ❌ Fake urgency for evergreen content

**Director Fit**
- Tier 1: Nolan (Tenet countdown), Hitchcock (bomb under table), Fincher (Se7en box)
- Tier 2: Kubrick (HAL countdown), Villeneuve (Arrival deadline), Spielberg (Jaws approaching)
- Tier 3: Timeless/atemporal directors (Malick, Tarkovsky — no urgency aesthetic)

**Reference:** Product launch pages (Apple event teasers), game announcement sites, event landing pages

**Required visual elements (min 2):** #22 (Percentage Ring), #34 (Magnetic Button), #5 (Pricing Snippet Card)

---

## Quick Reference Table

| # | Name | Family | Key Differentiator | Scroll Required | Visual Elements |
|---|------|--------|--------------------|-----------------|-----------------|
| 1 | Void Entry | Immersive | Starts empty, content materializes | No | #15, #17, #27 |
| 2 | Atmosphere Bath | Immersive | Full-bleed environment, text secondary | No | #14, #18, #29 |
| 3 | Slow Reveal | Immersive | Scroll progressively uncovers | Yes | #16, #28, #32, #7 |
| 4 | Letterbox Cinema | Immersive | Cinematic aspect ratio with bars | No | #26, #30, #8, #19 |
| 5 | Video Wall | Immersive | Motion > words | No | #15, #31 |
| 6 | Parallax Depth Stage | Immersive | Multi-layer Z-depth | Yes | #9, #17 |
| 7 | Type Monument | Editorial | One massive headline = the design | No | #10, #26, #33, #37 |
| 8 | Split Headline Stack | Editorial | Multi-line headlines with variety | No | #11, #28, #34, #14 |
| 9 | Editorial Grid | Editorial | Newspaper/magazine layout | No | #12, #29, #30 |
| 10 | Single Word | Editorial | One word fills the screen | No | #7, #27, #16, #35 |
| 11 | Manifesto Block | Editorial | Long-form text IS the hero | No | #13, #15, #27, #3, #36 |
| 12 | Kinetic Type | Editorial | Text moves with purpose | No | #8, #33, #19, #36 |
| 13 | Clean Bisect | Split | 50/50 screen division | No | #38, #1, #26 |
| 14 | Diagonal Clash | Split | Angled division, conflict energy | No | #11, #32, #18 |
| 15 | Asymmetric Weight | Split | Unequal sides, power imbalance | No | #2, #39, #16 |
| 16 | Multi-Panel Grid | Split | 3+ panels, comic-book energy | No | #4, #40, #10 |
| 17 | Overlap Tension | Split | Elements deliberately collide | No | #5, #14 |
| 18 | Framed Viewport | Split | Content inside a visible frame | No | #30, #13, #17 |
| 19 | Cursor Reactive | Interactive | Hero responds to mouse position | No | #37, #9, #7 |
| 20 | Scroll-Triggered Sequence | Interactive | Scroll = video scrubbing | Yes | #32, #20, #8 |
| 21 | Choice Fork | Interactive | User picks a path | No | #34, #12, #38 |
| 22 | Hover Mosaic | Interactive | Grid cells transform on hover | No | #33, #10, #6 |
| 23 | Draggable Canvas | Interactive | Content beyond viewport edges | No | #35, #11, #29 |
| 24 | Generative / Data-Driven | Interactive | Real-time dynamic content | No | #21, #19 |
| 25 | Question Hook | Narrative | Opens with a provocative question | No | #3, #22, #15, #28 |
| 26 | Data Punch | Narrative | One big number = proof | No | #20, #23, #1 |
| 27 | Before / After | Narrative | Transformation comparison | No | #24, #6, #31 |
| 28 | Chapter Zero | Narrative | Prologue before the real hero | Yes | #17, #26, #36 |
| 29 | Sequence Strip | Narrative | Horizontal micro-story | Yes | #4, #2, #25 |
| 30 | Countdown / Teaser | Narrative | Anticipation for what's coming | No | #22, #34, #5 |
