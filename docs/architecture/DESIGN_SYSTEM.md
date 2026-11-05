---
title: "Design System & Visual Identity"
lastUpdated: 2026-11-03
---

# OmniRoute — Design System & Visual Identity

> **Status:** the dashboard is built on the **Keak CI UI Kit** (`@keak/cheaper-inference-ui-kit`), vendored
> as the workspace `packages/ui-kit` (`@omniroute/ui-kit`; the upstream snapshot is pinned in
> `packages/ui-kit/UPSTREAM.md` and guarded by `npm run check:ui-kit-snapshot`). Light is the canonical
> theme; the default preference is `system`. The default palette is the kit's **Editions** appearance
> (warm paper neutrals and the copper accent `#e5ac82`, `packages/ui-kit/src/ci-editions.css`); Settings →
> Appearance → Color palette offers **Classic**, the kit's base tokens with the lime accent. Switzer is
> the single family for UI, display and code text (`--ci-font-ui`; `--ci-font-display` and
> `--ci-font-mono` resolve to it), self-hosted by the kit itself (`packages/ui-kit/src/ci-fonts.css`,
> imported by `ci-tokens.css`). Scripts Switzer lacks fall through glyph by glyph (`src/app/globals.css`):
> Inter for Cyrillic, Greek and Vietnamese and, only under `html[dir="rtl"]`, Vazirmatn for Arabic script.
> Every icon is a Lucide glyph.

## 1. Where things live

- **Kit.** `packages/ui-kit/src` is a byte-for-byte copy of the upstream `src/` at the commit pinned in
  `packages/ui-kit/UPSTREAM.md` (which also records the license authorization); `PATCHES.md` lists local
  patches (none). It is consumed as source, with no build: `next.config.mjs` transpiles it, and
  `tsconfig.json` maps `@omniroute/ui-kit` → `packages/ui-kit/src` and `@omniroute/ui-kit/*` →
  `packages/ui-kit/src/*` (`vitest.config.ts` and `vitest.mcp.config.ts` carry the same alias). Import a
  kit component by its subpath (`@omniroute/ui-kit/table`, `@omniroute/ui-kit/page-header`…), never
  through the `@omniroute/ui-kit` barrel: the barrel pulls every component (including the date picker)
  into each importer. The kit stylesheet enters through `src/app/globals.css`
  (`@import "../../packages/ui-kit/src/ci-styles.css"`, the complete sheet: the core `ci-ui.css` plus every pattern family).
- **Tokens.** `packages/ui-kit/src/ci-tokens.css` declares the `--ci-*` tokens; `src/app/globals.css`
  bridges them to the legacy OmniRoute names (`--color-*`, `--radius-*`, `--font-sans`/`--font-mono`,
  `--table-*`, `--orch-status-*`, `--color-fd-*`), so the existing `var(--color-*)` reads and Tailwind
  utilities keep working. New code uses the Tailwind utilities (`bg-surface`, `text-text-muted`,
  `border-border`, `text-success`, `bg-success-bg`, `bg-chart-1`…) or kit classes — never a hex value
  (`tests/unit/design-kit-bridge.test.ts` enforces the bridge). `text-primary` resolves to
  `--color-primary-ink` through `--text-color-primary`, so primary text stays readable while
  `bg-primary`/`border-primary` keep the accent surface: under Editions it is the kit's
  `--ci-color-accent-active` (the deep copper `#99562f` in light, the copper accent in dark); under Classic,
  lime-800 in light and the lime accent in dark. Chart series use
  `--color-chart-1` … `--color-chart-5`.
- **Themes.** `<html className="ci-theme">` (`src/app/layout.tsx`) opts the document into the kit theme.
  The preference is `light`, `dark` or `system` (`THEME_CONFIG.defaultTheme = "system"` in
  `src/shared/constants/appConfig.ts`; `system` follows `prefers-color-scheme`). `applyTheme()` in
  `src/store/themeStore.ts` (mirrored by `THEME_BOOT_SCRIPT`, inlined in `src/app/layout.tsx`, which runs
  before hydration) sets `data-theme="dark"|"light"` and toggles the `.dark` class on `<html>` together.
  The kit's dark token set is keyed on `data-theme="dark"` (`packages/ui-kit/src/ci-tokens.css`);
  OmniRoute's own dark overrides (the `.dark` block in `globals.css`) and the legacy Tailwind `dark:`
  utilities key on the `.dark` class. There are no accent color presets: the accent always comes from the
  kit, and a persisted preset from an older build is dropped when the store loads.
- **Palettes.** Two, both from the kit (`src/shared/constants/appearancePalette.ts`): `editions`, the
  default, and `classic`. Editions is the kit's `data-ci-appearance="editions"` attribute on `<html>`, which
  `ci-editions.css` (imported by `ci-ui.css`) combines with `data-theme`; Classic is the attribute's
  absence. The root layout server-renders the attribute, so a visitor with nothing stored (or no JS) gets
  Editions on every surface — dashboard, login, `/status`, error pages, `/docs` and the PWA. The choice is
  persisted next to the theme in the same `theme` store (`palette`, `setPalette()`, `applyPalette()` in
  `src/store/themeStore.ts`) and applied before paint by `THEME_BOOT_SCRIPT`
  (`src/shared/utils/themeBootScript.ts`, inlined in the layout's `<head>`), which removes the attribute
  only when the stored palette is `"classic"`; `src/app/global-error.tsx`, outside the root layout, applies
  it from the same store. Do not put `data-ci-appearance` on any other element: the kit matches it with
  `html:root:has([data-ci-appearance="editions"])`, so one descendant would switch the whole document.
  The Editions `data-ci-editions-variant="landing"` variant is for marketing pages, not the dashboard.
  Browser chrome: the server renders the default, Editions, in `viewport.themeColor` (one tag per
  `prefers-color-scheme`) and the web manifest — `PWA_THEME_COLORS` in
  `src/shared/constants/pwaThemeColors.ts`, the one mirror of the Editions `--ci-color-background`
  (`#f3f1e9` / `#11120f`), pinned to `ci-editions.css` by `tests/unit/pwa-theme-colors.test.ts`. The live
  `<meta name="theme-color">` then follows the stored palette and mode: `THEME_BOOT_SCRIPT` rewrites the
  tags before paint and the theme store's actions do it on every change (`resolveThemeColor()` /
  `applyThemeColor()` in `src/shared/utils/themeColorMeta.ts`, with `CLASSIC_PAGE_BACKGROUND` read from
  the kit's `ciTokens`). An explicit light/dark theme sets every tag to that mode; `system` keeps one
  colour per scheme. The manifest stays Editions: it is fetched once per install, without the
  preference. Monaco reads its colours off a probe (`monacoKitTheme.ts`);
  under Editions the probe read flips the root `data-theme` for one synchronous pass, because the kit
  resolves Editions light/dark from the root.
- **Components (adapters).** `src/shared/components/index.tsx` keeps the OmniRoute component API (same
  names, default exports and props), and the primitives behind it are adapters over the kit: forms
  (`Button`, `Input`, `Textarea`, `Checkbox`, `Select`, `Toggle`, `Badge`, `Card`), overlays and feedback
  (`Modal`/`ConfirmModal`, `Tooltip`/`InfoTooltip`, `NotificationToast`, `EmptyState`, `Loading`),
  structure (`Collapsible`, `CollapsibleSection`, `SegmentedControl`, `Breadcrumbs`, `Avatar`) and tables
  (`DataTable`, `FilterBar`, `ColumnToggle`, `FilterPills`, `PresetSlider`). An adapter imports the kit
  component by subpath and maps the legacy props onto it — for example `Button variant="primary"` is the
  kit `default` button (`--ci-button-primary-*`: the inverse surface in light, the accent with its
  `--ci-color-accent-foreground` ink in dark), `danger` is `destructive`, and `warning` is `outline` plus
  the `.ci-button--warning` extension. The `.ci-button--warning` and `.ci-badge[data-tone]` rules at the
  end of `globals.css` (`@layer components`) are OmniRoute extensions on top of the kit classes.
  `tests/unit/ui/adapters/*.test.tsx` pin each adapter.
- **Shell.** `src/app/(dashboard)/layout.tsx` renders `DashboardLayout`, which renders
  `src/shared/components/layouts/DashboardShell.tsx`: the kit `SidebarProvider` / `Sidebar` /
  `SidebarInset` (`packages/ui-kit/src/sidebar.tsx`), with OmniRoute's navigation logic in
  `src/shared/components/Sidebar.tsx`. A "skip to content" link to `#main-content` is the first focusable
  element. `src/shared/components/Header.tsx` holds the kit `SidebarTrigger` (the shell's only sidebar
  toggle), the Keak `ProductSwitcher` and the command-palette opener; it shows the route title only while
  no kit `PageHeader` (`.ci-page-header`) is mounted inside `#main-content`, so a page with its own
  `PageHeader` has a single `h1`. `src/shared/components/CommandPalette.tsx` is a kit `Dialog`.
- **Icons.** `<Icon name="material_name">` (`src/shared/components/Icon.tsx`) resolves the name (the
  Material Symbols vocabulary the screens use) through `ICON_MAP` (`src/shared/constants/iconMap.ts`) to a
  Lucide glyph. The Material Symbols font and package are gone: a name missing from the map renders a
  neutral placeholder glyph (`data-icon-missing="true"`) and logs a console warning outside production.
  `npm run gen:icon-map` prints the names in use that are missing from the map
  (`tests/unit/icon-map-coverage.test.ts` fails on any name without a Lucide icon;
  `tests/unit/icon-map-object-values.test.ts` covers names stored in lookup objects);
  `scripts/dev/codemod-material-icons.mjs <dir|file>... [--write]` rewrites literal
  `<span className="material-symbols-outlined">` spans to `<Icon>`.
- **Brand.** `src/shared/components/OmniRouteLogo.tsx` wraps the kit: the default export `OmniRouteLogo`
  renders `ProductIcon product="omniroute" variant="glyph"` (inline SVG, `basePath`-safe) and
  `OmniRouteLockup` renders `ProductLockup product="omniroute"` (accessible name "Keak OmniRoute") or, for
  white-label operators, their own `name`/`logoSrc`. Product-switcher destinations live in
  `src/shared/constants/keakProducts.ts` (`KEAK_PRODUCT_LINKS`, `KEAK_ACTIVE_PRODUCT`). The standalone
  screens — `src/app/login/page.tsx`, `src/app/status/page.tsx`, `src/app/maintenance/page.tsx`,
  `src/app/offline/page.tsx`, `src/app/not-found.tsx` and `src/shared/components/ErrorPageScaffold.tsx`
  — show the lockup; `tests/unit/brand-pages-static.test.ts` guards it.

## 2. Rules

1. Tokens, never literals. Exceptions kept on purpose: the always-dark console terminal and
   `STATUS_HEX` (`src/shared/constants/statusColors.ts`), the resolved-hex mirror of the kit status
   palette for callers that need a literal hex. The categorical palettes are no exception any more:
   they ride on the kit's five chart tokens (`--color-chart-1..5`) through
   `src/shared/utils/categoricalPalette.ts` and, for routing strategies,
   `src/app/(dashboard)/dashboard/combos/strategyPalette.ts`; ReactFlow edges and the orchestration
   canvas read the theme-aware `--orch-status-*` variables (`src/shared/components/flow/edgeStyles.ts`).
2. Never patch `packages/ui-kit/src` by hand: sync with `scripts/dev/sync-ui-kit.sh <commit>`; the
   pre-commit gate `npm run check:ui-kit-snapshot` (`.husky/pre-commit`) fails on any byte that
   differs from the pinned upstream commit (it skips with a warning when the upstream clone,
   `UI_KIT_CLONE` or `_references/cheaper-inference-ui-kit`, is absent). When the kit lacks something,
   work around it in the adapter or the screen and ask upstream for it.
3. Kit text defaults are English (`label = "Loading"`, `loadingLabel = "Loading table"`…) — pass translated
   strings from `useTranslations(...)` whenever a kit component renders text.
4. Tailwind utilities win over kit component classes (the kit declares
   `@layer theme, base, components, utilities` and its rules live in `components`) — use utilities for
   spacing and layout, not to re-color kit components.
5. Headings: `.ci-heading` for page and section titles; `.ci-dashboard-display` only for large, sparse
   display text such as the error-page status code. Both use Switzer.
6. `tests/unit/dashboard-kit-sweep.test.ts` guards the kit adoption: no Material ligature span under
   `src/app` or `src/shared/components`; in the dashboard tree (`src/app/(dashboard)` and
   `src/shared/components`) no raw `<select>`, `<textarea>` or `<table>` and no hand-rolled
   `role="dialog"` outside the listed exceptions (the `Select` adapter's native branch,
   `RequestLoggerDetail`); every raw `<button>` or `<input>` there needs a comment containing
   `kit-exception:` (with the reason) ending at most 3 lines above it; palette hues and `dark:` variants
   only in the files the test lists.
7. Verify both themes and the 390 px viewport before a PR (screenshots); `tests/e2e/a11y.spec.ts` runs
   axe.

## 3. Adding a screen

1. Open the page with the kit `PageHeader` (`@omniroute/ui-kit/page-header`, `compact` inside the
   dashboard) — title, description and `actions`. The shell header then drops its own title.
2. Build controls from `@/shared/components` (the adapters) and use kit components by subpath where no
   adapter exists (`Table`/`TableScrollArea`/`DataTableShell`, `Field`, `Alert`, `Tabs`, `RadioGroup`,
   `Slider`…).
3. Icons: `<Icon name="…" />`. A new name goes into `ICON_MAP` with the semantically matching Lucide
   component; `npm run gen:icon-map` lists the names still missing.
4. Colors: semantic utilities (`text-success`, `bg-warning-bg`, `border-border`…) and
   `var(--color-chart-N)` for chart series; no hex values and no `dark:` variants that only repeat a color.
5. Text: every string, including the labels you pass to kit components, comes from `useTranslations`. New
   keys go into `src/i18n/messages/en.json`, `pt-BR.json` and `vi.json` (the Vietnamese parity test pins
   every English key); the other locales are filled by the i18n sync.
6. Run the guards before the PR: `tests/unit/dashboard-kit-sweep.test.ts`,
   `tests/unit/icon-map-coverage.test.ts`, `tests/unit/icon-map-object-values.test.ts`,
   `npm run check:dashboard-typecheck` (the only check that catches a duplicated import in `iconMap.ts`),
   `npm run check:ui-icu`, and the screen's own tests.

## 4. Adding or changing an adapter

1. Keep the public API of `src/shared/components/index.tsx`: same export names, default exports and
   accepted props. Map legacy props onto the kit inside the adapter (see `Button.tsx`: `VARIANT_TO_KIT`,
   `SIZE_TO_KIT`).
2. Import the kit by subpath (`@omniroute/ui-kit/<component>`).
3. Workarounds for kit gaps live in the adapter (or in `globals.css` `@layer components` when the fix is a
   style), never in `packages/ui-kit/src`.
4. Add or update `tests/unit/ui/adapters/<name>.test.tsx`. For an adapter with many callers, compare the
   rendered markup before and after the change — padding or wrapper changes spread to every screen.

## 5. Updating the kit

`npm run check:ui-kit-upstream` compares the version pinned in `packages/ui-kit/UPSTREAM.md` with the
newest `v*` tag of the upstream repo and prints the sync command when a release is out.

The daily `UI Kit upstream watch` workflow (`.github/workflows/ui-kit-upstream-watch.yml`) runs the same
check. While the pin is behind, `scripts/ci/ui-kit-sync-pr.sh` keeps one sync PR open against the highest
`release/vX.Y.Z` branch, on the rolling branch `chore/ui-kit-sync-latest`. It never merges: every kit
release still needs a visual check on the local VPS. The branch is rebuilt when a newer release is out and
left alone otherwise. An open PR with commits pushed by hand isn't overwritten, and a PR for a version
that a maintainer closed unmerged stays closed until a newer release.

When no PR can be opened (the target release is frozen, the PR has commits pushed by hand, the PR was
closed, or no PR token is set) the workflow keeps one tracking issue open that says why.

The workflow uses two secrets:

- `secrets.UI_KIT_READ_TOKEN`: a read-only token for the private upstream repo. When the workflow can't
  read upstream (no token, a token that stopped working, or GitHub unreachable) the run stays green but
  writes a warning and keeps one separate issue open, which closes itself once a later run can read
  upstream again.
- `secrets.UI_KIT_SYNC_PR_TOKEN`: a fine-grained token on this repository with Contents and Pull requests
  write access. The default `GITHUB_TOKEN` can't create PRs here, and a PR it opened wouldn't trigger CI.
  Without this token the workflow only pushes the branch.

`scripts/dev/sync-ui-kit.sh <commit|latest> [clone]` copies the upstream `src/` at that commit (`latest`
= the newest `v*` tag) into `packages/ui-kit/src`, applies the single allowed transformation (it drops
the `.js` suffix from relative imports), and sets the workspace version in `packages/ui-kit/package.json`
and `package-lock.json` to the upstream one. Then: review `git diff packages/ui-kit`, do a visual pass on
providers, settings, combos, usage and endpoint in both themes, run `npm run check:ui-kit-snapshot` and
`npm run test:vitest:ui`, and open the PR with the upstream changelog.

## 6. README diagrams

The twelve diagrams the root `README.md` embeds (`docs/diagrams/*.svg`) are the kit applied to a static
image, and they are generated, not drawn by hand: 13 generator files at `scripts/docs/gen-readme-*.mjs`
(twelve diagrams plus the `gen-readme-diagrams.mjs` driver) and 12 staleness tests at
`tests/unit/docs/readme-*-svg.test.ts`, one per diagram, each byte-comparing the committed file with its
generator's output (job `test-unit`).

- **Tokens.** `scripts/docs/readme-diagram-theme.mjs` copies the Editions palette (the default look) from
  `packages/ui-kit/src/ci-editions.css` (pinned against that file by
  `tests/unit/docs/readme-diagram-theme.test.ts`, which also checks WCAG AA for every text colour on every
  surface in both schemes; the one exception, light `warn`, is the kit warning darkened 10 % because the kit
  value is 4.46:1 on the canvas) and defines the text roles on the kit's type scale (`ci-tokens.css`): Switzer at the kit's weights (400/500/600, display at 500) and tracking for
  everything, except the code roles (`.cmd`, `.term`, `.term-lg`, `.mono`, `.mono-sm`, `.mono-xs`), which
  are IBM Plex Mono and are only for commands, URLs, identifiers and terminal screens.
  Light values sit on `:root`, dark values behind `prefers-color-scheme: dark`, inside the file, so each
  image follows the viewer's scheme on GitHub.
- **Fonts.** GitHub Markdown carries no CSS and the camo proxy blocks every external fetch, so kit type has
  to travel inside the file. `scripts/docs/readme-outline.mjs`, the last step of every generator, shapes the
  Switzer roles with HarfBuzz and draws them as vector outlines (`<defs>` paths and `<use>`), with the arrows
  and geometric symbols Switzer lacks drawn on its own metrics. Outlines, never an embedded font: Switzer's
  licence (`packages/ui-kit/src/fonts/FFL.txt`) forbids subsetting and format conversion without written
  consent and allows vector drawings, so do not reintroduce a Switzer `@font-face` or `data:` URI. The one
  font left in a file is the OFL IBM Plex Mono subset for what stays real code text
  (`scripts/docs/readme-fonts.mjs`), built from those characters; any glyph it cannot embed throws.
- **Regenerate.** `npm run docs:readme-diagrams` rewrites all twelve in README order and prints one line per
  file with its size. A single generator also runs on its own (`node scripts/docs/gen-readme-<name>.mjs`;
  `free-tier-budget` needs `node --import tsx/esm` because its figures come from the live catalog loader in
  `open-sse/config/freeModelCatalog.ts`; the CI consequence of a catalog change is in
  `docs/architecture/QUALITY_GATES.md` → `docs-sync-strict`). Commit the generator and the SVG together.
- **Proof.** `scripts/docs/readme-svg-shots.mjs <file.svg> <outdir>` renders a file the way GitHub serves
  it (an `<img>` tag, camo's `Content-Security-Policy`, `image/svg+xml`), captures a light and a dark frame
  and reports the external font requests the page made (must be 0).
- **Budget.** Under 200 KB per file (each staleness test asserts it); 500 KB is the hard cap for any README
  image (the SVG studio validator's rule).
- **Copy unchanged, counts from the gate.** The rebrand changed type and palette, not words: each generator
  carries its diagram's copy in a `*_COPY` constant (or builds it from the live catalog) that is both the
  drawn text and the input of the outlining step. Canonical figures stay in `<text>` nodes (invisible once
  outlined, `fill-opacity:0`), read by `check:docs-counts`
  (`scripts/check/check-docs-counts-sync.mjs`); the staleness tests of the diagrams that gate reads also run
  its validators on the generated file, so a figure that drifts from the code fails the test — fix the
  source the gate reads, never the number in the generator.

## 7. Reference index

- `src/app/globals.css` — token bridge, `.dark` overrides, OmniRoute `@layer components` extensions
- `packages/ui-kit/UPSTREAM.md` — pinned upstream commit and license authorization; `packages/ui-kit/PATCHES.md`
- `packages/ui-kit/src/ci-tokens.css`, `packages/ui-kit/src/ci-editions.css`, `packages/ui-kit/src/ci-ui.css`,
  `packages/ui-kit/src/keak-brand.tsx`
- `src/shared/components/index.tsx` and the adapters next to it; `src/shared/components/layouts/DashboardShell.tsx`,
  `src/shared/components/Sidebar.tsx`, `src/shared/components/Header.tsx`, `src/shared/components/CommandPalette.tsx`
- `src/shared/components/Icon.tsx`, `src/shared/constants/iconMap.ts`, `scripts/dev/gen-icon-map.mjs`,
  `scripts/dev/codemod-material-icons.mjs`
- `src/shared/components/OmniRouteLogo.tsx`, `src/shared/constants/keakProducts.ts`
- `src/store/themeStore.ts`, `src/shared/utils/themeBootScript.ts`, `src/shared/constants/appearancePalette.ts`,
  `src/shared/constants/pwaThemeColors.ts`, `src/shared/constants/appConfig.ts`,
  `src/shared/constants/statusColors.ts`
- `tests/unit/design-kit-bridge.test.ts`, `tests/unit/dashboard-kit-sweep.test.ts`,
  `tests/unit/icon-map-coverage.test.ts`, `tests/unit/icon-map-object-values.test.ts`,
  `tests/unit/brand-pages-static.test.ts`, `tests/unit/ui/adapters/*.test.tsx`
