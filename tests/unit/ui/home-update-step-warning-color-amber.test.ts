import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for the escalated mesh report "Nobody solve this color issue 🤫":
// the update-step status icon for the `warning` state used a bare `text-yellow-500`
// (Tailwind #eab308, no dark: variant) while its `done`/`failed` siblings use the
// vivid `text-green-500` / `text-red-500`. yellow-500 has poor contrast on light
// backgrounds (~1.9:1, fails WCAG) and is inconsistent with the project's warning
// convention, which is `amber` everywhere else in this same component (e.g. the
// `bg-amber-500/10 text-amber-500` badge). The warning icon must use amber, not yellow.

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  resolve(here, "../../../src/app/(dashboard)/dashboard/HomePageClient.tsx"),
  "utf8"
);

// Isolate the update-step status-icon block: the `warning` <Icon> (KEA-7886 — the Material
// span became <Icon name="warning" …/>). Match the className on that element.
const warningIconMatch = source.match(/<Icon name="warning"[^>]*className="([^"]*)"/);

test("update-step warning icon renders with an amber color, not bare yellow", () => {
  assert.ok(
    warningIconMatch,
    "expected to find the update-step `warning` <Icon> in HomePageClient.tsx"
  );
  const className = warningIconMatch![1];
  assert.ok(
    // The amber convention is now the kit's warning token (amber in both themes).
    className.includes("text-warning"),
    `warning icon should use the project's warning (amber) token; got: "${className}"`
  );
  assert.ok(
    !className.includes("text-yellow-500"),
    "warning icon must not use the low-contrast bare `text-yellow-500` (no dark variant, fails WCAG on light backgrounds)"
  );
});
