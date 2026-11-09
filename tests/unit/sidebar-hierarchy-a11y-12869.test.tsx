// @vitest-environment jsdom
/**
 * #12869 — hermetic stand-in for tests/e2e/sidebar-navigation.spec.ts (which stays in place and
 * still needs a real browser): renders the REAL <Sidebar /> inside the kit SidebarProvider + kit
 * <Sidebar> (as DashboardShell does) with the real section constants and the real English
 * messages, and drives it with a keyboard (user-event) in jsdom. The collapsed and mobile states
 * come from the kit provider (`useSidebar()`), not from Sidebar props.
 *
 * What this proves: the DOM/ARIA contract and keyboard behavior of the component. What it cannot
 * prove: layout/overflow (scrollWidth), colour contrast and focus-ring rendering (jsdom has no
 * layout engine — axe's `color-contrast` rule is therefore disabled), nor the visual direction.
 */
import React from "react";
import { act, cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// axe-core is the engine behind the declared devDependency @axe-core/playwright (same version).
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "../../src/i18n/messages/en.json";
import { SIDEBAR_SECTIONS } from "../../src/shared/constants/sidebarVisibility.ts";
import { resolveIcon } from "../../src/shared/constants/iconMap.ts";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
// Cold module transform of the Sidebar tree is slow on a loaded box; behavior, not speed, is tested.
vi.setConfig({ testTimeout: 120_000 });

const nav = vi.hoisted(() => ({ pathname: "/home" }));

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const dict = ((messages as Record<string, unknown>)[namespace] ?? {}) as Record<string, string>;
    const translate = (key: string) => dict[key] ?? key;
    translate.has = (key: string) => typeof dict[key] === "string";
    return translate;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
}));

type Loaded = {
  Sidebar: React.ComponentType<any>;
  kit: typeof import("@omniroute/ui-kit/sidebar");
};

// The kit is imported after vi.resetModules() together with the Sidebar so both share one
// SidebarContext instance.
async function loadSidebar(): Promise<Loaded> {
  const kit = await import("@omniroute/ui-kit/sidebar");
  const { default: Sidebar } = await import("@/shared/components/Sidebar");
  return { Sidebar, kit };
}

// Below the kit's mobile breakpoint the kit <Sidebar> becomes a Sheet (drawer); jsdom's polyfilled
// matchMedia never matches, so the mobile rendering is opted into per test.
const originalMatchMedia = window.matchMedia;
function emulateMobile() {
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// Stand-in for the shell Header's SidebarTrigger, the shell's only collapse/expand control.
function ShellTrigger({ kit }: Pick<Loaded, "kit">) {
  const { open } = kit.useSidebar();
  return <kit.SidebarTrigger aria-label={open ? "Collapse sidebar" : "Expand sidebar"} />;
}

function Harness({
  Sidebar,
  kit,
  initiallyCollapsed = false,
  mobileOpen = false,
  onClose,
}: Loaded & {
  initiallyCollapsed?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const { SidebarProvider, Sidebar: KitSidebar } = kit;
  return (
    <SidebarProvider
      defaultOpen={!initiallyCollapsed}
      defaultOpenMobile={mobileOpen}
      onOpenMobileChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <KitSidebar collapsible="icon">
        <Sidebar />
      </KitSidebar>
      <main data-slot="sidebar-inset">
        <ShellTrigger kit={kit} />
      </main>
    </SidebarProvider>
  );
}

const jsonResponse = (body: unknown) => ({ ok: true, status: 200, json: async () => body });

// The kit renders the <aside>; in the mobile Sheet it is portalled to document.body.
function sidebarElement(_container?: HTMLElement): HTMLElement {
  const aside = document.querySelector("aside[data-slot=sidebar]");
  if (!aside) throw new Error("aside not rendered");
  return aside as HTMLElement;
}

// Render and let the /api/settings fetch settle inside act() so no state update escapes it.
async function mount(ui: React.ReactElement) {
  let view!: ReturnType<typeof render>;
  await act(async () => {
    view = render(ui);
  });
  return view;
}

// At /home the accordion keeps only the Home section open, so the e2e spec opens OmniProxy first.
async function openSection(
  aside: HTMLElement,
  user: ReturnType<typeof userEvent.setup>,
  name: string
) {
  const section = within(aside).getByRole("button", { name });
  if (section.getAttribute("aria-expanded") === "false") await user.click(section);
  expect(section.getAttribute("aria-expanded")).toBe("true");
  return section;
}

async function runAxe(root: HTMLElement) {
  // wcag2a + wcag2aa as in the e2e spec; color-contrast needs real layout (jsdom has none).
  return axe.run(root, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    rules: { "color-contrast": { enabled: false } },
  });
}

describe("Sidebar hierarchy, keyboard navigation and ARIA contract (#12869)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    nav.pathname = "/home";
    localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}))
    );
  });

  afterEach(() => {
    cleanup();
    window.matchMedia = originalMatchMedia;
    localStorage.clear();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("exposes a labelled navigation landmark with the active page marked aria-current", async () => {
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    expect(within(aside).getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
    const current = aside.querySelectorAll('[aria-current="page"]');
    expect(current).toHaveLength(1);
    expect(current[0].tagName).toBe("A");
    expect(current[0].getAttribute("href")).toBe("/home");
  });

  it("moves aria-current and opens the owning group when the route changes", async () => {
    const loaded = await loadSidebar();
    const view = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(view.container);

    await openSection(aside, userEvent.setup(), "OmniProxy");
    const group = within(aside).getByRole("button", { name: "Compression Context" });
    expect(group.getAttribute("aria-expanded")).toBe("false");

    nav.pathname = "/dashboard/context/caveman";
    await act(async () => {
      view.rerender(<Harness {...loaded} />);
    });

    await waitFor(() => {
      const current = aside.querySelector('[aria-current="page"]');
      expect(current?.getAttribute("href")).toBe("/dashboard/context/caveman");
    });
    expect(aside.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    expect(
      within(aside)
        .getByRole("button", { name: "Compression Context" })
        .getAttribute("aria-expanded")
    ).toBe("true");
  });

  it("toggles a subgroup with Enter and Space and links aria-controls to its panel", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    await openSection(aside, user, "OmniProxy");

    const group = within(aside).getByRole("button", { name: "Compression Context" });
    expect(group.getAttribute("aria-expanded")).toBe("false");
    expect(within(aside).queryByRole("link", { name: "Caveman" })).toBeNull();

    group.focus();
    expect(document.activeElement).toBe(group);

    await user.keyboard("{Enter}");
    expect(group.getAttribute("aria-expanded")).toBe("true");
    const panelId = group.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const panel = container.querySelector(`[id="${panelId}"]`);
    expect(panel).not.toBeNull();
    expect(within(aside).getByRole("link", { name: "Caveman" })).toBeTruthy();
    expect(panel!.contains(within(aside).getByRole("link", { name: "Caveman" }))).toBe(true);

    await user.keyboard(" ");
    expect(group.getAttribute("aria-expanded")).toBe("false");
    expect(within(aside).queryByRole("link", { name: "Caveman" })).toBeNull();
  });

  it("search reveals a collapsed group's item and restores the collapsed state afterwards", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);
    await openSection(aside, user, "OmniProxy");
    const group = () => within(aside).queryByRole("button", { name: "Compression Context" });

    expect(group()?.getAttribute("aria-expanded")).toBe("false");
    const search = within(aside).getByRole("searchbox");
    await user.type(search, "Caveman");
    expect(within(aside).getByRole("link", { name: "Caveman" })).toBeTruthy();

    await user.clear(search);
    expect(group()?.getAttribute("aria-expanded")).toBe("false");
    expect(within(aside).queryByRole("link", { name: "Caveman" })).toBeNull();
  });

  it("collapses to an icon rail whose links keep accessible names, then expands again", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    // The collapse/expand toggle is the shell Header's (stand-in in the harness), not the aside's.
    expect(within(aside).queryByRole("button", { name: /^(Collapse|Expand) sidebar$/ })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    const expand = screen.getByRole("button", { name: "Expand sidebar" });
    expect(expand.getAttribute("aria-expanded")).toBe("false");
    expect(within(aside).getByRole("link", { name: "Home" })).toBeTruthy();
    expect(within(aside).queryByRole("searchbox")).toBeNull();
    for (const link of aside.querySelectorAll("nav a")) {
      expect(link.getAttribute("aria-label") || link.textContent?.trim()).toBeTruthy();
    }

    await user.click(expand);
    expect(within(aside).getByRole("searchbox")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Collapse sidebar" }).getAttribute("aria-expanded")
    ).toBe("true");
  });

  // The skip link moved to DashboardShell, before the sidebar (it must exist even when the sidebar
  // is a closed mobile Sheet); its first-in-DOM position is asserted in dashboard-layout-shell.
  it("keeps a natural Tab order: brand, search, then navigation", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    // No roving tabindex / positive tabindex: Tab follows the DOM order. (The component implements
    // no arrow/Home/End handling, so none is asserted — native buttons/links only.)
    expect(
      aside.querySelectorAll("[tabindex]:not([tabindex='0']):not([tabindex='-1'])")
    ).toHaveLength(0);

    const stops: string[] = [];
    for (let index = 0; index < 3; index += 1) {
      await user.tab();
      const active = document.activeElement as HTMLElement;
      stops.push(
        active.getAttribute("aria-label") ||
          active.getAttribute("type") ||
          active.textContent?.trim() ||
          active.tagName
      );
    }
    // The collapse toggle left the aside for the shell Header (trilha G), so it is no stop here.
    expect(stops, `tab stops: ${JSON.stringify(stops)}`).toEqual(["OmniRoute", "Search", "Home"]);
    // The third stop is the first item of the navigation landmark.
    expect(aside.querySelector("nav")!.contains(document.activeElement)).toBe(true);
  });

  it("gives every expandable control state + a resolvable panel, and every control a name", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    await openSection(aside, user, "OmniProxy");
    const group = within(aside).getByRole("button", { name: "Compression Context" });
    await user.click(group); // open one subgroup so both open and closed states are present

    const expandables = aside.querySelectorAll("button[aria-expanded]");
    expect(expandables.length).toBeGreaterThan(2);
    for (const button of expandables) {
      const state = button.getAttribute("aria-expanded");
      expect(["true", "false"]).toContain(state);
      const controls = button.getAttribute("aria-controls");
      if (controls) {
        const target = container.querySelector(`[id="${controls}"]`);
        // A collapsed control may point at a panel that is not rendered; an open one must resolve.
        if (state === "true") expect(target, `${button.textContent} panel`).not.toBeNull();
      }
    }
    // Section and group headers (not the sidebar collapse toggle) carry aria-controls.
    for (const header of aside.querySelectorAll("nav button[aria-expanded]")) {
      expect(header.getAttribute("aria-controls"), header.textContent ?? "").toBeTruthy();
    }

    for (const control of aside.querySelectorAll("button, a[href]")) {
      const name =
        control.getAttribute("aria-label") ||
        control.getAttribute("title") ||
        control.textContent?.trim();
      expect(name, `${control.tagName} ${control.outerHTML.slice(0, 80)}`).toBeTruthy();
    }
    // Decorative icon glyphs (Lucide SVGs via <Icon>) are hidden from assistive tech.
    const navIcons = aside.querySelectorAll("nav a svg.oi-icon");
    expect(navIcons.length).toBeGreaterThan(0);
    for (const icon of navIcons) {
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("closes the mobile drawer from its Close control", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();
    const closed = vi.fn();
    emulateMobile();
    await mount(<Harness {...loaded} mobileOpen onClose={closed} />);
    const aside = sidebarElement();

    // In the drawer the kit SidebarTrigger is the close control (common.close = "Close").
    await user.click(within(aside).getByRole("button", { name: "Close" }));
    expect(closed).toHaveBeenCalledTimes(1);
  });

  it("passes axe wcag2a/wcag2aa on the expanded desktop, collapsed and mobile renderings", async () => {
    const user = userEvent.setup();
    const loaded = await loadSidebar();

    const desktop = await mount(<Harness {...loaded} />);
    const desktopAside = sidebarElement(desktop.container);
    await openSection(desktopAside, user, "OmniProxy");
    await user.click(within(desktopAside).getByRole("button", { name: "Compression Context" }));
    await user.type(within(desktopAside).getByRole("searchbox"), "Caveman");
    let results = await runAxe(desktopAside);
    expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
    desktop.unmount();

    const rail = await mount(<Harness {...loaded} initiallyCollapsed />);
    results = await runAxe(sidebarElement(rail.container));
    expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
    rail.unmount();

    emulateMobile();
    await mount(<Harness {...loaded} mobileOpen onClose={() => {}} />);
    const mobileAside = sidebarElement();
    expect(mobileAside.getAttribute("data-mobile")).toBe("true");
    await user.type(within(mobileAside).getByRole("searchbox"), "Caveman");
    results = await runAxe(mobileAside);
    expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
    // axe actually evaluated rules (a vacuous run would make the assertion above meaningless).
    expect(results.passes.length).toBeGreaterThan(5);
  });

  it("renders navigation icons without per-item accent colours (the redesign's visual contract)", async () => {
    const loaded = await loadSidebar();
    const { container } = await mount(<Harness {...loaded} />);
    const aside = sidebarElement(container);

    const icons = aside.querySelectorAll("nav a svg.oi-icon");
    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) {
      expect((icon as SVGElement).style.color, icon.getAttribute("data-icon") ?? "").toBe("");
      // One nav ink: every glyph strokes with the row's text colour.
      expect(icon.getAttribute("stroke"), icon.getAttribute("data-icon") ?? "").toBe(
        "currentColor"
      );
    }
    // No Material ligature text inside the navigation.
    expect(aside.querySelector("nav .material-symbols-outlined")).toBeNull();
    // The decorative macOS "traffic light" dots are gone.
    expect(aside.innerHTML).not.toMatch(/#ff5f56|#ffbd2e|#27c93f/i);
  });
});

describe("sidebar item icons after the accent retirement (#12869 / #3812 / KEA-7886)", () => {
  // getSidebarIconAccent / SIDEBAR_ICON_ACCENTS were removed with the kit sidebar (one nav ink,
  // spec §3.5). Every real sidebar item id must instead resolve to a Lucide glyph via ICON_MAP.
  it("maps the icon of every sidebar item id to a Lucide component", () => {
    const items = SIDEBAR_SECTIONS.flatMap((section) =>
      section.children.flatMap((child) =>
        "type" in child && child.type === "group" ? child.items : [child]
      )
    );
    expect(items.length).toBeGreaterThan(20);
    for (const item of items) {
      expect(resolveIcon(item.icon), `${item.id} → ${item.icon}`).toBeTruthy();
    }
  });
});
