import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Regression guards for PR #7743:
//  1) @lobehub/icons v5.13+ dropped the Stepfun `Color` sub-component. Importing it
//     causes a build-time module-not-found error that breaks the whole dashboard.
//     Lock in the Mono fallback so a future bump can't silently re-import it.
//  2) The dashboard shell must not read the sidebar-collapsed state from localStorage during
//     the first render — that produces a client/server markup mismatch (hydration error).
//     The legacy shell deferred the read to a `useEffect`; the kit shell (the only shell since
//     KEA-7886 F4) gets it from the `ci_sidebar_state` cookie read on the server (test below).

const lobeProviderIconsSrc = fs.readFileSync(
  new URL("../../src/shared/components/lobeProviderIcons.ts", import.meta.url),
  "utf8"
);

const readSrc = (relative: string) =>
  fs.readFileSync(new URL(`../../${relative}`, import.meta.url), "utf8");

test("lobeProviderIcons never imports the removed Stepfun Color sub-component", () => {
  assert.doesNotMatch(
    lobeProviderIconsSrc,
    /@lobehub\/icons\/es\/Stepfun\/components\/Color/,
    "Stepfun/components/Color does not exist in @lobehub/icons v5.13+ and must not be imported"
  );
});

test("lobeProviderIcons maps both Stepfun mono and color slots to StepfunMonoIcon", () => {
  const stepfunEntry = lobeProviderIconsSrc.match(
    /Stepfun:\s*{\s*mono:\s*(\w+),\s*color:\s*(\w+)\s*}/
  );
  assert.ok(stepfunEntry, "Stepfun entry must exist in LOBE_ICON_COMPONENTS");
  const [, mono, color] = stepfunEntry;
  assert.equal(mono, "StepfunMonoIcon");
  assert.equal(color, "StepfunMonoIcon", "color slot must fall back to the Mono icon");
});

test("the kit shell reads no localStorage for the collapse state; the server passes the cookie", () => {
  for (const file of [
    "src/shared/components/layouts/DashboardShell.tsx",
    "src/shared/components/layouts/DashboardLayout.tsx",
  ]) {
    assert.doesNotMatch(readSrc(file), /localStorage/, `${file} must not read localStorage`);
  }
  const serverLayout = readSrc("src/app/(dashboard)/layout.tsx");
  assert.match(serverLayout, /\(await cookies\(\)\)\.get\("ci_sidebar_state"\)\?\.value !== "0"/);
  assert.match(serverLayout, /sidebarDefaultOpen=\{sidebarDefaultOpen\}/);
  assert.match(
    readSrc("src/shared/components/layouts/DashboardShell.tsx"),
    /<SidebarProvider[\s\S]*?defaultOpen=\{sidebarDefaultOpen\}/
  );
});
