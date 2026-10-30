import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import GrokBotAgentPanel from "../GrokBotAgentPanel";

describe("Grok Bot durable agent panel", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("shows the saved agent and posts recreate", async () => {
    let current = { agentId: "agent-1", rowId: "row-1" };
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      if (!init?.method || init.method === "GET") return { ok: true, json: async () => current };
      expect(url).toBe("/api/providers/conn-1/grok-bot-agent");
      expect(init.method).toBe("POST");
      expect(JSON.parse(String(init.body))).toMatchObject({ action: "recreate", profile: {} });
      current = { agentId: "agent-2", rowId: "row-2" };
      return { ok: true, json: async () => current };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    expect(container.textContent).toContain("agent-1");
    const recreate = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Recreate")
    );
    await act(async () => {
      recreate?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.textContent).toContain("agent-2");
  });

  it("posts the loaded profile when recreate is clicked after load", async () => {
    let releaseGet: (value: Response) => void = () => {};
    const getGate = new Promise<Response>((resolve) => {
      releaseGet = resolve;
    });
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (!init?.method || init.method === "GET") return getGate;
      return {
        ok: true,
        json: async () => ({
          agentId: "agent-2",
          rowId: "row-2",
          name: "Research",
          description: "Collect sources only.",
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    const recreate = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Recreate")
    ) as HTMLButtonElement;
    expect(recreate.disabled).toBe(true);
    await act(async () => {
      releaseGet({
        ok: true,
        json: async () => ({
          agentId: "agent-1",
          rowId: "row-1",
          name: "Research",
          description: "Collect sources only.",
        }),
      } as Response);
    });
    const name = container.querySelector('input[name="agentName"]') as HTMLInputElement;
    const description = container.querySelector('input[name="agentDescription"]') as HTMLInputElement;
    expect(name.value).toBe("Research");
    expect(description.value).toBe("Collect sources only.");
    await act(async () => {
      recreate.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "recreate",
      profile: { name: "Research", description: "Collect sources only." },
    });
  });

  it("shows a skill returned by the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return {
        ok: true,
        json: async () => ({
          agentId: "agent-1",
          rowId: "row-1",
          skills: [{ name: "Research", content: "steps" }],
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    expect(container.textContent).toContain("Research");
  });

  it("shows memory returned by the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return {
        ok: true,
        json: async () => ({
          agentId: "agent-1",
          rowId: "row-1",
          memory: [{ profile: "Remember the lab notes." }],
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    expect(container.textContent).toContain("Remember the lab notes.");
  });

  it("shows a routine returned by the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return {
        ok: true,
        json: async () => ({
          agentId: "agent-1",
          rowId: "row-1",
          routines: [{ id: "routine-1", recordJson: "{\"name\":\"Morning\"}" }],
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    expect(container.textContent).toContain("routine-1");
  });

  it("posts memory text to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      if (!init?.method || init.method === "GET") {
        return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
      }
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    const memory = container.querySelector('input[name="memoryText"]') as HTMLInputElement;
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(memory, "Remember the lab notes.");
      memory.dispatchEvent(new Event("input", { bubbles: true }));
      memory.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const save = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Save memory")
    );
    await act(async () => {
      save?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "put-memory",
      profile: "Remember the lab notes.",
    });
  });

  it("posts a new skill to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    async function fill(name: string, value: string) {
      const input = container?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(input, value);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await act(async () => {
      await fill("skillName", "Research");
      await fill("skillDescription", "Look up");
      await fill("skillContent", "steps");
    });
    const add = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Add skill")
    );
    await act(async () => {
      add?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "add-skill",
      skill: { name: "Research", description: "Look up", content: "steps" },
    });
  });

  it("posts a routine switch to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    const routine = container.querySelector('input[name="routineId"]') as HTMLInputElement;
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(routine, "routine-1");
      routine.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const toggle = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Disable routine")
    );
    await act(async () => {
      toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "set-routine",
      routine: { id: "routine-1", enabled: false },
    });
  });

  it("posts a skill change to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    async function fill(name: string, value: string) {
      const input = container?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(input, value);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await act(async () => {
      await fill("skillName", "Research");
      await fill("skillContent", "revised steps");
    });
    const change = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Change skill")
    );
    await act(async () => {
      change?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "update-skill",
      skill: { name: "Research", content: "revised steps" },
    });
  });

  it("posts a skill removal to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    const name = container.querySelector('input[name="skillName"]') as HTMLInputElement;
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(name, "Research");
      name.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const remove = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Remove skill")
    );
    await act(async () => {
      remove?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "remove-skill",
      skill: { name: "Research" },
    });
  });

  it("posts a routine removal to the saved agent", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.signal?.aborted) return { ok: false, json: async () => ({ error: "aborted" }) };
      return { ok: true, json: async () => ({ agentId: "agent-1", rowId: "row-1" }) };
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<GrokBotAgentPanel connectionId="conn-1" />);
    });
    const routine = container.querySelector('input[name="routineId"]') as HTMLInputElement;
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(routine, "routine-1");
      routine.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const remove = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Remove routine")
    );
    await act(async () => {
      remove?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const post = fetchMock.mock.calls.find((call) => call[1]?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      action: "remove-routine",
      routine: { id: "routine-1" },
    });
  });
});
