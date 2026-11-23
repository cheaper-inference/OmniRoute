// @vitest-environment jsdom
// Selective provider transfer dialog: export stays disabled until the operator has
// picked accounts, typed a matching long passphrase and acknowledged that the file
// carries credentials; import previews the file and sends the per-item decisions.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderTransferPanel from "@/app/(dashboard)/dashboard/settings/components/ProviderTransferPanel";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

type FetchCall = { url: string; body: Record<string, unknown> | null };

const CATALOG = {
  providerConnections: [
    {
      id: "c-1",
      provider: "openai",
      providerLabel: null,
      authType: "apikey",
      name: "Primary OpenAI",
      displayName: null,
      email: null,
    },
    {
      id: "c-2",
      provider: "claude",
      providerLabel: null,
      authType: "oauth",
      name: null,
      displayName: null,
      email: "owner@example.test",
    },
  ],
};

const PLAN = {
  summary: { providerConnections: 1, providerNodes: 0 },
  providerNodes: [],
  providerConnections: [
    {
      key: "connection:c-1",
      kind: "connection",
      provider: "openai",
      authType: "apikey",
      label: "Primary OpenAI",
      email: null,
      status: "conflict",
      actions: ["skip", "replace"],
      recommended: "skip",
    },
  ],
};

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];
let calls: FetchCall[] = [];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function render(): Promise<void> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ProviderTransferPanel />);
  });
  roots.push({ root, el });
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
}

function button(label: string): HTMLButtonElement {
  const found = Array.from(document.body.querySelectorAll("button")).find((b) =>
    (b.textContent || "").trim().endsWith(label)
  );
  if (!found) throw new Error(`button "${label}" not found`);
  return found as HTMLButtonElement;
}

async function click(el: HTMLElement) {
  await act(async () => {
    el.click();
  });
  await flush();
}

async function type(el: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  await act(async () => {
    setter?.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function passwordInputs(): HTMLInputElement[] {
  return Array.from(document.body.querySelectorAll<HTMLInputElement>('input[type="password"]'));
}

describe("ProviderTransferPanel", () => {
  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    vi.spyOn(console, "error").mockImplementation(() => {});
    calls = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const body = typeof init?.body === "string" ? JSON.parse(init.body) : null;
        calls.push({ url, body });
        if (url.endsWith("/catalog")) return json(CATALOG);
        if (url.endsWith("/export")) return json({ format: "omniroute-provider-transfer" });
        if (url.endsWith("/preview")) return json(PLAN);
        if (url.endsWith("/import")) {
          return json({ applied: { providerConnections: 1, providerNodes: 0, skipped: 0 } });
        }
        return json({});
      })
    );
    URL.createObjectURL = vi.fn(() => "blob:transfer");
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("gates export on selection, a matching passphrase and the credential acknowledgment", async () => {
    await render();
    await click(button("open"));
    expect(calls[0]?.url).toBe("/api/settings/transfer/catalog");
    expect(document.body.textContent).toContain("Primary OpenAI");
    expect(document.body.textContent).toContain("owner@example.test");

    const exportButton = button("exportButton");
    expect(exportButton.disabled).toBe(true);

    await click(document.getElementById("transfer-c-1") as HTMLInputElement);
    const [pass, confirm] = passwordInputs();
    await type(pass, "short");
    await type(confirm, "short");
    await click(document.getElementById("transfer-acknowledge") as HTMLInputElement);
    expect(button("exportButton").disabled).toBe(true);

    await type(pass, "correct horse battery");
    await type(confirm, "correct horse battery");
    expect(button("exportButton").disabled).toBe(false);

    await click(button("exportButton"));
    const exportCall = calls.find((call) => call.url.endsWith("/export"));
    expect(exportCall?.body).toEqual({
      connectionIds: ["c-1"],
      passphrase: "correct horse battery",
      acknowledgeCredentialExport: true,
    });
  });

  it("previews a transfer file and sends the operator's decisions", async () => {
    await render();
    await click(button("open"));
    await click(button("importTab"));

    const fileInput = document.body.querySelector<HTMLInputElement>('input[type="file"]');
    const file = new File(
      [JSON.stringify({ format: "omniroute-provider-transfer", version: 1 })],
      "transfer.json",
      { type: "application/json" }
    );
    Object.defineProperty(fileInput, "files", { value: [file], configurable: true });
    await act(async () => {
      fileInput?.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();
    await type(passwordInputs()[0], "correct horse battery");

    await click(button("previewButton"));
    expect(document.body.textContent).toContain("statusConflict");
    const select = document.body.querySelector<HTMLSelectElement>("select");
    expect(select?.value).toBe("skip");
    await act(async () => {
      if (select) {
        select.value = "replace";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    await click(button("importButton"));
    const importCall = calls.find((call) => call.url.endsWith("/import"));
    expect(importCall?.body?.decisions).toEqual({ "connection:c-1": "replace" });
    expect(importCall?.body?.passphrase).toBe("correct horse battery");
    expect(document.body.textContent).toContain("importSuccess");
  });
});
