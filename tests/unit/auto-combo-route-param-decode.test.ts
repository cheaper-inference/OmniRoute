import test from "node:test";
import assert from "node:assert/strict";

const { decodeRouteParam } = await import("../../src/shared/utils/decodeRouteParam.ts");

test("decodeRouteParam decodes percent-encoded auto combo ids", () => {
  assert.equal(decodeRouteParam("auto%2Ffast"), "auto/fast");
  assert.equal(decodeRouteParam("auto%2Fclaude-sonnet"), "auto/claude-sonnet");
  assert.equal(decodeRouteParam("auto%2Fcoding%3Afast"), "auto/coding:fast");
});

test("decodeRouteParam passes through plain ids unchanged", () => {
  assert.equal(decodeRouteParam("auto"), "auto");
  assert.equal(decodeRouteParam("auto/deepseek"), "auto/deepseek");
  assert.equal(
    decodeRouteParam("fecdd784-7b6b-4e59-9812-d74650d263ff"),
    "fecdd784-7b6b-4e59-9812-d74650d263ff"
  );
});

test("decodeRouteParam decodes correctly-encoded literals once", () => {
  assert.equal(decodeRouteParam("100%25%20legit"), "100% legit");
  assert.equal(decodeRouteParam("combo%20name"), "combo name");
});

test("decodeRouteParam falls back to raw value on malformed sequences", () => {
  assert.equal(decodeRouteParam("auto%"), "auto%");
  assert.equal(decodeRouteParam("auto%2"), "auto%2");
  assert.equal(decodeRouteParam("foo%ZZbar"), "foo%ZZbar");
});

test("decodeRouteParam makes the auto/* prefix check work on encoded ids", () => {
  const decoded = decodeRouteParam("auto%2Ffast");
  assert.equal(decoded === "auto" || decoded.startsWith("auto/"), true);
  const persisted = decodeRouteParam("fecdd784-7b6b-4e59-9812-d74650d263ff");
  assert.equal(persisted === "auto" || persisted.startsWith("auto/"), false);
});

test("decodeRouteParam decodes a single layer — never recursively", () => {
  // usePathname() returns url.pathname verbatim (single-encoded, e.g.
  // auto%2Ffast) — one decode is all a display label needs. A %252F segment
  // would mean a double-encoded URL, which the app never generates (links use
  // one encodeURIComponent); the contract stays one pass everywhere.
  assert.equal(decodeRouteParam("auto%252Fchaos"), "auto%2Fchaos");
  assert.equal(decodeRouteParam("auto%2Fchaos"), "auto/chaos");
});
