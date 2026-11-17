// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import GrokBotPage from "@/app/(dashboard)/dashboard/grok-bot/page";
import messages from "@/i18n/messages/en.json";

// Mount the real Card without dragging the whole dashboard barrel in.
vi.mock("@/shared/components", async () => ({
  Card: (await import("@/shared/components/Card")).default,
}));

type Stream = {
  body: ReadableStream<Uint8Array>;
  push: (frame: unknown) => void;
};

type TranscriptCall = { phase: string; after: string; signal?: AbortSignal };

function streamed(): Stream {
  let writer: (chunk: string) => void = () => {};
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      writer = (chunk) => controller.enqueue(encoder.encode(chunk));
    },
  });
  return {
    body,
    push: (frame) => writer(`data: ${JSON.stringify(frame)}\n\n`),
  };
}

// Frames as the service sends them: `entryKind` plus a base64 `body`, with the
// reply text inside `message`. Fixtures that put role/text on the entry agree
// with the reader instead of with the wire.
const wire = (entryKind: string, body: unknown, updatedSeq: string) => ({
  seq: updatedSeq,
  entryKind,
  entryId: `e${updatedSeq}`,
  updatedSeq,
  body: Buffer.from(JSON.stringify(body), "utf-8").toString("base64"),
});
const reply = (text: string) => ({ message: { type: "text", content: text } });
const ask = (status: string, requestId = "req-1") => ({
  message: {
    type: "local-tool-permission",
    ask: {
      requestId,
      action: "read-file",
      target: "/Users/houminxi/code",
      machineId: "m-1",
      status,
    },
  },
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Let the reader loop drain every microtask it already has, without waiting on wall time.
async function flush(): Promise<void> {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await new Promise<void>((resolve) => setImmediate(resolve));
}

function page() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <GrokBotPage />
    </NextIntlClientProvider>
  );
}

describe("Grok Bot page transcript wiring", () => {
  it("seals the snapshot into live and cancels the live request when the bot changes", async () => {
    const calls: TranscriptCall[] = [];
    const streams: Stream[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") {
        return Response.json({
          connections: [{ id: "conn-1", name: "Main", provider: "grok-bot" }],
        });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot/transcript")) {
        const query = new URL(url, "http://localhost").searchParams;
        calls.push({
          phase: query.get("phase") ?? "",
          after: query.get("after") ?? "",
          signal: init?.signal ?? undefined,
        });
        const stream = streamed();
        streams.push(stream);
        return new Response(stream.body, { status: 200 });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot")) {
        return Response.json({
          roster: [
            { agentId: "bot-a", name: "Alice" },
            { agentId: "bot-b", name: "Bob" },
          ],
          skills: [],
          routines: [],
          computers: [],
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    page();
    fireEvent.change(
      await screen.findByText("Main").then(() => screen.getAllByRole("combobox")[0]),
      { target: { value: "conn-1" } }
    );
    fireEvent.change(
      await screen.findByText("Alice").then(() => screen.getAllByRole("combobox")[1]),
      { target: { value: "bot-a" } }
    );

    await waitFor(() => expect(calls.length).toBe(1));
    expect(calls[0]).toMatchObject({ phase: "snapshot", after: "0" });

    streams[0].push({ rows: { entries: [{ updatedSeq: "9007199254740993" }] } });
    streams[0].push({ heartbeat: true });

    await waitFor(() => expect(calls.length).toBe(2));
    expect(calls[1]).toMatchObject({ phase: "live", after: "9007199254740993" });
    expect(calls[0].signal?.aborted).toBe(true);

    streams[1].push({
      rows: { entries: [wire("send-message", reply("reply from Alice"), "9007199254740994")] },
    });
    await screen.findByText("reply from Alice");

    fireEvent.change(screen.getAllByRole("combobox")[1], { target: { value: "bot-b" } });
    await waitFor(() => expect(calls.length).toBe(3));
    expect(calls[1].signal?.aborted).toBe(true);
    expect(calls[2]).toMatchObject({ phase: "snapshot", after: "0" });
    expect(calls[2].signal?.aborted).toBe(false);

    streams[1].push({
      rows: { entries: [wire("send-message", reply("late from Alice"), "9007199254740996")] },
    });
    await flush();
    expect(screen.queryByText("late from Alice")).toBeNull();
    expect(screen.queryByText("reply from Alice")).toBeNull();
  });
  it("keeps each conversation's messages when switching away and back", async () => {
    const calls: TranscriptCall[] = [];
    const streams: Stream[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") {
        return Response.json({
          connections: [{ id: "conn-1", name: "Main", provider: "grok-bot" }],
        });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot/transcript")) {
        const query = new URL(url, "http://localhost").searchParams;
        calls.push({
          phase: query.get("phase") ?? "",
          after: query.get("after") ?? "",
          signal: init?.signal ?? undefined,
        });
        const stream = streamed();
        streams.push(stream);
        return new Response(stream.body, { status: 200 });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot")) {
        return Response.json({
          roster: [
            { agentId: "bot-a", name: "Alice" },
            { agentId: "bot-b", name: "Bob" },
          ],
          skills: [],
          routines: [],
          computers: [],
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    page();
    fireEvent.change(
      await screen.findByText("Main").then(() => screen.getAllByRole("combobox")[0]),
      { target: { value: "conn-1" } }
    );
    fireEvent.change(
      await screen.findByText("Alice").then(() => screen.getAllByRole("combobox")[1]),
      { target: { value: "bot-a" } }
    );
    await waitFor(() => expect(calls.length).toBe(1));

    streams[0].push({ rows: { entries: [{ updatedSeq: "9007199254740993" }] } });
    streams[0].push({ heartbeat: true });
    await waitFor(() => expect(calls.length).toBe(2));

    streams[1].push({
      rows: { entries: [wire("send-message", reply("reply from Alice"), "9007199254740994")] },
    });
    await screen.findByText("reply from Alice");

    fireEvent.change(screen.getAllByRole("combobox")[1], { target: { value: "bot-b" } });
    await waitFor(() => expect(calls.length).toBe(3));
    await flush();
    expect(screen.queryByText("reply from Alice")).toBeNull();

    fireEvent.change(screen.getAllByRole("combobox")[1], { target: { value: "bot-a" } });
    await waitFor(() => expect(calls.length).toBe(4));
    expect(calls[3]).toMatchObject({ phase: "live", after: "9007199254740994" });
    expect(await screen.findByText("reply from Alice")).toBeTruthy();
  });

  it("answers a permission request and drops the card once the service takes it", async () => {
    const streams: Stream[] = [];
    const posts: Array<{ url: string; body: unknown }> = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") {
        return Response.json({
          connections: [{ id: "conn-1", name: "Main", provider: "grok-bot" }],
        });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot/transcript")) {
        const stream = streamed();
        streams.push(stream);
        return new Response(stream.body, { status: 200 });
      }
      if (url === "/api/providers/conn-1/grok-bot/permission") {
        posts.push({ url, body: JSON.parse(String(init?.body ?? "{}")) });
        return Response.json({ status: "dispatched" });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot")) {
        return Response.json({
          roster: [{ agentId: "bot-a", name: "Alice" }],
          skills: [],
          routines: [],
          computers: [],
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    page();
    fireEvent.change(
      await screen.findByText("Main").then(() => screen.getAllByRole("combobox")[0]),
      { target: { value: "conn-1" } }
    );
    fireEvent.change(
      await screen.findByText("Alice").then(() => screen.getAllByRole("combobox")[1]),
      { target: { value: "bot-a" } }
    );
    await waitFor(() => expect(streams.length).toBe(1));

    streams[0].push({ rows: { entries: [wire("send-message", ask("pending"), "10")] } });
    const allow = await screen.findByRole("button", { name: "Allow once" });
    expect(screen.getByText("read-file /Users/houminxi/code m-1")).toBeTruthy();

    fireEvent.click(allow);
    await waitFor(() => expect(posts.length).toBe(1));
    expect(posts[0].body).toMatchObject({
      agentId: "bot-a",
      entryId: "e10",
      requestId: "req-1",
      resolution: "allow_once",
    });
    await waitFor(() => expect(screen.queryByRole("button", { name: "Allow once" })).toBeNull());
  });

  it("drops a card the service has already consumed instead of offering it again", async () => {
    const streams: Stream[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/providers") {
        return Response.json({
          connections: [{ id: "conn-1", name: "Main", provider: "grok-bot" }],
        });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot/transcript")) {
        const stream = streamed();
        streams.push(stream);
        return new Response(stream.body, { status: 200 });
      }
      if (url === "/api/providers/conn-1/grok-bot/permission") {
        return Response.json({ error: "gone" }, { status: 409 });
      }
      if (url.startsWith("/api/providers/conn-1/grok-bot")) {
        return Response.json({
          roster: [{ agentId: "bot-a", name: "Alice" }],
          skills: [],
          routines: [],
          computers: [],
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    page();
    fireEvent.change(
      await screen.findByText("Main").then(() => screen.getAllByRole("combobox")[0]),
      { target: { value: "conn-1" } }
    );
    fireEvent.change(
      await screen.findByText("Alice").then(() => screen.getAllByRole("combobox")[1]),
      { target: { value: "bot-a" } }
    );
    await waitFor(() => expect(streams.length).toBe(1));

    streams[0].push({ rows: { entries: [wire("send-message", ask("pending"), "11")] } });
    const deny = await screen.findByRole("button", { name: "Deny" });
    fireEvent.click(deny);
    await waitFor(() => expect(screen.queryByRole("button", { name: "Deny" })).toBeNull());
  });
});

describe("Grok Bot account selection", () => {
  it.each(["resolve", "reject"])("ignores a cancelled roster that later %ss", async (outcome) => {
    let resolveOld!: (response: Response) => void;
    let rejectOld!: (error: Error) => void;
    let oldSignal: AbortSignal | null | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url === "/api/providers")
          return Promise.resolve(
            Response.json({
              connections: [
                { id: "old", name: "Old account", provider: "grok-bot" },
                { id: "new", name: "New account", provider: "grok-bot" },
              ],
            })
          );
        if (url === "/api/providers/old/grok-bot") {
          oldSignal = init?.signal;
          return new Promise<Response>((resolve, reject) => {
            resolveOld = resolve;
            rejectOld = reject;
          });
        }
        if (url === "/api/providers/new/grok-bot")
          return Promise.resolve(
            Response.json({
              roster: [{ agentId: "new-bot", name: "New bot" }],
              connectionUpdatedAt: "new-version",
            })
          );
        throw new Error(`unexpected fetch: ${url}`);
      })
    );
    page();
    await screen.findByText("Old account");
    const [account, bot] = screen.getAllByRole("combobox") as HTMLSelectElement[];
    fireEvent.change(account, { target: { value: "old" } });
    expect(bot.disabled).toBe(true);
    fireEvent.change(account, { target: { value: "new" } });
    await screen.findByText("New bot");
    expect(oldSignal?.aborted).toBe(true);
    expect(bot.disabled).toBe(false);
    await act(async () => {
      if (outcome === "resolve")
        resolveOld(Response.json({ roster: [{ agentId: "old-bot", name: "Old bot" }] }));
      else rejectOld(new Error("late transport failure"));
      await flush();
    });
    expect(screen.queryByText("Old bot")).toBeNull();
    expect(screen.queryByText("New bot")).not.toBeNull();
    expect(bot.disabled).toBe(false);
  });

  it.each(["repeat", "interrupt"])("handles an account selection %s", async (action) => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url === "/api/providers")
          return Promise.resolve(
            Response.json({
              connections: [
                { id: "ready", name: "Ready account", provider: "grok-bot" },
                { id: "pending", name: "Pending account", provider: "grok-bot" },
              ],
            })
          );
        if (url === "/api/providers/ready/grok-bot")
          return Promise.resolve(
            Response.json({
              roster: [{ agentId: "ready-bot", name: "Ready bot" }],
            })
          );
        if (url === "/api/providers/pending/grok-bot") return new Promise<Response>(() => {});
        throw new Error(`unexpected fetch: ${url}`);
      })
    );
    page();
    await screen.findByText("Ready account");
    const [account, bot] = screen.getAllByRole("combobox") as HTMLSelectElement[];
    fireEvent.change(account, { target: { value: "ready" } });
    await screen.findByText("Ready bot");
    if (action === "repeat") {
      fireEvent.change(account, { target: { value: "ready" } });
      expect(screen.queryByText("Ready bot")).not.toBeNull();
      expect(bot.disabled).toBe(false);
      return;
    }
    fireEvent.change(account, { target: { value: "pending" } });
    expect(bot.disabled).toBe(true);
    fireEvent.change(account, { target: { value: "" } });
    expect(bot.disabled).toBe(true);
    expect(bot.options[0].text).toBe(messages.grokBotPage.rosterTitle);
    expect(screen.queryByText("Ready bot")).toBeNull();
  });
});

describe("Grok Bot marketplace navigation", () => {
  it("renders a credential-free external link in a separate tab", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input) !== "/api/providers") throw new Error(`unexpected fetch: ${input}`);
      return Response.json({ connections: [] });
    });
    vi.stubGlobal("fetch", fetchMock);
    page();
    await act(async () => {
      await flush();
    });
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    const link = screen.getByRole("link", { name: "x.ai/bot/marketplace" });
    expect(link.getAttribute("href")).toBe("https://x.ai/bot/marketplace");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")?.split(/\s+/)).toContain("noreferrer");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
