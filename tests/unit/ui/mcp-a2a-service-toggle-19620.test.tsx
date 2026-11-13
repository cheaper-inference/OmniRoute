// @vitest-environment jsdom
//
// #19620: MCP and A2A printed ON/OFF next to a switch that already shows its state. The text is
// gone; the switch keeps a translated name that says what it controls and what a press does.
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("@/app/(dashboard)/dashboard/endpoint/components/MCPDashboard", () => ({
  default: () => <div data-testid="mcp-dashboard" />,
}));
vi.mock("@/app/(dashboard)/dashboard/endpoint/components/A2ADashboard", () => ({
  default: () => <div data-testid="a2a-dashboard" />,
}));

const { default: McpPage } = await import("../../../src/app/(dashboard)/dashboard/mcp/page");
const { default: A2APage } = await import("../../../src/app/(dashboard)/dashboard/a2a/page");

function installFetch(settings: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => ({
      ok: true,
      status: 200,
      json: async () => (String(input) === "/api/settings" ? settings : { online: true }),
    }))
  );
}

function expectNoStateText() {
  expect(screen.queryByText(messages.common.on)).toBeNull();
  expect(screen.queryByText(messages.common.off)).toBeNull();
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const a2aLabel = messages.a2aDashboard.serviceLabel;

describe.each([
  { name: "MCP", Page: McpPage, flag: "mcpEnabled", label: "MCP" },
  { name: "A2A", Page: A2APage, flag: "a2aEnabled", label: a2aLabel },
])("$name service toggle", ({ Page, flag, label }) => {
  it("names the disable action and shows no ON text while enabled", async () => {
    installFetch({ [flag]: true });
    render(<Page />);

    const toggle = await screen.findByRole("switch", { name: `Disable ${label}` });
    expect((toggle as HTMLInputElement).checked).toBe(true);
    expectNoStateText();
  });

  it("names the enable action and shows no OFF text while disabled", async () => {
    installFetch({ [flag]: false });
    render(<Page />);

    const toggle = await screen.findByRole("switch", { name: `Enable ${label}` });
    expect((toggle as HTMLInputElement).checked).toBe(false);
    expectNoStateText();
  });
});
