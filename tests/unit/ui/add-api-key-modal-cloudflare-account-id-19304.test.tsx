// @vitest-environment jsdom
//
// #19304 — the "Check" button of the Cloudflare Workers AI add-key modal must send the
// Account ID typed in the form to /api/providers/validate. Before #19384 the request body
// dropped it and the validator answered CLOUDFLARE_ACCOUNT_ID_REQUIRED.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const originalFetch = global.fetch;

function renderCloudflareModal() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <AddApiKeyModal
        isOpen
        provider="cloudflare-ai"
        providerName="Cloudflare Workers AI"
        onSave={async () => undefined}
        onClose={() => {}}
      />
    );
  });
  containers.push({ root, el });
  // The kit Dialog portals its content to document.body (KEA-7886).
  return document.body;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

afterEach(() => {
  global.fetch = originalFetch;
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
});

describe("Cloudflare Workers AI Check button (#19304)", () => {
  it("sends the typed Account ID to /api/providers/validate", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ valid: true }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const body = renderCloudflareModal();
    const apiKeyInput = body.querySelector<HTMLInputElement>('input[type="password"]');
    const accountIdInput = body.querySelector<HTMLInputElement>(
      'input[placeholder="accountIdPlaceholder"]'
    );
    expect(apiKeyInput).toBeTruthy();
    expect(accountIdInput).toBeTruthy();

    setInputValue(apiKeyInput!, "cf-api-token");
    setInputValue(accountIdInput!, "  cf-account-19304  ");

    const checkButton = Array.from(body.querySelectorAll<HTMLButtonElement>("button")).find(
      (button) => button.textContent?.trim() === "check"
    );
    expect(checkButton).toBeTruthy();
    await act(async () => {
      checkButton!.click();
    });

    const validateCall = fetchMock.mock.calls.find(([url]) => url === "/api/providers/validate");
    expect(validateCall).toBeTruthy();
    const sent = JSON.parse(String(validateCall![1].body));
    expect(sent).toMatchObject({
      provider: "cloudflare-ai",
      apiKey: "cf-api-token",
      accountId: "cf-account-19304",
    });
  });
});
