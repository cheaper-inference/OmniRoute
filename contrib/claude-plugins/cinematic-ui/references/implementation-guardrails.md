# Implementation Guardrails

Use this during Phase 3 and Phase 4.

This file restores the concrete anti-laziness rules that prevent the agent from collapsing back to generic web output while compiling and building.

## External Library Decision

Read the external-library section of `data/interaction-effects-50.md` before deciding whether to add outside dependencies.

Record this block in `compiled-spec.md` for every page or for the site-wide motion system:

```markdown
## External Library Decision

### Q1: What is the core motion experience of this page?
- [scroll narrative / shader surface / 3D depth / text performance / particles / page transition / other]

### Q2: Can the native library entries do it?
- [yes, no external library]
- or [no, specify which scene needs more and why native entries are insufficient]

### Q3: If an external library is used, why this one and how will it be re-directed through the chosen film language?
- [library choice, collision risk, how to avoid generic output]

### Decision
- External libraries: [name + CDN/import] (maximum 3)
- or: no external library, native effects only
```

## JS-Required Interaction Effects

These interaction entries require JavaScript and may not be downgraded to a generic CSS hover:

- `#1`
- `#2`
- `#8`
- `#15`
- `#23`
- `#26`
- `#35`
- `#36`
- `#37`
- `#38`
- `#39`
- `#46`
- `#48`
- `#50`
- `#54`

If one of these ids is selected in the storyboard or compiled spec:

- include the complete JS in `compiled-spec.md`
- include the final JS in the build output
- adapt timing, colors, and thresholds to the site's tokens

## Entrance Map

Before writing the page spec, create an entrance map for that page.

Example:

```markdown
## Entrance Map
- Scene 1: scale-in
- Scene 2: clip-wipe-right
- Scene 3: fade-from-black
- Scene 4: slide-left
- Scene 5: curtain-reveal
```

Rules:

- No two adjacent sections may use the same entrance type.
- `fadeUp` / `opacity + translateY` may appear at most 2 times per page.
- Each page must use at least 4 different entrance types when the page has enough sections to support that range.

## Phase 3 Quality Checklist

Do not treat Phase 3 as complete until all checks pass:

- Every section has complete layout CSS.
- Every section has complete entrance behavior.
- Every section has complete interaction behavior or an intentional `none`.
- If a JS-required effect is selected, the complete JS appears in `compiled-spec.md`.
- Global design tokens are used instead of stray hardcoded values.
- Entrance variety rules are satisfied.
- The compiled spec includes the `External Library Decision` block.
- Library source ids are present for major interactions, reveals, compositions, and atmosphere moves.
- Anti-garbage constraints still hold.

## Screening Room

After implementation, verify:

- layout matches the spec
- motion matches the spec
- interaction matches the spec
- reduced-motion support exists
- responsive behavior exists
- the page still feels like the chosen director in grayscale wireframe form

## Post-Screening Adjustments

### Punch Up

Use when the user asks for:

- more dramatic
- bolder
- stronger
- more cinematic

Adjustment moves:

- increase scale contrast between key sections
- replace weak repeated entrances with more directed reveal types
- add one more film-appropriate visual element where a section feels too thin
- strengthen the director's signature device
- sharpen contrast or hierarchy without turning the page into an effect sampler

### Pull Back

Use when the user asks for:

- quieter
- cleaner
- too much
- too busy
- more restrained

Adjustment moves:

- remove one secondary visual layer from overloaded sections
- reduce glow, blur, or motion amplitude
- increase breathing room
- lower saturation toward the film's neutral zone
- keep the page thesis, but delete decorative support moves that do not strengthen it
