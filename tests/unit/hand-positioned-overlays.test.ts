// UI review 2026-11-15, defect 16 ("menus, popovers and tooltips positioned by hand"): five panels
// opened by local state with `absolute … z-50` and three hand-made tooltips had no portal and no
// collision handling, so they were clipped by `overflow: hidden` ancestors and ran off the edge of
// the screen. They are now the kit Popover / SearchableSelect and the Tooltip adapter
// (Radix: body portal, collision-aware placement, Escape, outside press, focus return).
//
// This guard parses every dashboard TSX file and fails on a "floating panel written by hand":
// a <div>, <ul> or <span> whose classes position it out of flow (`absolute` or `fixed`) on its
// own layer (`z-…`) with a surface (`bg-…`) and an edge (`border…` or `shadow…`), and on a
// hand-written `role="tooltip"`. Files in EXCEPTIONS keep such an element for the reason given.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
const FLOATING_TAGS = new Set(["div", "ul", "span"]);

/** Files that keep a positioned layer which is not a popover, menu or tooltip — or a tracked gap. */
const EXCEPTIONS: Record<string, string> = {
  "src/shared/components/analytics/ApiKeyFilterDropdown.tsx":
    "kit MultiSelectFilter does not cover it: an empty selection means all keys and a press on a " +
    "key selects only that key (the kit starts from all checked and has a none state), the " +
    "trigger shows a key icon and an active-filter variant, and the all row shows the key count",
  "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthAccountTooltip.tsx":
    "already portaled to the body and clamped to the viewport, with Escape and focus/hover " +
    "opening; one shared card for up to 200 capsules. The kit HoverCard needs one root per " +
    "trigger, which made the 200-capsule render about 2.5 times slower in the test suite",
  "src/shared/components/RequestTimeline.tsx":
    "sticky time-axis header inside the scroll area, and a tooltip that follows the pointer over " +
    "the Gantt canvas (no trigger element to anchor a kit Tooltip to)",
  "src/app/(dashboard)/home/ProviderTopology.tsx":
    "toolbar pinned inside the flow canvas, always visible: not an overlay",
};

type JsxTag = ts.JsxOpeningElement | ts.JsxSelfClosingElement;

function listTsx(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "__tests__") continue;
      listTsx(full, out);
    } else if (entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx")) {
      out.push(full);
    }
  }
  return out;
}

function attributeText(node: JsxTag, name: string, sf: ts.SourceFile): string {
  const attr = node.attributes.properties.find(
    (candidate): candidate is ts.JsxAttribute =>
      ts.isJsxAttribute(candidate) && candidate.name.getText(sf) === name
  );
  return attr?.initializer?.getText(sf) ?? "";
}

/** Class tokens of a className attribute, whatever expression builds it. */
function classTokens(node: JsxTag, sf: ts.SourceFile): string[] {
  return attributeText(node, "className", sf)
    .split(/[^A-Za-z0-9_:\/.\[\]()%-]+/)
    .filter(Boolean);
}

function isFloatingPanel(node: JsxTag, sf: ts.SourceFile): boolean {
  if (!FLOATING_TAGS.has(node.tagName.getText(sf))) return false;
  const tokens = classTokens(node, sf);
  const has = (pattern: RegExp) => tokens.some((token) => pattern.test(token));
  return (
    has(/^(absolute|fixed)$/) &&
    has(/^z-/) &&
    has(/^bg-/) &&
    (has(/^shadow/) || has(/^border(-|$)/))
  );
}

/** `role="tooltip"` on a plain HTML element (a kit component may carry the role itself). */
function isHandTooltip(node: JsxTag, sf: ts.SourceFile): boolean {
  if (!/^[a-z]/.test(node.tagName.getText(sf))) return false;
  return /^["']tooltip["']$/.test(attributeText(node, "role", sf));
}

const FILES = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir))).map((full) => ({
  rel: path.relative(ROOT, full).split(path.sep).join("/"),
  sf: ts.createSourceFile(
    full,
    fs.readFileSync(full, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  ),
}));

function findings(): string[] {
  const out: string[] = [];
  for (const { rel, sf } of FILES) {
    if (rel in EXCEPTIONS) continue;
    const walk = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
        if (isFloatingPanel(node, sf)) out.push(`${rel}:${line} floating panel positioned by hand`);
        if (isHandTooltip(node, sf)) out.push(`${rel}:${line} role="tooltip" written by hand`);
      }
      ts.forEachChild(node, walk);
    };
    walk(sf);
  }
  return out;
}

test("no popover, menu or tooltip is positioned by hand", () => {
  assert.deepEqual(findings(), []);
});

test("the overlays of defect 16 use the kit", () => {
  const D = "src/app/(dashboard)/dashboard";
  const expected: Array<[file: string, kitImport: string]> = [
    [`${D}/cli-code/components/ClaudeCcDiscoveryInfoButton.tsx`, "@omniroute/ui-kit/popover"],
    [
      `${D}/tools/traffic-inspector/components/session/SessionPicker.tsx`,
      "@omniroute/ui-kit/popover",
    ],
    ["src/shared/components/analytics/CustomRangePicker.tsx", "@omniroute/ui-kit/popover"],
    [`${D}/settings/components/ComboDefaultsTab.tsx`, "@omniroute/ui-kit/searchable-select"],
    [`${D}/settings/components/FeatureFlagCard.tsx`, "@/shared/components/Tooltip"],
    [`${D}/cache/components/CacheTrends.tsx`, "@/shared/components/Tooltip"],
  ];
  const missing = expected
    .filter(([file, kitImport]) => {
      const source = fs.readFileSync(path.join(ROOT, file), "utf8");
      return !source.includes(`from "${kitImport}"`);
    })
    .map(([file, kitImport]) => `${file} does not import ${kitImport}`);
  assert.deepEqual(missing, []);
  // The hand-made dismissal and placement code is gone with them.
  const leftovers = expected
    .map(([file]) => file)
    .filter((file) => {
      const source = fs.readFileSync(path.join(ROOT, file), "utf8");
      return /addEventListener\("(mousedown|keydown)"|createPortal\(/.test(source);
    });
  assert.deepEqual(leftovers, [], "document listeners / portals written by hand");
});
