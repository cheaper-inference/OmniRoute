# Searchable selector browser fixture

Local visual and performance acceptance fixture for PR #19288. It bundles the real
`ComboStepSelectors`, `SearchableSelectField`, `Modal`, translations and global CSS with the
repository's installed esbuild, PostCSS and Tailwind packages. It does not start the full app,
contact providers, use real accounts, or save changes.

## Build and serve

Run from the repository root with the existing dependencies installed:

```sh
node scripts/perf/searchable-select-browser/build.mjs
python3 -m http.server 20129 --bind 127.0.0.1 --directory .build/searchable-select-browser/dist
```

Open `http://127.0.0.1:20129/` in the browser on that computer. The static server is loopback-only;
stop it with Ctrl-C when finished. If the environment provides an already approved local preview
server, point it at `.build/searchable-select-browser/dist` instead. Do not publish the repository
or start the Next.js server for this fixture. The generated `.openai/hosting.json` also selects
`dist` relative to `.build/searchable-select-browser`; the build does not launch a server.

All generated files are under the already ignored `.build/searchable-select-browser`. No generated
bundle belongs in the source tree or lint input. Rebuilding replaces the served fixture; reload the
browser after every build and preserve the previous run's raw measurements before rebuilding.

The default build uses the working-tree selector. To reproduce the original PR-head selector:

```sh
FIXTURE_BASELINE=5196d0907fd9e0dc9e0d6264894e87d482d74283 node scripts/perf/searchable-select-browser/build.mjs
```

`FIXTURE_BASELINE` is opt-in and accepts a local Git commit/ref, not a filename or a boolean.
The build resolves it to a commit and reads `src/shared/components/SearchableSelectField.tsx`
with `git show` via `execFile`, without a shell or a checkout. No manually extracted baseline file
is needed. An unavailable ref fails the build. Unset `FIXTURE_BASELINE` to return to the working-tree
selector. The output `fixture-source.json` records the working-tree HEAD and requested/resolved
baseline ref. It does not capture uncommitted changes; record `git diff` separately with results.

## Visual cases and controls

The navigation exposes English/Persian, light/dark and desktop/mobile combinations. English uses
LTR; Persian sets the document language to `fa` and direction to RTL. The inner viewport is
1280 × 800 for desktop and 390 × 844 for mobile. These are iframe dimensions, not device emulation.
The direct `frame.html` page is available when an actual browser/device viewport is preferable.

1. Choose a case, then click **Open modal** (or its Persian translation).
2. Exercise the provider, model and account selectors, type queries and select results. Confirm
   the selected model ID below the fields, account restrictions, Escape, Cancel and reopening.
3. Inspect the list within the modal for viewport overflow, clipped results, wrapping, focus and
   RTL alignment. Test both themes at both viewport sizes; preserve screenshots with the URL/case.
4. For a long multilingual label and description, add `&long=1`, for example
   `http://127.0.0.1:20129/?viewport=mobile&locale=fa&theme=dark&long=1`, then search `04999`.
   Only `model-04999` changes. Its label combines English, Persian, Japanese, Chinese, Spanish and
   German; its description includes Persian text and a long unbroken identifier. Other model IDs,
   model count and account data stay the same. Navigation links reset this optional flag, so add it
   again when changing the visual case. Omit `long=1` for comparable normal-dataset timings.

The normal dataset is 5,000 synthetic models (`model-00000` through `model-04999`) and 40 synthetic
accounts. The real combo selector adds its always-visible placeholder/automatic options, so the
list's total logical option count is not exactly the model/account count. A windowed list mounts
only part of that logical set.

## Benchmark procedure and interpretation

Use a foreground Chromium browser supporting Long Animation Frames. Keep the same browser,
hardware, zoom, viewport, locale, theme and throttling settings for baseline/final comparisons.
Wait for initial assets/fonts to load. Reload, open the modal, leave the model selector closed,
then click **Run benchmark** once. Do not interact or switch tabs until **Benchmark complete**.
The unchanged harness performs 10 open/filter pairs: programmatic trigger click, input replacement
with `04999` plus a bubbling synthetic `input` event, then Escape. It does not simulate ten rounds
of individual physical keystrokes and does not discard a warm-up round.

After completion, close the modal to view/copy the JSON in the page's `metrics` element. Keep all
20 samples, their sequence/kind/query, browser and viewport metadata with each run. Compare open
and filter samples separately, and disclose any aggregation and excluded runs. Do not substitute
mounted `optionCount` for the logical number of matching options.

The measurement is a **conservative two-requestAnimationFrame paint-opportunity estimate**, not
INP, Event Timing, actual pixel presentation time, or end-to-end physical input latency:

- Start: `performance.now()` inside the document's capture-phase click/input listener, before
  the React event handler runs. It is not the hardware event time or `event.timeStamp`.
- Observation: a body-subtree `MutationObserver` calls the measurement callback. The first such
  callback seeing a listbox records `domReadyMs`; listbox presence alone does not prove the intended
  result has painted.
- End: that callback schedules two nested animation frames. The first second-frame callback
  still matching the active sample and seeing a listbox records `elapsedMs = performance.now() -
start`, mounted option count and a text excerpt. The frames allow an intervening paint opportunity;
  the browser is not guaranteed to have presented those pixels. Unrelated DOM mutations may also
  schedule callbacks, and stale callbacks are ignored using the active sample ID.
- `longFrames` contains the browser's buffered Long Animation Frame diagnostics. It is supporting
  evidence, not attribution of every entry to a particular sample or an INP result.

The instrumentation itself adds work. Foreground scheduling, animations, refresh rate and host
load influence the numbers. Inspect the text excerpts and UI as well as elapsed time; the harness
has no correctness assertion or timeout and should be stopped/reloaded if a run stalls.

## Source scope and limits

- Harness and build: [`fixture.tsx`](./fixture.tsx), [`build.mjs`](./build.mjs).
- Selector: [`SearchableSelectField.tsx`](../../../src/shared/components/SearchableSelectField.tsx).
- Integration: [`ComboStepSelectors.tsx`](<../../../src/app/(dashboard)/dashboard/combos/ComboStepSelectors.tsx>).
- Modal: [`Modal.tsx`](../../../src/shared/components/Modal.tsx).
- Styles: [`globals.css`](../../../src/app/globals.css); real `en`/`fa` messages from `src/i18n/messages`.
- Original selector reference: `5196d0907fd9e0dc9e0d6264894e87d482d74283`.

Baseline mode swaps **only the selector module**. All its dependencies, surrounding components,
translations, CSS and the harness come from the current worktree, so this is an isolated component
comparison, not a build of the entire historical app. The fixture sets the kit theme class and
light/dark tokens directly; it does not reproduce the dashboard shell, persisted appearance settings
or app boot sequence. It bypasses Next.js routing, SSR/hydration, authentication, network/API loading,
provider discovery and persistence. Its synthetic data cannot establish production latency,
full-app correctness, screen-reader behavior or real mobile-device behavior. Keep full-app and
accessibility checks separate, and do not treat this optional local fixture as a CI gate.
