// @vitest-environment jsdom
//
// The console paints on the kit's log tokens. Their tints are translucent and do not stack (see
// --ci-log-* in ci-tokens.css): an error or fatal row carries the tint and its badge stays clear,
// every other level tints only its badge.
import fs from "node:fs";
import path from "node:path";
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

const LEVELS = ["debug", "trace", "info", "warn", "error", "fatal"];
const roots: Root[] = [];

async function renderViewer() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);
  const { default: ConsoleLogViewer } =
    await import("../../../src/shared/components/ConsoleLogViewer");

  await act(async () => {
    root.render(<ConsoleLogViewer />);
    await Promise.resolve();
  });
  await act(async () => {
    vi.advanceTimersByTime(0);
    await Promise.resolve();
  });
  return container;
}

function badgeOf(container: HTMLElement, level: string) {
  const badge = Array.from(container.querySelectorAll("span")).find(
    (span) => span.textContent?.trim() === level
  );
  expect(badge, `${level} badge`).toBeDefined();
  return badge as HTMLElement;
}

const rowOf = (badge: HTMLElement) => badge.parentElement as HTMLElement;

describe("ConsoleLogViewer level inks and tints", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        LEVELS.map((level) => ({
          timestamp: "2026-08-26T00:00:00.000Z",
          level,
          message: `${level} line`,
        })),
    });
  });

  afterEach(() => {
    for (const root of roots.splice(0)) act(() => root.unmount());
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("gives every level its own ink token", async () => {
    const container = await renderViewer();

    for (const level of LEVELS) {
      expect(badgeOf(container, level).className).toContain(`text-[var(--ci-log-${level})]`);
    }
  });

  it("tints the error and fatal rows once, leaving their badges clear", async () => {
    const container = await renderViewer();

    for (const level of ["error", "fatal"]) {
      const badge = badgeOf(container, level);
      expect(rowOf(badge).className).toContain(`bg-[var(--ci-log-${level}-subtle)]`);
      expect(badge.className).not.toContain("-subtle");
    }
  });

  it("tints only the badge on every other level", async () => {
    const container = await renderViewer();

    for (const level of ["debug", "trace", "info", "warn"]) {
      const badge = badgeOf(container, level);
      expect(badge.className).toContain(`bg-[var(--ci-log-${level}-subtle)]`);
      expect(rowOf(badge).className).not.toContain("-subtle");
    }
  });

  it("paints the panel on the inverse surface", async () => {
    const container = await renderViewer();

    expect(container.querySelector('[role="log"]')?.className).toContain(
      "bg-[var(--ci-color-surface-inverse)]"
    );
  });

  it("carries no hex colour of its own", () => {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), "src/shared/components/ConsoleLogViewer.tsx"),
      "utf8"
    );

    expect(source.match(/#[0-9a-f]{3,8}\b/gi)).toBeNull();
  });
});
