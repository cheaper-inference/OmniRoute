import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const clientSource = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/search-tools/SearchToolsClient.tsx",
    import.meta.url
  ),
  "utf8"
);

const searchTabSource = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/search-tools/components/tabs/SearchTab.tsx",
    import.meta.url
  ),
  "utf8"
);

const configPaneSource = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/search-tools/components/SearchToolsConfigPane.tsx",
    import.meta.url
  ),
  "utf8"
);

test("SearchToolsClient allows vertical stacking on mobile and row layout on lg (#19555)", () => {
  assert.match(
    clientSource,
    /className="flex flex-col min-h-\[calc\(100vh-120px\)\] lg:h-\[calc\(100vh-120px\)\]"/,
    "root container must allow height to grow on mobile while keeping 100vh on desktop"
  );
  assert.match(
    clientSource,
    /className="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"/,
    "main area must stack flex-col on mobile and use flex-row on desktop"
  );
  assert.match(
    clientSource,
    /className="flex-1 lg:overflow-y-auto"/,
    "tab content container must defer overflow-y-auto to lg breakpoint"
  );
  assert.doesNotMatch(
    clientSource,
    /className="flex flex-1 overflow-hidden"/,
    "main area must not lock to a non-wrapping row with overflow-hidden"
  );
});

test("SearchTab stacks form and results vertically on mobile (#19555)", () => {
  assert.match(
    searchTabSource,
    /className="flex flex-col lg:flex-row h-full"/,
    "SearchTab root must be flex-col on mobile and flex-row on desktop"
  );
  assert.match(
    searchTabSource,
    /className="w-full lg:w-\[300px\] shrink-0 border-b lg:border-b-0 lg:border-r border-border lg:overflow-y-auto flex flex-col bg-bg-alt"/,
    "left form/history pane must be w-full on mobile with border-b, and 300px with border-r on lg"
  );
  assert.match(
    searchTabSource,
    /className="flex-1 lg:overflow-y-auto p-1"/,
    "results pane must defer internal scrolling to lg breakpoint"
  );
  assert.doesNotMatch(
    searchTabSource,
    /className="w-\[300px\] shrink-0 border-r border-border overflow-y-auto flex flex-col bg-bg-alt"/,
    "form pane must not use fixed 300px without responsive breakpoint"
  );
});

test("SearchToolsConfigPane is full width on mobile and 220px on desktop (#19555)", () => {
  assert.match(
    configPaneSource,
    /className="w-full lg:w-\[220px\] shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-bg-alt lg:overflow-y-auto flex flex-col"/,
    "config pane must be w-full with border-t on mobile and 220px with border-l on lg"
  );
  assert.doesNotMatch(
    configPaneSource,
    /className="w-\[220px\] shrink-0 border-l border-border bg-bg-alt overflow-y-auto flex flex-col"/,
    "config pane must not use fixed 220px without responsive breakpoint"
  );
});
