import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// F4 (track F note, KEA-7886): the dashboard skip link must be the first tab stop. The root
// layout also rendered a "Skip to content" link to #main-content — an id that only the dashboard
// shell's SidebarInset carries — so on dashboard routes the shell's link was the SECOND tab stop
// (two identical links in a row) and on every other route the root link pointed nowhere. The
// shell owns the only skip link (its first-focusable order is pinned in dashboard-layout-flag).
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("the root layout renders no skip link of its own", () => {
  assert.doesNotMatch(read("src/app/layout.tsx"), /href="#main-content"/);
});

test("the dashboard shell renders exactly one skip link and its #main-content target", () => {
  const shell = read("src/shared/components/layouts/DashboardShell.tsx");
  assert.equal((shell.match(/href="#main-content"/g) ?? []).length, 1);
  assert.match(shell, /<SidebarInset\s+id="main-content"/);
});
