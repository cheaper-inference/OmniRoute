// @vitest-environment jsdom
/**
 * UI unit test for the login page's opt-in two-factor step (#16619).
 *
 * Pins the client side of the TOTP login: a password answer of `mfaRequired` swaps the
 * form for the code step (no session yet, no navigation), the code goes to
 * `/api/auth/mfa/verify`, an `mfaExpired` answer sends the operator back to the password
 * form, and "back to login" abandons the pending step. With MFA off the password alone
 * still completes the sign-in.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Stable identity fn: the real next-intl `t` is memoized per render.
const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));
const router = { push: vi.fn(), replace: vi.fn(), refresh: vi.fn() };
vi.mock("next/navigation", () => ({
  useRouter: () => router,
}));

const LoginPage = (await import("../../../src/app/login/page")).default;

type Reply = { ok: boolean; body: unknown };
const cleanupCallbacks: Array<() => void> = [];
const LOGIN_TIME_KEY = "omniroute_login_time";

function mockFetch(routes: Record<string, Reply | Reply[]>) {
  const calls: Array<{ url: string; body: unknown }> = [];
  globalThis.fetch = vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
    const entry = routes[url];
    const reply = Array.isArray(entry) ? (entry.shift() ?? { ok: false, body: {} }) : entry;
    const resolved = reply ?? { ok: false, body: {} };
    return { ok: resolved.ok, json: async () => resolved.body } as Response;
  }) as unknown as typeof fetch;
  return calls;
}

const REQUIRE_LOGIN: Reply = {
  ok: true,
  body: {
    requireLogin: true,
    authenticated: false,
    hasPassword: true,
    setupComplete: true,
    oidcEnabled: false,
    oidcDisablePasswordLogin: false,
  },
};

async function render() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanupCallbacks.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  await act(async () => {
    root.render(<LoginPage />);
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

async function type(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  await act(async () => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function submit(container: HTMLElement) {
  await act(async () => {
    button(container, "continue").click();
  });
  await act(async () => {});
}

const passwordInput = (c: HTMLElement) =>
  c.querySelector('input[type="password"]') as HTMLInputElement | null;
const codeInput = (c: HTMLElement) =>
  c.querySelector('input[autocomplete="one-time-code"]') as HTMLInputElement | null;

async function signInWithPassword(container: HTMLElement, password: string) {
  await type(passwordInput(container)!, password);
  await submit(container);
}

beforeEach(() => {
  sessionStorage.clear();
  // jsdom cannot navigate; the page's `window.location.href = …` only logs "not implemented".
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
  vi.restoreAllMocks();
});

describe("LoginPage two-factor step", () => {
  it("MFA off: the password alone completes the sign-in", async () => {
    const calls = mockFetch({
      "/api/settings/require-login": REQUIRE_LOGIN,
      "/api/auth/login": { ok: true, body: { success: true } },
    });
    const container = await render();

    await signInWithPassword(container, "hunter2");

    expect(calls.find((c) => c.url === "/api/auth/login")?.body).toEqual({ password: "hunter2" });
    expect(codeInput(container)).toBeNull();
    expect(sessionStorage.getItem(LOGIN_TIME_KEY)).not.toBeNull();
  });

  it("mfaRequired swaps to the code step, and a valid code completes the sign-in", async () => {
    const calls = mockFetch({
      "/api/settings/require-login": REQUIRE_LOGIN,
      "/api/auth/login": { ok: true, body: { mfaRequired: true } },
      "/api/auth/mfa/verify": { ok: true, body: { success: true } },
    });
    const container = await render();

    await signInWithPassword(container, "hunter2");

    // The password step alone is not a sign-in: no session marker, code form shown.
    expect(sessionStorage.getItem(LOGIN_TIME_KEY)).toBeNull();
    expect(passwordInput(container)).toBeNull();
    expect(codeInput(container)).not.toBeNull();
    expect(container.textContent).toContain("mfaPrompt");
    expect(container.textContent).toContain("mfaBackupCodeHint");

    await type(codeInput(container)!, "123456");
    await submit(container);

    expect(calls.find((c) => c.url === "/api/auth/mfa/verify")?.body).toEqual({
      code: "123456",
    });
    expect(sessionStorage.getItem(LOGIN_TIME_KEY)).not.toBeNull();
  });

  it("a wrong code shows the server message and stays on the code step", async () => {
    mockFetch({
      "/api/settings/require-login": REQUIRE_LOGIN,
      "/api/auth/login": { ok: true, body: { mfaRequired: true } },
      "/api/auth/mfa/verify": { ok: false, body: { error: { message: "Invalid code" } } },
    });
    const container = await render();

    await signInWithPassword(container, "hunter2");
    await type(codeInput(container)!, "000000");
    await submit(container);

    expect(container.textContent).toContain("Invalid code");
    expect(codeInput(container)).not.toBeNull();
    expect(sessionStorage.getItem(LOGIN_TIME_KEY)).toBeNull();
  });

  it("mfaExpired sends the operator back to an empty password form", async () => {
    mockFetch({
      "/api/settings/require-login": REQUIRE_LOGIN,
      "/api/auth/login": { ok: true, body: { mfaRequired: true } },
      "/api/auth/mfa/verify": {
        ok: false,
        body: { mfaExpired: true, error: { message: "Sign-in expired" } },
      },
    });
    const container = await render();

    await signInWithPassword(container, "hunter2");
    await type(codeInput(container)!, "123456");
    await submit(container);

    expect(codeInput(container)).toBeNull();
    expect(passwordInput(container)).not.toBeNull();
    expect(passwordInput(container)!.value).toBe("");
    expect(container.textContent).toContain("Sign-in expired");
    expect(sessionStorage.getItem(LOGIN_TIME_KEY)).toBeNull();
  });

  it("back to login abandons the code step and clears the code", async () => {
    mockFetch({
      "/api/settings/require-login": REQUIRE_LOGIN,
      "/api/auth/login": [
        { ok: true, body: { mfaRequired: true } },
        { ok: true, body: { mfaRequired: true } },
      ],
    });
    const container = await render();

    await signInWithPassword(container, "hunter2");
    await type(codeInput(container)!, "999999");
    await act(async () => {
      button(container, "backToLogin").click();
    });

    expect(codeInput(container)).toBeNull();
    expect(passwordInput(container)).not.toBeNull();

    await submit(container);
    expect(codeInput(container)!.value).toBe("");
  });
});
