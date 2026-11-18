import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #19066 block 3: the dashboard and the shared components never open the browser's native
// dialogs. A confirmation goes through `useConfirmDialog()` / `ConfirmModal` (the kit
// dialog), a notice through the toast store (`useNotificationStore`). Native `confirm()` /
// `alert()` ignore the theme, block the event loop and cannot be translated or tested.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SCOPES = ["src/app", "src/shared"];

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

// Comments and string/template literals blanked (newlines kept), so a mention in prose or
// in a message is not a call site.
function blankNonCode(src: string): string {
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:\\])\/\/[^\n]*/g, (m, lead) => lead + blank(m.slice(lead.length)))
    .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, blank);
}

// A call to the global: bare `confirm(` / `alert(`, or through `window.` / `globalThis.` /
// `self.`. Not a member call on another object (`mutations.confirm()`), not a declaration
// (`function confirm()`, `confirm() {` in an object literal).
const NATIVE_DIALOG =
  /(?:\b(?:window|globalThis|self)\s*\.\s*|(?<![\w$.]))(confirm|alert)\s*\((?![^)]*\)\s*\{)/g;

export function findNativeDialogCalls(src: string): Array<{ line: number; name: string }> {
  const code = blankNonCode(src);
  const hits: Array<{ line: number; name: string }> = [];
  for (const m of code.matchAll(NATIVE_DIALOG)) {
    const before = code.slice(Math.max(0, m.index - 12), m.index);
    if (/\bfunction\s*$/.test(before)) continue;
    hits.push({ line: code.slice(0, m.index).split("\n").length, name: m[1] });
  }
  return hits;
}

test("self-test: the matcher flags native dialogs and skips look-alikes", () => {
  const flagged = [
    'if (!confirm(t("x"))) return;',
    "window.confirm(msg)",
    "globalThis.confirm(\n  msg\n)",
    "window.alert('boom')",
    "alert(`${a}: ${b}`)",
    "const ok = self.confirm(msg);",
  ];
  for (const src of flagged) assert.equal(findNativeDialogCalls(src).length, 1, src);

  const skipped = [
    "async function confirm() { return 1; }",
    "await mutations.confirm();",
    "const { requestConfirm } = useConfirmDialog();",
    "await requestConfirm({ message });",
    "notify.alert(msg)",
    "// replaces the native confirm() call",
    "/* window.alert(x) */",
    'const label = "confirm(";',
    "const api = { confirm() { return true; } };",
    "onConfirm={() => confirmDelete(id)}",
  ];
  for (const src of skipped) assert.deepEqual(findNativeDialogCalls(src), [], src);
});

test("no native confirm()/alert() in src/app or src/shared", () => {
  const hits: Record<string, string[]> = {};
  for (const file of SCOPES.flatMap((d) => walk(path.join(ROOT, d)))) {
    const found = findNativeDialogCalls(fs.readFileSync(file, "utf8"));
    if (found.length) {
      const rel = path.relative(ROOT, file).split(path.sep).join("/");
      hits[rel] = found.map((h) => `${h.name}() at line ${h.line}`);
    }
  }
  assert.deepEqual(hits, {}, "use useConfirmDialog()/ConfirmModal or the toast store instead");
});
