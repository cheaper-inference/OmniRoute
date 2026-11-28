/**
 * KEA-9799: the Budget and Pricing pages open with the kit PageHeader, so the tab they
 * render must not open with a second, smaller heading that repeats the page title
 * ("Budget" then "Budget", "Pricing" then "Model Pricing").
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const DASHBOARD = resolve(process.cwd(), "src/app/(dashboard)/dashboard");
const read = (rel: string) => readFileSync(resolve(DASHBOARD, rel), "utf-8");

const PAGES = [
  {
    page: "costs/budget/page.tsx",
    tab: "usage/components/BudgetTab.tsx",
    repeatedTitleKey: "budgetPageTitle",
  },
  {
    page: "costs/pricing/page.tsx",
    tab: "settings/components/PricingTab.tsx",
    repeatedTitleKey: "modelPricing",
  },
] as const;

describe("costs pages render one page title (KEA-9799)", () => {
  for (const { page, tab, repeatedTitleKey } of PAGES) {
    it(`${page} owns the title through PageHeader`, () => {
      assert.match(read(page), /<PageHeader\b/);
    });

    it(`${tab} does not repeat the page title as its own heading`, () => {
      const source = read(tab);
      assert.equal(/<h[12]\b/.test(source), false, "the tab must not open a page-level h1/h2");
      const visibleTitle = new RegExp(`>\\s*\\{t\\("${repeatedTitleKey}"\\)\\}\\s*<`);
      assert.equal(
        visibleTitle.test(source),
        false,
        `t("${repeatedTitleKey}") must not be rendered as visible heading text`
      );
    });
  }
});
