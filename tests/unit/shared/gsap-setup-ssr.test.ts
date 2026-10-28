import assert from "node:assert/strict";
import test from "node:test";

test("shared GSAP setup can be imported during SSR (no window)", async () => {
  assert.equal(typeof globalThis.window, "undefined");

  const { gsap, ScrollTrigger } = await import("../../../src/shared/lib/gsap.ts");

  assert.equal(typeof gsap.to, "function");
  assert.equal(typeof ScrollTrigger.create, "function");
  // Without a window ScrollTrigger defers registration until the browser.
  // gsap.core.globals() lists registered plugins but is missing from GSAP's typings.
  const globals = (gsap.core as unknown as { globals: () => Record<string, unknown> }).globals();
  assert.notEqual(globals.ScrollTrigger, ScrollTrigger);
});
