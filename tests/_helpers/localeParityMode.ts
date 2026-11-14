// Locale-parity assertions in unit tests follow the same two modes as the translation gates
// (plan "derived numbers and texts resolved only at release", 2026-11-13; scripts/i18n/lib/
// release-mode.mjs). A feature PR adds keys to en.json only and the release refresh completes the
// other catalogs, so "locale X carries every key of en.json" is a release-mode assertion:
//
//   - `release` (local runs, Release-Green, pushes to main, the release PR): asserted as before;
//   - `pr` (the unit-test job of a feature PR, or OMNIROUTE_GATE_MODE=pr): skipped, with the
//     reason in the test report. Assertions about the keys a locale DOES carry still run.
//
// The same holds for a value the PR REWRITES in English: if the rewrite renames a placeholder
// (`{count} rows` → `{rows} rows`), every translation still interpolates `{count}` until the
// release refresh marks and retranslates it (syncUiKeys({ rewrittenSinceRef })). In `pr` mode the
// placeholder/ICU parity tests therefore leave alone the keys whose English changed since the
// merge base (`englishRewrittenSincePrBase`); every other key is judged as before. When the merge
// base cannot be read (the unit-test job checks out one commit, without the base branch), no key
// can be told apart and the deferral covers every key: a feature PR cannot touch a locale catalog
// (check:pr-derived-paths), and a PR that does is judged key by key against the merge base by
// check-key-completeness in the i18n UI Coverage job, which has the full history.
//
// Mode resolution is scripts/check/lib/gateMode.mjs (env only: test runners own their argv). Only
// the tests listed in tests/unit/locale-parity-mode-usage.test.ts may use this helper.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveGateModeInfo, resolvePrDiffBase } from "../../scripts/check/lib/gateMode.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const UI_SOURCE = "src/i18n/messages/en.json";

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

type Leaves = Map<string, unknown>;

function flatten(node: unknown, prefix = "", out: Leaves = new Map()): Leaves {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      const dotted = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) flatten(value, dotted, out);
      else out.set(dotted, value);
    }
  }
  return out;
}

/** Pure core: keys present in both catalogs whose English value differs. */
export function rewrittenKeys(baseEn: unknown, headEn: unknown): Set<string> {
  const base = flatten(baseEn);
  const out = new Set<string>();
  for (const [key, value] of flatten(headEn)) {
    if (base.has(key) && base.get(key) !== value) out.add(key);
  }
  return out;
}

export type EnglishRewriteDeferral = {
  /** Every key is deferred (pr mode with the merge base unreadable). */
  all: boolean;
  /** UI keys whose English value changed since the merge base. */
  keys: ReadonlySet<string>;
  /** Why, for the test report. */
  reason: string;
};

/**
 * Pure core of `englishRewrittenSincePrBase`, injectable for tests: `readBaseEn` returns en.json
 * at the merge base, or null when it cannot be read.
 */
export function computeEnglishRewriteDeferral({
  mode,
  readBaseEn,
  headEn,
}: {
  mode: "pr" | "release";
  readBaseEn: () => { ref: string; en: unknown } | null;
  headEn: unknown;
}): EnglishRewriteDeferral {
  if (mode !== "pr") return { all: false, keys: new Set(), reason: "release mode" };
  const base = readBaseEn();
  if (!base) {
    return {
      all: true,
      keys: new Set(),
      reason:
        "pr mode, merge base unreadable: every key deferred (changed catalogs are judged by check-key-completeness)",
    };
  }
  const keys = rewrittenKeys(base.en, headEn);
  return { all: false, keys, reason: `pr mode: ${keys.size} key(s) rewritten since ${base.ref}` };
}

let cached: EnglishRewriteDeferral | null = null;

/**
 * UI keys whose placeholder/ICU parity is the release refresh's job on this run (empty in
 * release mode). Read once per process.
 */
export function englishRewrittenSincePrBase(): EnglishRewriteDeferral {
  if (cached) return cached;
  cached = computeEnglishRewriteDeferral({
    mode: info.mode,
    headEn: JSON.parse(readFileSync(path.join(REPO, UI_SOURCE), "utf8")),
    readBaseEn: () => {
      const base = resolvePrDiffBase({ env: process.env, cwd: REPO });
      if (!base) return null;
      try {
        const text = execFileSync("git", ["show", `${base.sha}:${UI_SOURCE}`], {
          cwd: REPO,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
          maxBuffer: 256 * 1024 * 1024,
        });
        return { ref: base.ref, en: JSON.parse(text) };
      } catch {
        return null;
      }
    },
  });
  return cached;
}

/** True when a placeholder/ICU mismatch on this UI key is left to the release refresh. */
export function placeholderParityDeferred(key: string): boolean {
  const deferral = englishRewrittenSincePrBase();
  return deferral.all || deferral.keys.has(key);
}
