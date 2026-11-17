// @vitest-environment jsdom
// #19211: an operator who set the management password and left the wizard before finishing
// (setupComplete still false) was asked to set a password again on resume. Submitting it from
// the signed-in session got 403 "currentPassword is required to change the management password",
// and "skip" posted requireLogin:false on an instance that already has a password.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const { pushMock, replaceMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  replaceMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/hooks", () => ({
  useDisplayBaseUrl: () => "https://api.example.com",
}));

const { default: OnboardingWizard } =
  await import("../../../src/app/(dashboard)/dashboard/onboarding/page");

type FetchCall = { url: string; method: string };

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
let calls: FetchCall[];

/**
 * Minimal successful fetch Response carrying a JSON body.
 * @param body - value returned by `json()`
 * @returns a Response-shaped object with `ok: true`
 */
function jsonResponse(body: unknown): Response {
  return { ok: true, status: 200, json: async () => body } as Response;
}

/**
 * Stub `fetch` for the wizard: `/api/settings` reports an unfinished setup and
 * `GET /api/settings/require-login` answers with `requireLogin` (or throws when it is an Error).
 * Every call is recorded in `calls`.
 * @param requireLogin - the GET require-login body, or an Error to simulate a failed read
 */
function stubFetch(requireLogin: Record<string, unknown> | Error): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method ?? "GET").toUpperCase();
      calls.push({ url, method });
      if (url === "/api/settings" && method === "GET") {
        return jsonResponse({ setupComplete: false });
      }
      if (url === "/api/settings/require-login" && method === "GET") {
        if (requireLogin instanceof Error) throw requireLogin;
        return jsonResponse(requireLogin);
      }
      if (url === "/api/settings/require-login" && method === "POST") {
        return jsonResponse({ success: true });
      }
      if (url === "/api/auth/login" && method === "POST") {
        return jsonResponse({ success: true });
      }
      throw new Error(`Unexpected request: ${method} ${url}`);
    })
  );
}

/**
 * Flush pending effects until `text` is rendered.
 * @param text - substring expected in the container
 */
async function waitForText(text: string): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (container.textContent?.includes(text)) return;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  throw new Error(`Timed out waiting for text: ${text}`);
}

/**
 * Click the button whose trimmed text equals `label`.
 * @param label - visible button text (translation key under the mocked next-intl)
 */
async function clickButton(label: string): Promise<void> {
  const button = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent?.trim() === label
  );
  if (!button) throw new Error(`Button not found: ${label}`);
  await act(async () => {
    button.click();
  });
}

/**
 * Type into a controlled input the way React observes it (native setter + input event).
 * @param input - the target input element
 * @param value - text to enter
 */
async function typeInto(input: HTMLInputElement, value: string): Promise<void> {
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  await act(async () => {
    setValue?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

/** Render the wizard and advance from Welcome through Tiers to the Security step. */
async function openSecurityStep(): Promise<void> {
  await act(async () => {
    root.render(<OnboardingWizard />);
  });
  await waitForText("getStarted");
  await clickButton("getStarted");
  await clickButton("continue");
  await waitForText("securityDesc");
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  calls = [];
  pushMock.mockReset();
  replaceMock.mockReset();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

it("does not ask for a new password when one is already set, and continues without a write", async () => {
  stubFetch({ hasPassword: true, requireLogin: true, setupComplete: false });
  await openSecurityStep();

  expect(container.textContent).toContain("passwordAlreadySet");
  expect(container.querySelectorAll('input[type="password"]')).toHaveLength(0);
  expect(container.textContent).not.toContain("skipPassword");
  expect(container.textContent).not.toContain("setPassword");

  await clickButton("continue");
  await waitForText("providerDesc");

  expect(container.textContent).not.toContain("providerRequiresPassword");
  expect(
    calls.filter((call) => call.url === "/api/settings/require-login" && call.method === "POST")
  ).toEqual([]);
});

it("still offers the password form and the skip option on a first run", async () => {
  stubFetch({ hasPassword: false, requireLogin: true, setupComplete: false });
  await openSecurityStep();

  expect(container.textContent).not.toContain("passwordAlreadySet");
  expect(container.querySelectorAll('input[type="password"]')).toHaveLength(2);
  expect(container.textContent).toContain("skipPassword");
  expect(container.textContent).toContain("setPassword");
});

it("does not offer to set the password again after it was set earlier in the same run", async () => {
  stubFetch({ hasPassword: false, requireLogin: true, setupComplete: false });
  await openSecurityStep();

  const [password, confirm] = Array.from(
    container.querySelectorAll<HTMLInputElement>('input[type="password"]')
  );
  await typeInto(password, "correct horse battery");
  await typeInto(confirm, "correct horse battery");
  await clickButton("setPassword");
  await waitForText("providerDesc");

  await clickButton("back");
  await waitForText("passwordAlreadySet");
  expect(container.querySelectorAll('input[type="password"]')).toHaveLength(0);

  await clickButton("continue");
  await waitForText("providerDesc");
  expect(
    calls.filter((call) => call.url === "/api/settings/require-login" && call.method === "POST")
  ).toHaveLength(1);
});

it("does not read the server's fail-safe hasPassword as a configured password", async () => {
  stubFetch({
    hasPassword: true,
    requireLogin: true,
    setupComplete: true,
    settingsUnavailable: true,
  });
  await openSecurityStep();

  expect(container.textContent).not.toContain("passwordAlreadySet");
  expect(container.querySelectorAll('input[type="password"]')).toHaveLength(2);
  expect(container.textContent).toContain("setPassword");
});

it("falls back to the password form when the login settings cannot be read", async () => {
  stubFetch(new Error("network down"));
  await openSecurityStep();

  expect(container.textContent).not.toContain("passwordAlreadySet");
  expect(container.querySelectorAll('input[type="password"]')).toHaveLength(2);
  expect(container.textContent).toContain("setPassword");
});
