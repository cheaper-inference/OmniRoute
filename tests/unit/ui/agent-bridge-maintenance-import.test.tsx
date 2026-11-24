// @vitest-environment jsdom
/**
 * AgentBridgeMaintenanceCard — "Import config" opens the file picker through the kit
 * FileTrigger (no hidden input clicked through a ref) and imports the chosen JSON file.
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const importAgentBridgeConfig = vi.fn();

vi.mock("@/lib/inspector/agentBridgeMaintenanceApi", () => ({
  runDiagnose: vi.fn(),
  removeCaCert: vi.fn(),
  repairMitmState: vi.fn(),
  fetchAgentBridgeConfig: vi.fn(),
  importAgentBridgeConfig: (...args: unknown[]) => importAgentBridgeConfig(...args),
}));

let root: Root | null = null;
let container: HTMLElement;

type CardModule =
  typeof import("../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentBridgeMaintenanceCard");
let AgentBridgeMaintenanceCard: CardModule["AgentBridgeMaintenanceCard"];

async function renderCard(onError = vi.fn(), onRefresh = vi.fn()) {
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container);
    root.render(
      React.createElement(AgentBridgeMaintenanceCard, {
        orphanedStateDetected: false,
        certTrusted: false,
        hasCachedPassword: false,
        needsSudoPassword: false,
        isWin: false,
        onError,
        onRefresh,
      })
    );
  });
  return { onError, onRefresh };
}

function importButton(): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll("button")).find((b) =>
    /Import config/i.test(b.textContent ?? "")
  );
  if (!button) throw new Error("Import config button not found");
  return button as HTMLButtonElement;
}

function fileInput(): HTMLInputElement {
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');
  if (!input) throw new Error("file input not found");
  return input;
}

async function pick(input: HTMLInputElement, file: File) {
  Object.defineProperty(input, "files", { configurable: true, value: [file] });
  await act(async () => {
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

describe("AgentBridgeMaintenanceCard import", { timeout: 30000 }, () => {
  // Loaded once, outside the per-test timeout: the first transform of the card is slow.
  beforeAll(async () => {
    ({ AgentBridgeMaintenanceCard } =
      await import("../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentBridgeMaintenanceCard"));
  }, 180000);

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    importAgentBridgeConfig.mockReset();
  });

  afterEach(async () => {
    await act(async () => root?.unmount());
    root = null;
    document.body.innerHTML = "";
  });

  it("opens the kit FileTrigger's picker from the Import button", async () => {
    await renderCard();
    const input = fileInput();
    // The picker belongs to the kit FileTrigger: out of the tab order and limited to JSON.
    expect(input.hidden).toBe(true);
    expect(input.tabIndex).toBe(-1);
    expect(input.accept).toBe("application/json,.json");

    const opened = vi.fn();
    input.click = opened;
    await act(async () => importButton().click());
    expect(opened).toHaveBeenCalledTimes(1);
  });

  it("imports the chosen JSON file and refreshes the page state", async () => {
    importAgentBridgeConfig.mockResolvedValue({ bypassPatterns: 2, customHosts: 1, agents: 3 });
    const { onError, onRefresh } = await renderCard();

    const config = { version: 1, bypassPatterns: ["*.corp"] };
    await pick(
      fileInput(),
      new File([JSON.stringify(config)], "bridge.json", { type: "application/json" })
    );

    // The import reads the file and awaits the API before it reports.
    await vi.waitFor(() => expect(container.textContent).toMatch(/2 bypass/));
    expect(importAgentBridgeConfig).toHaveBeenCalledTimes(1);
    expect(importAgentBridgeConfig).toHaveBeenCalledWith(config);
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(onError).not.toHaveBeenCalledWith(expect.stringMatching(/.+/));
  });

  it("reports a file that is not JSON instead of importing it", async () => {
    const { onError } = await renderCard();

    await pick(fileInput(), new File(["hello"], "notes.txt", { type: "text/plain" }));

    await vi.waitFor(() =>
      expect(onError).toHaveBeenLastCalledWith(expect.stringMatching(/not valid JSON/i))
    );
    expect(importAgentBridgeConfig).not.toHaveBeenCalled();
  });
});
