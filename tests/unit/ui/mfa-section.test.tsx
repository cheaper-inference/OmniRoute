// @vitest-environment jsdom
/**
 * UI unit test for the Settings → Security two-factor card (MfaSection, #16619).
 *
 * Pins the enrollment flow (password → setup → QR + code → enable → recovery codes shown once),
 * the disable flow and the server error surface, so the card can be restructured without
 * changing what the operator sees or which calls it makes.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

// Stable identity fn: the real next-intl `t` is memoized per render.
const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

const MfaSection = (
  await import("../../../src/app/(dashboard)/dashboard/settings/components/MfaSection")
).default;

type Reply = { ok: boolean; body: unknown };
const cleanupCallbacks: Array<() => void> = [];

function mockFetch(routes: Record<string, Reply>) {
  const calls: Array<{ url: string; body: unknown }> = [];
  globalThis.fetch = vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
    const reply = routes[url] ?? { ok: false, body: {} };
    return { ok: reply.ok, json: async () => reply.body } as Response;
  }) as unknown as typeof fetch;
  return calls;
}

async function render() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanupCallbacks.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  await act(async () => {
    root.render(<MfaSection />);
  });
  await act(async () => {});
  return container;
}

function button(container: HTMLElement, label: string): HTMLButtonElement {
  const match = [...container.querySelectorAll("button")].find(
    (b) => b.textContent?.trim() === label
  );
  if (!match) throw new Error(`button "${label}" not found`);
  return match as HTMLButtonElement;
}

async function click(el: HTMLElement) {
  await act(async () => {
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await act(async () => {});
}

async function type(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  await act(async () => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

afterEach(() => {
  while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
  vi.restoreAllMocks();
});

describe("MfaSection", () => {
  it("enrolls: password → QR + code → recovery codes shown once, then back to idle", async () => {
    const calls = mockFetch({
      "/api/auth/mfa/status": {
        ok: true,
        body: { enabled: false, backupCodesRemaining: 0, recoverySwitchSet: false },
      },
      "/api/auth/mfa/setup": {
        ok: true,
        body: { secret: "JBSWY3DPEHPK3PXP", qrCodeDataUri: "data:image/png;base64,AAAA" },
      },
      "/api/auth/mfa/enable": { ok: true, body: { backupCodes: ["aaaa-1111", "bbbb-2222"] } },
    });
    const container = await render();

    expect(container.textContent).toContain("disabled");
    expect(container.textContent).toContain("mfaRecoveryHint");

    await click(button(container, "enable"));
    const password = container.querySelector('input[type="password"]') as HTMLInputElement;
    expect(password).not.toBeNull();
    expect(button(container, "continue").disabled).toBe(true);
    await type(password, "hunter2");
    await click(button(container, "continue"));

    expect(calls.find((c) => c.url === "/api/auth/mfa/setup")?.body).toEqual({
      password: "hunter2",
    });
    expect(container.textContent).toContain("mfaScanQr");
    expect(container.textContent).toContain("JBSWY3DPEHPK3PXP");
    expect(container.querySelector("img")?.getAttribute("src")).toBe("data:image/png;base64,AAAA");

    const codeInput = container.querySelector(
      'input[autocomplete="one-time-code"]'
    ) as HTMLInputElement;
    await type(codeInput, "123456");
    await click(button(container, "enable"));

    expect(calls.find((c) => c.url === "/api/auth/mfa/enable")?.body).toEqual({
      password: "hunter2",
      secret: "JBSWY3DPEHPK3PXP",
      code: "123456",
    });
    expect(container.textContent).toContain("mfaBackupCodesTitle");
    expect(container.textContent).toContain("aaaa-1111");
    expect(container.textContent).toContain("bbbb-2222");

    await click(button(container, "done"));
    expect(container.textContent).not.toContain("aaaa-1111");
    expect(container.textContent).toContain("mfaRecoveryHint");
  });

  it("disables with password + code and shows the remaining recovery codes when on", async () => {
    const calls = mockFetch({
      "/api/auth/mfa/status": {
        ok: true,
        body: { enabled: true, backupCodesRemaining: 7, recoverySwitchSet: true },
      },
      "/api/auth/mfa/disable": { ok: true, body: {} },
    });
    const container = await render();

    expect(container.textContent).toContain("enabled");
    expect(container.textContent).toContain("mfaBackupCodesRemaining");
    expect(container.textContent).toContain("mfaRecoverySwitchActive");

    await click(button(container, "disable"));
    expect(container.textContent).toContain("mfaDisableDesc");
    expect(button(container, "disable").disabled).toBe(true);

    await type(container.querySelector('input[type="password"]') as HTMLInputElement, "pw");
    await type(
      container.querySelector('input[autocomplete="one-time-code"]') as HTMLInputElement,
      "654321"
    );
    await click(button(container, "disable"));

    expect(calls.find((c) => c.url === "/api/auth/mfa/disable")?.body).toEqual({
      password: "pw",
      code: "654321",
    });
    expect(container.textContent).not.toContain("mfaDisableDesc");
  });

  it("shows the server's error message and stays on the step", async () => {
    mockFetch({
      "/api/auth/mfa/status": {
        ok: true,
        body: { enabled: false, backupCodesRemaining: 0, recoverySwitchSet: false },
      },
      "/api/auth/mfa/setup": { ok: false, body: { error: { message: "Invalid password" } } },
    });
    const container = await render();

    await click(button(container, "enable"));
    await type(container.querySelector('input[type="password"]') as HTMLInputElement, "nope");
    await click(button(container, "continue"));

    expect(container.textContent).toContain("Invalid password");
    expect(container.querySelector('input[type="password"]')).not.toBeNull();

    await click(button(container, "cancel"));
    expect(container.textContent).not.toContain("Invalid password");
    expect(container.textContent).toContain("mfaRecoveryHint");
  });
});
