import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// #18073 (lote 5a): kit `RadioGroup orientation="horizontal"` is a wrapping flex row, so
// card choices stretched to full width and stacked one per line at 1440 px, where the old
// settings screens had 2–4 column grids. The kit now ships `columns` / `minItemWidth`
// (a responsive grid that drops columns as it narrows). Every card RadioGroup under the
// settings screens must use it instead of the horizontal flex row.

const SETTINGS_DIR = path.join(process.cwd(), "src/app/(dashboard)/dashboard/settings/components");

function listTsx(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listTsx(full);
    return entry.name.endsWith(".tsx") ? [full] : [];
  });
}

type Group = { file: string; line: number; open: string; body: string };

function radioGroups(file: string): Group[] {
  const source = fs.readFileSync(file, "utf8");
  const groups: Group[] = [];
  const opener = /<RadioGroup\b(?!Item)/g;
  let match: RegExpExecArray | null;
  while ((match = opener.exec(source))) {
    const close = source.indexOf("</RadioGroup>", match.index);
    assert.ok(close > match.index, `unclosed <RadioGroup> in ${file}`);
    const body = source.slice(match.index, close);
    // The opening tag ends at the first ">" that is not part of "=>".
    const openEnd = body.search(/[^=]>/);
    groups.push({
      file: path.relative(process.cwd(), file),
      line: source.slice(0, match.index).split("\n").length,
      open: body.slice(0, openEnd + 2),
      body,
    });
  }
  return groups;
}

const cardGroups = listTsx(SETTINGS_DIR)
  .flatMap(radioGroups)
  .filter((group) => /<RadioGroupItem\b[^>]*?\scard[\s/>]/s.test(group.body));

test("the settings screens still have card radio groups to check", () => {
  // Guards the scan itself: if the parser stops finding them, the next test passes vacuously.
  assert.ok(cardGroups.length >= 9, `found only ${cardGroups.length} card radio groups`);
});

test("card radio groups in settings never use the horizontal flex row", () => {
  const offenders = cardGroups
    .filter((group) => /orientation="horizontal"/.test(group.open))
    .map((group) => `${group.file}:${group.line}`);
  assert.deepEqual(offenders, []);
});

// The groups that used to be 2–5 column grids before the kit migration, keyed by the
// expression that names them, with the column count of the old grid at its widest.
const EXPECTED_COLUMNS: Record<string, number> = {
  'AppearanceTab.tsx t("themeSelectionAria")': 3,
  'AppearanceTab.tsx t("paletteSelectionAria")': 2,
  'AppearanceTab.tsx getSettingsLabel("comboConfigMode"': 2,
  'AutoDisableCard.tsx "auto-disable-banned-scope"': 2,
  'IPFilterSection.tsx t("ipAccessMode")': 4,
  'MemorySkillsTab.tsx t("strategy")': 3,
  'MemorySkillsTab.tsx t("memorySkillsActiveSkillsProvider")': 2,
  'RoutingTab.tsx t("routingDefaultAutoVariant")': 3,
  'SidebarTab.tsx getSettingsLabel("sidebarPresets"': 5,
  'ThinkingBudgetTab.tsx t("thinkingBudgetTitle")': 2,
  'ThinkingBudgetTab.tsx t("baseEffortLevel")': 4,
};

test("the former multi-column settings choices keep their column count on the kit grid", () => {
  const actual: Record<string, number | null> = {};
  for (const key of Object.keys(EXPECTED_COLUMNS)) {
    const [file, name] = [key.slice(0, key.indexOf(" ")), key.slice(key.indexOf(" ") + 1)];
    const group = cardGroups.find(
      (candidate) => path.basename(candidate.file) === file && candidate.open.includes(name)
    );
    const columns = group?.open.match(/\scolumns=\{(\d+)\}/);
    actual[key] = columns ? Number(columns[1]) : null;
  }
  assert.deepEqual(actual, EXPECTED_COLUMNS);
});

test("card radio groups do not wrap their items in a hand-made Tailwind grid", () => {
  const offenders = cardGroups
    .filter((group) => /<div className="[^"]*\bgrid\b[^"]*grid-cols-/.test(group.body))
    .map((group) => `${group.file}:${group.line}`);
  assert.deepEqual(offenders, []);
});
