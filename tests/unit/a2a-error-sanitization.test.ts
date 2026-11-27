import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { findErrorHelperViolations } from "../../scripts/check/check-error-helper.mjs";

// A skill that throws must not hand its raw error text (absolute paths, stack frames) to the
// A2A client. The message/send JSON-RPC error, the message/stream failure event and the failed
// task's artifact (read back through tasks/get) all go through sanitizeErrorMessage().

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-error-sanitize-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const RAW_ERROR = "x /home/u/.omniroute/storage.sqlite\n    at f (/abs/a.ts:1:1)";
const THROWING_SKILL = "test-throwing-skill";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const taskExecution = await import("../../src/lib/a2a/taskExecution.ts");
// The route copies the handler table into a Map when it loads, so register the throwing
// skill before importing it.
taskExecution.A2A_SKILL_HANDLERS[THROWING_SKILL] = async () => {
  throw new Error(RAW_ERROR);
};
const a2aRoute = await import("../../src/app/a2a/route.ts");

function makeJsonRpcRequest(body: unknown): NextRequest {
  return new Request("http://localhost/a2a", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

function assertNoLeak(label: string, value: unknown) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  assert.ok(typeof text === "string" && text.length > 0, `${label} is present`);
  assert.ok(!text.includes("/home/"), `${label} leaks an absolute path: ${text}`);
  assert.ok(!text.includes("    at "), `${label} leaks a stack frame: ${text}`);
}

async function getTaskArtifactContent(taskId: string): Promise<unknown> {
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({ jsonrpc: "2.0", id: "get", method: "tasks/get", params: { taskId } })
  );
  const body = (await res.json()) as {
    result?: { task?: { state?: string; artifacts?: Array<{ content?: unknown }> } };
  };
  assert.equal(body.result?.task?.state, "failed", JSON.stringify(body));
  return body.result?.task?.artifacts?.[0]?.content;
}

const { getTaskManager } = await import("../../src/lib/a2a/taskManager.ts");

function failedTaskIds(): Set<string> {
  return new Set(
    getTaskManager()
      .listTasks()
      .filter((t) => t.skill === THROWING_SKILL)
      .map((t) => t.id)
  );
}

test.before(async () => {
  await settingsDb.updateSettings({ a2aEnabled: true });
});

test.after(() => {
  delete taskExecution.A2A_SKILL_HANDLERS[THROWING_SKILL];
  getTaskManager().destroy();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("message/send: a throwing skill's error and task artifact carry no path or stack", async () => {
  const before = failedTaskIds();
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "message/send",
      params: { skill: THROWING_SKILL, messages: [{ role: "user", content: "hi" }] },
    })
  );
  const body = (await res.json()) as { error?: { code?: number; message?: string } };
  assert.equal(body.error?.code, -32603, JSON.stringify(body));
  assertNoLeak("message/send error.message", body.error?.message);

  const created = [...failedTaskIds()].filter((id) => !before.has(id));
  assert.equal(created.length, 1, "message/send created one task");
  assertNoLeak("message/send tasks/get artifact content", await getTaskArtifactContent(created[0]));
});

test("message/stream: the failure event and task artifact carry no path or stack", async () => {
  const before = failedTaskIds();
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "2",
      method: "message/stream",
      params: { skill: THROWING_SKILL, messages: [{ role: "user", content: "hi" }] },
    })
  );
  const raw = await res.text();
  const events = raw
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice("data: ".length)));
  const failure = events.find((e) => e?.params?.task?.state === "failed");
  assert.ok(failure, `a failure event was emitted: ${raw}`);
  assertNoLeak("message/stream metadata.error", failure.params.metadata?.error);

  const created = [...failedTaskIds()].filter((id) => !before.has(id));
  assert.equal(created.length, 1, "message/stream created one task");
  assertNoLeak(
    "message/stream tasks/get artifact content",
    await getTaskArtifactContent(created[0])
  );
});

// The Rule #12 gate scans the A2A files and treats jsonRpcError()/createFailureEvent() as
// client sinks, so a raw caught error handed to either one is reported.
type GateFile = { path: string; source: string };
const gate = findErrorHelperViolations as (files: GateFile[], allowlist: Set<string>) => string[];

function gateRun(source: string, filePath = "src/app/a2a/route.ts"): string[] {
  return gate([{ path: filePath, source }], new Set());
}

test("gate: a raw error alias passed to jsonRpcError or createFailureEvent is flagged", () => {
  const rpc = `function f(id, err) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonRpcError(id, -32603, \`Skill execution failed: \${msg}\`);
  }`;
  const sse = `function f(task, err) {
    const msg = err instanceof Error ? err.message : String(err);
    controller.enqueue(encoder.encode(createFailureEvent(task.id, msg)));
  }`;
  assert.deepEqual(gateRun(rpc), ["src/app/a2a/route.ts"]);
  assert.deepEqual(gateRun(sse, "src/lib/a2a/streaming.ts"), ["src/lib/a2a/streaming.ts"]);
});

test("gate: a raw error on an argument line of a multi-line jsonRpcError call is flagged", () => {
  const src = `function f(id, err) {
    return jsonRpcError(
      id,
      -32603,
      err instanceof Error ? err.message : String(err)
    );
  }`;
  assert.deepEqual(gateRun(src), ["src/app/a2a/route.ts"]);
});

test("gate: the sanitized A2A sinks are clean", () => {
  const src = `function f(id, task, err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    controller.enqueue(encoder.encode(createFailureEvent(task.id, msg)));
    return jsonRpcError(
      id,
      -32603,
      sanitizeErrorMessage(err instanceof Error ? err.message : String(err))
    );
  }`;
  assert.deepEqual(gateRun(src), []);
});
