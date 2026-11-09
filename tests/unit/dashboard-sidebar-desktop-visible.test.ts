import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSrc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

// Regression guard: the desktop dashboard sidebar must stay visible on desktop. The old
// `hidden ... lg:flex` Tailwind cascade was fragile (class ordering / specificity could collapse
// the `lg:flex` and hide the sidebar for good). The legacy shell answered with an explicit
// `.dashboard-sidebar-desktop` class; since KEA-7886 F4 the only shell is the kit one, which
// mounts the sidebar through SidebarProvider/SidebarInset and never uses that cascade.

test("the kit shell mounts the sidebar through SidebarProvider/SidebarInset (no hidden/lg:flex cascade)", () => {
  const shell = readSrc("src/shared/components/layouts/DashboardShell.tsx");
  assert.match(shell, /<SidebarProvider/);
  assert.match(shell, /<SidebarInset\s+id="main-content"/);
  assert.doesNotMatch(shell, /className="hidden[^"]*lg:flex"/);
});

test("the kit shell and the Sidebar import the kit sidebar subpath, not the 73-file barrel", () => {
  // The barrel pulls every kit module (Radix, charts…) into each importer; the first Sidebar
  // render in vitest went from ~43 s (barrel) to a few seconds (subpath) in trilha E's measure.
  for (const file of [
    "src/shared/components/Sidebar.tsx",
    "src/shared/components/layouts/DashboardShell.tsx",
  ]) {
    const source = readSrc(file);
    assert.doesNotMatch(source, /from "@omniroute\/ui-kit"/, `${file} imports the kit barrel`);
    assert.match(
      source,
      /from "@omniroute\/ui-kit\/sidebar"/,
      `${file} imports the sidebar subpath`
    );
  }
});
