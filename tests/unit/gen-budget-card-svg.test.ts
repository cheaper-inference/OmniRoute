import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { computeFreeModelTotals } from "@omniroute/open-sse/config/freeModelCatalog.ts";

import {
  buildBudgetCardCopy,
  renderBudgetCard,
} from "../../scripts/research/gen-budget-card-svg.mjs";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmt = (n: number) => (n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M");

test(
  "the budget card prints the catalog's own totals (no regex-parsed subset)",
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
    const t = computeFreeModelTotals();
    assert.ok(svg.includes(`~${fmt(t.steadyRecurringTokens)}`), "steady figure");
    assert.ok(svg.includes(`~${fmt(t.firstMonthRealisticTokens)}`), "first-month figure");
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
  const t = computeFreeModelTotals();
  const text = (s: string) =>
    new RegExp(`<text [^>]*>${s.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")}</text>`);
  assert.match(svg, text(`~${fmt(t.steadyRecurringTokens)}`));
  assert.match(svg, text(`~${fmt(t.firstMonthRealisticTokens)}`));
  assert.match(svg, text(buildBudgetCardCopy().meta[0]));
  assert.doesNotMatch(svg, /<image/);
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
