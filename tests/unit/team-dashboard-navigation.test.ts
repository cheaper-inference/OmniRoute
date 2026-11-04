import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  HIDEABLE_SIDEBAR_ITEM_IDS,
  SIDEBAR_SECTIONS,
  getSectionItems,
  normalizeHiddenSidebarItems,
} from "../../src/shared/constants/sidebarVisibility.ts";
import { getActiveSidebarHref } from "../../src/shared/utils/sidebarRouteMatch.ts";
import en from "../../src/i18n/messages/en.json" with { type: "json" };
import zh from "../../src/i18n/messages/zh-CN.json" with { type: "json" };

test("team costs participates in sidebar registry, visibility, longest route, search labels and header description", () => {
  assert.ok(HIDEABLE_SIDEBAR_ITEM_IDS.includes("costs-teams"));
  const section = SIDEBAR_SECTIONS.find((item) => item.id === "costs")!;
  const items = getSectionItems(section);
  const team = items.find((item) => item.id === "costs-teams")!;
  assert.equal(team.href, "/dashboard/costs/teams");
  assert.equal(getActiveSidebarHref("/dashboard/costs/teams", items), team.href);
  assert.deepEqual(normalizeHiddenSidebarItems(["costs-teams"]), ["costs-teams"]);
  for (const messages of [en, zh]) {
    assert.ok(messages.sidebar.costsTeams);
    assert.ok(messages.sidebar.costsTeamsSubtitle);
    assert.ok(messages.header.teamsDescription);
  }
  const header = fs.readFileSync("src/shared/components/Header.tsx", "utf8");
  assert.match(header, /"costs-teams": "teamsDescription"/);
});

test("English and Chinese feature catalogs contain exactly the same keys without missing markers", () => {
  assert.deepEqual(Object.keys(en.teamCosts).sort(), Object.keys(zh.teamCosts).sort());
  for (const messages of [en.teamCosts, zh.teamCosts]) {
    for (const value of Object.values(messages)) {
      assert.ok(value && !value.startsWith("__MISSING__:"));
    }
  }
});
