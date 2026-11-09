import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19543: on the provider page the Available Models cards are ~260px wide. Line 2 of a
// card (source badge, combo badges, alias, actions) used to be a single non-wrapping row,
// so a model used by a combo pushed the shrink-0 action group (test / hide / Compatibility)
// out of its card and over the neighbouring one.
const source = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    import.meta.url
  ),
  "utf8"
);

const line2Start = source.indexOf('<div className="flex min-w-0 flex-wrap items-center');
const line2Classes = source.match(/\{\/\* Line 2[\s\S]*?<div className="([^"]+)"/)?.[1] ?? "";

test("model card line 2 wraps instead of overflowing into the next card", () => {
  assert.ok(
    line2Classes.split(/\s+/).includes("flex-wrap"),
    `line 2 must be allowed to wrap; got className="${line2Classes}"`
  );
  assert.ok(line2Start > 0, "line 2 container must be present");
});

test("alias keeps a small basis so the actions wrap before the alias takes its own row", () => {
  assert.match(source, /className="flex min-w-0 flex-1 basis-16 items-center text-\[10px\] gap-1"/);
});

test("combo badges render on their own line, not inside line 2", () => {
  const comboIdx = source.indexOf("<ModelComboBadge combos={combos} t={t} />");
  assert.ok(comboIdx > 0, "ModelComboBadge must still be rendered");
  const actionsEnd = source.indexOf("<ModelCompatPopover", line2Start);
  assert.ok(
    comboIdx > actionsEnd,
    "combo badges must come after line 2 (the actions row), on their own line"
  );
  assert.match(
    source,
    /<div className="min-w-0 pl-6">\s*<ModelComboBadge combos=\{combos\} t=\{t\} \/>\s*<\/div>/
  );
});
