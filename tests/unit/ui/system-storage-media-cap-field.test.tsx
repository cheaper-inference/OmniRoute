// @vitest-environment jsdom
// The Storage page shows the media store size cap next to the retention settings. The field
// loads retention.mediaStoreMaxMb, and Save sends the edited value in the same PATCH as the
// other retention fields. The env MEDIA_STORE_MAX_MB wins over this value at runtime.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_DATABASE_SETTINGS } from "@/types/databaseSettings";
import SystemStorageTab from "@/app/(dashboard)/dashboard/settings/components/SystemStorageTab";

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

const RETENTION = {
  quotaSnapshots: 7,
  compressionAnalytics: 30,
  mcpAudit: 30,
  a2aEvents: 30,
  callLogs: 30,
  conversationTurnNodes: 30,
  usageHistory: 30,
  memoryEntries: 30,
  xpAuditLog: 30,
  mediaStoreMaxMb: 2048,
  autoCleanupEnabled: true,
};

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
}

function setNativeValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("SystemStorageTab - media store size cap field", () => {
  let patches: Array<Record<string, any>>;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    patches = [];
    vi.spyOn(console, "error").mockImplementation(() => {});
    (globalThis as any).fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method || "GET").toUpperCase();
      if (url.endsWith("/api/settings/database")) {
        if (method === "PATCH") patches.push(JSON.parse(String(init?.body)));
        return new Response(
          JSON.stringify({
            ...DEFAULT_DATABASE_SETTINGS,
            retention: RETENTION,
            location: { databasePath: "x", dataDir: "y", walSizeBytes: 0, schemaVersion: 1 },
            stats: {
              databaseSizeBytes: 0,
              pageCount: 0,
              freelistCount: 0,
              lastVacuumAt: null,
              lastOptimizationAt: null,
              integrityCheck: null,
              lastIntegrityCheckAt: null,
              autoVacuumDrift: null,
              lastReclaimedPages: null,
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      if (url.includes("/api/storage/health")) {
        return new Response(
          JSON.stringify({
            driver: "sqlite",
            dbPath: "~/.omniroute/storage.sqlite",
            sizeBytes: 0,
            retentionDays: { app: 7, call: 7 },
            tableMaxRows: { callLogs: 100000, proxyLogs: 100000 },
            backupCount: 0,
            backupRetention: { maxFiles: 20, days: 0 },
            lastBackupAt: null,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("{}", { status: 200 });
    });
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.restoreAllMocks();
  });

  async function render(): Promise<HTMLDivElement> {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    await act(async () => {
      root.render(<SystemStorageTab />);
    });
    roots.push({ root, el });
    await flush();
    await flush();
    return el;
  }

  function mediaCapInput(container: HTMLElement): HTMLInputElement {
    const input = Array.from(container.querySelectorAll("input")).find((i) =>
      (i.labels?.[0]?.textContent || "").includes("Media store size cap")
    );
    if (!input) throw new Error("the media store size cap field is not rendered");
    return input as HTMLInputElement;
  }

  it("shows the stored cap in MiB", async () => {
    const container = await render();
    expect(mediaCapInput(container).value).toBe("2048");
  });

  it("says that the env wins", async () => {
    const container = await render();
    expect(container.textContent).toContain("MEDIA_STORE_MAX_MB");
  });

  it("sends the edited cap with Save retention settings", async () => {
    const container = await render();
    await act(async () => {
      setNativeValue(mediaCapInput(container), "512");
    });

    const save = Array.from(container.querySelectorAll("button")).find((b) =>
      (b.textContent || "").includes("Save retention settings")
    );
    expect(save, "the save button must be rendered").toBeTruthy();
    await act(async () => {
      save!.click();
    });
    await flush();

    expect(patches).toHaveLength(1);
    expect(patches[0].retention.mediaStoreMaxMb).toBe(512);
  });
});
