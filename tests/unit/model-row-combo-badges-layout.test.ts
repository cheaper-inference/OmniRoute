import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const modelRowSource = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    import.meta.url
  ),
  "utf8"
);

const comboBadgeSource = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelComboBadge.tsx",
    import.meta.url
  ),
  "utf8"
);

test("#19543: ModelRow details row wraps instead of forcing single non-wrapping line", () => {
  assert.match(
    modelRowSource,
    /className="flex min-w-0 flex-wrap items-center justify-between gap-1\.5 pl-6"/,
    "ModelRow details row must use flex-wrap to prevent overflowing card border"
  );
  assert.match(
    modelRowSource,
    /className="flex min-w-0 flex-1 flex-wrap items-center gap-1\.5"/,
    "Badge and info container must wrap when multiple combo badges are present"
  );
  assert.doesNotMatch(
    modelRowSource,
    /Line 2 \(never wraps\)/,
    "Old non-wrapping comment should be removed"
  );
});

test("#19543: ModelComboBadge uses whitespace-nowrap to keep each pill intact", () => {
  assert.match(
    comboBadgeSource,
    /whitespace-nowrap/,
    "ModelComboBadge pills must have whitespace-nowrap to avoid breaking into multi-line pills"
  );
});
