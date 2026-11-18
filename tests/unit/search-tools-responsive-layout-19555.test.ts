import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19555: the Search Tools studio always laid out three side-by-side columns (300px form
// pane, results, 220px config pane) with no breakpoint, so at 375px the results pane got
// ~126px and the rest was clipped by overflow-hidden. Below `lg` the panes must stack.
const base = "../../src/app/(dashboard)/dashboard/search-tools/";
const read = (rel: string) => readFileSync(new URL(base + rel, import.meta.url), "utf8");

const client = read("SearchToolsClient.tsx");
const searchTab = read("components/tabs/SearchTab.tsx");
const configPane = read("components/SearchToolsConfigPane.tsx");

function classesOf(source: string, marker: string): string[] {
  const idx = source.indexOf(marker);
  assert.ok(idx >= 0, `marker not found: ${marker}`);
  const open = source.lastIndexOf("className=", idx);
  const match = source.slice(open).match(/className="([^"]+)"/);
  assert.ok(match, `no className found for ${marker}`);
  return match[1].split(/\s+/);
}

test("main area stacks below lg and is a row from lg up", () => {
  const classes = classesOf(client, "{/* Tab content */}");
  assert.ok(classes.includes("flex-col"), `main area must be a column by default: ${classes}`);
  assert.ok(classes.includes("lg:flex-row"), `main area must be a row at lg: ${classes}`);
  assert.ok(
    classes.includes("lg:overflow-hidden") && !classes.includes("overflow-hidden"),
    `main area must only clip at lg, otherwise stacked panes are cut off: ${classes}`
  );
});

test("studio only pins its viewport height at lg so stacked content is not trapped", () => {
  const classes = classesOf(client, 'data-testid="search-tools-studio"');
  assert.ok(classes.includes("lg:h-[calc(100vh-120px)]"), `got: ${classes}`);
  assert.ok(!classes.includes("h-[calc(100vh-120px)]"), `unprefixed fixed height: ${classes}`);
});

test("tab panel only becomes its own scroll container at lg", () => {
  const classes = classesOf(client, 'role="tabpanel"');
  assert.ok(classes.includes("lg:flex-1") && classes.includes("lg:overflow-y-auto"), `${classes}`);
  assert.ok(!classes.includes("overflow-y-auto"), "unprefixed overflow-y-auto squeezes the pane");
});

test("config pane is full width below lg and keeps its 220px column at lg", () => {
  const classes = classesOf(configPane, 'data-testid="search-tools-config-pane"');
  assert.ok(classes.includes("w-full"), `config pane must be full width by default: ${classes}`);
  assert.ok(classes.includes("lg:w-[220px]"), `config pane must be 220px at lg: ${classes}`);
  assert.ok(!classes.includes("w-[220px]"), "an unprefixed w-[220px] pins the column on mobile");
  assert.ok(classes.includes("lg:border-l") && classes.includes("border-t"));
});

test("search tab stacks below lg and is a row from lg up", () => {
  const classes = classesOf(searchTab, 'data-testid="search-tab"');
  assert.ok(classes.includes("flex-col"), `search tab must be a column by default: ${classes}`);
  assert.ok(classes.includes("lg:flex-row"), `search tab must be a row at lg: ${classes}`);
});

test("form pane is full width below lg and keeps its 300px column at lg", () => {
  const classes = (
    searchTab.match(/\{\/\* Left: form \+ history \*\/\}\s*<div className="([^"]+)"/)?.[1] ?? ""
  ).split(/\s+/);
  assert.ok(classes.includes("w-full"), `form pane must be full width by default: ${classes}`);
  assert.ok(classes.includes("lg:w-[300px]"), `form pane must be 300px at lg: ${classes}`);
  assert.ok(!classes.includes("w-[300px]"), "an unprefixed w-[300px] pins the column on mobile");
  assert.ok(classes.includes("lg:border-r") && classes.includes("border-b"));
});
