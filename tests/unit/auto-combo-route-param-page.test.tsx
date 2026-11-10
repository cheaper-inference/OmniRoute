// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Root } from "react-dom/client";

import ComboControlCenterPage from "../../src/app/(dashboard)/dashboard/combos/[id]/page";
import ComboControlCenterClient from "@/app/(dashboard)/dashboard/combos/ComboControlCenterClient";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

// The page delegates rendering to this client component — mock it so the test
// exercises only the param boundary, not the whole control-center graph.
vi.mock("@/app/(dashboard)/dashboard/combos/ComboControlCenterClient", () => ({
  default: function MockComboControlCenterClient() {
    return null;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/combos/auto%2Ffast",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    return t;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("combos/[id] page param boundary", () => {
  it("decodes the percent-encoded auto/* id before delegating", async () => {
    const element = await ComboControlCenterPage({
      params: Promise.resolve({ id: "auto%2Ffast" }),
    });
    expect(element.type).toBe(ComboControlCenterClient);
    expect(element.props.comboId).toBe("auto/fast");
    // The client gate that picks the virtual-combo path must now see the prefix.
    const { comboId } = element.props;
    expect(comboId === "auto" || comboId.startsWith("auto/")).toBe(true);
  });

  it("decodes compound ids and leaves persisted ids untouched", async () => {
    const compound = await ComboControlCenterPage({
      params: Promise.resolve({ id: "auto%2Fcoding%3Afast" }),
    });
    expect(compound.props.comboId).toBe("auto/coding:fast");

    const persisted = await ComboControlCenterPage({
      params: Promise.resolve({ id: "fecdd784-7b6b-4e59-9812-d74650d263ff" }),
    });
    expect(persisted.props.comboId).toBe("fecdd784-7b6b-4e59-9812-d74650d263ff");
  });

  it("decodes a single layer only", async () => {
    const element = await ComboControlCenterPage({
      params: Promise.resolve({ id: "auto%252Ffast" }),
    });
    expect(element.props.comboId).toBe("auto%2Ffast");
  });
});

describe("Breadcrumbs encoded segment", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders the single-decoded crumb for /dashboard/combos/auto%2Ffast", () => {
    act(() => {
      root.render(<Breadcrumbs />);
    });
    expect(container.textContent).toContain("Auto/fast");
    expect(container.textContent).not.toContain("%2F");
  });
});
