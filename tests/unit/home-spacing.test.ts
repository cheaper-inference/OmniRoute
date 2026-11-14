import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");

test("the home blocks are spaced by the same gap as the cards inside them", () => {
  const client = read("src/app/(dashboard)/dashboard/HomePageClient.tsx");
  const widgets = read("src/app/(dashboard)/home/HomeUsageWidgets.tsx");

  assert.match(client, /if \(loading\) \{\s*return \(\s*<div className="flex flex-col gap-3">/);
  assert.match(
    client,
    /const currentEndpoint = baseUrl;\s*return \(\s*<div className="flex flex-col gap-3">/
  );

  assert.match(
    widgets,
    /<section className="grid grid-cols-1 gap-3 lg:grid-cols-\[2fr_1fr\]"/,
    "usage section: stats and quota column"
  );
  assert.doesNotMatch(widgets, /gap-y-2|gap-x-3/, "no mixed row and column gaps");
  assert.doesNotMatch(widgets, /content-start gap-2/, "stats grid uses the shared gap");
  assert.doesNotMatch(widgets, /grid-cols-2 gap-2/, "stat cards use the shared gap");
});
