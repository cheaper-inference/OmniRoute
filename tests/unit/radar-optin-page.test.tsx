// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const inviteLink = 'a[href="https://github.com/cheaper-inference/OmniRoute"]';

const { notFoundMock, translationMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(),
  translationMock: (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => translationMock,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/lib/radar/autoSync", () => ({
  shouldAutoSyncOnOpen: () => false,
}));

vi.mock("../../src/app/(dashboard)/dashboard/radar/RadarCatalogTable", () => ({
  RadarCatalogTable: () => <div>catalog</div>,
}));

import RadarPage from "../../src/app/(dashboard)/dashboard/radar/page";

function response(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
}

describe("Radar opt-in page", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    notFoundMock.mockReset();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();
        if (url === "/api/radar/status") return response({ feeds: {} });
        if (url === "/api/radar/settings") {
          return response({ optIn: false });
        }
        throw new Error(`Unexpected request: ${url}`);
      })
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("renders activation when the feature exists but the owner has not opted in", async () => {
    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    expect(notFoundMock).not.toHaveBeenCalled();
    expect(container.textContent).toContain("activateTitle");
    expect(container.textContent).toContain("activateButton");
    expect(container.querySelector(inviteLink)).toBeNull();
    const activationIcon = container.querySelector(
      'svg.oi-icon[aria-hidden="true"][data-icon="radar"]'
    );
    expect(activationIcon?.getAttribute("data-icon")).toBe("radar");
    expect(container.textContent).not.toContain("📡");
  });

  it("shows the public access and privacy rules before the activation button", async () => {
    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    const renderedText = container.textContent ?? "";
    const explanationKeys = [
      "accessScaleTitle",
      "accessScaleIntro",
      "accessEveryoneRule",
      "accessOffersRule",
      "privacyTitle",
      "privacyDownloadsRule",
      "privacySendsRule",
      "privacyNeverRule",
    ];
    const activationPosition = renderedText.indexOf("activateButton");
    expect(activationPosition).toBeGreaterThan(-1);
    expect(renderedText).not.toMatch(/activateWithKeyButton|contributorButton|supporterButton/);
    expect(container.querySelector("input")).toBeNull();
    for (const key of explanationKeys) {
      const position = renderedText.indexOf(key);
      expect(position, `${key} must be rendered`).toBeGreaterThan(-1);
      expect(position, `${key} must precede activation`).toBeLessThan(activationPosition);
    }
  });

  it.each([
    { available: true, status: 200, visible: true },
    { available: false, status: 200, visible: false },
    { available: true, status: 503, visible: false },
  ])(
    "renders the Intel link with cache availability $available and status $status",
    async ({ available, status, visible }) => {
      vi.mocked(fetch).mockImplementation(async (input) => {
        switch (String(input)) {
          case "/api/radar/settings":
            return response({ optIn: true });
          case "/api/radar/catalog":
            return response({ entries: [], meta: null });
          case "/api/radar/referrals":
            return response({ fixed: [], campaigns: [] });
          case "/api/radar/status":
            return response({ feeds: { intel: { available } } }, status);
          default:
            throw new Error(`Unexpected request: ${String(input)}`);
        }
      });
      await act(async () => {
        root.render(<RadarPage />);
      });
      await settle();

      expect(Boolean(container.querySelector('a[href="/dashboard/radar/intel"]'))).toBe(visible);
      expect(container.querySelector('a[href="/dashboard/radar/offers"]')).not.toBeNull();
    }
  );

  it("shows the star invitation when the first catalog sync supplies metadata", async () => {
    const meta = { version: "2026.11.28.1", fetchedAt: new Date().toISOString() };
    let synced = false;
    vi.mocked(fetch).mockImplementation(async (input) => {
      switch (String(input)) {
        case "/api/radar/settings":
          return response({ optIn: true });
        case "/api/radar/catalog":
          return response({ entries: [], meta: synced ? meta : null });
        case "/api/radar/referrals":
          return response({ fixed: [], campaigns: [] });
        case "/api/radar/status":
          return response({ feeds: {} });
        case "/api/radar/sync":
          synced = true;
          return response({ status: "updated" });
        default:
          throw new Error(`Unexpected request: ${String(input)}`);
      }
    });
    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    expect(container.querySelector(inviteLink)).toBeNull();
    const syncButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "syncCta"
    );
    expect(syncButton).toBeDefined();
    await act(async () => syncButton?.click());

    expect(container.querySelector(inviteLink)).not.toBeNull();
  });

  it("keeps the page hidden when the feature endpoint returns 404", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(response({ error: "Not found" }, 404));

    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    expect(notFoundMock).toHaveBeenCalled();
    expect(container.textContent).not.toContain("activateTitle");
  });
});
