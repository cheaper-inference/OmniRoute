// Locale-parity assertions in unit tests follow the same two modes as the translation gates
// (plan "derived numbers and texts resolved only at release", 2026-11-13; scripts/i18n/lib/
// release-mode.mjs). A feature PR adds keys to en.json only and the release refresh completes the
// other catalogs, so "locale X carries every key of en.json" is a release-mode assertion:
//
//   - `release` (local runs, Release-Green, pushes to main, the release PR): asserted as before;
//   - `pr` (the unit-test job of a feature PR, or OMNIROUTE_GATE_MODE=pr): skipped, with the
//     reason in the test report. Assertions about the keys a locale DOES carry still run.
//
// Mode resolution is scripts/check/lib/gateMode.mjs (env only: test runners own their argv).

import { resolveGateModeInfo } from "../../scripts/check/lib/gateMode.mjs";

const info = resolveGateModeInfo({ argv: [], env: process.env });

/** True when locale-parity assertions are skipped (feature PR). */
export const localeParityIsReleaseOnly = info.mode === "pr";

/**
 * `node:test` options for a test that asserts full key parity with en.json:
 * `test(name, localeParityOptions(), fn)`.
 */
export function localeParityOptions(): { skip?: string } {
  return localeParityIsReleaseOnly
    ? {
        skip: `pr mode (${info.reason}): a feature PR adds keys to en.json only; locale parity is checked in release mode`,
      }
    : {};
}
