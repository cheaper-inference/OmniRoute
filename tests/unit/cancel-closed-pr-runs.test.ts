import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as yaml from "js-yaml";

const { selectRunsToCancel } = await import("../../scripts/ci/cancel-closed-pr-runs.mjs");

const REPO = "cheaper-inference/OmniRoute";
const SCRIPT = fileURLToPath(
  new URL("../../scripts/ci/cancel-closed-pr-runs.mjs", import.meta.url)
);
const SHARED_GRACE_PRELOAD = fileURLToPath(
  new URL("../fixtures/cancel-closed-pr-runs-shared-grace-preload.mjs", import.meta.url)
);
const LOOPBACK_READINESS_PRELOAD = fileURLToPath(
  new URL("../fixtures/cancel-closed-pr-runs-loopback-readiness-preload.mjs", import.meta.url)
);
const LOOPBACK_READINESS_PATH = "/__omniroute_cancel_test_ready__";
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ctx = {
  prNumber: 42,
  headRef: "fix/thing",
  headRepo: REPO,
  headSha: "head-current",
  selfRunId: 999,
  allowUnlinkedFallback: true,
};

function run(over: Record<string, unknown>) {
  return {
    id: 1,
    name: "CI",
    status: "queued",
    event: "pull_request",
    head_branch: "fix/thing",
    head_sha: "head-current",
    head_repository: { full_name: REPO },
    pull_requests: [],
    ...over,
  };
}

function pullRequest(over: Record<string, unknown> = {}) {
  return {
    number: 42,
    state: "closed",
    head: { ref: "fix/thing", sha: "head-current", repo: { full_name: REPO } },
    base: { repo: { full_name: REPO } },
    ...over,
  };
}

type RecordedRequest = { method: string; path: string };
type ApiReply = { status?: number; body?: unknown };

async function runCli(
  reply: (request: RecordedRequest) => ApiReply,
  envPatch: Record<string, string> = {}
): Promise<{ code: number; stdout: string; stderr: string; requests: RecordedRequest[] }> {
  const requests: RecordedRequest[] = [];
  const server = createServer((request, response) => {
    if (request.method === "GET" && request.url === LOOPBACK_READINESS_PATH) {
      response.writeHead(204);
      response.end();
      return;
    }
    const recorded = { method: request.method ?? "GET", path: request.url ?? "/" };
    requests.push(recorded);
    const result = reply(recorded);
    response.writeHead(result.status ?? 200, { "content-type": "application/json" });
    response.end(JSON.stringify(result.body ?? {}));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  let child: ReturnType<typeof spawn> | undefined;
  let timeout: NodeJS.Timeout | undefined;
  let stdout = "";
  let stderr = "";
  try {
    const address = server.address();
    assert.ok(address && typeof address === "object");
    child = spawn(
      process.execPath,
      ["--import", pathToFileURL(LOOPBACK_READINESS_PRELOAD).href, SCRIPT],
      {
        env: {
          GH_TOKEN: "test-token",
          GITHUB_API_URL: `http://127.0.0.1:${address.port}`,
          REPO,
          PR_NUMBER: "42",
          HEAD_REF: "fix/thing",
          HEAD_REPO: REPO,
          HEAD_SHA: "head-current",
          SELF_RUN_ID: "999",
          CANCEL_POLL_INTERVAL_MS: "0",
          CANCEL_NORMAL_GRACE_MS: "0",
          CANCEL_DEADLINE_MS: "3000",
          OMNIROUTE_CANCEL_TEST_LOOPBACK_READY: "1",
          ...envPatch,
        },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
    timeout = setTimeout(() => child?.kill("SIGKILL"), 8_000);
    timeout.unref();
    const [code, signal] = (await once(child, "close")) as [number | null, NodeJS.Signals | null];
    if (code === null) {
      throw new Error(
        `cancel CLI terminated by ${signal ?? "an unknown signal"}\nstdout:\n${stdout}\nstderr:\n${stderr}`
      );
    }
    return { code, stdout, stderr, requests };
  } finally {
    if (timeout) clearTimeout(timeout);
    if (child && child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
    server.closeAllConnections();
    if (server.listening) {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
  }
}

type SharedGraceFixtureReceipt = {
  logicalNowMs: number;
  sleepsMs: number[];
  normalCancelIds: number[];
  forceCancelIds: number[];
  cancelOperationOrder: string[];
  requestTrace: string[];
  queuedReadIds: number[];
  terminalReadIds: number[];
};

async function runSharedGraceCli(ids: number[]): Promise<{
  code: number;
  stdout: string;
  stderr: string;
  receipt: SharedGraceFixtureReceipt;
}> {
  const child = spawn(
    process.execPath,
    ["--import", pathToFileURL(SHARED_GRACE_PRELOAD).href, SCRIPT],
    {
      env: {
        GH_TOKEN: "test-token",
        GITHUB_API_URL: "https://fixture.invalid",
        REPO,
        PR_NUMBER: "42",
        HEAD_REF: "fix/thing",
        HEAD_REPO: REPO,
        HEAD_SHA: "head-current",
        SELF_RUN_ID: "999",
        CANCEL_POLL_INTERVAL_MS: "20",
        CANCEL_NORMAL_GRACE_MS: "400",
        CANCEL_DEADLINE_MS: "1200",
        OMNIROUTE_CANCEL_TEST_SCENARIO: "shared-grace",
        OMNIROUTE_CANCEL_TEST_IDS: ids.join(","),
      },
      stdio: ["ignore", "pipe", "pipe", "pipe"],
    }
  );
  let stdout = "";
  let stderr = "";
  let receiptJson = "";
  const childStdout = child.stdout;
  const childStderr = child.stderr;
  const receiptStream = child.stdio[3];
  assert.ok(childStdout && childStderr && receiptStream instanceof Readable);
  childStdout.setEncoding("utf8").on("data", (chunk: string) => (stdout += chunk));
  childStderr.setEncoding("utf8").on("data", (chunk: string) => (stderr += chunk));
  receiptStream.setEncoding("utf8").on("data", (chunk: string) => (receiptJson += chunk));
  const timeout = setTimeout(() => child.kill("SIGKILL"), 8_000);
  timeout.unref();
  try {
    const [code, signal] = (await once(child, "close")) as [number | null, NodeJS.Signals | null];
    if (code === null) {
      throw new Error(
        `cancel CLI terminated by ${signal ?? "an unknown signal"}\nstdout:\n${stdout}\nstderr:\n${stderr}`
      );
    }
    assert.notEqual(receiptJson.trim(), "", "the deterministic fixture must emit its receipt");
    return {
      code,
      stdout,
      stderr,
      receipt: JSON.parse(receiptJson) as SharedGraceFixtureReceipt,
    };
  } finally {
    clearTimeout(timeout);
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  }
}

async function runForceScenario({
  id,
  forceStatus,
  finalStatus = "completed",
  deadlineMs = "3000",
}: {
  id: number;
  forceStatus: number;
  finalStatus?: string;
  deadlineMs?: string;
}) {
  let runReads = 0;
  return runCli(
    ({ method, path }) => {
      if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
        return { body: pullRequest() };
      }
      if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
      if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
        return { body: { workflow_runs: [run({ id, pull_requests: [{ number: 42 }] })] } };
      }
      if (method === "POST" && path.endsWith(`/${id}/cancel`)) return { status: 202 };
      if (method === "GET" && path.endsWith(`/actions/runs/${id}`)) {
        runReads++;
        const status = runReads === 1 ? "queued" : finalStatus;
        return {
          body: run({
            id,
            status,
            conclusion: status === "completed" ? "cancelled" : null,
            pull_requests: [{ number: 42 }],
          }),
        };
      }
      if (method === "POST" && path.endsWith(`/${id}/force-cancel`)) {
        return { status: forceStatus };
      }
      return { status: 404 };
    },
    { CANCEL_DEADLINE_MS: deadlineMs }
  );
}

test("cancels queued and running PR runs of the closed PR's branch", () => {
  const picked = selectRunsToCancel(
    [run({ id: 1 }), run({ id: 2, status: "in_progress" }), run({ id: 3, status: "waiting" })],
    ctx
  );
  assert.deepEqual(
    picked.map((r: { id: number }) => r.id),
    [1, 2, 3]
  );
});

test("takes a unique PR link only when branch and repository metadata agree", () => {
  const linked = run({ id: 4, pull_requests: [{ number: 42 }] });
  const inconsistent = run({
    id: 5,
    head_repository: { full_name: "someone/OmniRoute" },
    pull_requests: [{ number: 42 }],
  });
  assert.deepEqual(
    selectRunsToCancel([linked, inconsistent], ctx).map((r: { id: number }) => r.id),
    [4]
  );
});

test("leaves an unlinked reused-branch run from a different head SHA alone", () => {
  const reused = run({ id: 6, head_sha: "head-from-new-pr" });
  assert.deepEqual(selectRunsToCancel([reused], ctx), []);
});

test("never lets a run linked to another PR fall through branch matching", () => {
  const otherPr = run({ id: 7, pull_requests: [{ number: 7 }] });
  const shared = run({ id: 8, pull_requests: [{ number: 42 }, { number: 7 }] });
  assert.deepEqual(selectRunsToCancel([otherPr, shared], ctx), []);
});

test("preserves unlinked runs when branch ownership could not be proven", () => {
  assert.deepEqual(
    selectRunsToCancel([run({ id: 9 })], { ...ctx, allowUnlinkedFallback: false }),
    []
  );
});

test("preserves a run whose PR-link metadata is malformed", () => {
  assert.deepEqual(
    selectRunsToCancel(
      [run({ id: 10, pull_requests: [{}] }), run({ id: "not-an-id", pull_requests: [] })],
      ctx
    ),
    []
  );
});

test("leaves finished runs, non-PR events, other branches, forks and itself alone", () => {
  const keep = [
    run({ id: 10, status: "completed" }),
    run({ id: 11, event: "push" }),
    run({ id: 12, event: "schedule" }),
    run({ id: 13, head_branch: "fix/other" }),
    // Fork with the same branch name, not linked to this PR number.
    run({ id: 14, head_repository: { full_name: "someone/OmniRoute" } }),
    run({ id: 999 }),
    run({ id: 15, pull_requests: [{ number: 7 }], head_branch: "fix/other" }),
  ];
  assert.deepEqual(selectRunsToCancel(keep, ctx), []);
});

test("a PR reopened before cleanup is preserved without any cancellation request", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest({ state: "open" }) };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stdout, /preserv/i);
});

test("a malformed PR state fails closed before any cancellation request", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest({ state: undefined }) };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /PR #42.*invalid state/i);
});

test("an open PR reusing the same head disables the unlinked fallback", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return {
        body: [
          pullRequest({
            number: 77,
            state: "open",
            head: { ref: "fix/thing", sha: "new-head", repo: { full_name: REPO } },
          }),
        ],
      };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 20 })] } };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.ok(
    result.requests.some(
      (request) => request.method === "GET" && request.path.startsWith(`/repos/${REPO}/pulls?`)
    )
  );
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stdout, /unlinked fallback disabled.*open PR #77/i);
});

test("a full fifth workflow-run page fails INCOMPLETE before any write", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return { body: [] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      const page = Number(new URL(path, "http://local").searchParams.get("page"));
      return {
        body: {
          workflow_runs: Array.from({ length: 100 }, (_, index) =>
            run({ id: page * 1000 + index, status: "completed" })
          ),
        },
      };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /INCOMPLETE.*500/i);
});

test("a full fifth open-PR page cannot prove the unlinked fallback safe", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      const page = Number(new URL(path, "http://local").searchParams.get("page"));
      return {
        body: Array.from({ length: 100 }, (_, index) =>
          pullRequest({
            number: page * 1000 + index,
            state: "open",
            head: {
              ref: "fix/thing",
              sha: `other-${page}-${index}`,
              repo: { full_name: "someone/OmniRoute" },
            },
          })
        ),
      };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [] } };
    }
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /INCOMPLETE.*500 open PR/i);
});

for (const status of [403, 500]) {
  test(`a normal cancellation HTTP ${status} fails the cleanup`, async () => {
    const result = await runCli(({ method, path }) => {
      if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
        return { body: pullRequest() };
      }
      if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
        return { body: [] };
      }
      if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
        return { body: { workflow_runs: [run({ id: 30, pull_requests: [{ number: 42 }] })] } };
      }
      if (method === "POST" && path === `/repos/${REPO}/actions/runs/30/cancel`) {
        return { status, body: { message: "request failed" } };
      }
      return { status: 404 };
    });

    assert.notEqual(result.code, 0);
    assert.match(result.stderr, new RegExp(`run 30.*cancel.*HTTP ${status}`, "i"));
  });
}

for (const status of [403, 500]) {
  test(`a PR read HTTP ${status} fails closed without any cancellation request`, async () => {
    const result = await runCli(({ method, path }) => {
      if (method === "GET" && path === `/repos/${REPO}/pulls/42`) return { status };
      if (method === "POST") return { status: 202 };
      return { status: 404 };
    });

    assert.notEqual(result.code, 0);
    assert.equal(
      result.requests.some((request) => request.method === "POST"),
      false
    );
    assert.match(result.stderr, new RegExp(`reading PR #42 failed with HTTP ${status}`, "i"));
  });
}

test("HTTP 202 is only accepted until readback confirms a terminal run", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return { body: [] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 31, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path === `/repos/${REPO}/actions/runs/31/cancel`) {
      return { status: 202 };
    }
    if (method === "GET" && path === `/repos/${REPO}/actions/runs/31`) {
      return {
        body: run({
          id: 31,
          status: "completed",
          conclusion: "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.ok(
    result.requests.some(
      (request) => request.method === "GET" && request.path.endsWith("/actions/runs/31")
    )
  );
  assert.match(result.stdout, /accepted cancel request.*31/i);
  assert.match(result.stdout, /terminal-confirmed.*31.*completed.*cancelled/i);
});

test("a normal 409 is benign only when readback proves the run completed", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return { body: [] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 32, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path === `/repos/${REPO}/actions/runs/32/cancel`) {
      return { status: 409 };
    }
    if (method === "GET" && path === `/repos/${REPO}/actions/runs/32`) {
      return {
        body: run({
          id: 32,
          status: "completed",
          conclusion: "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    if (method === "POST" && path.endsWith("/force-cancel")) return { status: 500 };
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/force-cancel")),
    false
  );
  assert.match(result.stdout, /terminal-confirmed.*32/i);
});

test("a normal 409 with an active run proceeds through revalidation and force-cancel", async () => {
  let runReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 321, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path.endsWith("/321/cancel")) return { status: 409 };
    if (method === "GET" && path.endsWith("/actions/runs/321")) {
      runReads++;
      return {
        body: run({
          id: 321,
          status: runReads === 1 ? "queued" : "completed",
          conclusion: runReads === 1 ? null : "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    if (method === "POST" && path.endsWith("/321/force-cancel")) return { status: 202 };
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.ok(result.requests.some((request) => request.path.endsWith("/321/force-cancel")));
  assert.match(result.stdout, /terminal-confirmed.*321.*cancelled/i);
});

test("a run still queued after normal 202 is force-cancelled only after revalidation", async () => {
  let runReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return { body: [] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 33, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path === `/repos/${REPO}/actions/runs/33/cancel`) {
      return { status: 202 };
    }
    if (method === "GET" && path === `/repos/${REPO}/actions/runs/33`) {
      runReads++;
      return {
        body: run({
          id: 33,
          status: runReads === 1 ? "queued" : "completed",
          conclusion: runReads === 1 ? null : "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    if (method === "POST" && path === `/repos/${REPO}/actions/runs/33/force-cancel`) {
      return { status: 202 };
    }
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.ok(result.requests.some((request) => request.path.endsWith("/33/force-cancel")));
  assert.ok(
    result.requests.filter(
      (request) => request.method === "GET" && request.path === `/repos/${REPO}/pulls/42`
    ).length >= 2,
    "PR state must be revalidated before force-cancel"
  );
  assert.match(result.stdout, /accepted force-cancel request.*33/i);
  assert.match(result.stdout, /terminal-confirmed.*33.*cancelled/i);
});

test("multiple resistant runs share one normal-cancel grace window", async () => {
  const ids = [331, 332, 333, 334];
  const result = await runSharedGraceCli(ids);

  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(result.receipt.normalCancelIds, ids);
  assert.deepEqual(result.receipt.forceCancelIds, ids);
  assert.deepEqual(result.receipt.cancelOperationOrder, [
    ...ids.map((id) => `normal:${id}`),
    ...ids.map((id) => `force:${id}`),
  ]);
  assert.deepEqual([...new Set(result.receipt.queuedReadIds)], ids);
  assert.deepEqual(result.receipt.terminalReadIds, ids);
  for (const [index, entry] of result.receipt.requestTrace.entries()) {
    if (!entry.startsWith("POST ")) continue;
    assert.equal(
      result.receipt.requestTrace[index - 1],
      `GET /repos/${REPO}/pulls/42`,
      `PR state must be revalidated immediately before ${entry}`
    );
  }
  assert.equal(result.receipt.logicalNowMs, 400);
  assert.ok(result.receipt.logicalNowMs < 1200);
  assert.equal(
    result.receipt.sleepsMs.reduce((total, delay) => total + delay, 0),
    400
  );
  for (const id of ids) assert.match(result.stdout, new RegExp(`terminal-confirmed ${id} `));
  assert.match(result.stdout, /4\/4 run\(s\) terminal-confirmed/i);
});

test("a PR reopened after discovery is preserved before the first cancellation POST", async () => {
  let prReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      prReads++;
      return { body: pullRequest({ state: prReads === 1 ? "closed" : "open" }) };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 34, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stdout, /preserving.*reopened before cancellation/i);
});

test("a PR reopened between targets preserves every not-yet-cancelled run", async () => {
  let prReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      prReads++;
      return { body: pullRequest({ state: prReads <= 2 ? "closed" : "open" }) };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return {
        body: {
          workflow_runs: [
            run({ id: 341, pull_requests: [{ number: 42 }] }),
            run({ id: 342, pull_requests: [{ number: 42 }] }),
          ],
        },
      };
    }
    if (method === "POST" && path.endsWith("/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/341")) {
      return {
        body: run({
          id: 341,
          status: "completed",
          conclusion: "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    if (method === "GET" && path.endsWith("/actions/runs/342")) {
      return { body: run({ id: 342, pull_requests: [{ number: 42 }] }) };
    }
    return { status: 404 };
  });

  assert.equal(result.code, 0, result.stderr);
  assert.ok(result.requests.some((request) => request.path.endsWith("/341/cancel")));
  assert.ok(result.requests.some((request) => request.path.endsWith("/actions/runs/341")));
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/342/cancel")),
    false
  );
  assert.match(result.stdout, /preserving.*PR #42 reopened before cancellation/i);
  assert.match(result.stdout, /terminal-confirmed.*341.*cancelled/i);
});

test("reopening between targets cannot turn an accepted but active request green", async () => {
  let prReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      prReads++;
      return { body: pullRequest({ state: prReads <= 2 ? "closed" : "open" }) };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return {
        body: {
          workflow_runs: [
            run({ id: 351, pull_requests: [{ number: 42 }] }),
            run({ id: 352, pull_requests: [{ number: 42 }] }),
          ],
        },
      };
    }
    if (method === "POST" && path.endsWith("/351/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/351")) {
      return { body: run({ id: 351, status: "queued", pull_requests: [{ number: 42 }] }) };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.ok(result.requests.some((request) => request.path.endsWith("/actions/runs/351")));
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/352/cancel")),
    false
  );
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/force-cancel")),
    false
  );
  assert.match(result.stderr, /PR #42 reopened.*run 351 remains queued/i);
  assert.doesNotMatch(result.stdout, /1\/1 run\(s\) terminal-confirmed/i);
});

test("an unlinked run is preserved if another open PR reuses its head before cancellation", async () => {
  let openPrReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      openPrReads++;
      return {
        body:
          openPrReads === 1
            ? []
            : [
                pullRequest({
                  number: 77,
                  state: "open",
                  head: { ref: "fix/thing", sha: "new", repo: { full_name: REPO } },
                }),
              ],
      };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 343 })] } };
    }
    if (method === "POST") return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /run 343 became ambiguous.*open PR #77/i);
});

test("an unlinked run is preserved if the closed PR reopens before cancellation", async () => {
  let openPrReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      openPrReads++;
      return { body: openPrReads === 1 ? [] : [pullRequest({ state: "open" })] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 344 })] } };
    }
    if (method === "POST") return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/344")) {
      return { body: run({ id: 344, status: "completed", conclusion: "cancelled" }) };
    }
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /run 344 became ambiguous.*open PR #42/i);
});

test("an unlinked run is preserved when an open PR lacks repository identity", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      return {
        body: [
          pullRequest({
            number: 77,
            state: "open",
            head: { ref: "fix/thing", sha: "new-head" },
          }),
        ],
      };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 345 })] } };
    }
    if (method === "POST") return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/345")) {
      return { body: run({ id: 345, status: "completed", conclusion: "cancelled" }) };
    }
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.method === "POST"),
    false
  );
  assert.match(result.stderr, /checking open PRs returned ambiguous PR metadata/i);
});

test("a PR reopened after normal 202 is preserved without force-cancel", async () => {
  let prReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      prReads++;
      return { body: pullRequest({ state: prReads < 3 ? "closed" : "open" }) };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 35, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path.endsWith("/35/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/35")) {
      return { body: run({ id: 35, status: "queued", pull_requests: [{ number: 42 }] }) };
    }
    if (method === "POST" && path.endsWith("/35/force-cancel")) return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/35/force-cancel")),
    false
  );
  assert.match(result.stderr, /PR #42 reopened before force-cancel.*preserving run 35/i);
});

test("unlinked ownership is rechecked before force-cancel", async () => {
  let openPrReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      openPrReads++;
      return {
        body:
          openPrReads === 1
            ? []
            : [
                pullRequest({
                  number: 77,
                  state: "open",
                  head: { ref: "fix/thing", sha: "new", repo: { full_name: REPO } },
                }),
              ],
      };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 36 })] } };
    }
    if (method === "POST" && path.endsWith("/36/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/36")) {
      return { body: run({ id: 36, status: "queued" }) };
    }
    if (method === "POST" && path.endsWith("/36/force-cancel")) return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/36/force-cancel")),
    false
  );
  assert.match(result.stderr, /run 36 became ambiguous.*open PR #77/i);
});

test("the closed PR reopening during force ownership recheck preserves the run", async () => {
  let openPrReads = 0;
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) {
      openPrReads++;
      return { body: openPrReads < 3 ? [] : [pullRequest({ state: "open" })] };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 347 })] } };
    }
    if (method === "POST" && path.endsWith("/347/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/347")) {
      return { body: run({ id: 347, status: "queued" }) };
    }
    if (method === "POST" && path.endsWith("/347/force-cancel")) return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/347/force-cancel")),
    false
  );
  assert.match(result.stderr, /run 347 became ambiguous.*open PR #42/i);
});

test("changed run metadata is rejected before force-cancel", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 37, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path.endsWith("/37/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/37")) {
      return {
        body: run({ id: 37, status: "queued", pull_requests: [{ number: 77 }] }),
      };
    }
    if (method === "POST" && path.endsWith("/37/force-cancel")) return { status: 202 };
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/37/force-cancel")),
    false
  );
  assert.match(result.stderr, /run 37 ownership became ambiguous/i);
});

test("a terminal readback with a different run ID cannot satisfy the target", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 346, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path.endsWith("/346/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/346")) {
      return {
        body: run({
          id: 777,
          status: "completed",
          conclusion: "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.doesNotMatch(result.stdout, /terminal-confirmed/);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/force-cancel")),
    false
  );
  assert.match(result.stderr, /run 346 readback returned mismatched id 777/i);
});

test("an active readback with a different run ID cannot redirect force-cancel", async () => {
  const result = await runCli(({ method, path }) => {
    if (method === "GET" && path === `/repos/${REPO}/pulls/42`) {
      return { body: pullRequest() };
    }
    if (method === "GET" && path.startsWith(`/repos/${REPO}/pulls?`)) return { body: [] };
    if (method === "GET" && path.startsWith(`/repos/${REPO}/actions/runs?`)) {
      return { body: { workflow_runs: [run({ id: 348, pull_requests: [{ number: 42 }] })] } };
    }
    if (method === "POST" && path.endsWith("/348/cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/348")) {
      return { body: run({ id: 777, status: "queued", pull_requests: [{ number: 42 }] }) };
    }
    if (method === "POST" && path.endsWith("/777/force-cancel")) return { status: 202 };
    if (method === "GET" && path.endsWith("/actions/runs/777")) {
      return {
        body: run({
          id: 777,
          status: "completed",
          conclusion: "cancelled",
          pull_requests: [{ number: 42 }],
        }),
      };
    }
    return { status: 404 };
  });

  assert.notEqual(result.code, 0);
  assert.equal(
    result.requests.some((request) => request.path.endsWith("/force-cancel")),
    false
  );
  assert.match(result.stderr, /run 348 readback returned mismatched id 777/i);
});

for (const status of [403, 500]) {
  test(`force-cancel HTTP ${status} fails the cleanup`, async () => {
    const result = await runForceScenario({ id: 40 + status, forceStatus: status });
    assert.notEqual(result.code, 0);
    assert.match(result.stderr, new RegExp(`force-cancel request failed with HTTP ${status}`));
  });
}

test("force-cancel 409 is benign only after terminal readback", async () => {
  const result = await runForceScenario({ id: 50, forceStatus: 409 });
  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /terminal-confirmed.*50.*cancelled/i);
});

test("force-cancel 409 with an active readback fails", async () => {
  const result = await runForceScenario({ id: 51, forceStatus: 409, finalStatus: "queued" });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /force-cancel returned HTTP 409 and remains queued/i);
});

test("force-cancel 202 that never becomes terminal fails within the internal deadline", async () => {
  const result = await runForceScenario({
    id: 52,
    forceStatus: 202,
    finalStatus: "queued",
    deadlineMs: "150",
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /deadline exhausted|remains queued/i);
});

test("the closed-PR workflow preserves the trusted checkout and grants only required writes", () => {
  const workflowPath = path.join(REPO_ROOT, ".github/workflows/cancel-closed-pr-runs.yml");
  const raw = fs.readFileSync(workflowPath, "utf8");
  const workflow = yaml.load(raw) as {
    on: { pull_request?: { types?: string[] } };
    permissions?: Record<string, string>;
    jobs: Record<
      string,
      {
        if?: string;
        permissions?: Record<string, string>;
        "runs-on"?: string;
        "timeout-minutes"?: number;
        steps?: Array<{
          uses?: string;
          with?: Record<string, string | boolean>;
          env?: Record<string, string>;
          run?: string;
        }>;
      }
    >;
  };
  const job = workflow.jobs.cancel;
  assert.deepEqual(workflow.on.pull_request?.types, ["closed"]);
  assert.doesNotMatch(raw, /pull_request_target/);
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.equal(job.if, "github.event.pull_request.head.repo.full_name == github.repository");
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.equal(job["timeout-minutes"], 5);
  assert.deepEqual(job.permissions, {
    contents: "read",
    actions: "write",
    "pull-requests": "read",
  });
  const checkout = job.steps?.find((step) => step.uses?.startsWith("actions/checkout@"));
  assert.ok(checkout);
  assert.equal(checkout.uses, "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1");
  assert.equal(checkout.with?.ref, "${{ github.event.repository.default_branch }}");
  assert.equal(checkout.with?.["persist-credentials"], false);
  assert.equal(checkout.with?.["sparse-checkout"], "scripts/ci/cancel-closed-pr-runs.mjs");
  assert.equal(checkout.with?.["sparse-checkout-cone-mode"], false);
  const cancel = job.steps?.find(
    (step) => step.run === "node scripts/ci/cancel-closed-pr-runs.mjs"
  );
  assert.ok(cancel);
  assert.equal(cancel.env?.HEAD_SHA, "${{ github.event.pull_request.head.sha }}");
  assert.doesNotMatch(raw, /Free plan|20[- ]job|concurrency cap/i);
});
