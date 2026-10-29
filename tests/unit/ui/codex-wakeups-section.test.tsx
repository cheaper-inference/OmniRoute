// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CodexWakeupsSection from "../../../src/app/(dashboard)/dashboard/settings/components/CodexWakeupsSection";

const TASK = {
  id: "task-1",
  name: "Morning warm-up",
  connectionIds: ["codex-1"],
  schedule: { kind: "interval", minutes: 90 },
  enabled: true,
  nextRunAt: "2026-03-10T10:30:00.000Z",
};

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function render() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<CodexWakeupsSection accounts={[{ id: "codex-1", label: "work@example.com" }]} />);
  });
  roots.push({ root, el });
}

function button(label: string) {
  return [...document.querySelectorAll("button")].find((b) =>
    (b.textContent || "").includes(label)
  ) as HTMLButtonElement | undefined;
}

function mockApi(postStatus = 202) {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    if (init?.method === "POST") {
      return { ok: postStatus < 400, status: postStatus, json: async () => ({}) };
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({
        tasks: [TASK],
        runs: [{ id: "run-1", taskId: "task-1", status: "partial", startedAt: TASK.nextRunAt }],
      }),
    };
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Codex scheduled wakeups section", () => {
  it("lists tasks with their schedule and last run status", async () => {
    mockApi();
    await render();
    expect(document.body.textContent).toContain("Scheduled wakeups");
    expect(document.body.textContent).toContain("Morning warm-up");
    expect(document.body.textContent).toContain("Every 90 min");
    expect(document.body.textContent).toContain("Last run: partially succeeded");
  });

  it("starts a manual run through the wakeups API", async () => {
    const fetchMock = mockApi();
    await render();
    await act(async () => {
      button("Run now")?.click();
    });
    const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(post?.[0]).toBe("/api/settings/codex-wakeups");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({ action: "run", id: "task-1" });
    expect(document.querySelector('[role="status"]')?.textContent).toBe("Run started.");
  });

  it("keeps Add disabled until a name and an account are chosen", async () => {
    mockApi();
    await render();
    expect(button("Add wakeup")?.disabled).toBe(true);
  });

  it("shows a localized error when the API rejects an action", async () => {
    mockApi(409);
    await render();
    await act(async () => {
      button("Delete")?.click();
    });
    // Errors are announced assertively (role="alert"); success notices stay role="status".
    expect(document.querySelector('[role="alert"]')?.textContent).toBe(
      "The action failed. Try again in a moment."
    );
  });
});
