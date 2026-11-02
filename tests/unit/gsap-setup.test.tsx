// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { gsap as gsapCore } from "gsap";
import { ScrollTrigger as ScrollTriggerCore } from "gsap/ScrollTrigger";
import { gsap, ScrollTrigger } from "@/shared/lib/gsap";

// gsap.core.globals() lists registered plugins but is missing from GSAP's typings.
const registeredGlobals = () =>
  (gsap.core as unknown as { globals: () => Record<string, unknown> }).globals();

describe("shared GSAP setup (browser)", () => {
  it("re-exports the same gsap and ScrollTrigger instances", () => {
    expect(gsap).toBe(gsapCore);
    expect(ScrollTrigger).toBe(ScrollTriggerCore);
  });

  it("registers ScrollTrigger with gsap on import", () => {
    expect(registeredGlobals().ScrollTrigger).toBe(ScrollTrigger);
  });
});
