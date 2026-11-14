// @vitest-environment node
import { EventEmitter } from "node:events";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  spawn: vi.fn(),
  request: vi.fn(),
  dispatcher: vi.fn(),
  probeSocks: vi.fn(),
}));
vi.mock("node:child_process", () => ({ spawn: mocks.spawn }));
vi.mock("undici", () => ({ request: mocks.request }));
vi.mock("@omniroute/open-sse/utils/socksConnectorWithFamily", () => ({
  createSocksDispatcherWithFamily: mocks.dispatcher,
}));
vi.mock("../../src/lib/services/managedProxy/runtime", () => ({
  coreEnvironment: () => ({ LANG: "en_US.UTF-8" }),
  probeSocks: mocks.probeSocks,
}));
import {
  probeTemporaryCore,
  startTemporaryCore,
} from "../../src/lib/services/managedProxy/testRuntime";
let close: ReturnType<typeof vi.fn>;
let destroy: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks();
  close = vi.fn(async () => {});
  destroy = vi.fn();
  mocks.dispatcher.mockReturnValue({ close });
  mocks.probeSocks.mockResolvedValue(true);
});
afterEach(() => vi.useRealTimers());
function response(content: string, statusCode = 200) {
  return {
    statusCode,
    body: {
      destroy,
      async *[Symbol.asyncIterator]() {
        yield Buffer.from(content);
      },
    },
  };
}
test("probe uses only the fixed HTTPS target through the temporary SOCKS dispatcher", async () => {
  mocks.request.mockResolvedValue(response('{"ip":"203.0.113.5"}'));
  const signal = new AbortController().signal;
  expect(await probeTemporaryCore(23456, signal)).toMatchObject({
    success: true,
    publicIp: "203.0.113.5",
  });
  expect(mocks.dispatcher).toHaveBeenCalledWith({ type: 5, host: "127.0.0.1", port: 23456 }, 4, {
    connections: 1,
    connectTimeout: 10000,
    pipelining: 0,
    connect: { rejectUnauthorized: true, timeout: 10000 },
  });
  expect(mocks.request).toHaveBeenCalledWith("https://api.ipify.org?format=json", {
    dispatcher: { close },
    signal,
    headersTimeout: 10000,
    bodyTimeout: 10000,
  });
  expect(destroy).toHaveBeenCalledTimes(1);
  expect(close).toHaveBeenCalledTimes(1);
});
test.each([
  ["redirect", "", 302],
  ["invalid IP", '{"ip":"not-an-ip"}', 200],
  ["oversize", "x".repeat(4097), 200],
])("probe rejects %s responses and releases the dispatcher", async (_label, body, status) => {
  mocks.request.mockResolvedValue(response(String(body), Number(status)));
  await expect(probeTemporaryCore(23456, new AbortController().signal)).rejects.toThrow();
  expect(destroy).toHaveBeenCalledTimes(1);
  expect(close).toHaveBeenCalledTimes(1);
});
test("temporary core has isolated environment and cleanup terminates only its child", async () => {
  const child = Object.assign(new EventEmitter(), {
    pid: 1234,
    kill: vi.fn(() => {
      child.emit("close", 0);
      return true;
    }),
  });
  mocks.spawn.mockReturnValue(child);
  const stop = await startTemporaryCore(
    "xray",
    "/private/core",
    "/private/probe/config.json",
    23456,
    new AbortController().signal
  );
  expect(mocks.spawn).toHaveBeenCalledWith(
    "/private/core",
    ["run", "-c", "/private/probe/config.json"],
    {
      cwd: "/private/probe",
      env: { LANG: "en_US.UTF-8" },
      stdio: "ignore",
      windowsHide: true,
    }
  );
  await stop();
  expect(child.kill).toHaveBeenCalledTimes(1);
});
test("an already aborted test never spawns a process", async () => {
  await expect(
    startTemporaryCore("xray", "/private/core", "/private/config.json", 23456, AbortSignal.abort())
  ).rejects.toThrow();
  expect(mocks.spawn).not.toHaveBeenCalled();
});
test("a failed TERM signal is not mistaken for process exit", async () => {
  const child = Object.assign(new EventEmitter(), {
    pid: 1234,
    kill: vi.fn((signal?: string) => {
      if (signal === "SIGKILL") child.emit("close", 0);
      else child.emit("error", new Error("synthetic kill failure"));
      return signal === "SIGKILL";
    }),
  });
  mocks.spawn.mockReturnValue(child);
  const stop = await startTemporaryCore(
    "xray",
    "/private/core",
    "/private/config.json",
    23456,
    new AbortController().signal
  );
  await stop();
  expect(child.kill.mock.calls).toEqual([[], ["SIGKILL"]]);
});
