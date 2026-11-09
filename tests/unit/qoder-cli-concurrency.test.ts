import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const concurrency = await import("../../open-sse/services/qoderCliConcurrency.ts");
const qoderCli = await import("../../open-sse/services/qoderCli.ts");
const { QoderExecutor } = await import("../../open-sse/executors/qoder.ts");
const { __clearQoderCliInvocationCache } =
  await import("../../open-sse/services/qoderCliResolve.ts");

const isPosix = process.platform !== "win32";

async function withEnv(
  overrides: Record<string, string | undefined>,
  fn: () => Promise<void>
): Promise<void> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function withStub(script: string, fn: (dir: string) => Promise<void>): Promise<void> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "qodercli-conc-"));
  const stub = path.join(dir, "qodercli");
  fs.writeFileSync(stub, script.replaceAll("__DIR__", dir), { mode: 0o755 });
  concurrency.__resetQoderCliConcurrency();
  qoderCli.__clearQoderModelNamesCache();
  __clearQoderCliInvocationCache();
  try {
    await withEnv(
      {
        CLI_QODER_BIN: stub,
        QODER_CLI_CONFIG_DIR: path.join(dir, "cfg"),
        QODER_CLI_TRANSPORT: undefined,
      },
      () => fn(dir)
    );
  } finally {
    concurrency.__resetQoderCliConcurrency();
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function waitFor(predicate: () => boolean, timeoutMs = 5000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return predicate();
}

test("qodercli slot gate has no cap unless QODER_CLI_MAX_CONCURRENCY is set", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv({ QODER_CLI_MAX_CONCURRENCY: undefined }, async () => {
    // Default throughput is unchanged: many concurrent acquisitions are granted at
    // once, nothing queues, and no queue timeout can fire.
    const releases = await Promise.all(
      Array.from({ length: 12 }, () => concurrency.acquireQoderCliSlot({ queueTimeoutMs: 10 }))
    );
    assert.deepEqual(concurrency.getQoderCliConcurrencyStats(), {
      active: 12,
      queued: 0,
      limit: null,
    });
    for (const release of releases) release();
    assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
  });
  for (const raw of ["", "0", "-3", "abc"]) {
    await withEnv({ QODER_CLI_MAX_CONCURRENCY: raw }, async () => {
      assert.equal(concurrency.getQoderCliMaxConcurrency(), Number.POSITIVE_INFINITY, raw);
    });
  }
});

test("withQoderCliSlot never queues when no cap is configured", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv(
    { QODER_CLI_MAX_CONCURRENCY: undefined, QODER_CLI_QUEUE_TIMEOUT_MS: "1" },
    async () => {
      const held = await Promise.all(
        Array.from({ length: 4 }, () => concurrency.acquireQoderCliSlot())
      );
      try {
        const run = await concurrency.withQoderCliSlot(async () => "ran", { queueTimeoutMs: 1 });
        assert.equal(run, "ran");
      } finally {
        for (const release of held) release();
        concurrency.__resetQoderCliConcurrency();
      }
    }
  );
});

test("the ACP transport stays off unless QODER_CLI_TRANSPORT=acp", async () => {
  const { isQoderAcpTransportEnabled } = await import("../../open-sse/services/qoderCliAcp.ts");
  for (const raw of [undefined, "", "print", "ACP-ish", "1", "true"]) {
    await withEnv({ QODER_CLI_TRANSPORT: raw }, async () => {
      assert.equal(isQoderAcpTransportEnabled(), false, String(raw));
    });
  }
  await withEnv({ QODER_CLI_TRANSPORT: " ACP " }, async () => {
    assert.equal(isQoderAcpTransportEnabled(), true);
  });
});

test("qodercli slot gate queues past the limit and grants FIFO on release", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv({ QODER_CLI_MAX_CONCURRENCY: "1" }, async () => {
    const releaseFirst = await concurrency.acquireQoderCliSlot();
    const order: string[] = [];
    const second = concurrency.acquireQoderCliSlot().then((release) => {
      order.push("second");
      return release;
    });
    const third = concurrency.acquireQoderCliSlot().then((release) => {
      order.push("third");
      return release;
    });
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(order, []);
    assert.deepEqual(concurrency.getQoderCliConcurrencyStats(), { active: 1, queued: 2, limit: 1 });

    releaseFirst();
    releaseFirst(); // idempotent: must not free a second slot
    const releaseSecond = await second;
    assert.deepEqual(order, ["second"]);
    assert.equal(concurrency.getQoderCliConcurrencyStats().active, 1);

    releaseSecond();
    (await third)();
    assert.deepEqual(order, ["second", "third"]);
    assert.deepEqual(concurrency.getQoderCliConcurrencyStats(), { active: 0, queued: 0, limit: 1 });
  });
});

test("qodercli slot gate rejects queued waiters on abort and on queue timeout", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv({ QODER_CLI_MAX_CONCURRENCY: "1" }, async () => {
    const release = await concurrency.acquireQoderCliSlot();

    const controller = new AbortController();
    const aborted = concurrency.acquireQoderCliSlot({ signal: controller.signal });
    controller.abort();
    await assert.rejects(aborted, { name: "AbortError" });

    await assert.rejects(
      concurrency.acquireQoderCliSlot({ queueTimeoutMs: 30 }),
      (err: unknown) => err instanceof concurrency.QoderCliQueueTimeoutError
    );
    assert.deepEqual(concurrency.getQoderCliConcurrencyStats(), { active: 1, queued: 0, limit: 1 });
    release();
    assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
  });
});

test(
  "runQoderCli never runs more qodercli processes than QODER_CLI_MAX_CONCURRENCY",
  { skip: !isPosix },
  async () => {
    // Each --print run holds a lock dir for 300ms; an overlapping run fails mkdir.
    const script = [
      "#!/bin/sh",
      'case "$*" in *--version*) echo 1.0.0; exit 0;; *--list-models*) printf "MODEL\\nAuto\\n"; exit 0;; esac',
      "cat >/dev/null",
      'if ! mkdir "__DIR__/lock" 2>/dev/null; then echo overlap >> "__DIR__/overlaps"; fi',
      "sleep 0.3",
      'rmdir "__DIR__/lock" 2>/dev/null',
      'printf \'{"type":"result","subtype":"success","is_error":false,"result":"ok"}\\n\'',
    ].join("\n");
    await withStub(script, async (dir) => {
      await withEnv({ QODER_CLI_MAX_CONCURRENCY: "1" }, async () => {
        const runs = await Promise.all(
          Array.from({ length: 4 }, () =>
            qoderCli.runQoderCli({ token: "pt-conc", prompt: "hi", stream: false, model: "auto" })
          )
        );
        assert.ok(runs.every((run) => run.ok));
        assert.equal(fs.existsSync(path.join(dir, "overlaps")), false);
      });
    });
  }
);

test("runQoderCli reports busy when no qodercli slot frees up in time", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv({ QODER_CLI_MAX_CONCURRENCY: "1", QODER_CLI_QUEUE_TIMEOUT_MS: "30" }, async () => {
    const release = await concurrency.acquireQoderCliSlot();
    try {
      const run = await qoderCli.runQoderCli({
        token: "pt-busy",
        prompt: "hi",
        stream: false,
        model: "qmodel",
      });
      assert.equal(run.ok, false);
      assert.equal(run.busy, true);
      assert.match(String(run.error), /busy/);
    } finally {
      release();
      concurrency.__resetQoderCliConcurrency();
    }
  });
});

test("QoderExecutor answers 429 qodercli_busy with Retry-After when the queue times out", async () => {
  concurrency.__resetQoderCliConcurrency();
  await withEnv({ QODER_CLI_MAX_CONCURRENCY: "1", QODER_CLI_QUEUE_TIMEOUT_MS: "30" }, async () => {
    const release = await concurrency.acquireQoderCliSlot();
    try {
      const { response } = await new QoderExecutor().execute({
        model: "qwen3.7-plus",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "pt-busy-executor" },
      });
      // A full local queue is request-scoped: 429 + Retry-After, never a 5xx that
      // would count as a provider failure for the circuit breaker.
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("Retry-After"), "5");
      const payload = (await response.json()) as { error: { code: string; message: string } };
      assert.equal(payload.error.code, "qodercli_busy");
      assert.doesNotMatch(payload.error.message, /at \//);
    } finally {
      release();
      concurrency.__resetQoderCliConcurrency();
    }
  });
});

const TREE_STUB = [
  "#!/bin/sh",
  'case "$*" in *--version*) echo 1.0.0; exit 0;; *--list-models*) printf "MODEL\\nAuto\\n"; exit 0;; esac',
  "sleep 30 &",
  'echo $! > "__DIR__/grandchild.pid"',
  "sleep 30",
].join("\n");

test(
  "runQoderCli kills the whole qodercli process tree on timeout",
  { skip: !isPosix },
  async () => {
    await withStub(TREE_STUB, async (dir) => {
      const startedAt = Date.now();
      const run = await qoderCli.runQoderCli({
        token: "pt-tree-timeout",
        prompt: "hi",
        stream: false,
        model: "auto",
        timeoutMs: 500,
      });
      assert.equal(run.timedOut, true);
      // The grandchild holds the stdio pipes; until it dies the run cannot settle.
      assert.ok(Date.now() - startedAt < 10_000, "run outlived the timeout");
      const pid = Number(fs.readFileSync(path.join(dir, "grandchild.pid"), "utf8").trim());
      assert.ok(pid > 0);
      assert.equal(await waitFor(() => !isAlive(pid)), true, "grandchild survived the timeout");
      assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
    });
  }
);

test(
  "runQoderCli kills the whole qodercli process tree on client abort",
  { skip: !isPosix },
  async () => {
    await withStub(TREE_STUB, async (dir) => {
      const controller = new AbortController();
      const pidFile = path.join(dir, "grandchild.pid");
      const pending = qoderCli.runQoderCli({
        token: "pt-tree-abort",
        prompt: "hi",
        stream: false,
        model: "auto",
        signal: controller.signal,
      });
      assert.equal(
        await waitFor(
          () => fs.existsSync(pidFile) && fs.readFileSync(pidFile, "utf8").trim() !== ""
        ),
        true
      );
      const abortedAt = Date.now();
      controller.abort();
      const run = await pending;
      assert.ok(Date.now() - abortedAt < 10_000, "run outlived the abort");
      assert.equal(run.ok, false);
      const pid = Number(fs.readFileSync(pidFile, "utf8").trim());
      assert.equal(await waitFor(() => !isAlive(pid)), true, "grandchild survived the abort");
      assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
    });
  }
);
