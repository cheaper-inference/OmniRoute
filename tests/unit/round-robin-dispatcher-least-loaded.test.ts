import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { Agent, fetch as undiciFetch, type Dispatcher } from "undici";
import {
  __createRoundRobinDispatcherForTest,
  clearDispatcherCache,
} from "../../open-sse/utils/proxyDispatcher.ts";

afterEach(() => clearDispatcherCache());

// The direct dispatcher fans out over one-connection agents. A request that lands on the agent
// holding a long stream waits for that stream, although other agents are idle. The dispatcher
// must pick the agent with the least load.
type AgentStats = Record<string, { running: number; pending: number }>;

function stubAgent(stats: AgentStats | (() => AgentStats), log: number[], id: number): Dispatcher {
  return {
    get stats() {
      return typeof stats === "function" ? stats() : stats;
    },
    dispatch: () => {
      log.push(id);
      return true;
    },
    close: async () => {},
    destroy: async () => {},
  } as unknown as Dispatcher;
}

const busy = (running: number, pending = 0): AgentStats => ({
  "http://upstream.test": { running, pending },
});
const dispatchOnce = (dispatcher: Dispatcher) =>
  dispatcher.dispatch({ origin: "http://upstream.test", path: "/", method: "POST" }, {} as never);

describe("round-robin direct dispatcher picks the least loaded agent", () => {
  it("skips an agent that holds a running stream", () => {
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent(busy(1), log, 0),
      stubAgent({}, log, 1),
      stubAgent({}, log, 2),
    ]);
    dispatchOnce(dispatcher);
    assert.deepEqual(log, [1]);
  });

  it("counts queued requests as load", () => {
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent(busy(1, 2), log, 0),
      stubAgent(busy(1, 0), log, 1),
    ]);
    dispatchOnce(dispatcher);
    assert.deepEqual(log, [1]);
  });

  it("only counts the load an agent holds for the requested origin", () => {
    // Each agent keeps one client per origin: streams to other origins do not queue this request,
    // so the agent that holds a stream to the requested origin loses to one busy elsewhere.
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent(busy(1), log, 0),
      stubAgent(
        {
          "http://other-a.test": { running: 1, pending: 0 },
          "http://other-b.test": { running: 1, pending: 0 },
        },
        log,
        1
      ),
    ]);
    dispatchOnce(dispatcher);
    assert.deepEqual(log, [1]);
  });

  it("matches a URL origin against the origin keys of the agent stats", () => {
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent(busy(1), log, 0),
      stubAgent({}, log, 1),
    ]);
    dispatcher.dispatch(
      { origin: new URL("http://upstream.test/"), path: "/", method: "POST" },
      {} as never
    );
    assert.deepEqual(log, [1]);
  });

  it("rotates among equally loaded agents, starting after the previous pick", () => {
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent({}, log, 0),
      stubAgent({}, log, 1),
      stubAgent({}, log, 2),
    ]);
    for (let i = 0; i < 6; i++) dispatchOnce(dispatcher);
    assert.deepEqual(log, [0, 1, 2, 0, 1, 2]);
  });

  it("keeps working for an agent without a stats getter", () => {
    const log: number[] = [];
    const bare = (id: number) =>
      ({
        dispatch: () => {
          log.push(id);
          return true;
        },
        close: async () => {},
        destroy: async () => {},
      }) as unknown as Dispatcher;
    const dispatcher = __createRoundRobinDispatcherForTest([bare(0), bare(1)]);
    for (let i = 0; i < 4; i++) dispatchOnce(dispatcher);
    assert.deepEqual(log, [0, 1, 0, 1]);
  });

  it("falls back to the first agent when every agent is equally busy", () => {
    const log: number[] = [];
    const dispatcher = __createRoundRobinDispatcherForTest([
      stubAgent(busy(1), log, 0),
      stubAgent(busy(1), log, 1),
    ]);
    dispatchOnce(dispatcher);
    dispatchOnce(dispatcher);
    assert.deepEqual(log, [0, 1]);
  });
});

// Failure guard for one quick loopback request, generous so a loaded machine cannot trip it. A
// request queued behind the long stream never finishes before the stream ends, however long the
// guard is: an event-loop turn count is no deadline, since socket events can land after it.
const QUICK_REQUEST_GUARD_MS = 5_000;

function stuckAfter(ms: number): { promise: Promise<"stuck">; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const promise = new Promise<"stuck">((resolve) => {
    timer = setTimeout(() => resolve("stuck"), ms);
  });
  return { promise, cancel: () => clearTimeout(timer) };
}

describe("round-robin direct dispatcher with real agents", () => {
  it("serves a quick request while another agent holds a long stream", async () => {
    let releaseLong: () => void = () => {};
    const longReleased = new Promise<void>((resolve) => (releaseLong = resolve));
    let longStarted: () => void = () => {};
    const longHasStarted = new Promise<void>((resolve) => (longStarted = resolve));
    const server = http.createServer((req, res) => {
      if (req.url === "/long") {
        res.writeHead(200, { "content-type": "text/event-stream" });
        res.write("data: hi\n\n");
        longStarted();
        void longReleased.then(() => res.end("data: bye\n\n"));
      } else {
        res.writeHead(200).end("ok");
      }
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const agents = Array.from({ length: 3 }, () => new Agent({ connections: 1, pipelining: 0 }));
    const dispatcher = __createRoundRobinDispatcherForTest(agents);
    try {
      const long = undiciFetch(`${base}/long`, { dispatcher }).then((r) => r.text());
      await longHasStarted;
      // 2 agents are idle. Four quick requests, one after another, must all finish while the
      // long stream is still open: a blind rotation sends the fourth to the busy agent.
      // A blind rotation leaves the fourth request queued until the long stream ends. The race
      // below lets the long stream end only after the quick request has waited past the guard,
      // so the test fails by assertion instead of hanging.
      const quick = async (): Promise<"quick" | "after-long"> => {
        const res = await undiciFetch(`${base}/quick`, { dispatcher });
        await res.text();
        return longEnded ? "after-long" : "quick";
      };
      let longEnded = false;
      const results: string[] = [];
      for (let i = 0; i < 4; i++) {
        const pending = quick();
        const guard = stuckAfter(QUICK_REQUEST_GUARD_MS);
        const settled = await Promise.race([pending, guard.promise]);
        guard.cancel();
        if (settled === "stuck") {
          longEnded = true;
          releaseLong();
          results.push(await pending);
        } else {
          results.push(settled);
        }
      }
      assert.deepEqual(results, ["quick", "quick", "quick", "quick"]);
      releaseLong();
      assert.equal(await long, "data: hi\n\ndata: bye\n\n");
    } finally {
      releaseLong();
      await Promise.all(agents.map((agent) => agent.close()));
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
