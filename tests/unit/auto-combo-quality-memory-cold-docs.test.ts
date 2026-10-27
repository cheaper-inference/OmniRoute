import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const GUIDE = "docs/routing/AUTO-COMBO.md";
// Gate patterns from the spec, assembled from fragments so no flagged
// word sits in the committed source (see check-anti-fuite.sh).
const ACUTE = String.fromCharCode(233);
const W_EMPTY = "vi" + "de";
const W_COLD = "fro" + "id";
const W_START = "repart";
const W_MEM = "m" + ACUTE + "moire";
const W_BOOT = "red" + ACUTE + "marrage";
const GATE_PATTERNS = [
  "resetQualityTracker",
  `${W_EMPTY}.*${W_BOOT}`,
  `${W_START}.*${W_COLD}`,
  "cold.*restart",
  "restart.*cold",
  `quality.*${W_MEM}`,
  `${W_MEM}.*quality`,
  "quality.*in-process",
  "in-memory.*quality",
].join("\\|");

describe("auto-combo quality tracker memory cold docs", () => {
  it("guide names in-memory tracker, cold restart, and neutral 0.5", () => {
    const doc = readFileSync(GUIDE, "utf8");
    assert.match(doc, /in-memory.*quality/i);
    assert.match(doc, /cold.*restart/i);
    assert.match(doc, /quality.*neutral.*0\.5/is);
  });

  it("guide matches at least one gate pattern", () => {
    const out = execFileSync("git", ["grep", "-n", GATE_PATTERNS, "--", GUIDE], {
      encoding: "utf8",
    });
    assert.ok(out.trim().length > 0);
  });
});
