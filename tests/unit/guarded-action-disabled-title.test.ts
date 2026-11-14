import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Owner decision 4 (2026-11-14, follow-up of #19620): the kit gives a disabled button
// `pointer-events: none`, so a `title` on it never shows. A title that explains WHY the button
// is disabled was therefore invisible exactly when it mattered. Those buttons now use
// <GuardedAction reason={…}> (src/shared/components/GuardedAction.tsx), which keeps the button
// focusable and shows the reason.
//
// The guard: a <Button> that is `disabled` and carries a `title` fails when the title can only
// be a reason — the button is always disabled, or the title changes with state (ternary, `&&`,
// `||`, `undefined`). A constant title is the button's label/hint (visible while it is enabled;
// `aria-label` carries it for assistive tech) and passes. Every kept exception says why.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");

/** Opening tag of every `<Tag`, up to the `>` / `/>` that closes it (JSX braces balanced). */
function openingTags(source: string, name: string): Array<{ line: number; tag: string }> {
  const out: Array<{ line: number; tag: string }> = [];
  const re = new RegExp(`<${name}\\b`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    let depth = 0;
    let quote: string | null = null;
    let i = m.index + 1;
    for (; i < source.length; i++) {
      const c = source[i];
      if (quote) {
        if (c === quote) quote = null;
        continue;
      }
      if (depth === 0 && (c === '"' || c === "'")) quote = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === ">" && depth === 0) break;
    }
    out.push({ line: source.slice(0, m.index).split("\n").length, tag: source.slice(m.index, i) });
  }
  return out;
}

/** Raw value of a JSX attribute: `true` for a bare prop, `"…"` or `{…}` otherwise. */
function attr(tag: string, name: string): string | null {
  const m = new RegExp(`\\s${name}(?=[\\s=/]|$)`).exec(tag);
  if (!m) return null;
  let i = m.index + m[0].length;
  if (tag[i] !== "=") return "true";
  i++;
  if (tag[i] === '"') return tag.slice(i, tag.indexOf('"', i + 1) + 1);
  if (tag[i] !== "{") return tag.slice(i).split(/\s/)[0];
  let depth = 0;
  let quote: string | null = null;
  let j = i;
  for (; j < tag.length; j++) {
    const c = tag[j];
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) break;
  }
  return tag.slice(i, j + 1);
}

// Disabled buttons whose state-dependent title is still a label, not a reason.
const LABEL_TITLES: Array<{ file: string; marker: string; reason: string }> = [
  {
    file: "src/app/(dashboard)/dashboard/models/ModelCatalogTable.tsx",
    marker: 't("showModel"',
    reason: "Show/hide switch: both titles are the action label; disabled only while busy.",
  },
  {
    file: "src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx",
    marker: 't("copiedCode")',
    reason: "Copy button: copy/copied label; disabled while there is nothing to copy.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx",
    marker: "proxyConfiguredBySource",
    reason: "Proxy badge: onProxy is always passed in production, so it is never disabled there.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx",
    marker: "chatgptRefreshTokenTitle",
    reason: "Refresh-token label per provider; disabled while refreshing or for an off connection.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/CustomModelsSection.tsx",
    marker: 't("unhideModel")',
    reason: "Hide/unhide label; disabled only while the toggle request runs.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    marker: 't("testingModel")',
    reason: "Test button: last-result label; disabled only while the test runs (spinner shown).",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    marker: '"showModel"',
    reason: "Show/hide label; disabled only while the toggle request runs.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow.tsx",
    marker: 't("testingModel")',
    reason: "Test button: last-result label; disabled only while the test runs (spinner shown).",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow.tsx",
    marker: '"showModel"',
    reason: "Show/hide label; disabled only while the toggle request runs.",
  },
  {
    file: "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/index.tsx",
    marker: '"autoRefreshing"',
    reason: "Refresh-all label (auto vs manual); disabled only while refreshing.",
  },
];

const SOURCES = [
  ...walk(path.join(ROOT, "src/app")),
  ...walk(path.join(ROOT, "src/shared/components")),
];

test("a disabled Button never carries a reason-only title (use GuardedAction reason)", () => {
  const offenders: string[] = [];
  const used = new Set<number>();
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("<Button")) continue;
    for (const { line, tag } of openingTags(source, "Button")) {
      const disabled = attr(tag, "disabled");
      const title = attr(tag, "title");
      if (!disabled || !title) continue;
      const alwaysDisabled = disabled === "true" || disabled === "{true}";
      const stateTitle = /\?|&&|\|\||undefined/.test(title);
      if (!alwaysDisabled && !stateTitle) continue;
      const idx = LABEL_TITLES.findIndex((e) => e.file === rel(file) && tag.includes(e.marker));
      if (idx >= 0) {
        used.add(idx);
        continue;
      }
      offenders.push(`${rel(file)}:${line}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    "a disabled button hides its title; move the explanation to <GuardedAction reason={…}>"
  );
  const stale = LABEL_TITLES.filter((_, i) => !used.has(i)).map((e) => `${e.file} (${e.marker})`);
  assert.deepEqual(stale, [], "stale LABEL_TITLES entries: remove them");
});

test("the reasons that used to hide in a disabled title are GuardedAction reasons", () => {
  // [file, i18n key / text of the reason]: each must now be a `reason`, not a `title`.
  const expected: Array<[string, string]> = [
    ["src/app/(dashboard)/dashboard/HomePageClient.tsx", "autoUpdateError"],
    ["src/app/(dashboard)/dashboard/batch/FilesListTab.tsx", "batchFileInUseByActiveBatch"],
    ["src/app/(dashboard)/dashboard/compression/studio/CompareView.tsx", "enterJudgeModel"],
    [
      "src/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer.tsx",
      "repeatUnavailable",
    ],
    [
      "src/app/(dashboard)/dashboard/playground/components/ImprovePromptButton.tsx",
      "setModelFirst",
    ],
    [
      "src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx",
      "maxColumnsReached",
    ],
    [
      "src/app/(dashboard)/dashboard/tools/traffic-inspector/components/CaptureModesToolbar.tsx",
      "tproxyModeUnavailable",
    ],
    ["src/app/(dashboard)/dashboard/usage/components/BudgetTab.tsx", "budgetSelectKeysFirst"],
    ["src/app/(dashboard)/dashboard/combos/ComboStepTestButton.tsx", "testStepNotTestable"],
  ];
  for (const [file, key] of expected) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");
    const guarded = openingTags(source, "GuardedAction").filter(
      (g) => (attr(g.tag, "reason") ?? "").length > 0
    );
    assert.ok(guarded.length > 0, `${file}: no <GuardedAction reason={…}>`);
    const carriesKey = guarded.some((g) => {
      const reason = attr(g.tag, "reason") ?? "";
      if (reason.includes(key)) return true;
      // A reason computed above the JSX: `reason={notTestableReason}` with
      // `const notTestableReason = … "testStepNotTestable" …;`.
      const ident = /^\{(\w+)\}$/.exec(reason)?.[1];
      return !!ident && new RegExp(`const ${ident}\\b[^;]*${key}`).test(source);
    });
    assert.ok(carriesKey, `${file}: the ${key} reason is not passed as GuardedAction reason`);
    assert.ok(source.includes(key), `${file}: lost the ${key} text`);
    for (const g of guarded) {
      const title = attr(g.tag, "title") ?? "";
      assert.ok(!title.includes(key), `${file}:${g.line}: ${key} is still a title`);
    }
  }
});
