import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const translate = (key: string) => key;

vi.mock("next-intl", () => ({ useTranslations: () => translate }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: () => null,
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
    disabled,
    loading,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled || loading}>
      {children}
    </button>
  ),
  ModelSelectModal: () => null,
  ManualConfigModal: () => null,
}));

import PiToolCard from "@/app/(dashboard)/dashboard/cli-code/components/PiToolCard";

type FetchCall = { url: string; init?: RequestInit };

const mounted: Array<{ container: HTMLDivElement; root: Root }> = [];

const response = (body: unknown, ok = true) => ({ ok, json: async () => body });

const waitFor = async (predicate: () => boolean, timeoutMs = 2000) => {
  const started = Date.now();
  while (!predicate()) {
    if (Date.now() - started > timeoutMs) throw new Error("waitFor timed out");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
};

const buttonByText = (container: HTMLElement, text: string) =>
  Array.from(container.querySelectorAll("button")).find((button) =>
    button.textContent?.includes(text)
  ) ?? null;

const READY_STATUS = {
  installed: true,
  runnable: true,
  commandPath: "/usr/local/bin/pi",
  modelsPath: "/home/u/.pi/agent/models.json",
  configError: null,
  hasOmniRoute: true,
  omniRouteOwned: true,
  omniRouteUnowned: false,
  baseUrl: "http://10.0.0.2:20128/v1",
  model: "auto/best-coding",
};

function stubFetch(
  statuses: unknown[],
  handlers: Record<string, (init?: RequestInit) => unknown> = {}
): FetchCall[] {
  const calls: FetchCall[] = [];
  let statusIndex = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, init });
      const method = init?.method ?? "GET";
      const handler = handlers[`${method} ${url}`];
      if (handler) return handler(init);
      if (url === "/api/cli-tools/pi-settings" && method === "GET") {
        const status = statuses[Math.min(statusIndex, statuses.length - 1)];
        statusIndex += 1;
        return response(status);
      }
      if (url === "/api/cli-tools/backups?tool=pi") return response({ backups: [] });
      throw new Error(`Unexpected fetch: ${method} ${url}`);
    })
  );
  return calls;
}

async function renderCard(props: Record<string, unknown> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ container, root });
  await act(async () => {
    root.render(
      <PiToolCard
        tool={{ name: "Pi" }}
        isExpanded
        baseUrl="http://localhost:20128"
        hasActiveProviders
        apiKeys={[{ id: "k1", key: "sk-****1" }]}
        activeProviders={[]}
        cloudEnabled={false}
        batchStatus={null}
        lastConfiguredAt={null}
        {...props}
      />
    );
  });
  return container;
}

afterEach(() => {
  for (const { container, root } of mounted.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("PiToolCard", () => {
  it("shows the install guidance and no apply action when pi is missing", async () => {
    stubFetch([{ installed: false, runnable: false, modelsPath: "/m.json", hasOmniRoute: false }]);
    const container = await renderCard();
    await waitFor(() => container.textContent?.includes("piInstallTitle") ?? false);

    expect(container.textContent).toContain("cliNotDetected");
    expect(container.textContent).toContain("piInstallCommand");
    expect(buttonByText(container, "applyConfig")).toBeNull();
    expect(container.querySelector("#pi-omniroute-endpoint")).toBeNull();
  });

  it("reports a broken models.json instead of the configuration form", async () => {
    stubFetch([{ ...READY_STATUS, hasOmniRoute: false, configError: "models.json is broken" }]);
    const container = await renderCard();
    await waitFor(() => container.textContent?.includes("piConfigInvalidTitle") ?? false);

    expect(container.textContent).toContain("models.json is broken");
    expect(buttonByText(container, "applyConfig")).toBeNull();
  });

  it("prefills the live config and applies it through pi-settings", async () => {
    const calls = stubFetch([READY_STATUS], {
      "POST /api/cli-tools/pi-settings": () => response({ message: "written" }),
    });
    const container = await renderCard();
    await waitFor(() => container.textContent?.includes("piOmnirouteConfigured") ?? false);

    const endpoint = container.querySelector<HTMLInputElement>("#pi-omniroute-endpoint");
    expect(endpoint?.value).toBe("http://10.0.0.2:20128/v1");
    const modelInput = container.querySelector<HTMLInputElement>('input[type="text"]');
    expect(modelInput?.value).toBe("auto/best-coding");

    await act(async () => {
      buttonByText(container, "updateConfig")?.click();
    });
    await waitFor(() => container.textContent?.includes("written") ?? false);

    const post = calls.find((call) => call.init?.method === "POST");
    expect(JSON.parse(String(post?.init?.body))).toEqual({
      baseUrl: "http://10.0.0.2:20128/v1",
      apiKey: "sk_omniroute",
      keyId: "k1",
      model: "auto/best-coding",
    });
  });

  it("surfaces the route error and keeps the container-ephemeral hint formatting", async () => {
    stubFetch([{ ...READY_STATUS, hasOmniRoute: false, baseUrl: null, model: null }], {
      "POST /api/cli-tools/pi-settings": () =>
        response({ error: { message: "refused" }, containerEphemeralTarget: true }, false),
    });
    const container = await renderCard();
    await waitFor(() => buttonByText(container, "applyConfig") !== null);

    const modelInput = container.querySelector<HTMLInputElement>('input[type="text"]');
    expect(buttonByText(container, "applyConfig")?.disabled).toBe(true);
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(modelInput, "kimi/k3");
      modelInput?.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      buttonByText(container, "applyConfig")?.click();
    });
    await waitFor(() => container.textContent?.includes("refused") ?? false);

    const text = Array.from(container.querySelectorAll("span")).find(
      (span) => span.textContent === "refused"
    );
    expect(text?.className).toContain("whitespace-pre-line");
    expect(buttonByText(container, "reset")).toBeNull();
  });

  it("resets an owned entry and clears the model field", async () => {
    stubFetch([READY_STATUS, { ...READY_STATUS, hasOmniRoute: false, model: null }], {
      "DELETE /api/cli-tools/pi-settings": () => response({}),
    });
    const container = await renderCard();
    await waitFor(() => buttonByText(container, "reset") !== null);

    await act(async () => {
      buttonByText(container, "reset")?.click();
    });
    await waitFor(() => container.textContent?.includes("resetDone") ?? false);

    const modelInput = container.querySelector<HTMLInputElement>('input[type="text"]');
    expect(modelInput?.value).toBe("");
  });

  it("never offers reset for an entry OmniRoute does not own", async () => {
    stubFetch([{ ...READY_STATUS, omniRouteOwned: false, omniRouteUnowned: true }]);
    const container = await renderCard();
    await waitFor(() => container.textContent?.includes("piUnownedNote") ?? false);

    expect(buttonByText(container, "reset")).toBeNull();
  });

  it("lists backups and restores the chosen one", async () => {
    const calls = stubFetch([READY_STATUS], {
      "GET /api/cli-tools/backups?tool=pi": () =>
        response({
          backups: [{ id: "b1", originalFile: "models.json", createdAt: "2026-10-01T00:00:00Z" }],
        }),
      "POST /api/cli-tools/backups": () => response({ ok: true }),
    });
    const container = await renderCard();
    await waitFor(() => buttonByText(container, "backups (1)") !== null);

    await act(async () => {
      buttonByText(container, "backups")?.click();
    });
    await act(async () => {
      buttonByText(container, "restore")?.click();
    });
    await waitFor(() => container.textContent?.includes("backupRestoredReloading") ?? false);

    const restore = calls.find(
      (call) => call.url === "/api/cli-tools/backups" && call.init?.method === "POST"
    );
    expect(JSON.parse(String(restore?.init?.body))).toEqual({ tool: "pi", backupId: "b1" });
  });
});
