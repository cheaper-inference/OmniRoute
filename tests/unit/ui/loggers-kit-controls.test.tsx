// @vitest-environment jsdom
/**
 * RTL coverage for the shared logger components moved onto the CI UI Kit (KEA-7886, lote 6):
 * JsonTreeExpandControls (kit ghost icon buttons), CallContentProvenanceBadges (kit Badge tone),
 * ProxyLogDetail (Modal adapter → kit Dialog: Escape + axe on the open overlay) and the
 * RequestLoggerDetail overlay (kit Badge status + named icon-only controls, axe).
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { JsonTreeExpandControls } from "@/shared/components/JsonTreeExpandControls";
import { CallContentProvenanceBadges } from "@/shared/components/CallContentProvenanceBadges";
import ProxyLogDetail from "@/shared/components/ProxyLogDetail";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";
import messages from "../../../src/i18n/messages/en.json";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const wrap = (ui: React.ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );

async function runAxe(root: HTMLElement) {
  // color-contrast needs real layout, which jsdom does not have.
  return axe.run(root, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    rules: { "color-contrast": { enabled: false } },
  });
}

// Warm the kit render path and axe once, outside the 5 s per-test budget: the first cold
// render (NextIntl provider + kit Button/Badge) and axe's first run can take several seconds on
// a loaded runner, which made whichever test ran first time out. Assertions are unchanged.
beforeAll(async () => {
  wrap(<JsonTreeExpandControls sectionId="lote6-warmup" />);
  await runAxe(document.body);
  cleanup();
}, 60_000);

const detail = messages.requestLogger.detail;

describe("JsonTreeExpandControls", () => {
  it("renders four named kit icon buttons that move the per-section level", () => {
    wrap(<JsonTreeExpandControls sectionId="lote6-test-section" />);
    const level = screen.getByTitle(detail.currentExpandLevel);
    expect(level.textContent).toBe("2");

    const expand = screen.getByRole("button", { name: detail.expandOneLevel });
    expect(expand.className).toContain("ci-button");
    expect(expand.querySelector("svg.oi-icon")?.getAttribute("aria-hidden")).toBe("true");
    fireEvent.click(expand);
    expect(level.textContent).toBe("3");

    fireEvent.click(screen.getByRole("button", { name: detail.collapseOneLevel }));
    expect(level.textContent).toBe("2");
    fireEvent.click(screen.getByRole("button", { name: detail.collapseAllLevels }));
    expect(level.textContent).toBe("0");
    fireEvent.click(screen.getByRole("button", { name: detail.expandAllLevels }));
    expect(level.textContent).toBe("64");
  });
});

describe("CallContentProvenanceBadges", () => {
  it("renders nothing when the reply facts are unknown", () => {
    const { container } = wrap(<CallContentProvenanceBadges hasContent={null} />);
    expect(container.textContent).toBe("");
  });

  it("renders one warning-tone kit Badge per fact", () => {
    const { container } = wrap(
      <CallContentProvenanceBadges hasContent={0} usageProvenance="estimated" />
    );
    const badges = container.querySelectorAll("[data-testid^='content-provenance-']");
    expect(badges).toHaveLength(2);
    for (const badge of badges) {
      expect(badge.className).toContain("ci-badge");
      expect(badge.getAttribute("data-tone")).toBe("warning");
    }
    expect(badges[0].textContent).toBe(detail.contentEmpty);
    expect(badges[1].textContent).toBe(detail.usageEstimated);
  });
});

const PROXY_LOG = {
  id: "p1",
  timestamp: "2026-10-21T00:00:00.000Z",
  status: "error",
  proxy: { type: "http", host: "127.0.0.1", port: 8080, name: "reg" },
  level: "provider",
  provider: "openai",
  targetUrl: "openai/gpt-5",
  latencyMs: 12,
  error: "connect ECONNREFUSED",
};

describe("ProxyLogDetail (Modal adapter)", () => {
  it("opens a kit dialog with an error-tone status badge, closes on Escape, passes axe", async () => {
    const onClose = vi.fn();
    wrap(<ProxyLogDetail log={PROXY_LOG} onClose={onClose} />);
    const dialog = await screen.findByRole("dialog");
    const status = within(dialog).getByText("error");
    expect(status.closest(".ci-badge")?.getAttribute("data-tone")).toBe("danger");
    expect(within(dialog).getByText("connect ECONNREFUSED")).toBeTruthy();

    const results = await runAxe(dialog);
    expect(results.violations.map((v) => v.id)).toEqual([]);

    await act(async () => {
      fireEvent.keyDown(dialog, { key: "Escape" });
    });
    expect(onClose).toHaveBeenCalled();
  });
});

describe("RequestLoggerDetail overlay", () => {
  it("names its icon-only controls, tones the HTTP status and passes axe", async () => {
    const onClose = vi.fn();
    const log = {
      id: "r1",
      status: 503,
      method: "POST",
      path: "/v1/chat/completions",
      model: "gpt-test",
      provider: "openai",
      timestamp: "2026-10-21T00:00:00.000Z",
      duration: 40,
      tokens: { in: 1, out: 2 },
    };
    wrap(
      <RequestLoggerDetail
        log={log}
        detail={{ ...log }}
        loading={false}
        debugEnabled={false}
        onClose={onClose}
        onCopy={async () => true}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    const dialog = screen.getByRole("dialog", { name: detail.ariaLabel });
    expect(within(dialog).getByText("503").closest(".ci-badge")?.getAttribute("data-tone")).toBe(
      "danger"
    );
    for (const name of [detail.previousRequest, detail.nextRequest, detail.close]) {
      expect(within(dialog).getByRole("button", { name }).className).toContain("ci-button");
    }

    const results = await runAxe(dialog);
    expect(
      results.violations.filter((v) => v.impact === "serious" || v.impact === "critical")
    ).toEqual([]);

    fireEvent.click(within(dialog).getByRole("button", { name: detail.close }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
