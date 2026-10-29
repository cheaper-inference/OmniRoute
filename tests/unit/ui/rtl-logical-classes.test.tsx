/**
 * RTL layout regression test — #3541 (partial, core layout)
 *
 * For RTL locales (ar/fa/he/ur) the sidebar and key overlays must flip
 * correctly when `dir=rtl` is set on <html>.  Tailwind v4 supports logical
 * direction utilities natively (`start-*`, `end-*`, `ps-*`, `pe-*`, `ms-*`,
 * `me-*`, `text-start`, `text-end`) which auto-mirror under dir=rtl without
 * extra `rtl:` variants.
 *
 * This test reads the source files and asserts that the four high-impact
 * components use logical classes instead of physical directional ones where
 * those classes govern layout placement / offset.
 *
 * Runner: Vitest (included via `tests/unit/**\/*.test.tsx` in vitest.config.ts)
 * Command: npm run test:vitest -- --reporter=verbose --testPathPattern=rtl-logical
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();

function src(rel: string) {
  return readFileSync(resolve(cwd, rel), "utf-8");
}

// ─── Dashboard shell ─────────────────────────────────────────────────────────
// The hand-rolled mobile drawer (`start-0` + `.dashboard-sidebar-mobile` RTL anchoring in
// globals.css) went away with the legacy shell (KEA-7886 F4). The kit shell's drawer is the kit
// Sidebar's own Sheet, anchored by `side` (asserted in the "Kit shell" block below).

describe("globals.css — no leftover hooks of the removed hand-rolled drawer", () => {
  it("drops the .dashboard-sidebar-mobile RTL anchoring rules", () => {
    expect(src("src/app/globals.css")).not.toContain(".dashboard-sidebar-mobile");
  });
});

// ─── persistLocale.ts ───────────────────────────────────────────────────────

describe("persistLocale — flips <html> direction immediately on switch", () => {
  const code = src("src/shared/lib/persistLocale.ts");

  it("sets document.documentElement.dir from the RTL locale list", () => {
    // router.refresh() never re-renders <html dir>, so the writer itself must
    // flip direction or Arabic text renders inside a stale dir="ltr" tree.
    expect(code).toContain("document.documentElement.dir");
    expect(code).toContain("RTL_LOCALES");
  });
});

// ─── Sidebar.tsx ─────────────────────────────────────────────────────────────

describe("Sidebar — collapse toggle button uses logical margin", () => {
  const code = src("src/shared/components/Sidebar.tsx");

  it("uses ms-auto (not ml-auto) for the macOS collapse-toggle alignment", () => {
    // ml-auto is a physical class; ms-auto mirrors in RTL.
    expect(code).toContain("ms-auto");
  });

  it("does not use bare ml-auto in the collapse-toggle className", () => {
    expect(code).not.toContain("ml-auto");
  });
});

describe("Kit shell — the sidebar side follows the document direction", () => {
  it("kit shell passes the RTL-aware side to the Sidebar", () => {
    expect(src("src/shared/components/layouts/DashboardShell.tsx")).toContain(
      "side={useSidebarSide()}"
    );
  });

  it("cancels the kit's order:2 for side=right under RTL so the aside stays on the inline end", () => {
    // `.ci-sidebar[data-side="right"] { order: 2 }` is physical: in an RTL flex row it would lay
    // the aside out after the inset, i.e. on the visual LEFT. The utility layer wins over the
    // kit's components layer, so `rtl:order-none` keeps the aside first = rightmost.
    // Layout-level proof: tests/e2e/sidebar-rtl.spec.ts.
    expect(src("src/shared/components/layouts/DashboardShell.tsx")).toContain("rtl:order-none");
  });

  it("useSidebarSide reads dir=rtl from <html> and anchors the sidebar right", () => {
    const sidebar = src("src/shared/components/Sidebar.tsx");
    expect(sidebar).toContain("export function useSidebarSide()");
    expect(sidebar).toContain('document.documentElement.dir === "rtl" ? "right" : "left"');
  });
});

// ─── LanguageSelector.tsx ─────────────────────────────────────────────────────

describe("LanguageSelector — dropdown anchors to inline-end", () => {
  const code = src("src/shared/components/LanguageSelector.tsx");

  it('anchors the kit DropdownMenuContent to the inline end (align="end")', () => {
    // KEA-7886: the hand-rolled absolute panel (`end-0`) became the kit DropdownMenu; its
    // floating-ui positioning resolves align="end" against the element's direction, so it
    // mirrors under dir=rtl without a physical offset class.
    expect(code).toContain('align="end"');
  });

  it("does not use bare right-0 for the dropdown panel", () => {
    expect(code).not.toContain("right-0");
  });

  it("uses text-start (not text-left) for lang name text alignment", () => {
    expect(code).toContain("text-start");
  });

  it("does not use text-left for lang name text alignment", () => {
    expect(code).not.toContain("text-left");
  });
});

// ─── Select.tsx ───────────────────────────────────────────────────────────────
// The Select adapter (KEA-7886) dropped its own absolutely-positioned chevron: the kit
// (Radix) Select draws its chevron inside the trigger's flex row, and the native
// `<option>`-children fallback uses the browser arrow with room reserved by
// `.ci-select-native` in globals.css. The RTL contract moves with it: no physical
// classes in the adapter, and the fallback reserves the chevron room on the inline end.

describe("Select — chevron room uses logical insets", () => {
  const code = src("src/shared/components/Select.tsx");
  const css = src("src/app/globals.css");
  const nativeRule = css.slice(css.indexOf(".ci-select-native {"));
  const nativeBlock = nativeRule.slice(0, nativeRule.indexOf("}"));

  it("the native fallback rule exists in globals.css", () => {
    expect(nativeBlock).toContain(".ci-select-native {");
  });

  it("does not use bare right-0 for the chevron wrapper", () => {
    expect(code).not.toContain("right-0");
  });

  it("reserves the chevron room with logical padding-inline (start end)", () => {
    expect(nativeBlock).toMatch(/padding-inline:\s*[^;\s]+\s+[^;\s]+;/);
  });

  it("does not use bare pr-3 for chevron wrapper padding", () => {
    expect(code).not.toContain("pr-3");
  });

  it("does not use physical padding (padding / padding-left / padding-right) for the native select", () => {
    expect(nativeBlock).not.toMatch(/(^|[\s;{])padding(-left|-right)?\s*:/);
  });

  it("does not use bare pr-10 for the select element", () => {
    expect(code).not.toContain("pr-10");
  });
});
