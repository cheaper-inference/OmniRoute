// @vitest-environment jsdom
/**
 * RTL coverage for the shared flow/routing components moved onto the CI UI Kit (KEA-7886,
 * lote 6): ReorderControl (compact kit ghost icon buttons), RoutingEntryLink (kit outline
 * button link), ModelRoutingSection (kit Card header action, labelled kit fields, EmptyState,
 * axe on the open form).
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ReorderControl from "@/shared/components/ReorderControl";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const wrap = (ui: React.ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );

async function runAxe(root: HTMLElement) {
  return axe.run(root, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    rules: { "color-contrast": { enabled: false } },
  });
}

// Warm the kit render path and axe once, outside the 5 s per-test budget: the first cold
// render (NextIntl provider + kit Button) and axe's first run can take several seconds on a
// loaded runner, which made whichever test ran first time out. Assertions are unchanged.
beforeAll(async () => {
  wrap(<ReorderControl onMoveUp={() => {}} onMoveDown={() => {}} upLabel="Up" downLabel="Down" />);
  await runAxe(document.body);
  cleanup();
}, 60_000);

describe("ReorderControl", () => {
  it("renders two named kit buttons and disables the edge one", () => {
    const up = vi.fn();
    const down = vi.fn();
    wrap(<ReorderControl onMoveUp={up} onMoveDown={down} isFirst upLabel="Up" downLabel="Down" />);
    const upBtn = screen.getByRole("button", { name: "Up" }) as HTMLButtonElement;
    const downBtn = screen.getByRole("button", { name: "Down" }) as HTMLButtonElement;
    expect(upBtn.className).toContain("ci-button--ghost");
    expect(upBtn.disabled).toBe(true);
    expect(downBtn.disabled).toBe(false);
    fireEvent.click(downBtn);
    expect(down).toHaveBeenCalledTimes(1);
    expect(up).not.toHaveBeenCalled();
  });
});

describe("RoutingEntryLink", () => {
  it("links to the key-scoped routing editor with the kit outline button look", () => {
    wrap(<RoutingEntryLink apiKeyId="key 1" />);
    const link = screen.getByRole("link", { name: messages.reasoningRouting.editor.configure });
    expect(link.getAttribute("href")).toBe("/dashboard/api-manager/routing?apiKeyId=key%201");
    expect(link.className).toContain("ci-button--outline");
  });
});

describe("ModelRoutingSection", () => {
  it("shows the kit EmptyState, then a labelled kit form that passes axe", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith("/api/model-combo-mappings")) return Response.json({ mappings: [] });
        if (url.startsWith("/api/settings")) return Response.json({});
        return Response.json({ combos: [] });
      })
    );
    const s = messages.settings;
    wrap(<ModelRoutingSection combos={[{ id: "c1", name: "Fast" }]} />);
    expect(await screen.findByText(s.noRoutingRules)).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: s.addRule }));
    });
    const pattern = screen.getByLabelText(s.pattern) as HTMLInputElement;
    const combo = screen.getByLabelText(s.routeToCombo) as HTMLSelectElement;
    expect(pattern.tagName).toBe("INPUT");
    expect(combo.className).toContain("ci-select-native");
    expect((screen.getByRole("button", { name: s.save }) as HTMLButtonElement).disabled).toBe(true);

    const results = await runAxe(document.body);
    expect(results.violations.map((v) => v.id)).toEqual([]);

    fireEvent.change(pattern, { target: { value: "claude-*" } });
    fireEvent.change(combo, { target: { value: "c1" } });
    expect((screen.getByRole("button", { name: s.save }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it("toggles a rule through a named kit switch, not an action label with aria-pressed", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/model-combo-mappings/m1" && init?.method === "PUT") {
        return Response.json({ ok: true });
      }
      if (url.startsWith("/api/model-combo-mappings")) {
        return Response.json({
          mappings: [
            {
              id: "m1",
              pattern: "claude-*",
              comboId: "c1",
              comboName: "Fast",
              priority: 1,
              enabled: true,
            },
          ],
        });
      }
      if (url.startsWith("/api/settings")) return Response.json({});
      return Response.json({ combos: [] });
    });
    vi.stubGlobal("fetch", fetchMock);
    const s = messages.settings;
    wrap(<ModelRoutingSection combos={[{ id: "c1", name: "Fast" }]} />);

    const toggle = (await screen.findByRole("switch", { name: s.enabled })) as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    expect(toggle.hasAttribute("aria-pressed")).toBe(false);
    expect(screen.queryByRole("button", { name: s.disable })).toBeNull();

    await act(async () => {
      fireEvent.click(toggle);
    });
    const put = fetchMock.mock.calls.find(
      ([url, init]) => String(url) === "/api/model-combo-mappings/m1" && init?.method === "PUT"
    );
    expect(put).toBeTruthy();
    expect(JSON.parse(String(put?.[1]?.body))).toEqual({ enabled: false });
    expect(
      ((await screen.findByRole("switch", { name: s.enabled })) as HTMLInputElement).checked
    ).toBe(false);

    const results = await runAxe(document.body);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
