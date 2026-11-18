// @vitest-environment jsdom
// The Modal adapter's size names are the kit Dialog sizes (`DialogContent size`), which cap the
// width in the kit CSS: sm → default (30rem), md → wide (36rem), lg → 48rem, xl → 64rem and
// full → the viewport minus the dialog margin, in width and in height. Until the kit had these
// sizes the adapter widened every non-sm dialog to 70vw with its own classes; this file pinned
// that width (hence its name) and now pins the mapping that replaced it.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: Modal } = await import("../../../src/shared/components/Modal");

const cleanups: Array<() => void> = [];

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  act(() =>
    root.render(
      <Modal isOpen onClose={() => {}} title="Width" {...props}>
        body
      </Modal>
    )
  );
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  // The kit Dialog (Radix) portals its content to <body>, outside `container`.
  const dialogs = document.body.querySelectorAll<HTMLElement>('[role="dialog"]');
  return dialogs[dialogs.length - 1];
}

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("Modal width", () => {
  const KIT_SIZE = { sm: "default", md: "wide", lg: "lg", xl: "xl", full: "full" } as const;

  it("defaults to md, the kit wide dialog", () => {
    const dialog = renderModal();
    expect(dialog.getAttribute("data-slot")).toBe("dialog-content");
    expect(dialog.getAttribute("data-size")).toBe("wide");
  });

  it("maps every size name to a kit Dialog size", () => {
    for (const size of ["sm", "md", "lg", "xl", "full"] as const) {
      const dialog = renderModal({ size });
      expect(dialog.getAttribute("data-size"), size).toBe(KIT_SIZE[size]);
      cleanups.pop()!();
    }
  });

  it("adds no width class of its own: the kit size is the only cap", () => {
    for (const size of ["sm", "md", "lg", "xl", "full"] as const) {
      const dialog = renderModal({ size });
      expect(dialog.className, size).not.toContain("70vw");
      expect(dialog.className, size).not.toMatch(/(^|\s)(sm:)?(max-)?w-\S+/);
      cleanups.pop()!();
    }
  });

  it("the kit CSS carries a width cap for each size the adapter can ask for", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const css = readFileSync(resolve(process.cwd(), "packages/ui-kit/src/ci-ui.css"), "utf8");
    expect(css).toMatch(/\.ci-dialog \{[^}]*max-width: 30rem;/);
    expect(css).toMatch(/\.ci-dialog\[data-size="wide"\] \{ max-width:36rem; \}/);
    expect(css).toMatch(/\.ci-dialog:where\(\[data-size="lg"\]\) \{ max-width: 48rem; \}/);
    expect(css).toMatch(/\.ci-dialog:where\(\[data-size="xl"\]\) \{ max-width: 64rem; \}/);
    expect(css).toMatch(
      /\.ci-dialog:where\(\[data-size="full"\]\) \{ max-width: none; height: calc\(100vh - 3rem\); max-height: calc\(100vh - 3rem\); \}/
    );
  });

  it("still applies a CSS length passed as maxWidth, and ignores a size name", () => {
    const length = renderModal({ maxWidth: "640px" });
    expect(length.style.maxWidth).toBe("640px");
    cleanups.pop()!();
    const name = renderModal({ maxWidth: "lg" });
    expect(name.style.maxWidth).toBe("");
  });

  it("a caller class still lands on the dialog root, next to the kit size", () => {
    const dialog = renderModal({ size: "lg", className: "sm:max-w-2xl" });
    expect(dialog.getAttribute("data-size")).toBe("lg");
    expect(dialog.className).toContain("sm:max-w-2xl");
  });
});
