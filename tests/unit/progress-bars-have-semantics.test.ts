// UI review 2026-11-15, defect 13 ("progress bars without semantics"): 41 of the 42 hand-made
// proportion/quota bars had no `role="progressbar"`, so a screen reader skipped them.
//
// This guard parses every dashboard TSX file and enforces three rules:
//
//   1. A "fill" element — a JSX element whose inline `style` sets `width` or `flexBasis` to a
//      percentage — must sit inside (itself, or up to three JSX levels above) an element with
//      `role="progressbar"` that also carries `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
//      and an accessible name (`aria-label` or `aria-labelledby`). The 8 px bars the kit covers
//      are the kit `Progress` instead, which renders the role itself and has no hand-made fill.
//   2. Every kit `<Progress>` is named (`aria-label`, `aria-labelledby` or a visible `label`),
//      and is not hidden from assistive tech by an `aria-hidden` wrapper.
//   3. Nothing recolours the kit Progress from the outside (`[&_.ci-progress…]` classes): the
//      kit has `tone` and `indeterminate` since 0.0.116.
//
// Files in EXCEPTIONS draw something that is not a progress bar; each entry says what it is.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
const PERCENT_PROPS = new Set(["width", "flexBasis"]);
const MAX_LEVELS_UP = 3;

/** Files whose percentage-sized elements are not progress bars. */
const EXCEPTIONS: Record<string, string> = {
  "src/app/(dashboard)/dashboard/agent-skills/components/SkillPreviewPane.tsx":
    "skeleton text lines of varying width while the preview loads",
  "src/shared/components/NavigationProgress.tsx":
    "2 px route-loading strip fixed to the top of the viewport, not a content meter",
  "src/shared/components/RequestTimeline.tsx":
    "Gantt bars positioned by start time and duration on a time axis",
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

function attribute(node: JsxTag, name: string): ts.JsxAttribute | undefined {
  return node.attributes.properties.find(
    (attr): attr is ts.JsxAttribute => ts.isJsxAttribute(attr) && attr.name.getText() === name
  );
}

function attributeText(node: JsxTag, name: string, sf: ts.SourceFile): string {
  return attribute(node, name)?.initializer?.getText(sf) ?? "";
}

function isTag(node: ts.Node): node is JsxTag {
  return ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node);
}

/** True when the inline style sizes the element by a percentage along the bar axis. */
function isPercentFill(node: JsxTag, sf: ts.SourceFile): boolean {
  const init = attribute(node, "style")?.initializer;
  if (!init || !ts.isJsxExpression(init) || !init.expression) return false;
  if (!ts.isObjectLiteralExpression(init.expression)) return false;
  const className = attributeText(node, "className", sf);
  for (const prop of init.expression.properties) {
    const name = prop.name?.getText(sf);
    if (!name || !PERCENT_PROPS.has(name)) continue;
    if (ts.isPropertyAssignment(prop)) {
      const value = prop.initializer;
      if (value.getText(sf).includes("%")) return true;
      // `width: pctWidth(a, b)` — a computed share on a full-height fill.
      if (ts.isCallExpression(value) && /\bh-full\b/.test(className)) return true;
    }
    // `style={{ width }}` on a full-height fill: the shorthand hides a `…%` string.
    if (ts.isShorthandPropertyAssignment(prop) && /\bh-full\b/.test(className)) return true;
  }
  return false;
}

/** The JSX tags enclosing `node`, nearest first (the node's own tag included). */
function enclosingTags(node: JsxTag): JsxTag[] {
  const tags: JsxTag[] = [node];
  let current: ts.Node | undefined = ts.isJsxOpeningElement(node)
    ? node.parent.parent
    : node.parent;
  while (current) {
    if (ts.isJsxElement(current)) tags.push(current.openingElement);
    current = current.parent;
  }
  return tags;
}

function isProgressbar(node: JsxTag, sf: ts.SourceFile): boolean {
  return /^["']progressbar["']$/.test(attributeText(node, "role", sf));
}

function missingBarAttributes(node: JsxTag): string[] {
  const missing = ["aria-valuemin", "aria-valuemax", "aria-valuenow"].filter(
    (name) => !attribute(node, name)
  );
  if (!attribute(node, "aria-label") && !attribute(node, "aria-labelledby")) {
    missing.push("aria-label | aria-labelledby");
  }
  return missing;
}

function forEachTag(sf: ts.SourceFile, visit: (node: JsxTag) => void): void {
  const walk = (node: ts.Node) => {
    if (isTag(node)) visit(node);
    ts.forEachChild(node, walk);
  };
  walk(sf);
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

function lineOf(node: ts.Node, sf: ts.SourceFile): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}

test("every hand-made percentage bar is a named role=progressbar", () => {
  const offenders: string[] = [];
  const usedExceptions = new Set<string>();
  for (const { rel, sf } of FILES) {
    forEachTag(sf, (node) => {
      if (!isPercentFill(node, sf)) return;
      if (rel in EXCEPTIONS) {
        usedExceptions.add(rel);
        return;
      }
      const bar = enclosingTags(node)
        .slice(0, MAX_LEVELS_UP + 1)
        .find((tag) => isProgressbar(tag, sf));
      if (!bar) {
        offenders.push(`${rel}:${lineOf(node, sf)} fill has no role="progressbar" around it`);
        return;
      }
      const missing = missingBarAttributes(bar);
      if (missing.length > 0) {
        offenders.push(`${rel}:${lineOf(bar, sf)} progressbar is missing ${missing.join(", ")}`);
      }
    });
  }
  assert.deepEqual(offenders, []);
  const stale = Object.keys(EXCEPTIONS).filter((file) => !usedExceptions.has(file));
  assert.deepEqual(stale, [], "exceptions that no longer match a percentage-sized element");
});

test("every role=progressbar written by hand carries its value range and a name", () => {
  const offenders: string[] = [];
  for (const { rel, sf } of FILES) {
    forEachTag(sf, (node) => {
      if (!isProgressbar(node, sf)) return;
      const missing = missingBarAttributes(node);
      if (missing.length > 0) {
        offenders.push(`${rel}:${lineOf(node, sf)} is missing ${missing.join(", ")}`);
      }
    });
  }
  assert.deepEqual(offenders, []);
});

test("every kit Progress is named and reachable by assistive tech", () => {
  const offenders: string[] = [];
  for (const { rel, sf } of FILES) {
    forEachTag(sf, (node) => {
      if (node.tagName.getText(sf) !== "Progress") return;
      const named = ["aria-label", "aria-labelledby", "label"].some((name) =>
        attribute(node, name)
      );
      if (!named) offenders.push(`${rel}:${lineOf(node, sf)} <Progress> has no accessible name`);
      const hidden = enclosingTags(node)
        .slice(1)
        .some((tag) => /true/.test(attributeText(tag, "aria-hidden", sf)));
      if (hidden) offenders.push(`${rel}:${lineOf(node, sf)} <Progress> is inside aria-hidden`);
    });
  }
  assert.deepEqual(offenders, []);
});

test("nothing recolours the kit Progress from the outside", () => {
  const offenders: string[] = [];
  for (const { rel, sf } of FILES) {
    sf.text.split("\n").forEach((line, index) => {
      if (line.includes("[&_.ci-progress")) offenders.push(`${rel}:${index + 1}`);
    });
  }
  assert.deepEqual(offenders, []);
});
