# Section Archetypes — Structural Variants per Function Type

Every section function (from `section-functions.md`) has multiple structural archetypes. Each archetype locks:
- **Layout** → reference from `compositions.md`
- **Entrance** → MANDATORY reference from `camera-shots-50.md`
- **Interaction** → MANDATORY reference from `interaction-effects-50.md`
- **Director fit** → Tier 1/2/3

**CRITICAL:** Every archetype MUST reference specific entries from camera-shots and interaction-effects libraries. If an archetype has no interaction reference, it means "no hover/click/scroll effect" — which must be an intentional cinematic choice (e.g., "Villeneuve's restraint"), NOT laziness.

**Usage:** Step 3.95 — after selecting narrative beats and resolving to functions, select the archetype for each function via director pool + hash mechanism.

---

## Format

```
## [Function Name] — Archetypes

### A{N}: [Archetype Name]
- Layout: compositions.md #{N}
- Entrance: camera-shots #{N} — [name]
- Interaction: interaction-effects #{N} — [name]
- Director fit: Tier 1: [...] / Tier 2: [...] / Tier 3: [...]
- Description: [one line]
```

---

## Article Grid (#1) — 8 Archetypes

### AG-1: Classic Editorial Grid
- Layout: compositions #9 Rule-of-thirds content left (unequal columns)
- Entrance: camera-shots #20 Jump cut stagger (cards appear 0.05s apart)
- Interaction: interaction-effects #4 Depth-of-field pop (unfocused cards blur, hovered card sharpens)
- Director fit: Tier 1: Fincher, Wes Anderson / Tier 2: Nolan, Kubrick / Tier 3: Malick
- Description: Newspaper-style unequal columns, first article is lead story (larger)

### AG-2: Horizontal Scroll Strip
- Layout: compositions #24 Horizontal overflow reveal
- Entrance: camera-shots #30 Tracking shot lateral (scroll reveals cards)
- Interaction: interaction-effects #5 Film frame lift (hover card lifts with border)
- Director fit: Tier 1: Edgar Wright, Wes Anderson / Tier 2: Tarantino, Guy Ritchie / Tier 3: Villeneuve
- Description: Film-strip style horizontal scroll, cards snap into view

### AG-3: Stacked Full-Width Cards
- Layout: compositions #27 Narrow column reading width (single column, full content)
- Entrance: camera-shots #2 Fade from black (each card fades in on scroll)
- Interaction: interaction-effects #3 Color temperature shift (hover warms the card)
- Director fit: Tier 1: Villeneuve, Malick, Wong Kar-wai / Tier 2: Sofia Coppola / Tier 3: Edgar Wright
- Description: One article per row, full width. Long-form editorial feel. Slow, deliberate.

### AG-4: Masonry Evidence Wall
- Layout: compositions #19 Fibonacci spiral flow (irregular grid, organic placement)
- Entrance: camera-shots #20 Jump cut stagger (rapid appearance, 0.03s gaps)
- Interaction: interaction-effects #1 Spotlight reveal (cursor spotlight follows mouse across grid)
- Director fit: Tier 1: Fincher (Zodiac evidence), Nolan / Tier 2: Park Chan-wook / Tier 3: Wes Anderson
- Description: Overwhelming grid of evidence. Different card sizes. The quantity IS the message.

### AG-5: Card Carousel with Peek
- Layout: compositions #24 Horizontal overflow (center card full, edges peek)
- Entrance: camera-shots #10 Curtain wipe (cards slide in from right)
- Interaction: interaction-effects #22 Expand to fullscreen (click card expands)
- Director fit: Tier 1: Spielberg, Miyazaki / Tier 2: Ridley Scott / Tier 3: Fincher
- Description: One featured card center, previous/next peek from edges. Touch/swipe friendly.

### AG-6: Timeline List
- Layout: compositions #13 Dynamic diagonal top-left to bottom-right (staggered positions)
- Entrance: camera-shots #4 Crane down (content descends into view)
- Interaction: interaction-effects #12 Underline slide (hover reveals underline)
- Director fit: Tier 1: Nolan (time), Tarantino (chapters) / Tier 2: Wes Anderson / Tier 3: Miyazaki
- Description: Articles listed chronologically with date emphasis. Vertical timeline feel.

### AG-7: Bento Grid
- Layout: compositions #40 Corner split (unequal quadrants, first article spans 2 cells)
- Entrance: camera-shots #7 Split diopter open (cells reveal from center out)
- Interaction: interaction-effects #2 Perspective tilt (hover tilts card in 3D)
- Director fit: Tier 1: Wes Anderson, Park Chan-wook / Tier 2: Nolan, Kubrick / Tier 3: Malick
- Description: Mixed-size grid cells. First article large, rest small. Architectural.

### AG-8: Scroll-Reveal Stack
- Layout: compositions #63 Progressive sticky stack (cards stack as you scroll)
- Entrance: camera-shots #33 Parallax depth layers (cards at different scroll speeds)
- Interaction: interaction-effects #28 Sticky spotlight (top card stays visible, new cards push over)
- Director fit: Tier 1: Nolan, Villeneuve / Tier 2: Kubrick / Tier 3: Edgar Wright
- Description: Cards stack on top of each other during scroll. Cinematic deck reveal.

---

## Featured Article (#2) — 6 Archetypes

### FA-1: Sticky Visual + Scroll Text
- Layout: compositions #43 Sticky image with scrolling text
- Entrance: camera-shots #6 Rack focus reveal (blur to sharp on image)
- Interaction: interaction-effects #30 Parallax text float (text floats upward on scroll)
- Director fit: Tier 1: Villeneuve, Nolan / Tier 2: Malick, Ridley Scott / Tier 3: Edgar Wright
- Description: Left image sticks, right text scrolls past. IMAX intimacy.

### FA-2: Full-Width Cinematic Banner
- Layout: compositions #22 Full-bleed with inset text
- Entrance: camera-shots #16 Lens flare bloom (brightness → normal)
- Interaction: interaction-effects #13 Ken Burns drift (hover slowly pans across image)
- Director fit: Tier 1: Ridley Scott, Zhang Yimou / Tier 2: Spielberg, Nolan / Tier 3: Wes Anderson
- Description: Full-bleed background image with floating text overlay. Epic scale.

### FA-3: Split Screen Article
- Layout: compositions #33 Clean 50/50 split
- Entrance: camera-shots #7 Split diopter open (left and right halves slide in)
- Interaction: interaction-effects #16 Curtain lift reveal (hover lifts overlay on image side)
- Director fit: Tier 1: De Palma, Park Chan-wook / Tier 2: Fincher, Nolan / Tier 3: Miyazaki
- Description: Half image, half text. Tension between visual and verbal.

### FA-4: Card Expand
- Layout: compositions #30 Boxed island (floating card in space)
- Entrance: camera-shots #3 Dolly-in push forward (card grows from small to featured size)
- Interaction: interaction-effects #22 Expand to fullscreen (click expands)
- Director fit: Tier 1: Kubrick, Wes Anderson / Tier 2: Fincher / Tier 3: Ridley Scott
- Description: Single card floating in empty space. The article IS the design.

### FA-5: Scroll Story Feature
- Layout: compositions #62 Sticky hero dissolve (content transforms on scroll)
- Entrance: camera-shots #29 Dolly zoom Vertigo effect (bg scale + fg counter-scale)
- Interaction: interaction-effects #32 Horizontal reveal on vertical scroll
- Director fit: Tier 1: Nolan (Inception), Hitchcock / Tier 2: Park Chan-wook / Tier 3: Wes Anderson
- Description: Scroll drives the article reveal — title → image → excerpt → CTA all on scroll position.

### FA-6: Pull Quote + Article Preview
- Layout: compositions #31 Inset margin columns (wide margins, center content)
- Entrance: camera-shots #2 Fade from black (slow, 2s fade)
- Interaction: interaction-effects #20 Weight morph (hover shifts font weight via variable font)
- Director fit: Tier 1: Wong Kar-wai, Malick, Sofia Coppola / Tier 2: Tarkovsky / Tier 3: Guy Ritchie
- Description: Large pull quote + article details below. The quote IS the hook. Minimal, literary.

---

## Category Map (#15) — 6 Archetypes

### CM-1: Color-Coded Panel Grid
- Layout: compositions #40 Corner split or #5 Triptych
- Entrance: camera-shots #20 Jump cut stagger (panels appear rapidly)
- Interaction: interaction-effects #4 Depth-of-field pop (hovered panel sharpens, others blur)
- Director fit: Tier 1: Zhang Yimou (color worlds), Wes Anderson / Tier 2: Miyazaki / Tier 3: Fincher
- Description: Each category = a distinct color panel. The colors ARE the navigation.

### CM-2: Radial / Orbit Map
- Layout: compositions #4 Radial burst (center element + surrounding items)
- Entrance: camera-shots #13 Bird's eye descent (zoom from above into the map)
- Interaction: interaction-effects #38 Magnetic cursor (categories pulled toward cursor)
- Director fit: Tier 1: Nolan (Inception), Kubrick / Tier 2: Fincher / Tier 3: Miyazaki
- Description: Center topic with subtopics orbiting around it. Solar system layout.

### CM-3: Horizontal Scroll Categories
- Layout: compositions #24 Horizontal overflow reveal
- Entrance: camera-shots #36 Crab shot lateral track (horizontal slide reveal)
- Interaction: interaction-effects #5 Film frame lift (hover lifts category card)
- Director fit: Tier 1: Wes Anderson (tracking), Edgar Wright / Tier 2: Park Chan-wook / Tier 3: Villeneuve
- Description: Categories scroll horizontally like a filmstrip. Each card is a "reel."

### CM-4: Accordion / Expandable List
- Layout: compositions #27 Narrow column reading width
- Entrance: camera-shots #2 Fade from black
- Interaction: interaction-effects #24 Accordion unfold (click expands category to show subcontent)
- Director fit: Tier 1: Fincher (clinical), Villeneuve / Tier 2: Nolan / Tier 3: Wes Anderson
- Description: Minimalist vertical list. Click to expand. Clinical, organized.

### CM-5: Stacked Full-Width Blocks
- Layout: compositions #37 Vertical split (full-width horizontal bands)
- Entrance: camera-shots #8 Tilt up reveal (each band tilts into view)
- Interaction: interaction-effects #3 Color temperature shift (hover warms the band)
- Director fit: Tier 1: Kubrick, Ridley Scott / Tier 2: Leone / Tier 3: Edgar Wright
- Description: Each category = a full-width horizontal band with its own color/image.

### CM-6: Interactive Tag Cloud
- Layout: compositions #1 Center-weighted monument (tags floating around center)
- Entrance: camera-shots #17 Film projector flicker (tags flicker into existence)
- Interaction: interaction-effects #8 Magnetic snap (tags magnetically attract to cursor)
- Director fit: Tier 1: Edgar Wright, Guy Ritchie / Tier 2: Tarantino / Tier 3: Villeneuve
- Description: Organic floating tag cloud. Interactive, playful, non-hierarchical.

---

## Stats Counter (#24) — 6 Archetypes

### SC-1: Horizontal Trio
- Layout: compositions #5 Triptych (three equal panels)
- Entrance: camera-shots #2 Fade from black + JS counter animation
- Interaction: interaction-effects #29 Progress bar (scroll drives counter)
- Director fit: Tier 1: Nolan, Fincher / Tier 2: Spielberg / Tier 3: Miyazaki
- Description: Three numbers side by side. Count-up on intersection. Clean, authoritative.

### SC-2: Single Giant Number
- Layout: compositions #23 Viewport fill (one number fills the screen)
- Entrance: camera-shots #3 Dolly-in push forward (number grows into frame)
- Interaction: interaction-effects #33 Zoom to detail (scroll zooms into the number)
- Director fit: Tier 1: Kubrick, Nolan / Tier 2: Villeneuve / Tier 3: Wes Anderson
- Description: ONE number. Full screen. No explanation needed. The number IS the statement.

### SC-3: Data Dashboard Grid
- Layout: compositions #7 Cross axis (multiple data widgets in a grid)
- Entrance: camera-shots #20 Jump cut stagger (widgets appear rapidly)
- Interaction: interaction-effects #7 Hologram flicker (hover makes widget glow)
- Director fit: Tier 1: Fincher, Ridley Scott (Blade Runner) / Tier 2: Nolan / Tier 3: Miyazaki
- Description: Multiple small data widgets. Dashboard feel. Dense information.

### SC-4: Vertical Scroll Counter
- Layout: compositions #32 Progressive narrowing (numbers get smaller as you scroll)
- Entrance: camera-shots #34 Time-lapse acceleration (speed up on scroll)
- Interaction: interaction-effects #30 Parallax text float (numbers float at different speeds)
- Director fit: Tier 1: Nolan (time), Villeneuve / Tier 2: Kubrick / Tier 3: Edgar Wright
- Description: Numbers reveal vertically as you scroll. Each number = a scroll stop.

### SC-5: Before/After Counter
- Layout: compositions #33 Clean 50/50 split (left = before, right = after)
- Entrance: camera-shots #19 Match cut dissolve (before morphs into after)
- Interaction: interaction-effects #27 Toggle light/dark (click toggles before/after)
- Director fit: Tier 1: Nolan, Park Chan-wook / Tier 2: Fincher / Tier 3: Miyazaki
- Description: Comparison numbers. "Was X, now Y." Transformation shown through data.

### SC-6: Ambient Counter Overlay
- Layout: compositions #42 Background text with foreground content
- Entrance: camera-shots #2 Fade from black (number fades in as giant ghost text behind)
- Interaction: No interaction (intentional stillness)
- Director fit: Tier 1: Villeneuve (silence), Malick / Tier 2: Wong Kar-wai / Tier 3: Guy Ritchie
- Description: Giant number as semi-transparent background, real content in foreground. The number is atmosphere, not data.

---

## Newsletter CTA (#32) — 6 Archetypes

### NC-1: The Question
- Layout: compositions #1 Center-weighted monument
- Entrance: camera-shots #2 Fade from black (slow, deliberate)
- Interaction: interaction-effects #9 Neon charge-up (submit button charges on hover)
- Director fit: Tier 1: Nolan, Fincher / Tier 2: Hitchcock / Tier 3: Miyazaki
- Description: Provocative question + input. Minimal. The question does the selling.

### NC-2: The Warm Invitation
- Layout: compositions #8 Floating center card
- Entrance: camera-shots #12 Steadicam float-in (card gently floats into view)
- Interaction: interaction-effects #11 Elastic bounce (button bounces on hover)
- Director fit: Tier 1: Miyazaki, Sofia Coppola, Wong Kar-wai / Tier 2: Wes Anderson / Tier 3: Fincher
- Description: Rounded card floating in warm color space. Friendly, inviting.

### NC-3: Full-Bleed Accent Block
- Layout: compositions #21 Edge-to-edge immersion (full-width accent color)
- Entrance: camera-shots #10 Curtain wipe (color block wipes in)
- Interaction: interaction-effects #10 Shutter click (button flashes white on hover)
- Director fit: Tier 1: Guy Ritchie, Tarantino, Edgar Wright / Tier 2: Spike Lee / Tier 3: Villeneuve
- Description: Bold accent color fills viewport. High contrast CTA. Punchy.

### NC-4: Side-by-Side Value Prop
- Layout: compositions #9 Rule-of-thirds content left (text left, form right)
- Entrance: camera-shots #7 Split diopter open (left/right slide in simultaneously)
- Interaction: interaction-effects #12 Underline slide (hover underlines input)
- Director fit: Tier 1: Wes Anderson, Kubrick / Tier 2: Nolan / Tier 3: Malick
- Description: Left: why subscribe (3 bullet points). Right: the form. Balanced, symmetrical.

### NC-5: Scroll-Triggered Reveal
- Layout: compositions #62 Sticky hero dissolve
- Entrance: camera-shots #6 Rack focus reveal (blurred → sharp as you reach it)
- Interaction: interaction-effects #28 Sticky spotlight (CTA stays while background scrolls)
- Director fit: Tier 1: Nolan, Villeneuve / Tier 2: Fincher / Tier 3: Wes Anderson
- Description: CTA appears through scroll. You "discover" it, not forced. Earned attention.

### NC-6: Minimal Single Line
- Layout: compositions #27 Narrow column reading width
- Entrance: camera-shots #2 Fade from black
- Interaction: No interaction (the form is the only interactive element on screen)
- Director fit: Tier 1: Villeneuve, Malick, Jarmusch / Tier 2: Sofia Coppola / Tier 3: Edgar Wright
- Description: One line of text. One input. That's it. Maximum restraint.

---

## Testimonial (#25) — 5 Archetypes

### TM-1: Carousel Quote Slider
- Layout: compositions #24 Horizontal overflow
- Entrance: camera-shots #21 Crossfade overlap (quotes dissolve between each other)
- Interaction: interaction-effects #13 Ken Burns drift (background slowly drifts)
- Director fit: Tier 1: Wong Kar-wai, Sofia Coppola / Tier 2: Wes Anderson / Tier 3: Fincher

### TM-2: Stacked Monologue
- Layout: compositions #27 Narrow column
- Entrance: camera-shots #2 Fade from black (quotes fade in one by one)
- Interaction: interaction-effects #20 Weight morph (text weight shifts on hover)
- Director fit: Tier 1: Malick, Villeneuve / Tier 2: Nolan / Tier 3: Guy Ritchie

### TM-3: Grid of Faces
- Layout: compositions #5 Triptych or #40 Corner split
- Entrance: camera-shots #20 Jump cut stagger
- Interaction: interaction-effects #2 Perspective tilt (card tilts toward cursor)
- Director fit: Tier 1: Wes Anderson, Fincher / Tier 2: Spielberg / Tier 3: Villeneuve

### TM-4: Full-Width Single Quote
- Layout: compositions #23 Viewport fill
- Entrance: camera-shots #2 Fade from black (slow, 2.5s)
- Interaction: No interaction (let the words breathe)
- Director fit: Tier 1: Kubrick, Villeneuve, Tarkovsky / Tier 2: Nolan / Tier 3: Edgar Wright

### TM-5: Evidence Tape Wall
- Layout: compositions #41 Overlapping cards cascade
- Entrance: camera-shots #32 Handheld shake (slight movement, documentary feel)
- Interaction: interaction-effects #1 Spotlight reveal (cursor highlights testimonials)
- Director fit: Tier 1: Fincher (Zodiac), Park Chan-wook / Tier 2: Spike Lee / Tier 3: Sofia Coppola

---

## Quote / Pullquote (#40) — 4 Archetypes

### QP-1: Full-Screen Monument
- Layout: compositions #23 Viewport fill, text centered
- Entrance: camera-shots #2 Fade from black (3s, the slowest entrance)
- Interaction: No interaction
- Director fit: Tier 1: Kubrick, Villeneuve, Malick / Tier 2: Nolan / Tier 3: Edgar Wright

### QP-2: Inset with Giant Quotation Mark
- Layout: compositions #31 Inset margin columns
- Entrance: camera-shots #8 Tilt up reveal
- Interaction: interaction-effects #20 Weight morph (variable font shifts)
- Director fit: Tier 1: Wes Anderson, Wong Kar-wai / Tier 2: Sofia Coppola / Tier 3: Fincher

### QP-3: Side-Aligned Editorial
- Layout: compositions #10 Rule-of-thirds content right
- Entrance: camera-shots #5 Whip pan entrance (slides in from left, fast)
- Interaction: interaction-effects #12 Underline slide
- Director fit: Tier 1: Tarantino, Guy Ritchie, Spike Lee / Tier 2: Edgar Wright / Tier 3: Villeneuve

### QP-4: Background Ghost Text
- Layout: compositions #42 Background text with foreground content
- Entrance: camera-shots #48 Defocus exit (reverse — starts blurry, becomes sharp)
- Interaction: interaction-effects #15 Parallax depth hover (text layers shift with cursor)
- Director fit: Tier 1: Wong Kar-wai, Fincher / Tier 2: Nolan / Tier 3: Miyazaki

---

## Footer (#48) — 4 Archetypes

### FT-1: Classic Grid Footer
- Layout: compositions #26 Bleed with guttered columns
- Entrance: No entrance animation (footer is not dramatic)
- Interaction: interaction-effects #12 Underline slide (link hover)
- Director fit: All directors (universal)

### FT-2: Minimal Single Row
- Layout: compositions #27 Narrow column
- Entrance: No entrance animation
- Interaction: No interaction
- Director fit: Tier 1: Villeneuve, Kubrick, Jarmusch / Tier 2: Malick / Tier 3: Wes Anderson
- Description: One line: copyright + 3-4 links. Nothing more. Black screen ending.

### FT-3: Stacked Center Footer
- Layout: compositions #3 Centered stack
- Entrance: No entrance animation
- Interaction: interaction-effects #3 Color temperature shift (links warm on hover)
- Director fit: Tier 1: Wes Anderson, Sofia Coppola / Tier 2: Miyazaki / Tier 3: Fincher
- Description: Centered logo + centered nav links + centered legal. Symmetrical.

### FT-4: Magazine Colophon
- Layout: compositions #34 60/40 editorial
- Entrance: No entrance animation
- Interaction: interaction-effects #12 Underline slide
- Director fit: Tier 1: Fincher, Nolan / Tier 2: Wes Anderson / Tier 3: Malick
- Description: Editorial-style footer with publication info left, navigation right.

---

## Visual Break (#39) — 4 Archetypes

### VB-1: Full-Bleed Color Block
- Layout: compositions #21 Edge-to-edge immersion
- Entrance: camera-shots #2 Fade from black
- Interaction: No interaction (breathing space)
- Director fit: All directors

### VB-2: Parallax Image Band
- Layout: compositions #25 Parallax layer stack
- Entrance: camera-shots #33 Parallax depth layers
- Interaction: interaction-effects #13 Ken Burns drift
- Director fit: Tier 1: Malick, Ridley Scott / Tier 2: Villeneuve / Tier 3: Wes Anderson

### VB-3: Divider with Accent Line
- Layout: Single `<hr>` or decorative line
- Entrance: camera-shots #10 Curtain wipe (line draws across)
- Interaction: No interaction
- Director fit: Tier 1: Kubrick, Wes Anderson (precise) / Tier 2: Fincher / Tier 3: Miyazaki

### VB-4: Empty Space
- Layout: Just `padding: 200px 0` — literally nothing
- Entrance: None
- Interaction: None
- Director fit: Tier 1: Villeneuve, Malick, Tarkovsky / Tier 2: Kubrick / Tier 3: All action directors
- Description: The bravest design choice. Nothing. Let the previous section's impact settle.

---

## Timeline (#7) — 5 Archetypes

### TL-1: Vertical Center-Line Timeline
- Layout: compositions #13 Dynamic diagonal (center line with alternating entries)
- Entrance: camera-shots #4 Crane down (entries descend into view)
- Interaction: interaction-effects #12 Underline slide (hover reveals date detail)
- Director fit: Tier 1: Nolan (time obsession), Fincher / Tier 2: Wes Anderson, Tarantino (chapters) / Tier 3: Malick

### TL-2: Horizontal Scroll Timeline
- Layout: compositions #24 Horizontal overflow reveal
- Entrance: camera-shots #30 Tracking shot lateral
- Interaction: interaction-effects #5 Film frame lift (hover lifts era card)
- Director fit: Tier 1: Edgar Wright, Wes Anderson / Tier 2: Guy Ritchie / Tier 3: Villeneuve

### TL-3: Stacked Full-Width Eras
- Layout: compositions #37 Vertical split (full-width horizontal bands per era)
- Entrance: camera-shots #2 Fade from black (each era fades in sequentially)
- Interaction: interaction-effects #3 Color temperature shift (hover warms era)
- Director fit: Tier 1: Kubrick, Ridley Scott / Tier 2: Nolan / Tier 3: Edgar Wright

### TL-4: Filmstrip Timeline
- Layout: compositions #42 Film strip advance (scroll-snap frames)
- Entrance: camera-shots #42 Film strip advance (frames snap into place)
- Interaction: interaction-effects #22 Expand to fullscreen (click era expands)
- Director fit: Tier 1: Tarantino (chapter structure), Park Chan-wook / Tier 2: Wes Anderson / Tier 3: Malick

### TL-5: Single-Column Diary
- Layout: compositions #27 Narrow column reading width
- Entrance: camera-shots #2 Fade from black (gentle, 1.5s per entry)
- Interaction: No interaction (reading experience, not interactive)
- Director fit: Tier 1: Wong Kar-wai (memory), Sofia Coppola, Iwai / Tier 2: Malick / Tier 3: Guy Ritchie

---

## Process / Steps (#8) — 5 Archetypes

### PS-1: Numbered Vertical Stack
- Layout: compositions #32 Progressive narrowing (steps funnel toward conclusion)
- Entrance: camera-shots #20 Jump cut stagger (steps appear rapidly)
- Interaction: interaction-effects #24 Accordion unfold (click expands step detail)
- Director fit: Tier 1: Fincher (methodical), Nolan / Tier 2: Kubrick / Tier 3: Wong Kar-wai

### PS-2: Horizontal Step Cards
- Layout: compositions #24 Horizontal overflow with scroll-snap
- Entrance: camera-shots #10 Curtain wipe (steps slide in left to right)
- Interaction: interaction-effects #5 Film frame lift (hover lifts step card)
- Director fit: Tier 1: Wes Anderson (precise choreography), Edgar Wright / Tier 2: Guy Ritchie / Tier 3: Malick

### PS-3: Sticky Step Counter
- Layout: compositions #43 Sticky image with scrolling text (step number sticks, detail scrolls)
- Entrance: camera-shots #33 Parallax depth layers (numbers at different speeds)
- Interaction: interaction-effects #28 Sticky spotlight (current step stays visible)
- Director fit: Tier 1: Nolan, Villeneuve / Tier 2: Fincher / Tier 3: Wes Anderson

### PS-4: Grid Step Map
- Layout: compositions #40 Corner split (steps in a 2x2 grid with connecting arrows)
- Entrance: camera-shots #13 Bird's eye descent (overview then zoom)
- Interaction: interaction-effects #2 Perspective tilt (hover tilts step card)
- Director fit: Tier 1: Kubrick (systematic), Wes Anderson / Tier 2: Fincher / Tier 3: Miyazaki

### PS-5: Cinematic Sequence
- Layout: compositions #62 Sticky hero dissolve (each step transforms the same space)
- Entrance: camera-shots #19 Match cut dissolve (step A dissolves into step B)
- Interaction: interaction-effects #32 Horizontal reveal on vertical scroll
- Director fit: Tier 1: Nolan (Inception layers), Park Chan-wook / Tier 2: Villeneuve / Tier 3: Edgar Wright

---

## FAQ / Accordion (#9) — 4 Archetypes

### FQ-1: Clean Minimal Accordion
- Layout: compositions #27 Narrow column reading width (max-width 700px centered)
- Entrance: camera-shots #2 Fade from black
- Interaction: interaction-effects #24 Accordion unfold (click toggles with max-height transition)
- Director fit: Tier 1: Fincher, Villeneuve (clinical) / Tier 2: Kubrick, Nolan / Tier 3: Wes Anderson

### FQ-2: Two-Column Q&A
- Layout: compositions #9 Rule-of-thirds content left (question left, answer right)
- Entrance: camera-shots #20 Jump cut stagger
- Interaction: interaction-effects #12 Underline slide (hover on question)
- Director fit: Tier 1: Wes Anderson (symmetry), Kubrick / Tier 2: Fincher / Tier 3: Malick

### FQ-3: Cards with Flip Reveal
- Layout: compositions #5 Triptych (3 FAQ cards per row)
- Entrance: camera-shots #20 Jump cut stagger
- Interaction: interaction-effects #21 Card flip reveal (click flips to answer)
- Director fit: Tier 1: Edgar Wright, Guy Ritchie (playful) / Tier 2: Wes Anderson / Tier 3: Villeneuve

### FQ-4: Progressive Reveal on Scroll
- Layout: compositions #27 Narrow column
- Entrance: camera-shots #33 Parallax depth layers (questions at different scroll speeds)
- Interaction: No interaction (answers are always visible, questions scroll past)
- Director fit: Tier 1: Malick, Wong Kar-wai / Tier 2: Sofia Coppola, Iwai / Tier 3: Fincher

---

## Tabbed Content (#18) — 4 Archetypes

### TC-1: Horizontal Pill Tabs
- Layout: compositions #1 Center-weighted monument (tabs centered above, content below)
- Entrance: camera-shots #2 Fade from black (content crossfades on tab switch)
- Interaction: interaction-effects #21 Crossfade overlap (tab panels dissolve between each other)
- Director fit: Tier 1: Wes Anderson (organized), Kubrick / Tier 2: Fincher, Nolan / Tier 3: Wong Kar-wai

### TC-2: Vertical Side Tabs
- Layout: compositions #29 Sidebar + main constrained (tabs left, content right)
- Entrance: camera-shots #5 Whip pan entrance (content slides in from right on tab change)
- Interaction: interaction-effects #10 Shutter click (tab change flashes)
- Director fit: Tier 1: Fincher, Nolan / Tier 2: Kubrick / Tier 3: Miyazaki

### TC-3: Full-Width Color Shift
- Layout: compositions #23 Viewport fill (entire section changes color per tab)
- Entrance: camera-shots #21 Crossfade overlap (background color fades between tabs)
- Interaction: interaction-effects #31 Color shift on scroll position (adapted to tab position)
- Director fit: Tier 1: Zhang Yimou (color worlds), Miyazaki, Iwai / Tier 2: Wes Anderson / Tier 3: Fincher

### TC-4: Stack Reveal
- Layout: compositions #63 Progressive sticky stack (each tab panel stacks over the previous)
- Entrance: camera-shots #3 Dolly-in push forward (new panel pushes toward viewer)
- Interaction: interaction-effects #28 Sticky spotlight
- Director fit: Tier 1: Nolan (layering), Park Chan-wook / Tier 2: Villeneuve / Tier 3: Edgar Wright

---

## Scroll Story (#41) — 4 Archetypes

### SS-1: Sticky Visual + Scroll Text
- Layout: compositions #43 Sticky image with scrolling text
- Entrance: camera-shots #6 Rack focus reveal (visual sharpens as you scroll into section)
- Interaction: interaction-effects #30 Parallax text float (text floats at different speed than visual)
- Director fit: Tier 1: Villeneuve, Nolan / Tier 2: Malick, Ridley Scott / Tier 3: Edgar Wright

### SS-2: Horizontal Scroll on Vertical
- Layout: compositions #62 Sticky hero dissolve (horizontal content moves on vertical scroll)
- Entrance: camera-shots #36 Crab shot lateral track
- Interaction: interaction-effects #32 Horizontal reveal on vertical scroll
- Director fit: Tier 1: Nolan (Inception), Wes Anderson (lateral tracking) / Tier 2: Park Chan-wook / Tier 3: Malick

### SS-3: Progressive Reveal (Background Transforms)
- Layout: compositions #23 Viewport fill with scroll-driven transforms
- Entrance: camera-shots #29 Dolly zoom Vertigo effect (bg scales while fg stays)
- Interaction: interaction-effects #33 Zoom to detail (scroll zooms into content)
- Director fit: Tier 1: Hitchcock, Fincher / Tier 2: Nolan, Park Chan-wook / Tier 3: Miyazaki

### SS-4: Frame Sequence (Scroll Scrubber)
- Layout: compositions #23 Viewport fill + JS frame sequence
- Entrance: camera-shots #34 Time-lapse acceleration (frames speed up on scroll)
- Interaction: interaction-effects #43 Freeze frame hold (key moments pause)
- Director fit: Tier 1: Kubrick, Nolan / Tier 2: Fincher / Tier 3: Wong Kar-wai

---

## Gallery / Portfolio (#42) — 4 Archetypes

### GL-1: Masonry Grid
- Layout: compositions #19 Fibonacci spiral flow (irregular sizes)
- Entrance: camera-shots #20 Jump cut stagger (images appear rapidly)
- Interaction: interaction-effects #13 Ken Burns drift (hover slowly pans image)
- Director fit: Tier 1: Wong Kar-wai, Ridley Scott / Tier 2: Malick / Tier 3: Kubrick

### GL-2: Horizontal Scroll Gallery
- Layout: compositions #24 Horizontal overflow reveal
- Entrance: camera-shots #30 Tracking shot lateral
- Interaction: interaction-effects #22 Expand to fullscreen (click image expands)
- Director fit: Tier 1: Wes Anderson, Edgar Wright / Tier 2: Park Chan-wook / Tier 3: Villeneuve

### GL-3: Lightbox Grid
- Layout: compositions #5 Triptych or #40 Corner split
- Entrance: camera-shots #2 Fade from black
- Interaction: interaction-effects #16 Curtain lift reveal (hover lifts overlay to reveal detail)
- Director fit: Tier 1: Kubrick, Fincher / Tier 2: Nolan / Tier 3: Guy Ritchie

### GL-4: Full-Screen Slideshow
- Layout: compositions #23 Viewport fill (one image at a time, full screen)
- Entrance: camera-shots #21 Crossfade overlap (images dissolve between each other)
- Interaction: No interaction (images auto-advance or scroll-driven)
- Director fit: Tier 1: Malick, Villeneuve, Tarkovsky / Tier 2: Wong Kar-wai, Iwai / Tier 3: Edgar Wright

---

## Data Dashboard (#11) — 4 Archetypes

### DD-1: Cross-Axis Widget Grid
- Layout: compositions #7 Cross axis (unequal widgets in a complex grid)
- Entrance: camera-shots #20 Jump cut stagger (widgets appear 0.04s apart)
- Interaction: interaction-effects #7 Hologram flicker (hover makes widget glow)
- Director fit: Tier 1: Fincher, Nolan / Tier 2: Ridley Scott / Tier 3: Miyazaki

### DD-2: Single Metric Focus
- Layout: compositions #23 Viewport fill (one big number + supporting sparkline)
- Entrance: camera-shots #3 Dolly-in push forward
- Interaction: interaction-effects #33 Zoom to detail (scroll zooms into metric)
- Director fit: Tier 1: Kubrick, Nolan / Tier 2: Fincher / Tier 3: Wes Anderson

### DD-3: Ticker Strip
- Layout: compositions #21 Edge-to-edge immersion (full-width scrolling data)
- Entrance: camera-shots #30 Tracking shot lateral (continuous horizontal scroll)
- Interaction: No interaction (always moving, like a stock ticker)
- Director fit: Tier 1: Fincher (Social Network), Guy Ritchie / Tier 2: Nolan / Tier 3: Malick

### DD-4: Stacked Data Cards
- Layout: compositions #3 Centered stack (cards stacked vertically)
- Entrance: camera-shots #2 Fade from black (each card fades in)
- Interaction: interaction-effects #2 Perspective tilt (hover tilts card)
- Director fit: Tier 1: Wes Anderson, Kubrick / Tier 2: Fincher / Tier 3: Ridley Scott

---

## Author / Team (#29) — 4 Archetypes

### AT-1: Side-by-Side Bio
- Layout: compositions #33 Clean 50/50 split (visual left, bio right)
- Entrance: camera-shots #7 Split diopter open (left and right slide in)
- Interaction: interaction-effects #3 Color temperature shift (hover warms image)
- Director fit: Tier 1: Villeneuve, Ridley Scott / Tier 2: Fincher / Tier 3: Edgar Wright

### AT-2: Centered Portrait Stack
- Layout: compositions #1 Center-weighted monument (avatar → name → bio → links stacked center)
- Entrance: camera-shots #2 Fade from black
- Interaction: interaction-effects #17 Duotone filter (image desaturated, hover → full color)
- Director fit: Tier 1: Wes Anderson, Sofia Coppola / Tier 2: Wong Kar-wai, Iwai / Tier 3: Fincher

### AT-3: Team Grid Cards
- Layout: compositions #5 Triptych (3 team members per row)
- Entrance: camera-shots #20 Jump cut stagger
- Interaction: interaction-effects #4 Depth-of-field pop (hovered member sharpens, others blur)
- Director fit: Tier 1: Wes Anderson (ensemble), Park Chan-wook / Tier 2: Tarantino / Tier 3: Villeneuve

### AT-4: Minimal Text-Only Bio
- Layout: compositions #31 Inset margin columns (wide margins, narrow bio)
- Entrance: camera-shots #2 Fade from black
- Interaction: interaction-effects #20 Weight morph (name shifts weight on hover)
- Director fit: Tier 1: Malick, Wong Kar-wai, Iwai / Tier 2: Sofia Coppola / Tier 3: Guy Ritchie

---

## Before / After (#43) — 3 Archetypes

### BA-1: Horizontal Slider
- Layout: compositions #33 Clean 50/50 split (draggable divider between states)
- Entrance: camera-shots #7 Split diopter open
- Interaction: JS drag slider to reveal before/after
- Director fit: Tier 1: Nolan (time), Fincher / Tier 2: Park Chan-wook / Tier 3: Miyazaki

### BA-2: Toggle Switch
- Layout: compositions #23 Viewport fill (full-screen, click toggles between states)
- Entrance: camera-shots #19 Match cut dissolve (states morph between each other)
- Interaction: interaction-effects #27 Toggle light/dark (click swaps states)
- Director fit: Tier 1: Kubrick, Nolan / Tier 2: Villeneuve / Tier 3: Wes Anderson

### BA-3: Scroll-Driven Morph
- Layout: compositions #62 Sticky hero dissolve (scroll position drives the morph)
- Entrance: camera-shots #29 Dolly zoom (scale distortion during morph)
- Interaction: interaction-effects #44 Depth of field shift on scroll
- Director fit: Tier 1: Nolan (Interstellar), Villeneuve / Tier 2: Fincher / Tier 3: Edgar Wright

---

## Marquee / Ticker (#45) — 3 Archetypes

### MQ-1: Infinite Horizontal Scroll
- Layout: Full-width CSS animation loop (translateX 0 → -50%)
- Entrance: None (always running)
- Interaction: No interaction (pure atmosphere)
- Director fit: Tier 1: Edgar Wright, Guy Ritchie / Tier 2: Fincher / Tier 3: Villeneuve

### MQ-2: Slow Drift Text
- Layout: Full-width, oversized text slowly drifting (8-15s per cycle)
- Entrance: camera-shots #2 Fade from black
- Interaction: No interaction
- Director fit: Tier 1: Wong Kar-wai, Malick, Iwai / Tier 2: Sofia Coppola / Tier 3: Nolan

### MQ-3: Logo Wall Scroll
- Layout: Full-width logos in a continuous horizontal strip
- Entrance: None (always running)
- Interaction: interaction-effects #17 Duotone filter (logos desaturated, hover → color)
- Director fit: Tier 1: Fincher (corporate), Nolan / Tier 2: Wes Anderson / Tier 3: Malick

---

## Selection Rules (Anti-Bias)

### For each section in the page:
1. Look up the function type (from narrative beat → function mapping)
2. Read the archetypes for that function type (this file)
3. Filter: keep only Tier 1 + Tier 2 for the chosen director
4. Select via hash + skip (same mechanism as hero archetype and camera shots)
5. Record the selection in storyboard.md with:
   - Archetype ID (e.g., AG-4)
   - Composition reference (compositions.md #)
   - Entrance reference (camera-shots.md #)
   - Interaction reference (interaction-effects.md #)
   - Director justification

### Mandatory Storyboard Entry per Section:

```markdown
## Scene N: [Name]
**Beat:** B{N} [Beat Name]
**Function:** #{N} [Function Name]
**Archetype:** {ID} [Archetype Name]

### References
- Layout: compositions.md #{N} — [name]
- Entrance: camera-shots.md #{N} — [name]
- Interaction: interaction-effects.md #{N} — [name]
- Director justification: [Why this director would use this specific combination]

### Interaction Justification Table
| Effect | Film Language | Narrative Purpose |
|--------|-------------|-------------------|
| [from interaction-effects] | [camera/film technique] | [why for this scene] |
```
