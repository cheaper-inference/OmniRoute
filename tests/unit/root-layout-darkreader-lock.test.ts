import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// OmniRoute ships its own dark theme. Dark Reader's dark-theme detection still runs on sites
// it is turned off for and adds/removes nodes in <head>; when React later hides a route (Next 16
// keeps the previous route in a hidden Activity) it tries to detach a hoisted head element whose
// parent is already gone and the page stays black ("removeChild ... parentNode is null" followed
// by "Should not already be working"). The darkreader-lock meta tells Dark Reader to leave the
// page alone, so it must be in the server-rendered <head>.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const layout = fs.readFileSync(path.join(ROOT, "src/app/layout.tsx"), "utf8");

test("the root layout opts out of Dark Reader inside <head>", () => {
  const head = layout.slice(layout.indexOf("<head>"), layout.indexOf("</head>"));
  assert.ok(head.length > 0, "root layout must render a <head>");
  assert.match(head, /<meta\s+name="darkreader-lock"\s*\/>/);
});
