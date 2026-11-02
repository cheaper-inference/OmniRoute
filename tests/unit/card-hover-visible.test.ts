import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Regression guard: provider cards must have a *visible* hover state.
//
// Reported bug: hovering a provider card made it go "transparent / not
// highlighted". Root cause was a 1%-opacity hover (`hover:bg-black/[0.01]` /
// `hover:bg-white/[0.01]`) — effectively invisible. The fix switches both card
// surfaces to the dashboard's dominant, visible hover (`hover:bg-*/5`) plus a
// `hover:border-primary/40` highlight. This pins it so the near-invisible hover
// can't silently come back.

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

const CARD_FILES = [
  "src/app/(dashboard)/dashboard/providers/components/ProviderCard.tsx",
  "src/app/(dashboard)/dashboard/media-providers/[kind]/page.tsx",
];

for (const rel of CARD_FILES) {
  test(`${rel}: card hover is visible, not near-transparent`, () => {
    const src = readFileSync(ROOT + rel, "utf8");
    assert.ok(
      !src.includes("hover:bg-black/[0.01]"),
      `${rel} still uses the near-invisible 1% hover (light)`
    );
    assert.ok(
      !src.includes("hover:bg-white/[0.01]"),
      `${rel} still uses the near-invisible 1% hover (dark)`
    );
    // KEA-7886: a migrated card uses the kit's subtle-surface token, which already resolves
    // the visible light/dark tint the legacy `hover:bg-black/5` + `hover:bg-white/5` pair gave.
    assert.ok(
      (src.includes("hover:bg-black/5") && src.includes("hover:bg-white/5")) ||
        src.includes("hover:bg-bg-subtle"),
      `${rel} should use a visible hover background (hover:bg-*/5 or hover:bg-bg-subtle)`
    );
    assert.ok(
      src.includes("hover:border-primary/40"),
      `${rel} should add a visible hover border highlight`
    );
  });
}
