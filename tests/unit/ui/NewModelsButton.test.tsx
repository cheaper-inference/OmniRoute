// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: NewModelsButton } =
  await import("@/app/(dashboard)/dashboard/providers/components/NewModelsButton");

type InboxGroup = {
  provider: string;
  providerName: string;
  models: Array<{ modelId: string; isFree: boolean; firstSeenAt: string }>;
};

const FIRST_SEEN = "2026-11-01T00:00:00.000Z";
const GROUPS: InboxGroup[] = [
  {
    provider: "openrouter",
    providerName: "OpenRouter",
    models: [
      { modelId: "acme/free-one", isFree: true, firstSeenAt: FIRST_SEEN },
      { modelId: "acme/paid-two", isFree: false, firstSeenAt: FIRST_SEEN },
    ],
  },
  {
    provider: "groq",
    providerName: "Groq",
    models: [{ modelId: "groq/three", isFree: false, firstSeenAt: FIRST_SEEN }],
  },
];

let inbox: { totalUnseen: number; groups: InboxGroup[] };
let posts: unknown[];
let root: Root | null = null;

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 });
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function renderButton(): Promise<HTMLElement> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root?.render(<NewModelsButton />);
  });
  await flush();
  return container;
}

function button(label: string): HTMLButtonElement {
  const match = [...document.querySelectorAll("button")].find(
    (el) => el.textContent?.trim() === label
  );
  if (!match) throw new Error(`button not found: ${label}`);
  return match;
}

async function click(el: HTMLElement) {
  await act(async () => {
    el.click();
  });
  await flush();
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  inbox = { totalUnseen: 3, groups: GROUPS };
  posts = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url === "/api/models/new/acknowledge") {
        posts.push(JSON.parse(String(init?.body)));
        inbox = { totalUnseen: 0, groups: [] };
        return jsonResponse({ ok: true });
      }
      return jsonResponse(inbox);
    })
  );
});

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("NewModelsButton", () => {
  it("shows the unread count on the toolbar button", async () => {
    const container = await renderButton();
    expect(container.querySelector('[data-testid="new-models-badge"]')?.textContent).toBe("3");
  });

  it("caps the badge at 99+", async () => {
    inbox = { totalUnseen: 120, groups: GROUPS };
    const container = await renderButton();
    expect(container.querySelector('[data-testid="new-models-badge"]')?.textContent).toBe("99+");
  });

  it("hides the badge when nothing is unread", async () => {
    inbox = { totalUnseen: 0, groups: [] };
    const container = await renderButton();
    expect(container.querySelector('[data-testid="new-models-badge"]')).toBeNull();
  });

  it("groups the unread models by provider and tags the free ones", async () => {
    const container = await renderButton();
    await click(container.querySelector('[data-testid="new-models-button"]') as HTMLElement);

    const text = document.body.textContent ?? "";
    expect(text).toContain("OpenRouter");
    expect(text).toContain("Groq");
    expect(text).toContain("acme/free-one");
    expect(text).toContain("groq/three");
    expect(text.match(/freeBadge/g)).toHaveLength(1);
  });

  it("shows the error over loaded groups when mark-read fails, and recovers on retry", async () => {
    const container = await renderButton();
    await click(container.querySelector('[data-testid="new-models-button"]') as HTMLElement);
    expect(document.body.textContent).toContain("groq/three");

    vi.mocked(fetch).mockImplementationOnce(async () => new Response("{}", { status: 500 }));
    await click(button("newModelsMarkAllRead"));

    expect(document.body.textContent).toContain("newModelsLoadError");
    expect(document.body.textContent).not.toContain("groq/three");

    await click(button("retry"));

    expect(document.body.textContent).not.toContain("newModelsLoadError");
    expect(document.body.textContent).toContain("groq/three");
  });

  it("shows the load error when the inbox request fails on open", async () => {
    const container = await renderButton();
    vi.mocked(fetch).mockImplementationOnce(async () => new Response("{}", { status: 500 }));
    await click(container.querySelector('[data-testid="new-models-button"]') as HTMLElement);

    expect(document.body.textContent).toContain("newModelsLoadError");
    expect(document.body.textContent).not.toContain("newModelsEmpty");
  });

  it("marks everything read with { all: true } and clears the badge", async () => {
    const container = await renderButton();
    await click(container.querySelector('[data-testid="new-models-button"]') as HTMLElement);
    await click(button("newModelsMarkAllRead"));

    expect(posts).toEqual([{ all: true }]);
    expect(container.querySelector('[data-testid="new-models-badge"]')).toBeNull();
    expect(document.body.textContent).toContain("newModelsEmpty");
  });

  it("marks one provider read with that provider's model keys", async () => {
    const container = await renderButton();
    await click(container.querySelector('[data-testid="new-models-button"]') as HTMLElement);
    await click(
      [...document.querySelectorAll("button")].find(
        (el) => el.textContent?.trim() === "newModelsMarkProviderRead"
      ) as HTMLElement
    );

    expect(posts).toEqual([
      {
        models: [
          { provider: "openrouter", modelId: "acme/free-one" },
          { provider: "openrouter", modelId: "acme/paid-two" },
        ],
      },
    ]);
  });
});
