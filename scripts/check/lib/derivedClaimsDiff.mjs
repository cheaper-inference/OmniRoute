// scripts/check/lib/derivedClaimsDiff.mjs
//
// The two non-strict views of the docs-counts checks (scripts/check/check-docs-counts-sync.mjs):
//
//   evaluatePrDiff        pr mode — judge only what the change itself did to a managed value.
//   planRewritesForChecks the release refresh — compute, without writing anything, the edits
//                         that bring every derived claim back to the live code.
//
// A check takes part through three optional fields set by the gate:
//   scope        "derived" (value comes from the code, diffable), "invariant" (content rule
//                that needs no facts — runs in both modes) or "release-only" (needs the live
//                facts and has no claim span to diff — release mode only);
//   extract(c)   claims `{ value, start, end, text, key? }` of one file — the SAME locator the
//                release validator reads;
//   plan(c)      `{ edits: [{ start, end, to }], manual: [detail] }` — how the refresh rewrites
//                one file to the live value (derived checks only).
//   requireClaim true when a file of the check must carry the claim; `requiredKeys` narrows it
//                to some claim keys (the gated free-tier figure).

import { applyEdits, lineOf } from "./derivedClaims.mjs";

// Branches whose job is to write managed values: the nightly refresh PR, the release branch
// itself and the translation waves. config/quality/derived-paths/*.json (check:pr-derived-paths)
// declares writer globs per family of derived FILES; these are the writers of derived VALUES.
export const DERIVED_VALUE_WRITER_BRANCHES = [
  /^chore\/derived-/,
  /^release\/v/,
  /^docs\/i18n-/,
  /^chore\/i18n-/,
];

export function isDerivedWriterBranch(branch) {
  return Boolean(branch) && DERIVED_VALUE_WRITER_BRANCHES.some((re) => re.test(branch));
}

const claimId = (claim) => `${claim.key ?? ""}=${claim.value}`;

function requiredKeysOf(check) {
  if (Array.isArray(check.requiredKeys) && check.requiredKeys.length) return check.requiredKeys;
  return check.requireClaim ? [null] : [];
}

const hasKey = (claims, key) => claims.some((c) => key === null || (c.key ?? null) === key);

function quote(claims, content) {
  return [...new Set(claims.map((c) => `"${c.text}" (line ${lineOf(content, c.start)})`))].join(
    ", "
  );
}

/**
 * PR-mode verdict for the derived checks.
 *
 * A violation is something the PR did: (1) a claim value that did not exist in the base for
 * that check and file ("edited-value" — the PR wrote a managed number); (2) a required claim
 * that the base carried and the head lost ("removed-required-claim" — the marker the release
 * refresh rewrites is gone). A base that is stale against the live code is never a violation:
 * this view does not know the live code.
 *
 * @param {object} args
 * @param {object[]} args.checks           gate checks (only `scope: "derived"` ones are read)
 * @param {(file: string) => string|null} args.readBase   file at the PR base (null: absent)
 * @param {(file: string) => string|null} args.readHead   file in the PR head (null: absent)
 * @param {boolean|string} [args.writerBranch]  true or a writer branch name → nothing is judged
 * @param {Iterable<string>|null} [args.changedFiles] when given, files outside it are skipped
 *                                         (they are byte-identical to the base)
 * @returns {{ violations: Array<{file:string,label:string,kind:"edited-value"|"removed-required-claim",detail:string}>, lines: string[] }}
 */
export function evaluatePrDiff({ checks, readBase, readHead, writerBranch = false, changedFiles }) {
  const derived = checks.filter((c) => c.scope === "derived" && typeof c.extract === "function");
  const lines = [];
  const violations = [];
  const writer =
    writerBranch === true || (typeof writerBranch === "string" && writerBranch !== "")
      ? writerBranch
      : false;
  if (writer) {
    lines.push(
      `  ✓ writer branch${typeof writer === "string" ? ` ${writer}` : ""} — managed values are ` +
        `written here (release refresh, nightly refresh PR, translation wave); not judged`
    );
    return { violations, lines };
  }
  const changed = changedFiles ? new Set(changedFiles) : null;
  let compared = 0;
  for (const check of derived) {
    for (const file of check.files) {
      if (changed && !changed.has(file)) continue;
      const head = readHead(file);
      // A deleted file carries no claim; the release view skips missing files the same way.
      if (head == null) continue;
      const base = readBase(file);
      compared++;
      const headClaims = check.extract(head);
      const baseClaims = base == null ? [] : check.extract(base);
      const baseIds = new Set(baseClaims.map(claimId));
      const added = headClaims.filter((c) => !baseIds.has(claimId(c)));
      if (added.length) {
        violations.push({
          file,
          label: check.label,
          kind: "edited-value",
          detail:
            `${base == null ? "new file carries" : "PR edited"} managed value(s) ` +
            `${quote(added, head)} — restore the line to the base text; the release refresh ` +
            `(npm run release:refresh-derived) writes this value`,
        });
      }
      if (base != null) {
        for (const key of requiredKeysOf(check)) {
          if (hasKey(baseClaims, key) && !hasKey(headClaims, key)) {
            violations.push({
              file,
              label: check.label,
              kind: "removed-required-claim",
              detail:
                `the base states ${key ? `the ${key} claim` : "this claim"} and the PR removed or ` +
                `reworded it past the pattern — the release refresh can no longer find the ` +
                `marker; restore the sentence from the base`,
            });
          }
        }
      }
    }
  }
  for (const v of violations) lines.push(`  ✗ ${v.file} — ${v.label}: ${v.detail}`);
  lines.unshift(
    `• Managed values edited by this change: ${derived.length} derived check(s), ` +
      `${compared} changed file(s) compared — ${violations.length} violation(s)`
  );
  return { violations, lines };
}

/** Release-mode verdict of one check on one file (the per-file logic of tallyDrift). */
export function evaluateCheckOnContent(check, content) {
  if (check.validate) return check.validate(content);
  const ok = content.includes(String(check.actual));
  return {
    ok,
    detail: ok
      ? `mentions "${check.actual}"`
      : `does NOT mention "${check.actual}" for ${check.docKey}`,
  };
}

// Unknown source value: tallyDrift skips 0 ("could not determine"); a missing fact (null) is
// never written into a file either.
const skipsSource = (check) => check.actual == null || check.actual === 0 || check.actual === "0";

/**
 * Pure rewrite plan over `checks` built from the live facts.
 *
 * Every derived check proposes edits for its stale claims; edits of different checks that hit
 * the same span must agree, otherwise both go to `manual`. The plan is then verified: each
 * rewritten file is re-validated, and a STRICT check that would still fail lands in `manual` —
 * so applying `files` is guaranteed to clear every STRICT drift it claims to fix. Release-only
 * and invariant STRICT failures (nothing to splice) are reported in `manual` as well; soft
 * drift is not (it never fails the release gate).
 *
 * @returns {{ files: Array<{path:string,before:string,after:string,changes:Array<{label:string,from:string,to:string,index:number}>}>, manual: Array<{path:string,label:string,detail:string}> }}
 */
export function planRewritesForChecks(checks, readFile) {
  const manual = [];
  const perFile = new Map(); // path → { before, edits: [{ start, end, to, label }] }
  const cache = new Map();
  const read = (file) => {
    if (!cache.has(file)) cache.set(file, readFile(file));
    return cache.get(file);
  };

  for (const check of checks) {
    if (check.actual === "ERR") {
      manual.push({
        path: "",
        label: check.label,
        detail: "code facts unavailable — the code-derived claims cannot be planned",
      });
      continue;
    }
    if (skipsSource(check)) continue;
    for (const file of check.files) {
      const content = read(file);
      if (content == null) continue;
      if (check.scope === "derived" && typeof check.plan === "function") {
        const { edits, manual: notes } = check.plan(content);
        for (const detail of notes) manual.push({ path: file, label: check.label, detail });
        if (edits.length) {
          if (!perFile.has(file)) perFile.set(file, { before: content, edits: [] });
          perFile.get(file).edits.push(...edits.map((e) => ({ ...e, label: check.label })));
        }
        continue;
      }
      if (!check.strict) continue;
      const verdict = evaluateCheckOnContent(check, content);
      if (!verdict.ok) manual.push({ path: file, label: check.label, detail: verdict.detail });
    }
  }

  const files = [];
  for (const [file, { before, edits }] of perFile) {
    const accepted = resolveEditConflicts(edits, (edit, other) =>
      manual.push({
        path: file,
        label: edit.label,
        detail:
          `conflicting rewrites of "${before.slice(edit.start, edit.end)}" ` +
          `(${edit.label} → ${edit.to}, ${other.label} → ${other.to})`,
      })
    );
    if (!accepted.length) continue;
    const after = applyEdits(before, accepted);
    files.push({
      path: file,
      before,
      after,
      changes: accepted
        .sort((a, b) => a.start - b.start)
        .map((e) => ({
          label: e.label,
          from: before.slice(e.start, e.end),
          to: e.to,
          index: e.start,
        })),
    });
  }

  // Verification pass: after the plan, every STRICT derived check either passes on the file or
  // is listed in `manual` — nothing the plan cannot fix is ever silently left behind.
  const afterByPath = new Map(files.map((f) => [f.path, f.after]));
  for (const check of checks) {
    if (check.scope !== "derived" || !check.strict || skipsSource(check)) continue;
    if (check.actual === "ERR") continue;
    for (const file of check.files) {
      const content = afterByPath.has(file) ? afterByPath.get(file) : read(file);
      if (content == null) continue;
      const verdict = evaluateCheckOnContent(check, content);
      const already = manual.some((m) => m.path === file && m.label === check.label);
      if (!verdict.ok && !already) {
        manual.push({
          path: file,
          label: check.label,
          detail: `${afterByPath.has(file) ? "still stale after the planned rewrite" : "not rewritable"}: ${verdict.detail}`,
        });
      }
    }
  }
  return { files, manual };
}

/** Drops duplicate edits; overlapping edits that disagree are all rejected via `onConflict`. */
function resolveEditConflicts(edits, onConflict) {
  const unique = [];
  for (const edit of edits) {
    if (unique.some((u) => u.start === edit.start && u.end === edit.end && u.to === edit.to)) {
      continue;
    }
    unique.push(edit);
  }
  const rejected = new Set();
  for (let i = 0; i < unique.length; i++) {
    for (let j = i + 1; j < unique.length; j++) {
      const a = unique[i];
      const b = unique[j];
      if (a.start < b.end && b.start < a.end) {
        if (!rejected.has(a) && !rejected.has(b)) onConflict(a, b);
        rejected.add(a);
        rejected.add(b);
      }
    }
  }
  return unique.filter((e) => !rejected.has(e));
}
