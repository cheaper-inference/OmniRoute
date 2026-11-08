# PR #19288 browser acceptance

Recorded 2026-11-08 in foreground Chromium 156 on Linux using the real-component
[fixture](../README.md). All accounts and models are synthetic. The reference selector is
`5196d0907fd9e0dc9e0d6264894e87d482d74283`; the final selector and windowing hook are the
source files included with this evidence. No UI-kit, dependency, baseline or CI gate was changed.

## 5,000-model browser measurements

Each run contains 10 open/filter pairs with all samples retained. Filtering searches `04999` and
displays the exact last model plus the always-visible placeholder. Times below are milliseconds.

| Case                                     | Open median (range)       | Filter median (range) | Mounted open rows |
| ---------------------------------------- | ------------------------- | --------------------- | ----------------- |
| Original, EN desktop 1280 × 800          | 1728.35 (1590.10–1888.30) | 85.75 (66.30–107.10)  | 5001              |
| Final, EN desktop 1280 × 800             | 61.70 (59.30–75.30)       | 63.65 (60.80–73.20)   | 12                |
| Final, FA dark mobile viewport 390 × 844 | 33.65 (28.90–43.00)       | 32.80 (25.20–103.00)  | 12                |

The matched desktop median open estimate improved about 28×. These are browser measurements,
not a pure filtering-function microbenchmark. The start is the capture-phase event handler and
the endpoint is the second animation frame after a committed DOM mutation, a conservative paint
opportunity estimate. It is **not INP, actual pixel presentation time, or physical input latency**.
The 10-cycle harness dispatches a click and one input replacement per cycle, not individual physical
keystrokes. See the [full method and limitations](../README.md#benchmark-procedure-and-interpretation).

Raw records: [baseline desktop](baseline-desktop.json), [final desktop](final-desktop.json),
[final FA mobile dark](final-mobile-fa-dark.json). No warm-up or outlier was discarded. No physical
mobile device, CPU throttling, Firefox or Safari was tested. Modal initialization is outside the open
sample; the original options-keyed index is retained so typing does not pay a newly deferred index cost.

## Visual matrix

The eight screenshots were reviewed. English is LTR, Persian is RTL, and both themes use the real
kit tokens and app CSS. The popup stays inside every viewport with no horizontal document overflow.
Its body portal is outside the Modal DOM. At mobile size its bottom extends past the Modal border
while remaining visible, directly exercising the clipping case. These facts are also recorded in
[visual-matrix.json](visual-matrix.json).

| Viewport           | English light                 | English dark                 | Persian light                 | Persian dark                 |
| ------------------ | ----------------------------- | ---------------------------- | ----------------------------- | ---------------------------- |
| Desktop 1280 × 800 | [Image](en-desktop-light.png) | [Image](en-desktop-dark.png) | [Image](fa-desktop-light.png) | [Image](fa-desktop-dark.png) |
| Mobile 390 × 844   | [Image](en-mobile-light.png)  | [Image](en-mobile-dark.png)  | [Image](fa-mobile-light.png)  | [Image](fa-mobile-dark.png)  |

Additional checks:

- Filtering and Enter select exact `model-04999`, not its label or query. Reopening reveals the
  selected tail row completely: [screenshot](fa-mobile-dark-tail.png), [geometry](tail-geometry.json).
- ArrowDown wraps from the last row to the placeholder; ArrowUp returns to the last row. The active
  descendant remains mounted with logical position/set-size: [record](keyboard-wrap.json).
- A 193.53px multilingual row wraps without row overlap or horizontal overflow and is fully visible
  at the tail: [screenshot](fa-mobile-dark-long-row.png), [geometry](long-row-geometry.json).
- The first Escape closes only the selector; the second closes the Modal. Reopening works.
- Persian provider search and account `39` search return the expected synthetic entities. Account
  selection commits `account-39`; returning to automatic mode exposes restrictions again.
- A selected account restriction remains selected while another query hides it and after clearing
  the query: [screenshot](fa-desktop-light-restrictions.png).

This is isolated integration acceptance using the actual ComboStepSelectors, selector, Modal,
translations and global styles. It is not a booted dashboard/Next.js end-to-end test, device-emulation
result or screen-reader certification. No provider calls, real data, authentication or persistence
were exercised.

## Validation and official CI disposition

Local final checks: 40 focused real-kit tests, scoped ESLint, full repository ESLint, core TypeScript
check, and the file-size ratchet passed. New regressions cover a falsely enormous initial viewport,
bounded DOM size, keyboard reachability, fractional ResizeObserver sizes, and post-commit tail
scrolling with list padding. Normalization remains cached by options across successive queries.

The verified official results below apply to reference head `5196d090`, not a later commit:

- [Docs Sync passed](https://github.com/cheaper-inference/OmniRoute/actions/runs/42452304925/job/128652279573)
  with 80 inherited drift items and zero added. The existing frozen-base workflow makes translation
  mirrors advisory on PRs and refreshes them in a post-merge batch; push/nightly/release/full-dispatch
  strict checks remain in place. This PR does not weaken or alter that policy. The historical strict
  full-dispatch failure is not relabeled as a pass.
- [Coverage passed](https://github.com/cheaper-inference/OmniRoute/actions/runs/42452304925/job/128667978720):
  86.54% statements/lines, 90.34% functions, 83.45% branches. Build, eight unit shards, UI/Vitest,
  Security, Lint, i18n, test policy and extended quality also passed. Ordinary PR E2E/integration
  jobs were skipped by the existing policy.
- [Quality remains blocked](https://github.com/cheaper-inference/OmniRoute/actions/runs/42452304925/job/128678781657)
  on the repository-wide CodeQL count, 10 open alerts versus the frozen ceiling of 6. The numeric
  ratchet itself passed 59 metrics, with 15 improved. The alert counter is not scoped to this PR's
  commit, so this does not establish that this change introduced four vulnerabilities.

No maintainer exception or waiver was observed. The CodeQL gate must be resolved through actual
alert remediation or an explicit maintainer disposition; this evidence does not authorize bypass,
baseline reset or merge. Consult the PR's checks for the newly published head.
