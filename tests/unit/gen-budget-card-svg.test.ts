import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { computeFreeModelTotals } from "@omniroute/open-sse/config/freeModelCatalog.ts";

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
