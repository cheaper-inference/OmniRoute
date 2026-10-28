import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("standalone pages use the Keak lockup instead of the gradient hub glyph", () => {
  for (const p of [
    "src/app/login/page.tsx",
    "src/shared/components/ErrorPageScaffold.tsx",
    "src/app/status/page.tsx",
    "src/app/maintenance/page.tsx",
    "src/app/offline/page.tsx",
    "src/app/not-found.tsx",
    "src/app/error.tsx",
    "src/app/global-error.tsx",
    "src/app/forbidden/page.tsx",
    "src/app/forgot-password/page.tsx",
  ]) {
    const src = read(p);
    // Exactly one rendered lockup per page: an unused import alone must not pass.
    assert.equal(
      src.match(/<OmniRouteLockup\b/g)?.length ?? 0,
      1,
      `${p} renders OmniRouteLockup once`
    );
    assert.ok(!src.includes("material-symbols-outlined"), `${p} has no Material span left`);
    assert.ok(!/from-primary to-primary-hover/.test(src), `${p} dropped the coral gradient`);
  }
});

test("the logo wrappers import the kit brand module, not the package barrel", () => {
  // The barrel evaluates all kit modules (Radix, charts…) in every importer of the logo;
  // in vitest that alone pushed the Sidebar import past the 5 s test timeout.
  const src = read("src/shared/components/OmniRouteLogo.tsx");
  assert.match(src, /from "@omniroute\/ui-kit\/keak-brand"/);
  assert.doesNotMatch(src, /from "@omniroute\/ui-kit"/);
});
