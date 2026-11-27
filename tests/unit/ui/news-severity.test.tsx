// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

import NewsBanner from "../../../src/app/(dashboard)/dashboard/NewsBanner";
import NewsViewer from "../../../src/app/(dashboard)/dashboard/changelog/components/NewsViewer";
import {
  NEWS_DISMISS_STORAGE_NAME,
  NEWS_JSON_URL,
  NEWS_V3_JSON_URL,
} from "../../../src/shared/utils/releaseNotes";

const START = new Date("2026-11-26T12:00:00.000Z");

function item(overrides: Record<string, unknown> = {}) {
  return {
    id: "notice",
    active: true,
    publishedAt: "2026-11-20T00:00:00.000Z",
    severity: "info",
    text: { en: { title: "Notice title", message: "Notice message" } },
    icon: "campaign",
    ...overrides,
  };
}

const v3 = (items: unknown[]) => ({ schemaVersion: 3, items });
const v2Live = {
  schemaVersion: 2,
  items: [
    {
      id: "v2-live",
      active: true,
      publishedAt: "2026-11-01T00:00:00.000Z",
      text: { en: { title: "Live in v2", message: "v2 message" } },
      icon: "campaign",
    },
  ],
};

function stubFeeds({
  flag,
  v3Payload,
  v2Payload = v2Live,
}: {
  flag: boolean;
  v3Payload?: unknown;
  v2Payload?: unknown;
}) {
  const mock = vi.fn(async (url: string) => {
    if (url === "/api/settings/feature-flags") {
      return {
        ok: true,
        json: async () => ({
          flags: [
            { key: "ANNOUNCEMENT_SEVERITY_ENABLED", effectiveValue: flag ? "true" : "false" },
          ],
        }),
      };
    }
    if (url === NEWS_V3_JSON_URL) {
      return v3Payload === undefined
        ? { ok: false }
        : { ok: true, text: async () => JSON.stringify(v3Payload) };
    }
    if (url === NEWS_JSON_URL) return { ok: true, json: async () => v2Payload };
    throw new Error(`unexpected request: ${url}`);
  });
  vi.stubGlobal("fetch", mock);
  return mock;
}

let root: Root;
let container: HTMLDivElement;

async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

async function mount(element: React.ReactElement) {
  await act(async () => {
    root.render(element);
  });
  await settle();
}

describe("announcement severity UI", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    vi.setSystemTime(START);
    localStorage.clear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  describe("NewsBanner", () => {
    it("keeps today's banner and never asks for v3 while the flag is off", async () => {
      const fetchMock = stubFeeds({
        flag: false,
        v3Payload: v3([
          item({ id: "outage", severity: "critical", expiresAt: "2026-11-27T00:00:00.000Z" }),
        ]),
      });
      await mount(<NewsBanner />);

      const banner = container.querySelector('[role="complementary"]');
      expect(banner?.getAttribute("aria-label")).toBe("Live in v2");
      expect(container.querySelector('[data-slot="alert"]')).toBeNull();
      expect(container.textContent).not.toContain("announcementSeverity");
      expect(fetchMock.mock.calls.map((call) => call[0])).not.toContain(NEWS_V3_JSON_URL);
    });

    it("shows a critical announcement as a dismissible alert with an accessible severity", async () => {
      stubFeeds({
        flag: true,
        v3Payload: v3([
          item({
            id: "newest-info",
            publishedAt: "2026-11-25T00:00:00.000Z",
            text: { en: { title: "Info title", message: "Info message" } },
          }),
          item({
            id: "outage",
            severity: "critical",
            publishedAt: "2026-11-10T00:00:00.000Z",
            expiresAt: "2026-11-27T00:00:00.000Z",
            text: { en: { title: "Outage title", message: "Outage message" } },
          }),
        ]),
      });
      await mount(<NewsBanner />);

      const alert = container.querySelector('[role="alert"]');
      expect(alert).not.toBeNull();
      expect(alert?.textContent).toContain("Outage title");
      expect(alert?.textContent).toContain("Outage message");
      expect(alert?.textContent).toContain("announcementSeverityCritical");
      expect(container.querySelector('[role="complementary"]')).toBeNull();

      const dismiss = container.querySelector(
        'button[aria-label="dismissNotification"]'
      ) as HTMLButtonElement;
      expect(dismiss).not.toBeNull();
      await act(async () => {
        dismiss.click();
      });
      await settle();

      expect(JSON.parse(localStorage.getItem(NEWS_DISMISS_STORAGE_NAME) ?? "[]")).toEqual([
        "outage",
      ]);
      // The dismissed critical entry gives way to the next announcement, shown as before.
      expect(container.querySelector('[role="alert"]')).toBeNull();
      expect(container.querySelector('[role="complementary"]')?.getAttribute("aria-label")).toBe(
        "Info title"
      );
    });

    it("announces a warning politely, not as an alert", async () => {
      stubFeeds({
        flag: true,
        v3Payload: v3([
          item({
            id: "heads-up",
            severity: "warning",
            text: { en: { title: "Heads up", message: "Soon" } },
          }),
        ]),
      });
      await mount(<NewsBanner />);

      expect(container.querySelector('[role="alert"]')).toBeNull();
      const status = container.querySelector('[role="status"]');
      expect(status?.textContent).toContain("Heads up");
      expect(status?.textContent).toContain("announcementSeverityWarning");
    });

    it("expires the highlight with the page open, without refetching", async () => {
      const fetchMock = stubFeeds({
        flag: true,
        v3Payload: v3([
          item({ id: "outage", severity: "critical", expiresAt: "2026-11-26T12:01:00.000Z" }),
        ]),
      });
      await mount(<NewsBanner />);
      const requests = fetchMock.mock.calls.length;
      expect(container.querySelector('[role="alert"]')).not.toBeNull();

      await advance(59_000);
      expect(container.querySelector('[role="alert"]')).not.toBeNull();

      await advance(2_000);
      expect(container.querySelector('[role="alert"]')).toBeNull();
      expect(container.textContent).toBe("");
      expect(fetchMock.mock.calls.length).toBe(requests);
    });

    it("treats a valid empty v3 feed as authoritative over a live v2 entry", async () => {
      stubFeeds({ flag: true, v3Payload: v3([]) });
      await mount(<NewsBanner />);
      expect(container.textContent).toBe("");
    });

    it("falls back to the v2 entry as an info banner when v3 is unavailable", async () => {
      stubFeeds({ flag: true });
      await mount(<NewsBanner />);
      expect(container.querySelector('[role="complementary"]')?.getAttribute("aria-label")).toBe(
        "Live in v2"
      );
    });
  });

  describe("NewsViewer", () => {
    it("lists chronologically with the severity named and drops an expired entry live", async () => {
      stubFeeds({
        flag: true,
        v3Payload: v3([
          item({
            id: "newest-info",
            publishedAt: "2026-11-25T00:00:00.000Z",
            text: { en: { title: "Info title", message: "Info message" } },
          }),
          item({
            id: "outage",
            severity: "critical",
            publishedAt: "2026-11-24T00:00:00.000Z",
            expiresAt: "2026-11-26T12:01:00.000Z",
            text: { en: { title: "Outage title", message: "Outage message" } },
          }),
        ]),
      });
      await mount(<NewsViewer />);

      const titles = () =>
        [...container.querySelectorAll("article h2")].map((node) => node.textContent);
      expect(titles()).toEqual(["Info title", "Outage title"]);
      expect(container.textContent).toContain("announcementSeverityCritical");
      expect(container.textContent).toContain("announcementSeverityInfo");

      await advance(61_000);
      expect(titles()).toEqual(["Info title"]);
    });

    it("renders exactly today's cards, without severity text, while the flag is off", async () => {
      const fetchMock = stubFeeds({ flag: false });
      await mount(<NewsViewer />);

      expect([...container.querySelectorAll("article h2")].map((node) => node.textContent)).toEqual(
        ["Live in v2"]
      );
      expect(container.textContent).not.toContain("announcementSeverity");
      expect(fetchMock.mock.calls.map((call) => call[0])).not.toContain(NEWS_V3_JSON_URL);
    });

    it("keeps the empty state for a valid empty v3 feed", async () => {
      stubFeeds({ flag: true, v3Payload: v3([]) });
      await mount(<NewsViewer />);
      expect(container.textContent).toContain("noAnnouncements");
    });
  });
});
