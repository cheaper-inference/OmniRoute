// scripts/i18n/lib/release-mode.mjs
// PR-mode SKIP for the translation-completeness gates (plan "derived numbers and texts resolved
// only at release", 2026-11-13; owner decision: UI translation completeness runs in release mode).
//
// A feature PR adds keys to `src/i18n/messages/en.json` (or `bin/cli/locales/en.json`) and stops
// there: the other locales are completed once, by the release refresh (`sync-ui-keys`, called by
// `release:refresh-derived`) or by a translation wave. The gates below compare every locale with
// the English source, so on a feature PR they would judge the state of the base, not the change:
//
//   check-key-completeness  check-new-key-coverage  check-ui-value-drift
//   check-translation-ratio check-cli-i18n (locale parity part only)
//
// The PRs that still edit locale catalogs in `pr` mode (translation waves, the release refresh, a
// translation-only PR) are not skipped wholesale: check-key-completeness judges every catalog the
// PR changed against itself at the merge base (lib/touched-catalogs.mjs) — lost keys, new
// `__MISSING__` markers, translations replaced by English, broken placeholders — which covers what
// the ratio and CLI-parity gates would have caught in a catalog the PR made worse.
//
// Each of the other gates asks `skipInPrMode()` first. In `pr` mode it prints one SKIP line and
// the gate exits 0; in `release` mode it returns null and the gate runs exactly as it always did —
// same output, same exit code. The mode comes from scripts/check/lib/gateMode.mjs (`--mode=pr|release`,
// then OMNIROUTE_GATE_MODE, then the GitHub Actions event; a local run is `release`).

import { describeGateMode, resolveGateModeInfo } from "../../check/lib/gateMode.mjs";

/** Where the strict check still runs: every context gateMode.mjs resolves to `release`. */
export const RELEASE_MODE_CONTEXTS =
  "the release PR (release/v* → main), pushes to main, workflow_dispatch and local runs";

/** The SKIP line every translation-completeness gate prints in `pr` mode. */
export function prModeSkipLine(tag, info, motive) {
  return `${tag} SKIP reason=pr-mode — ${describeGateMode(info)}: ${motive}; the strict check runs in release mode (${RELEASE_MODE_CONTEXTS}).`;
}

/**
 * Returns null in `release` mode (the caller runs its strict check). In `pr` mode it reports the
 * skip — one text line, or one JSON object with `json: true` — and returns the mode info; the
 * caller then exits 0.
 *
 * @param {object} args
 * @param {string} args.tag      log prefix of the gate, e.g. "[i18n-keys:ui]"
 * @param {string} args.motive   why the check is release-only, in one clause
 * @param {string[]} [args.argv]
 * @param {Record<string, string | undefined>} [args.env]
 * @param {boolean} [args.json]
 * @param {(line: string) => void} [args.log]
 * @returns {ReturnType<typeof resolveGateModeInfo> | null}
 */
export function skipInPrMode({
  tag,
  motive,
  argv = process.argv,
  env = process.env,
  json = false,
  log = (line) => console.log(line),
}) {
  const info = resolveGateModeInfo({ argv, env });
  if (info.mode !== "pr") return null;
  if (json) {
    log(
      JSON.stringify({
        ok: true,
        skipped: true,
        reason: "pr-mode",
        mode: info.mode,
        modeSource: info.source,
        modeReason: info.reason,
      })
    );
  } else {
    log(prModeSkipLine(tag, info, motive));
  }
  return info;
}
