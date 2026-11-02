// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const { default: ConnectionTestButton } =
  await import("../../../src/shared/components/ConnectionTestButton");
const { default: ConnectionTestModelField } =
  await import("../../../src/shared/components/ConnectionTestModelField");

// The global UI polyfill backs `useTranslations` with the real `en.json`.

let root: Root;
let container: HTMLDivElement;

const DEGRADED_CATALOG = {
  models: [
    { id: "small", name: "Small" },
    { id: "large", name: "Large" },
  ],
  source: "local_catalog",
  warning: "API unavailable — using local catalog",
  degraded: true,
  error: "HTTP 500",
};

function stubFetch(catalog: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url.includes("/models?")) return Response.json(catalog);
      return Response.json({ modelId: "small", prompt: "Hello" });
    })
  );
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it("the connection test dialog signals the fallback catalog and the reason", async () => {
  stubFetch(DEGRADED_CATALOG);

  await act(async () => {
    root.render(<ConnectionTestButton connectionId="account-a" />);
  });
  const trigger = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.getAttribute("aria-label") === "Test message"
  );
  expect(trigger).toBeDefined();
  await act(async () => trigger?.click());

  const notice = document.querySelector('[data-testid="discovery-degraded-notice"]');
  expect(notice).not.toBeNull();
  expect(notice?.textContent).toContain("Couldn't reach the provider's model list");
  expect(document.querySelector('[data-testid="discovery-degraded-cause"]')?.textContent).toBe(
    "HTTP 500"
  );
});

it("the connection test dialog shows nothing when the list is the provider's own", async () => {
  stubFetch({ models: [{ id: "small", name: "Small" }], source: "api" });

  await act(async () => {
    root.render(<ConnectionTestButton connectionId="account-a" />);
  });
  const trigger = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.getAttribute("aria-label") === "Test message"
  );
  await act(async () => trigger?.click());

  expect(document.querySelector('[data-testid="discovery-degraded-notice"]')).toBeNull();
});

it("the default model field signals the fallback catalog and the reason", async () => {
  stubFetch(DEGRADED_CATALOG);

  await act(async () => {
    root.render(<ConnectionTestModelField connectionId="account-a" onChange={() => {}} />);
  });

  const notice = container.querySelector('[data-testid="discovery-degraded-notice"]');
  expect(notice).not.toBeNull();
  expect(notice?.textContent).toContain("Couldn't reach the provider's model list");
  expect(container.querySelector('[data-testid="discovery-degraded-cause"]')?.textContent).toBe(
    "HTTP 500"
  );
});

it("shows the default model hint exactly once", async () => {
  stubFetch({ models: [{ id: "small", name: "Small" }], source: "api" });

  await act(async () => {
    root.render(<ConnectionTestModelField connectionId="account-a" onChange={() => {}} />);
  });

  const hint =
    "Used automatically by the Test message buttons for this account. Saved with the connection; no message is sent.";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Text | null = walker.nextNode();
  let times = 0;
  while (node) {
    if (node.textContent === hint) times += 1;
    node = walker.nextNode();
  }
  expect(times).toBe(1);
});
