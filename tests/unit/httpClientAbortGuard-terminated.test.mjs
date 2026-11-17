import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { test } from "node:test";
import {
  isUpstreamNetworkError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

const transportCodes = ["ECONNRESET", "EPIPE", "UND_ERR_SOCKET", "UND_ERR_BODY_TIMEOUT"];

test("a terminated message does not override an already recognized top-level code", () => {
  const error = Object.assign(new TypeError("terminated"), { code: "UND_ERR_SOCKET" });
  assert.equal(isUpstreamNetworkError(error), true);
  assert.equal(shouldSwallowUncaught(error, "unhandledRejection"), true);
});

for (const code of transportCodes) {
  test(`terminated stream with ${code} is a recoverable network error`, () => {
    const error = new TypeError("terminated", {
      cause: Object.assign(new Error("synthetic transport failure"), { code }),
    });
    assert.equal(isUpstreamNetworkError(error), true);
    assert.equal(shouldSwallowUncaught(error, "uncaughtException"), true);
    assert.equal(shouldSwallowUncaught(error, "unhandledRejection"), true);
    assert.equal(shouldSwallowUncaught(error, "unknownOrigin"), false);
  });
}

test("terminated alone or an arbitrary cause must not suppress a genuine fault", () => {
  const reset = Object.assign(new Error("reset"), { code: "ECONNRESET" });
  const cycle = new TypeError("terminated");
  cycle.cause = cycle;
  for (const error of [
    new TypeError("terminated"),
    new TypeError("terminated", { cause: null }),
    new TypeError("terminated", { cause: "ECONNRESET" }),
    new TypeError("terminated", { cause: new Error("read ECONNRESET") }),
    new TypeError("terminated", { cause: { code: "ENOSPC" } }),
    new TypeError("terminated", { cause: { code: "UNKNOWN" } }),
    new TypeError("terminated", { cause: { code: "ERR_ASSERTION" } }),
    new TypeError("terminated", { cause: { cause: reset } }),
    new TypeError("terminated unexpectedly", { cause: reset }),
    new TypeError("programmer bug", { cause: reset }),
    new Error("terminated", { cause: reset }),
    cycle,
  ]) {
    assert.equal(isUpstreamNetworkError(error), false);
    assert.equal(shouldSwallowUncaught(error, "uncaughtException"), false);
    assert.equal(shouldSwallowUncaught(error, "unhandledRejection"), false);
  }
});

function runChild(script, mode) {
  const guardUrl = new URL("../../src/shared/utils/httpClientAbortGuard.mjs", import.meta.url).href;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "-e", script, guardUrl, mode], {
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 10000,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      stdout += data;
    });
    child.stderr.on("data", (data) => {
      stderr += data;
    });
    child.on("error", reject);
    child.on("close", (status, signal) => resolve({ status, signal, stdout, stderr }));
  });
}

for (const mode of ["throw", "reject"]) {
  test(`process survives a terminated/ECONNRESET ${mode} and logs the original error`, async () => {
    const result = await runChild(
      `
      const { installProcessCrashGuard } = await import(process.argv[1]);
      installProcessCrashGuard();
      const cause = Object.assign(new Error("read ECONNRESET"), { code: "ECONNRESET", http2ErrorCode: 2 });
      const error = new TypeError("terminated", { cause });
      console.log("GUARD_READY");
      if (process.argv[2] === "throw") setImmediate(() => { throw error; });
      else Promise.reject(error);
      setTimeout(() => console.log("ALIVE"), 60);
    `,
      mode
    );
    assert.match(result.stdout, /GUARD_READY/);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.signal, null);
    assert.match(result.stdout, /ALIVE/);
    assert.match(result.stderr, /swallowed benign/);
    assert.match(result.stderr, /TypeError: terminated/);
    assert.match(result.stderr, /ECONNRESET/);
  });

  test(`process survives a real fetch body socket failure via ${mode}`, async () => {
    const result = await runChild(
      `
      import assert from "node:assert/strict";
      import { createServer } from "node:http";
      import { once } from "node:events";
      const { installProcessCrashGuard } = await import(process.argv[1]);
      installProcessCrashGuard();
      let peer;
      const server = createServer((req, res) => {
        peer = res.socket;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("first chunk");
      });
      server.listen(0, "127.0.0.1");
      await once(server, "listening");
      const response = await fetch("http://127.0.0.1:" + server.address().port);
      const reader = response.body.getReader();
      assert.equal((await reader.read()).done, false);
      peer.destroy();
      server.close();
      let failure;
      try { await reader.read(); } catch (error) { failure = error; }
      assert.equal(failure?.name, "TypeError");
      assert.equal(failure.message, "terminated");
      assert.ok(["UND_ERR_SOCKET", "ECONNRESET"].includes(failure.cause?.code));
      console.log("BODY_FAILED");
      if (process.argv[2] === "throw") setImmediate(() => { throw failure; });
      else Promise.reject(failure);
      setTimeout(() => console.log("ALIVE"), 60);
    `,
      mode
    );
    assert.match(result.stdout, /BODY_FAILED/, result.stderr);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.signal, null);
    assert.match(result.stdout, /ALIVE/);
    assert.match(result.stderr, /swallowed benign/);
  });

  test(`a terminated wrapper around a non-network fault remains fatal via ${mode}`, async () => {
    const result = await runChild(
      `
      const { installProcessCrashGuard } = await import(process.argv[1]);
      installProcessCrashGuard();
      console.log("GUARD_READY");
      const error = new TypeError("terminated", { cause: Object.assign(new Error("disk full"), { code: "ENOSPC" }) });
      if (process.argv[2] === "throw") setImmediate(() => { throw error; });
      else Promise.reject(error);
      setTimeout(() => console.log("SHOULD_NOT_REACH"), 60);
    `,
      mode
    );
    assert.match(result.stdout, /GUARD_READY/);
    assert.notEqual(result.status, 0);
    assert.equal(result.signal, null);
    assert.doesNotMatch(result.stdout, /SHOULD_NOT_REACH/);
    assert.match(result.stderr, /ENOSPC/);
  });
}
