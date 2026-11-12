// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import GrokBotAgentPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/GrokBotAgentPanel";
import messages from "@/i18n/messages/en.json";

const binding = { agentId: "bot-1", rowId: "row-1", name: "Existing", description: "Profile" };
function mount() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <GrokBotAgentPanel connectionId="account-1" />
    </NextIntlClientProvider>
  );
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function requests() {
  const mutations: Array<{
    url: string;
    body: Record<string, unknown> | undefined;
    method: string;
  }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method)
        mutations.push({
          url,
          method: init.method,
          body: init.body ? JSON.parse(String(init.body)) : undefined,
        });
      return new Response(JSON.stringify(binding), { status: 200 });
    })
  );
  return mutations;
}
it("loads the binding and preserves profile, memory and skill request payloads", async () => {
  const mutations = requests();
  mount();
  await screen.findByDisplayValue("Existing");
  expect(screen.getByText("Agent: bot-1")).toBeTruthy();
  fireEvent.change(screen.getByRole("textbox", { name: "Memory" }), {
    target: { value: "Keep context" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save memory" }));
  await waitFor(() =>
    expect(mutations[0]?.body).toEqual({ action: "put-memory", profile: "Keep context" })
  );
  fireEvent.change(screen.getByRole("textbox", { name: "Skill name" }), {
    target: { value: "build" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Skill content" }), {
    target: { value: "Steps" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Change skill" }));
  await waitFor(() =>
    expect(mutations[1]?.body).toEqual({
      action: "update-skill",
      skill: { name: "build", content: "Steps" },
    })
  );
  fireEvent.change(screen.getByRole("textbox", { name: "Skill description" }), {
    target: { value: "Compile" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Change skill" }));
  await waitFor(() =>
    expect(mutations[2]?.body).toEqual({
      action: "update-skill",
      skill: { name: "build", description: "Compile", content: "Steps" },
    })
  );
});
it("keeps routine actions and unbind distinct from remote deletion", async () => {
  const mutations = requests();
  mount();
  await screen.findByDisplayValue("Existing");
  fireEvent.change(screen.getByRole("textbox", { name: "Routine ID" }), {
    target: { value: "routine-1" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Disable routine" }));
  await waitFor(() =>
    expect(mutations[0]?.body).toEqual({
      action: "set-routine",
      routine: { id: "routine-1", enabled: false },
    })
  );
  fireEvent.click(screen.getByRole("button", { name: "Unbind" }));
  await waitFor(() =>
    expect(mutations[1]).toEqual({
      method: "DELETE",
      url: "/api/providers/account-1/grok-bot-agent?mode=unbind",
      body: undefined,
    })
  );
  fireEvent.click(screen.getByRole("button", { name: "Delete remote" }));
  await waitFor(() =>
    expect(mutations[2]?.url).toBe("/api/providers/account-1/grok-bot-agent?mode=delete")
  );
});
it("aborts the loading request on unmount and does not enable unloaded mutations", () => {
  let signal: AbortSignal | null | undefined;
  vi.stubGlobal(
    "fetch",
    vi.fn((_url: string, init?: RequestInit) => {
      signal = init?.signal;
      return new Promise<Response>(() => {});
    })
  );
  const view = mount();
  expect((screen.getByRole("button", { name: "Save memory" }) as HTMLButtonElement).disabled).toBe(
    true
  );
  view.unmount();
  expect(signal?.aborted).toBe(true);
});

function panel(connectionId: string) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <GrokBotAgentPanel connectionId={connectionId} />
    </NextIntlClientProvider>
  );
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
it("ignores an old load JSON completion after switching connections", async () => {
  const old = deferred<unknown>();
  const json = vi.fn(() => old.promise);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      url.includes("account-1")
        ? { ok: true, json }
        : Response.json({ agentId: "new-agent", rowId: "new-row", name: "New account" })
    )
  );
  const view = render(panel("account-1"));
  await waitFor(() => expect(json).toHaveBeenCalled());
  view.rerender(panel("account-2"));
  await screen.findByDisplayValue("New account");
  await act(async () => {
    old.resolve({ agentId: "old-agent", rowId: "old-row", name: "STALE" });
  });
  expect(screen.queryByDisplayValue("STALE")).toBeNull();
  expect(screen.getByText("Agent: new-agent")).toBeTruthy();
});
it.each(["transport", "json"])(
  "handles mutation %s failure without an unhandled rejection",
  async (failure) => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init?: RequestInit) => {
        if (!init?.method) return Response.json(binding);
        if (failure === "transport") throw new TypeError("offline");
        return {
          ok: true,
          json: async () => {
            throw new SyntaxError("invalid JSON");
          },
        };
      })
    );
    mount();
    await screen.findByDisplayValue("Existing");
    fireEvent.click(screen.getByRole("button", { name: "Save memory" }));
    expect(await screen.findByText("Request failed")).toBeTruthy();
    expect(screen.getByText("Agent: bot-1")).toBeTruthy();
  }
);
it("aborts a pending mutation and ignores its JSON after the connection changes", async () => {
  const pending = deferred<unknown>();
  const json = vi.fn(() => pending.promise);
  let mutationSignal: AbortSignal | null | undefined;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method) {
        mutationSignal = init.signal;
        return { ok: true, json };
      }
      return Response.json(
        url.includes("account-1")
          ? binding
          : { agentId: "new-agent", rowId: "new-row", name: "New account" }
      );
    })
  );
  const view = render(panel("account-1"));
  await screen.findByDisplayValue("Existing");
  fireEvent.click(screen.getByRole("button", { name: "Save memory" }));
  await waitFor(() => expect(json).toHaveBeenCalled());
  view.rerender(panel("account-2"));
  await screen.findByDisplayValue("New account");
  await act(async () => {
    pending.resolve({ agentId: "STALE", rowId: "old-row" });
  });
  expect(mutationSignal?.aborted).toBe(true);
  expect(screen.queryByText("Agent: STALE")).toBeNull();
  expect(screen.getByText("Agent: new-agent")).toBeTruthy();
});
it("clears profile fields and disables writes while the new connection is loading", async () => {
  const pending = deferred<Response>();
  const fetchMock = vi.fn(async (url: string) =>
    url.includes("account-1") ? Response.json(binding) : pending.promise
  );
  vi.stubGlobal("fetch", fetchMock);
  const view = render(panel("account-1"));
  await screen.findByDisplayValue("Existing");
  fireEvent.change(screen.getByRole("textbox", { name: "Memory" }), {
    target: { value: "Private old account" },
  });
  view.rerender(panel("account-2"));
  expect((screen.getByRole("textbox", { name: "Agent name" }) as HTMLInputElement).value).toBe("");
  expect((screen.getByRole("textbox", { name: "Memory" }) as HTMLInputElement).value).toBe("");
  expect((screen.getByRole("button", { name: "Create" }) as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Create" }));
  expect(fetchMock.mock.calls).toHaveLength(2);
});
it("does not let an older reload overwrite a newer mutation and refresh", async () => {
  const oldReload = deferred<unknown>();
  const json = vi.fn(() => oldReload.promise);
  let reads = 0;
  let writes = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method) {
        writes += 1;
        return Response.json({ ...binding, agentId: writes === 1 ? "first" : "latest" });
      }
      reads += 1;
      if (reads === 1) return Response.json(binding);
      if (reads === 2) return { ok: true, json };
      return Response.json({ ...binding, agentId: "latest", name: "Latest profile" });
    })
  );
  mount();
  await screen.findByDisplayValue("Existing");
  fireEvent.click(screen.getByRole("button", { name: "Save memory" }));
  await waitFor(() => expect(json).toHaveBeenCalled());
  fireEvent.click(screen.getByRole("button", { name: "Save memory" }));
  await screen.findByDisplayValue("Latest profile");
  await act(async () => {
    oldReload.resolve({ ...binding, agentId: "STALE", name: "STALE" });
  });
  expect(screen.queryByDisplayValue("STALE")).toBeNull();
  expect(screen.getByText("Agent: latest")).toBeTruthy();
});
