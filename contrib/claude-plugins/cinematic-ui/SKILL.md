---
name: cinematic-ui
description: Design and build websites with film-inspired visual systems, director-driven art direction, storyboard-first layout planning, and cinematic motion. Use when the user asks for a cinematic site, movie-style landing page, director-inspired UI, film-noir, sci-fi, romance, thriller, action, animation, or a movie-like website aesthetic, including requests phrased in Chinese. Do not use for generic web design unless the user explicitly wants a film or director reference.
---

# Cinematic Layout

## Plugin Notes

This skill is packaged as the `cinematic-ui` Claude Code plugin.

- Every `references/...` path in this file and in the reference files is relative to this skill's folder: `${CLAUDE_SKILL_DIR}`. Read them from there, for example `${CLAUDE_SKILL_DIR}/references/library-index.md`.
- Run the search hints in `references/library-index.md` and `references/data/README.md` against `${CLAUDE_SKILL_DIR}/references/data/`, not against the user's project.
- Write the working artifacts (`decisions.md`, `storyboard.md`, `compiled-spec.md`) and the build output inside the user's project, never inside `${CLAUDE_SKILL_DIR}`.
- When a compiled spec loads a library from a CDN entry in `references/data/interaction-effects-50.md`, pin an exact version in the URL. Several entries in that file omit the version.

---

Design the site like a film production, not like a generic landing page.
Treat this as a research-and-translation skill plus a design-library skill. Its job is to study film references, extract usable cinematic signals, then turn those signals into page narrative, section structure, motion direction, and implementable web specs.
The core mechanism is fixed: use a director and a specific film to determine the site's emotional language, then translate that language into web structure and implementation. Do not replace this with generic premium-brand logic.
Do not confuse the film with the workflow artifact. The film is research input and emotional source material. The computer-operable workflow begins only when those observations are translated into `decisions.md`, `storyboard.md`, `compiled-spec.md`, and implementation.

## Start

- Every invocation must complete the start questionnaire before Phase 1 begins.
- Do not enter `decisions.md`, director selection, film selection, architecture, or visual planning until the questionnaire is complete.
- Mirror the user's language in every question and deliverable.
- Keep questions short and ask only one blocking question at a time.
- Run this start questionnaire on every invocation:
  1. Ask how to start:
  - `Screenshot`: reverse-engineer a visual reference from an image or URL.
  - `Step-by-step`: let the user choose genre, director, and film.
  - `Surprise me`: pick a fresh combination that differs from previous work when project history is available.
  2. Ask whether the design should include image placeholders.
  3. Ask for the site's niche and page list before moving into architecture.
- If the environment supports structured questionnaires or forms, use them.
- If the environment does not support structured questionnaires, ask the same items in plain language.
- If the user pre-answers some items in the initial request, confirm or record those answers and only ask for the missing items.
- Phase 1 starts only after all required start-questionnaire items are answered or explicitly inferred from the user's request.

## Demo Uniqueness Protocol

Use this whenever the same user has already used this skill to create one or more other sites, demos, or homepage concepts.

- Treat prior outputs for the same user as design-history context, not as reusable shells.
- Before Phase 1 is complete, inspect the immediately previous outputs when available and record a uniqueness audit in `decisions.md`.
- Write a `Previous-work audit` that names the recurring traits most likely to repeat. Examples:
  - left-copy right-object hero
  - top nav plus stacked framed panels
  - repeated rounded premium cards
  - pill metadata row
  - dark luxury palette with thin borders
- Write a `Shell-ban list` for the new project. These are layout traits that are explicitly forbidden because they would make the new work too similar to prior work.
- Write a `Primary composition family` for the new project before any page design begins. Examples:
  - full-bleed stage
  - corridor
  - vertical tower
  - archive wall
  - panoramic slab
  - cutaway monolith
- The new project must choose a different primary composition family from the user's most recent comparable output unless the user explicitly asks for an intentional sequel.
- If the user asks for multiple different sites over time, prioritize uniqueness across site shell, hero posture, section rhythm, navigation posture, density pattern, and dominant geometry, not just color or typography.
- A new demo fails if its wireframe would still look like a previous demo after removing color, type styling, and decorative effects.
- If project history is unavailable, state that and still write a `Shell-ban list` against the most common fallback templates you might otherwise drift toward.

## Operating Model

Use four strict phases. Do not skip forward. Keep each phase's output in its own markdown file inside the working project.

1. Phase 1: decisions
2. Phase 2: storyboard
3. Phase 3: compiled spec
4. Phase 4: build and verify

Inside Phases 2 and 3, follow this order without skipping:
1. Define the site-wide cinematic grammar.
2. Write one independent scene thesis for each major page role.
3. Lock one irreplaceable signature composition per page.
4. Derive the shared system only after the page compositions are already clear.

Read [references/output-templates.md](references/output-templates.md) before creating those files.

## Delegation Model

- If the environment supports sub-agents or parallel workers, use them by default after the director and film are locked.
- Keep one lead agent responsible for the site-wide cinematic grammar and final coherence.
- Delegate bounded sidecar tasks such as:
  - film or niche reference research
  - page-role scene exploration for distinct pages
  - compiled-spec drafting for disjoint page roles
  - implementation or verification on separate files
- Do not let multiple agents independently redefine the director, film, or site-wide visual thesis.
- Merge delegated work back into one directed system. The result must still feel like one film, not a committee.
- Do not skip delegation unless the task is too small to benefit from it or the environment does not support sub-agents.

## Progressive Loading

Keep `SKILL.md` lean. Load only the references needed for the current phase.

### Always read first

- [references/library-index.md](references/library-index.md)
- [references/premium-calibration.md](references/premium-calibration.md)

### Phase 1: Decisions

- Read `references/data/directors-200.md` only.
- If sub-agents are available, delegate film research, niche research, or reference breakdown as separate bounded tasks after the user direction is clear.
- If the user has prior sites or demos in the workspace, review them just enough to identify what must not repeat.
- If the user starts from a screenshot or live site, inspect that reference first and infer a likely genre, director, and film. Ask for confirmation before committing.
- When web access is available, research the chosen director and film before finalizing the phase. This is required, not optional.
- Use external sources to gather richer creative input such as:
  - film palette and lighting behavior
  - cinematography patterns, framing logic, and scene rhythm
  - production design or material cues
  - director signature techniques
  - 2-3 premium sites in the same niche
- Prefer primary or authoritative sources when available, then add secondary analysis only to deepen interpretation.
- Record the research sources and a short interpretation note. Do not dump plot summaries or generic trivia.
- If web access is unavailable, say so explicitly and continue with best-effort inference from local libraries. Mark the result as a weaker research pass.
- If the user provides references, do not copy them whole. Read [references/reference-protocol.md](references/reference-protocol.md) and decompose each reference into traits such as rhythm, materiality, typography, framing, or image treatment.
- Record the uniqueness audit, shell-ban list, and primary composition family in `decisions.md`.
- Write `decisions.md`.

### Phase 2: Storyboard

- Read these files one at a time, not all at once:
  - `references/anti-convergence.md`
  - `references/data/hero-archetypes.md`
  - `references/data/narrative-beats.md`
  - `references/data/section-functions.md`
  - `references/data/section-archetypes.md`
- Use `references/data/dna-index.tsv` to cast 2-3 compatible design DNA sources by mood, font direction, shape language, motion, restraint, density, and material richness.
- Read `references/data/design-dna-db.txt` only when the index points to a promising source and deeper site-level DNA details are needed.
- Define the site-wide cinematic grammar before designing any individual page. Capture:
  - page-shell logic
  - navigation posture
  - framing rules
  - density cadence
  - recurring material or atmospheric layers
  - composition families that fit the chosen film
- Make sure the selected page-shell logic and composition family do not violate the shell-ban list from Phase 1.
- Build a director brief with:
  - one-sentence visual thesis
  - 3 signature techniques and their web translation
  - exact color tokens
  - typography direction
  - motion rules
- Run the prestige calibration from [references/premium-calibration.md](references/premium-calibration.md).
- For every major page role, write an independent scene thesis before defining shared components. Treat each page as a standalone scene or poster first, then connect the pages into one site.
- If sub-agents are available, assign distinct page roles to different agents only after the site-wide cinematic grammar is approved.
- Define one page-level visual thesis per page. This is the single dominant idea that makes the page memorable. Examples: monumental type, sculptural light, editorial framing, void plus glow, object-as-stage. Everything else must support this idea rather than compete with it.
- Write a hero dominance statement explaining exactly why the hero feels expensive or cinematic without relying on generic gradients or generic app UI.
- Define one irreplaceable signature composition per page before introducing reusable layout primitives.
- Map each page to a narrative arc instead of defaulting to `Hero -> Features -> Stats -> CTA`.
- Apply the anti-convergence system from [references/anti-convergence.md](references/anti-convergence.md) when choosing hero archetypes, narrative arcs, and section archetypes.
- Write `storyboard.md`.
- Get user approval before moving to Phase 3 when the task is collaborative or exploratory.

### Phase 3: Compiled Spec

- Read [references/implementation-guardrails.md](references/implementation-guardrails.md) before extracting final CSS and JS.
- Read only the specific entries needed for the approved storyboard:
  - `references/data/camera-shots-50.md`
  - `references/data/interaction-effects-50.md`
  - `references/data/compositions.md`
  - `references/data/visual-elements.md`
  - `references/data/background-techniques.md`
  - `references/data/typography-cinema.md`
  - `references/data/color-grades.md`
  - `references/data/font-moods.md`
  - `references/data/textures.md`
- Read [references/anti-garbage.md](references/anti-garbage.md) before finalizing the spec.
- Lock each page's signature composition before deriving shared layout primitives.
- Shared systems come last. Extract navigation, footer, spacing rhythm, typography, tokens, and utilities only after the page-specific compositions are already clear.
- If sub-agents are available, delegate disjoint page-spec extraction or implementation tasks, then merge them back under one lead agent review.
- Respect a strict interaction budget:
  - maximum 1 heavy interaction per page
  - maximum 2 attention-seeking reveal patterns per page
  - the remaining motion must stay subordinate to the page's visual thesis
- Prefer fewer but stronger gestures over many clever effects.
- Translate premium cues into surfaces, spacing, type hierarchy, edge treatment, and atmospheric layers, not just animation.
- Grid and flex may be used as invisible alignment infrastructure, but the visible composition must not collapse into a default card matrix unless the chosen film explicitly supports that logic.
- Create an entrance map per page before writing section specs.
- `fadeUp` / `opacity + translateY` may appear at most 2 times per page.
- Use at least 4 distinct entrance types per page when the page has enough sections to support that range.
- If a selected interaction-effect id is JS-required under [references/implementation-guardrails.md](references/implementation-guardrails.md), the full JS is mandatory in `compiled-spec.md`.
- Include the `External Library Decision` block from [references/implementation-guardrails.md](references/implementation-guardrails.md) in `compiled-spec.md`.
- Run the Phase 3 quality checklist from [references/implementation-guardrails.md](references/implementation-guardrails.md) before treating the spec as complete.
- Do not invent core interactions or atmospheric devices from memory when an appropriate library entry already exists.
- For each page, record the selected library source ids for:
  - camera / reveal behavior
  - interaction behavior
  - composition
  - typography treatment
  - atmospheric/background technique when used
- Every heavy interaction, standout reveal, hero atmosphere layer, and signature composition must cite its library entry id in `compiled-spec.md`.
- If a custom effect is still necessary, mark it explicitly as `Custom`, explain why the library was insufficient, and keep it subordinate to the chosen film language.
- Extract complete CSS for layout, entrances, and interactions.
- Include complete JS whenever the selected interaction requires it.
- Write `compiled-spec.md` as the only source of truth for implementation.

### Phase 4: Build And Verify

- Read only:
  - `compiled-spec.md`
  - `references/anti-garbage.md`
  - `references/implementation-guardrails.md`
- Build from the spec without improvising new layout logic.
- Add reduced-motion handling and responsive behavior without breaking the chosen film language.
- Verify the output against the storyboard and compiled spec.
- Use the Screening Room and Post-Screening Adjustments rules from [references/implementation-guardrails.md](references/implementation-guardrails.md) when refining the result after the first build.

## Hard Rules

- Preserve the chosen director and film language through color, type, spacing, composition, and motion.
- Keep the director and film as the primary source of feeling. Use premium calibration to sharpen the result, not to overwrite the chosen cinematic DNA.
- Keep director names, film titles, chapter markers, calibration jargon, and workflow metadata inside the working files by default, not in the user-facing UI.
- Do not expose labels such as `chapter`, `director`, `film`, `calibrated`, `report build`, `treatment`, or similar process language in the final interface unless the user explicitly asks for a meta/editorial treatment.
- Vary section rhythm. Include a mix of spectacle, dense information, and breathing room.
- Use at least 4 distinct entrance patterns per page when the page has enough sections.
- Do not let adjacent sections reveal the same way.
- Include visual structure beyond plain text blocks. Hero sections need at least 3 visual elements. Most other sections need at least 1-2.
- Make each page legible around one big visual idea. Do not let every section introduce a new concept.
- Define the site-wide cinematic grammar first, then page scenes, then irreplaceable page compositions, and only then the shared system.
- When the same user has prior outputs, force uniqueness at the wireframe level. Do not let a new site reuse the previous site's shell with only different colors, copy, or surface styling.
- Interior pages must feel like new scenes in the same film, not simplified versions of the homepage.
- Every major page role needs one signature composition that cannot be replaced by a generic product-marketing grid or default template layout.
- A site style is not valid until the homepage and all major page roles express the chosen director through layout, pacing, hierarchy, and composition, not only through color, typography, or surface styling.
- Treat grid as infrastructure, not composition. If a section still works unchanged as a generic two-by-two or three-column product grid, the composition is too weak.
- Design interior pages as standalone scenes first. Shared patterns must support those scenes, not flatten them.
- Treat restraint as a design tool. High-end work often removes 20 percent of the obvious moves rather than adding 20 percent more detail.
- Prefer exact tokens and implementation notes over vague adjectives.
- If web research or a referenced site is unavailable, state that constraint and continue with best-effort inference instead of stalling.
- Never treat the film itself as a spec sheet, component inventory, or computer workflow. Research the film as cinema, then formalize only the web translation.

## Anti-Patterns

- Do not output a generic gradient hero with centered copy unless the source film genuinely supports it.
- Do not watermark the hero or navigation with director names, film titles, chapter labels, or workflow tags masquerading as premium microcopy.
- Do not reuse the same hover, reveal, or card pattern in every section.
- Do not let the page become a motion demo or effect sampler.
- Do not use references as a layout template. Borrow dimensions of quality, not full compositions.
- Do not let shared containers or reusable cards erase page-specific scene identity.
- Do not decide the shared component system before page-level compositions are locked.
- Do not reuse the previous demo's hero posture, navigation posture, section rhythm, or dominant geometry unless the user explicitly requests continuity.
- Do not read the entire library at once.
- Do not jump from user request directly to HTML without writing `decisions.md`, `storyboard.md`, and `compiled-spec.md`.

## File Guide

- Use [references/library-index.md](references/library-index.md) to decide which library to load.
- Use [references/output-templates.md](references/output-templates.md) to structure deliverables.
- Use [references/premium-calibration.md](references/premium-calibration.md) to decide what makes the page feel expensive without breaking the cinematic concept.
- Use [references/reference-protocol.md](references/reference-protocol.md) when the user provides visual references but wants to avoid template copying.
- Use [references/anti-garbage.md](references/anti-garbage.md) as the final filter before coding.
