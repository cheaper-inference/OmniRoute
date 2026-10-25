import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx",
    import.meta.url
  ),
  "utf8"
);

test("provider connection actions fill the row width and wrap on mobile", () => {
  assert.match(
    source,
    /className="flex w-full flex-wrap items-center justify-between gap-0.5 sm:gap-1 xl:justify-end \[&>button\]:grow-0"/,
    "on narrow screens the action icons must spread across the full row width and wrap instead of scrolling"
  );
  assert.match(
    source,
    /className="contents"/,
    "icon-only actions must join the same flex line so they are spread with the other actions"
  );
  // KEA-7886: icon-only actions are kit icon buttons pinned to the same 28px square.
  assert.match(
    source,
    /size="icon-sm"[\s\S]{0,160}?className="size-7 min-h-7 rounded/,
    "icon-only actions must use the same square touch target"
  );
  assert.match(
    source,
    /className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs"/,
    "labeled actions must collapse to the same icon-only square on narrow rows"
  );
  // PR #15532 review: the collapse is phone-only — from `sm` up the labeled actions
  // keep their visible text (Retest, Token, Apply/Export Codex/Claude auth).
  for (const label of [
    't("retest")',
    't("tokenShort")',
    "applyCodexAuthLabel",
    "exportCodexAuthLabel",
    "applyClaudeAuthLabel",
    "exportClaudeAuthLabel",
  ]) {
    assert.ok(
      source.includes(`<span className="hidden sm:inline">{${label}}</span>`),
      `the ${label} action must show its text label from the sm breakpoint up`
    );
  }
  assert.doesNotMatch(
    source,
    /className="!size-7 !p-0 text-xs[^"]*"/,
    "no labeled action may stay icon-only on desktop widths"
  );
  assert.match(
    source,
    /className="basis-full min-w-0 xl:basis-auto"/,
    "narrow screens must give the action bar the full row width"
  );
  assert.doesNotMatch(
    source,
    /w-max min-w-full|overflow-x-auto xl:basis-auto/,
    "the action bar must not fall back to a horizontally scrolling single row"
  );
});

const read = (rel: string) => readFileSync(new URL(`../../${rel}`, import.meta.url), "utf8");
const providerComponents = "src/app/(dashboard)/dashboard/providers/[id]/components";

test("connections toolbar and bulk actions use the shared full-width ActionBar", () => {
  // Codex keeps its start-aligned bar (#16248); every provider uses the shared ActionBar.
  assert.match(
    read(`${providerComponents}/ConnectionsHeaderToolbar.tsx`),
    /<ActionBar align=\{providerId === "codex" \? "start" : "end"\}>/
  );
  assert.match(read(`${providerComponents}/ConnectionsListPanel.tsx`), /<ActionBar>/);
  const actionBar = read("src/shared/components/ActionBar.tsx");
  assert.match(
    actionBar,
    /flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 \[&>\*\]:grow \[&>\*\]:justify-center sm:\[&>\*\]:grow-0/,
    "on narrow screens the bar buttons must grow to fill each line and wrap"
  );
});

test("connection filters use the shared FilterPills that fill the line on phones", () => {
  assert.match(read(`${providerComponents}/ConnectionsListPanel.tsx`), /<FilterPills/);
  const pills = read("src/shared/components/FilterPills.tsx");
  assert.match(pills, /flex w-full flex-wrap items-center gap-1\.5 sm:w-auto/);
  assert.match(pills, /inline-flex grow items-center justify-center/);
});

test("connection rows use the compact shared ReorderControl and hide separators on phones", () => {
  assert.match(source, /<ReorderControl/);
  assert.doesNotMatch(source, /<span className="text-text-muted\/30 select-none">\|<\/span>/);
  // KEA-7886: compact 20px kit ghost icon buttons (the kit min-height is reset).
  assert.match(read("src/shared/components/ReorderControl.tsx"), /size-5 min-h-5/);
});

test("provider lists use the shared one-column-on-phones card grid", () => {
  const page = read("src/app/(dashboard)/dashboard/providers/page.tsx");
  assert.match(page, /<ProviderCardGrid>/);
  assert.doesNotMatch(
    page,
    /<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">/
  );
  assert.match(
    read("src/shared/components/ProviderCardGrid.tsx"),
    /grid grid-cols-1 gap-3 min-\[480px\]:grid-cols-2/
  );
});

test("no bare pipe separators are left visible on phones in the connection row", () => {
  const quotaToggle = read(`${providerComponents}/ProviderQuotaVisibilityToggle.tsx`);
  assert.doesNotMatch(quotaToggle, /<span className="text-text-muted\/30 select-none">\|<\/span>/);
});

test("custom model add and edit forms share the two-column phone grid", () => {
  const custom = read(`${providerComponents}/CustomModelsSection.tsx`);
  assert.match(custom, /const FORMAT_FIELDS_GRID = "grid grid-cols-2 items-end gap-3/);
  assert.equal(custom.match(/className=\{FORMAT_FIELDS_GRID\}/g)?.length, 2);
  assert.equal(custom.match(/className=\{ENDPOINTS_GRID\}/g)?.length, 2);
  assert.doesNotMatch(custom, /overflow-x-auto overflow-y-visible/);
});

test("toggle thumb is vertically centred in its track", () => {
  // KEA-7886: Toggle renders the kit Switch, whose thumb is absolutely positioned in the track,
  // so "centred" is geometry: top === (track height - 2 × 1px border - thumb height) / 2, for
  // the kit default and for the `.ci-switch--compact` extension in globals.css.
  const toggle = read("src/shared/components/Toggle.tsx");
  assert.match(toggle, /from "@omniroute\/ui-kit\/switch"/);
  assert.doesNotMatch(toggle, /"mt-0\.5"/);
  const rem = (css: string, selector: string, prop: string) => {
    const at = css.indexOf(`${selector} {`);
    assert.ok(at > -1, `${selector} rule exists`);
    const rule = css.slice(at, css.indexOf("}", at));
    const m = rule.match(new RegExp(`(?:^|[\\s;{])${prop}:\\s*([\\d.]+)rem`));
    assert.ok(m, `${selector} sets ${prop} in rem`);
    return Number(m![1]) * 16;
  };
  const centred = (css: string, track: string, thumb: string) =>
    assert.equal(
      rem(css, thumb, "top"),
      (rem(css, track, "height") - 2 - rem(css, thumb, "height")) / 2
    );
  centred(read("packages/ui-kit/src/ci-ui.css"), "  .ci-switch__track", "  .ci-switch__thumb");
  centred(
    read("src/app/globals.css"),
    ".ci-switch--compact .ci-switch__track",
    ".ci-switch--compact .ci-switch__thumb"
  );
});

test("provider models use the symmetric AutoGrid", () => {
  assert.match(read(`${providerComponents}/ProviderModelsSection.tsx`), /<AutoGrid>/);
  assert.match(
    read("src/shared/components/AutoGrid.tsx"),
    /repeat\(auto-fill,minmax\(var\(--auto-grid-min\),1fr\)\)/
  );
  assert.doesNotMatch(read(`${providerComponents}/ModelRow.tsx`), /max-w-md/);
});

test("model card: icon + full name on top, copy pinned top-right, details below", () => {
  const row = read(`${providerComponents}/ModelRow.tsx`);
  assert.match(row, /relative flex h-full w-full min-w-0 flex-col gap-1\.5/);
  assert.match(row, /<code className="min-w-0 break-all pt-px font-mono/);
  assert.match(row, /<div className="flex min-w-0 items-center gap-2 pl-6">/);
  assert.match(
    read(`${providerComponents}/ModelCompatPopover.tsx`),
    /<span className="hidden sm:inline">\{t\("compatButtonLabel"\)\}<\/span>/
  );
  assert.match(row, /absolute right-2 top-2 rounded p-0\.5/);
});
