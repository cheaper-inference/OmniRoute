import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Adoption of the new CI UI Kit APIs in the tools and CLI areas of the dashboard (slice a3,
// 2026-11-18). Each test keeps one hand-made pattern from coming back where the kit now has a
// prop for it. The scan is static and covers only the directories below; every kept exception
// is listed with its reason.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DASHBOARD = "src/app/(dashboard)/dashboard";
const AREAS = [
  "tools",
  "cli-code",
  "cli-agents",
  "agent-skills",
  "omni-skills",
  "conductor",
  "runtime",
  "discovery",
];

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

const FILES = AREAS.flatMap((area) => walk(path.join(ROOT, DASHBOARD, area))).map((file) => ({
  file: rel(file),
  source: fs.readFileSync(file, "utf8"),
}));

type Tag = { file: string; line: number; name: string; tag: string };

/** Opening tags of the named elements, up to the `>` that closes them (JSX braces balanced). */
function openingTags(names: string): Tag[] {
  const out: Tag[] = [];
  for (const { file, source } of FILES) {
    const re = new RegExp(`<(${names})(?=[\\s/>])`, "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(source))) {
      let depth = 0;
      let quote: string | null = null;
      let i = m.index + m[0].length;
      for (; i < source.length; i++) {
        const c = source[i];
        if (quote) {
          if (c === quote) quote = null;
          continue;
        }
        if (c === '"' || c === "'" || c === "`") quote = c;
        else if (c === "{") depth++;
        else if (c === "}") depth--;
        else if (c === ">" && depth === 0 && source[i - 1] !== "=") break;
      }
      out.push({
        file,
        line: source.slice(0, m.index).split("\n").length,
        name: m[1],
        tag: source.slice(m.index, i + 1),
      });
    }
  }
  return out;
}

type Exception = { file: string; marker: string; reason: string };

const isException = (list: Exception[], tag: Tag) =>
  list.some((e) => tag.file === `${DASHBOARD}/${e.file}` && tag.tag.includes(e.marker));

const where = (tags: Tag[]) => tags.map((t) => `${t.file}:${t.line}`).join("\n");

test("the scan reaches the tools and CLI areas", () => {
  assert.ok(FILES.length >= 100, `only ${FILES.length} files scanned`);
});

// ── B. Buttons: kit dense sizes and muted tone ───────────────────────────────────────────────

const BUTTON_SIZE_EXCEPTIONS: Exception[] = [
  {
    file: "tools/traffic-inspector/components/RequestRow.tsx",
    marker: "onSameContext?.(",
    reason:
      "Context chip laid over the second line of a virtualised row of fixed height " +
      "(useVirtualList measures it): a 24px button would not fit the 16px reserved for it.",
  },
];

/**
 * A fixed height, a square size or a sub-12px text size written by hand on a button. `h-auto`
 * alone is not one: it lets a button with several lines of content (a list entry, a card) grow.
 */
const HAND_SIZED_BUTTON =
  /(?<![\w:-])(?:h-\d+|min-h-\d+|size-\d+)(?![\w-])|text-\[(?:8|9|10|11)px\]/;

test("B: buttons take their height and text size from the kit sizes", () => {
  const offenders = openingTags("Button|GuardedAction").filter(
    (t) => HAND_SIZED_BUTTON.test(t.tag) && !isException(BUTTON_SIZE_EXCEPTIONS, t)
  );
  assert.equal(offenders.length, 0, `use size="2xs" / "icon-2xs":\n${where(offenders)}`);
});

test('B: ghost and outline buttons use tone="muted" for the muted resting ink', () => {
  // Kept on purpose (#19620, tests/unit/destructive-ghost-row-actions-19620.test.ts): the
  // clear/remove buttons that are muted at rest and turn red only on hover.
  const offenders = openingTags("Button|GuardedAction").filter(
    (t) =>
      /variant="(?:ghost|outline)"/.test(t.tag) &&
      /(?<![\w:-])text-text-muted(?![\w-])/.test(t.tag) &&
      !/hover:text-error/.test(t.tag)
  );
  assert.equal(offenders.length, 0, `use tone="muted":\n${where(offenders)}`);
});
