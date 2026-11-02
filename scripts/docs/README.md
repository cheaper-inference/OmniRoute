# Updating measured documentation counts

Run `npm run docs:sync-counts` after changing provider records, SQL migration
filenames, free-model catalog rows, CLI tool records or routing strategies. The
default is a read-only check. Use `npm run docs:sync-counts -- --write` to prepare
the coupled documentation and generated diagrams, then review the diff and run
the normal documentation gates. `--json` reports paths and hashes without file
contents. Exit codes are 0 for current/updated counts, 1 for a pending numeric
update in check mode, and 2 for a condition requiring review.

The command measures source definitions and applies the numeric slots recorded
in `lib/count-claims.json`. It preserves every byte outside those slots in prose,
including localized digit scripts. The registry contains anchors and definitions,
not accepted numeric values. Missing files, unknown or ambiguous prose, new
unregistered locales and unsupported facts fail before writing. A prose change
needs a reviewed registry update for its exact numerical units; do not weaken the
checker, add an allowlist or accept an old count to make the command pass.

The provider reference and five README diagrams use the same measured provider
union and free-catalog definition as the checker. Reference generation preserves
its existing generation date if its formatted content is unchanged. Competitor
claims and unrelated SVG layout numbers remain independent. The advisory
executor-file heuristic retains its existing severity.

Translation state advances only through existing string leaves whose source,
target and existing section hashes match the complete preimages. Missing section
hashes and timestamps are preserved. A changed generated provider reference needs
semantic translation review; numeric updates cannot certify newly added rows.
Financial headline or recurring-pool changes outside reviewed translated slots
also require review. No command result certifies translation fluency or release
acceptance.

When composing a reviewed translation wave, `--write --preserve-i18n-state` can
prepare numeric files while leaving all state bytes unchanged. It exits 2 with
`STATE_REVIEW_REQUIRED` when the changes affect translated sources. Complete the
translation review and exact state reconciliation before normal admission. This
option does not waive financial-copy guards, unknown anchors or failed preimages.

Writes require unchanged source inputs and every target preimage. Each replacement
is atomic; if a later replacement fails, the command restores only its own bytes
and preserves concurrent edits for explicit reconciliation. This is not a
multi-file filesystem transaction. Run from the task's isolated worktree and
review agent-instruction surfaces under their existing approval policy.

Focused checks:

```bash
node --import tsx/esm --test tests/unit/docs/docs-counts-sync.test.ts tests/unit/docs/docs-counts-reference.test.ts tests/unit/docs/docs-counts-generator-regressions.test.ts
npm run check:docs-counts
npm run check:docs-all
```
