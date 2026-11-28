import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  computePublicFreeHeadline,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { computeFreeCatalogCounts } from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";

import {
  buildBudgetCardCopy,
  renderBudgetCard,
} from "../../scripts/research/gen-budget-card-svg.mjs";
import { membershipFromProviderConstants } from "./_helpers/providerAccessMembership.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmt = (n: number) => (n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M");
const catalogMeta = () => {
  const { publishedQuotaPools, freeModels } = computeFreeCatalogCounts({
    membershipOf: membershipFromProviderConstants,
  });
  return `${publishedQuotaPools} free pools · ${freeModels} models · one endpoint`;
};

test(
  "the budget card prints the public catalog counts and headline figures",
  { timeout: 90000 },
  (context) => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "budget-card-"));
    context.after(() => rmSync(dir, { recursive: true, force: true }));
    const out = path.join(dir, "card.svg");
    execFileSync(
      process.execPath,
      ["--import", "tsx/esm", "scripts/research/gen-budget-card-svg.mjs", "--out", out],
      {
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 60000,
        killSignal: "SIGKILL",
        windowsHide: true,
      }
    );
    const svg = readFileSync(out, "utf8");
    const t = computePublicFreeHeadline();
    const meta = catalogMeta();
    assert.ok(svg.includes(meta), `expected catalog header: ${meta}`);
    assert.ok(svg.includes(`~${fmt(t.steadyRecurringTokens)}`), "steady figure");
    if (t.firstMonthRealisticTokens !== t.steadyRecurringTokens) {
      assert.ok(svg.includes(`~${fmt(t.firstMonthRealisticTokens)}`), "first-month figure");
    }
    assert.ok(svg.includes(`${t.uncappedProviders.length} permanently-free`), "uncapped count");
    if (t.gatedRecurringTokens > 0) {
      assert.ok(svg.includes("behind regional identity verification"), "gated line");
    }

    // The committed card is a generated artifact: it must be exactly what the
    // generator produces today, or the docs ship a stale picture of the totals.
    const committed = readFileSync(
      path.join(import.meta.dirname, "../../docs/screenshots/free-tier-budget-card.svg"),
      "utf8"
    );
    assert.equal(
      svg,
      committed,
      "docs/screenshots/free-tier-budget-card.svg is stale — regenerate with " +
        "`node --import tsx/esm scripts/research/gen-budget-card-svg.mjs`"
    );
  }
);

test(
  "--out without a path fails loudly instead of writing to undefined",
  { timeout: 90000 },
  () => {
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          ["--import", "tsx/esm", "scripts/research/gen-budget-card-svg.mjs", "--out"],
          {
            stdio: ["ignore", "pipe", "pipe"],
            timeout: 60000,
            killSignal: "SIGKILL",
            windowsHide: true,
          }
        ),
      (error: unknown) => {
        const failure = error as { status?: number; stderr?: Buffer };
        assert.equal(failure.status, 1);
        assert.match(String(failure.stderr), /--out requires a path/);
        return true;
      }
    );
  }
);

test("the card embeds only the mono subset, draws Switzer as outlines and nothing external", async () => {
  const svg = await renderBudgetCard();
  // Switzer is never embedded (FFL): only the code roles keep a face, the OFL IBM Plex Mono subset.
  assert.equal((svg.match(/@font-face/g) || []).length, 1);
  assert.ok(svg.includes(`font-family:"CI Mono"`), "CI Mono");
  for (const family of ["CI Serif", "CI Sans", "Switzer"]) {
    assert.ok(!svg.includes(`font-family:"${family}"`), `${family} must not be embedded`);
  }
  assert.match(svg, /<use href="#g[0-9a-z]+"/, "the Switzer text is drawn as outlines");
  assert.doesNotMatch(svg, /https?:\/\/(?!www\.w3\.org\/2000\/svg)|@import|<script|<foreignObject/);
  assert.match(svg, /^<svg viewBox="0 0 1200 \d+" [^>]*role="img"/);
  assert.ok(Buffer.byteLength(svg) < 200 * 1024, "must stay under the 200 KB studio target");
});

test("every drawn string is part of the subset input (no missing glyphs)", async () => {
  const svg = await renderBudgetCard();
  for (const s of Object.values(buildBudgetCardCopy()).flat()) {
    assert.ok(svg.includes(esc(s as string)), `string not drawn: ${s}`);
  }
});

test("the figures stay readable as <text> in the raw file", async () => {
  const svg = await renderBudgetCard();
  const t = computePublicFreeHeadline();
  const text = (s: string) =>
    new RegExp(`<text [^>]*>${s.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")}</text>`);
  assert.match(svg, text(`~${fmt(t.steadyRecurringTokens)}`));
  if (t.firstMonthRealisticTokens !== t.steadyRecurringTokens) {
    const firstMonth = `~${fmt(t.firstMonthRealisticTokens)}`;
    assert.ok(text(firstMonth).test(svg), `expected first-month figure as text: ${firstMonth}`);
  }
  assert.match(svg, text(catalogMeta()));
  assert.doesNotMatch(svg, /<image/);
});

test("equal steady and first-month totals hide the credits section and shorten the card", async () => {
  const recurring: FreeModelBudget = {
    provider: "fixture-recurring",
    modelId: "monthly",
    displayName: "Monthly model",
    monthlyTokens: 12_000_000,
    creditTokens: 0,
    freeType: "recurring-monthly",
    poolKey: null,
    tos: "ok",
  };
  const signup: FreeModelBudget = {
    ...recurring,
    provider: "fixture-signup",
    modelId: "trial",
    monthlyTokens: 0,
    creditTokens: 5_000_000,
    freeType: "one-time-initial",
  };
  const restrictedRecurring: FreeModelBudget = {
    ...recurring,
    provider: "fixture-restricted",
    modelId: "restricted-monthly",
    monthlyTokens: 30_000_000,
    tos: "avoid",
  };
  const svg = await renderBudgetCard({
    perModel: [recurring, restrictedRecurring, { ...signup, tos: "avoid" }],
  });
  assert.ok(!/first month|signup credits/i.test(svg), "duplicate first-month section is hidden");
  assert.ok(!svg.includes("fixture-signup 5M"), "signup credit chips are hidden");
  assert.ok(svg.includes("~12M"), "the steady figure excludes the ToS-flagged quota");

  const withCredits = await renderBudgetCard({
    perModel: [recurring, restrictedRecurring, signup],
  });
  assert.ok(withCredits.includes("First month (+ signup credits)"), "first-month stat is printed");
  assert.ok(withCredits.includes("~17M"), "the first-month figure includes the signup credit");
  assert.ok(withCredits.includes("fixture-signup 5M"), "signup credit chip is printed");

  const height = (card: string) => Number(card.match(/^<svg viewBox="0 0 1200 (\d+)"/)?.[1]);
  assert.ok(height(svg) < height(withCredits), "the notes move up when the credit strip is hidden");
});

test("light and dark Editions palettes are both declared and no literal color escapes the theme", async () => {
  const svg = await renderBudgetCard();
  assert.match(svg, /:root\{[^}]*--bg:#f3f1e9/);
  assert.match(svg, /:root\{[^}]*--surface:#faf9f4/);
  assert.match(svg, /:root\{[^}]*--ink:#20211c/);
  assert.match(svg, /:root\{[^}]*--accent:#e5ac82/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--bg:#11120f/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--surface:#191a16/);
  assert.match(svg, /prefers-color-scheme: dark\)\{:root\{[^}]*--ink:#f2f0e8/);
  assert.doesNotMatch(svg, /#d8ff00|#040d10|#fbfbf8/i, "no Classic palette value survives");
  const body = svg.slice(svg.indexOf("</style>"));
  assert.doesNotMatch(body, /#[0-9a-fA-F]{3,8}(?![\w-])/);
});
