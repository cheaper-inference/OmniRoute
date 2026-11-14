// @vitest-environment jsdom
/**
 * Settings → Global Routing → Task-Aware Routing card. It edits the config behind
 * PUT /api/settings/task-routing, so each control must send exactly its own field
 * (complexityRouting as a whole block, which the schema replaces on update).
 */
import React from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskAwareRoutingCard from "@/app/(dashboard)/dashboard/settings/components/TaskAwareRoutingCard";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const OPUS = "claude/claude-opus-5-5";
const SONNET = "claude/claude-sonnet-5-5";
const DEFAULT_MAP = {
  coding: "auto/coding",
  creative: "",
  analysis: "auto/reasoning",
  vision: "auto/vision",
  summarization: "auto/chat:fast",
  background: "auto/chat:cheap",
  chat: "",
};

type Config = Record<string, unknown>;
let server: Config;
let puts: Config[];
let failPuts: boolean;

function stubFetch({ getStatus = 200 }: { getStatus?: number } = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit = {}) => {
      if (String(url).startsWith("/api/models")) {
        const models = [SONNET, OPUS].map((fullModel) => ({ fullModel }));
        return new Response(JSON.stringify({ models }), { status: 200 });
      }
      if (init.method === "PUT") {
        const update = JSON.parse(String(init.body)) as Config;
        puts.push(update);
        if (failPuts) return new Response(JSON.stringify({ error: "invalid" }), { status: 400 });
        server = { ...server, ...update };
        return new Response(JSON.stringify({ success: true, ...server }), { status: 200 });
      }
      if (getStatus !== 200) return new Response("{}", { status: getStatus });
      return new Response(JSON.stringify({ ...server, defaultTaskModelMap: DEFAULT_MAP }), {
        status: 200,
      });
    })
  );
}

// The model pickers are the kit (Radix) Select; jsdom lacks these and Radix calls them on open.
beforeAll(() => {
  const proto = window.HTMLElement.prototype as unknown as Record<string, unknown>;
  proto.hasPointerCapture ??= () => false;
  proto.releasePointerCapture ??= () => {};
  proto.scrollIntoView ??= () => {};
});

async function pick(picker: string, option: string) {
  const trigger = await screen.findByRole("combobox", { name: picker });
  await waitFor(() => expect(trigger.hasAttribute("disabled")).toBe(false));
  fireEvent.keyDown(trigger, { key: "Enter" });
  fireEvent.click(await screen.findByRole("option", { name: option }));
}

describe("TaskAwareRoutingCard", () => {
  beforeEach(() => {
    server = {
      enabled: false,
      detectionEnabled: true,
      detectionAnchor: "latest-user",
      taskModelMap: { ...DEFAULT_MAP },
      complexityRouting: { enabled: false, minScore: 6, model: "" },
      stats: { detected: 0, routed: 0 },
    };
    puts = [];
    failPuts = false;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows only the main switch while routing is off, and saves it", async () => {
    stubFetch();
    render(<TaskAwareRoutingCard />);

    const enable = await screen.findByRole("switch", { name: "taskRoutingEnable" });
    expect(screen.queryByRole("switch", { name: "taskRoutingAnchorTitle" })).toBeNull();

    fireEvent.click(enable);
    await waitFor(() => expect(puts).toEqual([{ enabled: true }]));
    expect(await screen.findByRole("switch", { name: "taskRoutingAnchorTitle" })).toBeTruthy();
  });

  it("saves the conversation anchor, and one task type without touching the others", async () => {
    server.enabled = true;
    stubFetch();
    render(<TaskAwareRoutingCard />);

    fireEvent.click(await screen.findByRole("switch", { name: "taskRoutingAnchorTitle" }));
    await waitFor(() => expect(puts).toEqual([{ detectionAnchor: "first-user" }]));

    await pick("taskRoutingTaskCoding", SONNET);
    await waitFor(() =>
      expect(puts.at(-1)).toEqual({ taskModelMap: { ...DEFAULT_MAP, coding: SONNET } })
    );
  });

  it("keeps escalation off until a stronger model is chosen", async () => {
    server.enabled = true;
    stubFetch();
    render(<TaskAwareRoutingCard />);

    const escalate = await screen.findByRole("switch", { name: "taskRoutingComplexityTitle" });
    expect(escalate.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("taskRoutingComplexityModelRequired")).toBeTruthy();

    await pick("taskRoutingComplexityModel", OPUS);
    await waitFor(() =>
      expect(puts.at(-1)).toEqual({
        complexityRouting: { enabled: false, minScore: 6, model: OPUS },
      })
    );

    await waitFor(() => expect(escalate.hasAttribute("disabled")).toBe(false));
    fireEvent.click(escalate);
    await waitFor(() =>
      expect(puts.at(-1)).toEqual({
        complexityRouting: { enabled: true, minScore: 6, model: OPUS },
      })
    );
  });

  it("saves a typed threshold once, when the field loses focus", async () => {
    const escalation = { enabled: true, minScore: 6, model: OPUS };
    server = { ...server, enabled: true, complexityRouting: escalation };
    stubFetch();
    const user = userEvent.setup();
    render(<TaskAwareRoutingCard />);

    await user.click(await screen.findByLabelText("taskRoutingComplexityThreshold"));
    await user.keyboard("{Control>}a{/Control}12");
    expect(puts).toEqual([]);

    await user.tab();
    await waitFor(() =>
      expect(puts).toEqual([{ complexityRouting: { ...escalation, minScore: 12 } }])
    );
    expect(
      (screen.getByLabelText("taskRoutingComplexityThreshold") as HTMLInputElement).value
    ).toBe("12");
  });

  it("restores the default model map", async () => {
    server = { ...server, enabled: true, taskModelMap: { ...DEFAULT_MAP, coding: SONNET } };
    stubFetch();
    render(<TaskAwareRoutingCard />);

    fireEvent.click(await screen.findByRole("button", { name: "taskRoutingRestoreDefaults" }));
    await waitFor(() => expect(puts.at(-1)).toEqual({ taskModelMap: DEFAULT_MAP }));
  });

  it("reports a save the server rejected", async () => {
    failPuts = true;
    stubFetch();
    render(<TaskAwareRoutingCard />);

    fireEvent.click(await screen.findByRole("switch", { name: "taskRoutingEnable" }));
    expect((await screen.findByRole("alert")).textContent).toBe("taskRoutingSaveFailed");
  });

  it("says so when the settings cannot be loaded", async () => {
    stubFetch({ getStatus: 500 });
    render(<TaskAwareRoutingCard />);

    expect(await screen.findByText("taskRoutingLoadFailed")).toBeTruthy();
  });
});
