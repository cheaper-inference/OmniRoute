// @vitest-environment jsdom
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

const tMock = (key: string) => key;

vi.mock("next-intl", () => ({
  useTranslations: () => tMock,
}));

vi.mock("@/shared/hooks", () => ({
  useDisplayBaseUrl: () => "https://api.example.com",
}));

const { default: OnboardingWizard } =
  await import("../../../src/app/(dashboard)/dashboard/onboarding/page");

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    json: async () => body,
  } as Response;
}

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function waitForText(text: string): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (container.textContent?.includes(text)) return;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  throw new Error(`Timed out waiting for text: ${text}`);
}

function findButton(label: string): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent?.trim() === label
  );
  if (!button) throw new Error(`Button not found: ${label}`);
  return button;
}

async function clickButton(label: string): Promise<void> {
  await act(async () => {
    findButton(label).click();
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
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

it("#19211: onboarding displays existing password state and continues without password re-entry", async () => {
  const postCalls: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/settings") {
        return jsonResponse({ setupComplete: false });
      }
      if (
        url === "/api/settings/require-login" &&
        (!init || !init.method || init.method === "GET")
      ) {
        return jsonResponse({ hasPassword: true, requireLogin: true });
      }
      if (init?.method === "POST") {
        postCalls.push(url);
      }
      return jsonResponse({ ok: true, providers: [] });
    })
  );

  await act(async () => {
    root.render(<OnboardingWizard />);
  });

  await waitForText("getStarted");
  await clickButton("getStarted"); // to tiers
  await waitForText("continue");
  await clickButton("continue"); // to security

  await waitForText("Password is already configured");
  expect(container.textContent).toContain("Password is already configured");
  expect(container.querySelector('input[type="password"]')).toBeNull();

  // Footer button should be "continue", not "setPassword"
  const continueBtn = findButton("continue");
  expect(continueBtn.disabled).toBe(false);

  // Clicking continue should advance to provider step without hitting require-login POST
  await clickButton("continue");
  expect(postCalls.filter((c) => c === "/api/settings/require-login")).toHaveLength(0);
});

it("#19211: onboarding prompts for password setup when no password is set yet", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/settings") {
        return jsonResponse({ setupComplete: false });
      }
      if (url === "/api/settings/require-login") {
        return jsonResponse({ hasPassword: false, requireLogin: false });
      }
      return jsonResponse({ ok: true });
    })
  );

  await act(async () => {
    root.render(<OnboardingWizard />);
  });

  await waitForText("getStarted");
  await clickButton("getStarted");
  await clickButton("continue");

  // Security step should prompt for password
  await waitForText("securityDesc");
  expect(container.querySelector('input[type="password"]')).not.toBeNull();
  expect(container.textContent).toContain("setPassword");
});
