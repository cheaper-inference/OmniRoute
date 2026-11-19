// @vitest-environment jsdom
/**
 * #18077 — lote 9 review nits:
 *  - N4: BreakerTimeline labelled its window group with a static id, so two timelines on one
 *    page shared `id="breaker-timeline-window"`.
 *  - N5: TrafficInspectorPageClient passed `subtitle && …` as the PageHeader description, which
 *    hands PageHeader an empty string (an empty <p>) when there is no subtitle.
 *  - N6: the changelog release date was a <span>; NewsViewer already uses <time dateTime>.
 */
import fs from "node:fs";
import path from "node:path";
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const DASHBOARD = path.resolve(__dirname, "../../../src/app/(dashboard)/dashboard");

let BreakerTimeline: typeof import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/BreakerTimeline").default;
let ChangelogViewer: typeof import("../../../src/app/(dashboard)/dashboard/changelog/components/ChangelogViewer").default;

beforeAll(async () => {
  ({ default: BreakerTimeline } =
    await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/BreakerTimeline"));
  ({ default: ChangelogViewer } =
    await import("../../../src/app/(dashboard)/dashboard/changelog/components/ChangelogViewer"));
}, 180_000);

let root: Root;
let container: HTMLDivElement;

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

describe("BreakerTimeline window group (N4)", () => {
  it("gives every timeline its own label id", () => {
    act(() =>
      root.render(
        <>
          <BreakerTimeline breakers={[]} onWindowChange={() => {}} />
          <BreakerTimeline breakers={[]} onWindowChange={() => {}} />
        </>
      )
    );
    const groups = [...container.querySelectorAll<HTMLElement>("[role='group']")];
    expect(groups).toHaveLength(2);
    const ids = groups.map((g) => g.getAttribute("aria-labelledby"));
    expect(ids[0]).toBeTruthy();
    expect(ids[0]).not.toBe(ids[1]);
    for (const id of ids) {
      // Each group still points at a label element that exists.
      expect(document.getElementById(id as string)?.textContent).toBeTruthy();
    }
  });
});

describe("TrafficInspectorPageClient header (N5)", () => {
  it("passes no description when the subtitle is empty", () => {
    const src = fs.readFileSync(
      path.join(DASHBOARD, "tools/traffic-inspector/TrafficInspectorPageClient.tsx"),
      "utf8"
    );
    expect(src).not.toMatch(/description=\{subtitle &&/);
    expect(src).toMatch(/description=\{subtitle \? <span>\{subtitle\}<\/span> : undefined\}/);
  });
});

describe("ChangelogViewer release date (N6)", () => {
  it("marks an ISO release date up as <time dateTime>", async () => {
    const changelog = [
      "# Changelog",
      "",
      "## [3.8.54] — 2026-11-09",
      "",
      "- A change",
      "",
      "## [Unreleased]",
      "",
      "- Pending",
    ].join("\n");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(changelog, { status: 200 }))
    );
    await act(async () => {
      root.render(<ChangelogViewer />);
    });
    await vi.waitFor(() => expect(container.querySelector("h2")).not.toBeNull());
    const time = container.querySelector("time");
    expect(time?.getAttribute("dateTime") ?? time?.getAttribute("datetime")).toBe("2026-11-09");
    expect(time?.textContent).toBe("2026-11-09");
    // A heading without a date renders no <time>.
    expect(container.querySelectorAll("time")).toHaveLength(1);
  });
});
