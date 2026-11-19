// #18070 — "Test all" results dialog: focus must return to the trigger on close.
//
// The trigger is `disabled` while the batch runs, so the browser drops focus to <body>
// before the results dialog mounts, and the Modal finds no opener to return to. The hook
// now remembers the trigger when the batch starts and focuses it again when the results
// are dismissed (setBatchTestResults(null)), once it is enabled again.
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/openai",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const notify = { success: vi.fn(), error: vi.fn(), info: vi.fn(), warning: vi.fn() };
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const CONNECTIONS = [
  { id: "conn-a", provider: "openai", name: "A" },
  { id: "conn-b", provider: "openai", name: "B" },
];

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
    headers: { get: () => null },
  } as Response;
}

function installFetchMock() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method || "GET").toUpperCase();
      if ((url === "/api/providers" || url.startsWith("/api/providers?")) && method === "GET") {
        return jsonResponse(200, { connections: CONNECTIONS });
      }
      if (url === "/api/providers/test-batch" && method === "POST") {
        return jsonResponse(200, {
          results: [
            { connectionId: "conn-a", valid: true },
            { connectionId: "conn-b", valid: true },
          ],
          summary: { passed: 2, failed: 0, total: 2 },
        });
      }
      return jsonResponse(200, {});
    })
  );
}

const { useProviderConnections } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections");
type HookResult = ReturnType<typeof useProviderConnections>;

describe("useProviderConnections — batch test results return focus to the trigger (#18070)", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    installFetchMock();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  async function mount(kind: "all" | "selected") {
    let result: HookResult | null = null;
    function Harness() {
      const hook = useProviderConnections("openai", false, false);
      useEffect(() => {
        result = hook;
      }, [hook]);
      const busy = kind === "all" ? hook.batchTesting : hook.batchRetesting;
      return (
        <button
          type="button"
          data-testid="trigger"
          disabled={busy}
          onClick={kind === "all" ? hook.handleBatchTestAll : hook.handleBatchRetest}
        >
          run
        </button>
      );
    }
    await act(async () => {
      root.render(<Harness />);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    return {
      getResult: () => result as HookResult,
      trigger: container.querySelector<HTMLButtonElement>('[data-testid="trigger"]')!,
    };
  }

  async function runAndDismiss(getResult: () => HookResult, trigger: HTMLButtonElement) {
    trigger.focus();
    await act(async () => {
      trigger.click();
      // The browser drops focus from a button that becomes disabled.
      trigger.blur();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(getResult().batchTestResults).not.toBeNull();
    expect(document.activeElement).toBe(document.body);

    await act(async () => {
      getResult().setBatchTestResults(null);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }

  it("Test all: focus goes back to the trigger when the results are dismissed", async () => {
    const { getResult, trigger } = await mount("all");
    await runAndDismiss(getResult, trigger);
    expect(getResult().batchTestResults).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("Retest selected: focus goes back to the trigger when the results are dismissed", async () => {
    const { getResult, trigger } = await mount("selected");
    await act(async () => {
      getResult().handleToggleSelectAll();
    });
    await runAndDismiss(getResult, trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("does not steal focus when the results are dismissed without a remembered trigger", async () => {
    const { getResult } = await mount("all");
    const other = document.createElement("input");
    document.body.appendChild(other);
    other.focus();
    await act(async () => {
      getResult().setBatchTestResults(null);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.activeElement).toBe(other);
    other.remove();
  });
});
