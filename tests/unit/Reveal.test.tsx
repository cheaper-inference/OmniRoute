// @vitest-environment jsdom
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ScrollTrigger } from "@/shared/lib/gsap";
import Reveal from "@/shared/components/Reveal";

// The shared jsdom polyfill answers every media query with `matches: false`, i.e.
// "reduce motion" is ON. Swap in a stub that reports reduced motion as OFF.
function allowMotion() {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query === "(prefers-reduced-motion: no-preference)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  it("renders its children inside a div with the given className", () => {
    render(
      <Reveal className="flex gap-3">
        <p>card body</p>
      </Reveal>
    );

    const wrapper = screen.getByText("card body").parentElement as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.className).toBe("flex gap-3");
  });

  it("renders as a <section> when asked, so it can replace the caller's own wrapper", () => {
    render(
      <Reveal as="section" className="flex flex-col gap-3">
        <p>section body</p>
      </Reveal>
    );

    const wrapper = screen.getByText("section body").parentElement as HTMLElement;
    expect(wrapper.tagName).toBe("SECTION");
    expect(wrapper.className).toBe("flex flex-col gap-3");
  });

  it("does not animate when the user prefers reduced motion", () => {
    render(
      <Reveal>
        <p>still content</p>
      </Reveal>
    );

    const wrapper = screen.getByText("still content").parentElement as HTMLElement;
    expect(wrapper.style.visibility).toBe("");
    expect(wrapper.style.opacity).toBe("");
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  it("starts hidden with one ScrollTrigger, and cleans both up on unmount", () => {
    allowMotion();
    const { unmount } = render(
      <Reveal>
        <p>animated content</p>
      </Reveal>
    );

    const wrapper = screen.getByText("animated content").parentElement as HTMLElement;
    expect(wrapper.style.visibility).toBe("hidden");
    expect(wrapper.style.opacity).toBe("0");
    expect(ScrollTrigger.getAll()).toHaveLength(1);

    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });
});
