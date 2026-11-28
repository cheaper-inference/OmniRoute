/**
 * A quota failure reported by agy must keep its status through the TUI transport.
 *
 * agy reports an exhausted quota as its own banner, not as a process failure:
 *
 *   ⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).
 *   ⚠ Your AI credits balance is too low to continue.
 *
 * `applyHook()` used to collapse every `payload.error` into a 502, so a spent
 * quota reached the resilience layer as a provider error: no connection cooldown,
 * no account rotation, and the operator saw a server fault instead of the real
 * cause. The ACP transport already derives the status from agy's own words; the
 * TUI transport needs the same mapping.
 *
 * Contract asserted here:
 *   - the two quota banners map to 429 (rate limit) and 402 (credits) respectively;
 *   - anything else stays 502, so a genuine server failure is never disguised as
 *     a rate limit (that would park a healthy connection);
 *   - the classification is pure and case/format tolerant, because it reads text
 *     agy printed on a terminal.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { AgyTuiTurnError, agyTurnFailureStatus } from "../../open-sse/services/agyTuiRunner.ts";

const EXHAUSTED_BANNER =
  "⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).";
const CREDITS_BANNER = "⚠ Your AI credits balance is too low to continue.";

describe("agy TUI failure status propagation", () => {
  it("reports an exhausted quota as 429, not as a provider error", () => {
    assert.equal(agyTurnFailureStatus(`error: ${EXHAUSTED_BANNER}`), 429);
  });

  it("reports a spent credit balance as 402", () => {
    assert.equal(agyTurnFailureStatus(`error: ${CREDITS_BANNER}`), 402);
  });

  it("keeps a genuine failure a 502 so a healthy connection is never parked", () => {
    assert.equal(agyTurnFailureStatus("error: agy exited with code 1"), 502);
    assert.equal(agyTurnFailureStatus(""), 502);
  });

  it("reads agy's wording without depending on the banner's exact framing", () => {
    // The detail arrives as `${terminationReason}: ${payload.error}`, so the
    // banner may lose its newlines or gain a prefix.
    assert.equal(agyTurnFailureStatus("429 resource has been exhausted"), 429);
    assert.equal(agyTurnFailureStatus("RESOURCE_EXHAUSTED (code 429)"), 429);
    assert.equal(agyTurnFailureStatus("credits balance is too low"), 402);
  });

  it("does not read a quota status out of prose that merely mentions it", () => {
    // The model may quote the banner in an ordinary answer; only the classified
    // failure path calls this, but the patterns must still be specific.
    assert.equal(agyTurnFailureStatus("the docs mention a 429 code somewhere"), 502);
  });

  it("classifies the banner-only turn agy leaves with no reply of its own", () => {
    // agy sometimes prints the failure ONLY as a planner row, so `run()` sees an
    // answer that is just the banner. Reading it the same way closes the second
    // 502 path: otherwise a spent quota still surfaced as "no reply".
    assert.equal(agyTurnFailureStatus(EXHAUSTED_BANNER), 429);
    assert.equal(agyTurnFailureStatus(CREDITS_BANNER), 402);
  });

  it("carries the derived status on the error the transport throws", () => {
    const quota = new AgyTuiTurnError("error: exhausted", agyTurnFailureStatus(EXHAUSTED_BANNER));
    assert.equal(quota.status, 429);
    // The default stays 502: an unclassified turn failure is a server fault.
    assert.equal(new AgyTuiTurnError("unclassified").status, 502);
  });
});
