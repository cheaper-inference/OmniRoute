import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import zlib from "node:zlib";

const MIB = 1024 * 1024;
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omni-unified-body-limit-"));
process.env.DATA_DIR = directory;
process.env.MAX_BODY_SIZE_BYTES = String(3 * MIB);
delete process.env.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const { getCachedBodySizeSettings } = await import("../../src/lib/db/readCache.ts");
const { checkBodySize, getBodySizeLimit } =
  await import("../../src/shared/middleware/bodySizeGuard.ts");
const { admitChatRequest, ChatAdmissionController, resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

const paths = [
  "/api/v1/chat/completions",
  "/api/v1/responses",
  "/api/v1/messages",
  "/api/v1/completions",
  "/api/v1/providers/openai/chat/completions",
  "/api/v1/relay/chat/completions",
  "/api/v1/responses/input_tokens",
  "/v1/chat/completions",
  "/v1/responses",
  "/responses",
];

function request(pathname: string, bytes: number, declared?: number, internal = false) {
  let cancelled = false;
  let pulls = 0;
  const headers = new Headers({ "content-type": "application/json" });
  if (declared !== undefined) headers.set("content-length", String(declared));
  if (internal) {
    headers.set("x-omniroute-admission-bypass", "internal");
    headers.set("authorization", `Bearer ${resolveSelfLoopBearer()}`);
  }
  const body = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        pulls += 1;
        controller.enqueue(new Uint8Array(bytes).fill(120));
        controller.close();
      },
      cancel() {
        cancelled = true;
      },
    },
    { highWaterMark: 0 }
  );
  return {
    value: new Request(`http://localhost${pathname}`, {
      method: "POST",
      headers,
      body,
      duplex: "half",
    } as RequestInit & { duplex: "half" }),
    cancelled: () => cancelled,
    pulls: () => pulls,
  };
}

async function admit(incoming: Request) {
  const controller = new ChatAdmissionController(1);
  const result = await admitChatRequest(incoming, { controller });
  if (result.admit) result.lease?.release();
  assert.equal(controller.activeHeavy, 0, "no count lease may leak");
  assert.equal(controller.inflightBytes, 0, "no ingest reservation may leak");
  return result;
}

test.after(async () => {
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await waitForCallLogSaves(2_000);
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
});

// These two run first, before any test saves a limit: nothing here can delete a saved setting.
test("without a saved limit the LLM routes keep 50 MiB, whatever the env default says", async () => {
  assert.equal((await getSettings()).maxBodySizeMb, 3, "the env still seeds the visible setting");
  const settings = await getCachedBodySizeSettings();
  assert.equal(settings.savedMaxBodySizeMb, null, "the seeded default does not count as saved");
  assert.equal(getBodySizeLimit("/api/v1/responses", settings), 50 * MIB);
  assert.equal(getBodySizeLimit("/api/v1/chat/completions", settings), 50 * MIB);
  assert.equal(getBodySizeLimit("/api/v1/messages", settings), 3 * MIB);

  const aboveEnvDefault = 3 * MIB + 1;
  const accepted = await admit(
    request("/api/v1/responses", aboveEnvDefault, aboveEnvDefault).value
  );
  assert.equal(accepted.admit, true);
});

test("without a saved limit chat admission still rejects above 50 MiB", async () => {
  const incoming = request("/api/v1/responses", 2, 50 * MIB + 1);
  const result = await admit(incoming.value);
  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 413);
  assert.match((await result.response.json()).error.message, /50 MB/);
  assert.equal(incoming.pulls(), 0, "oversized declaration is rejected before ingestion");
});

for (const pathname of paths) {
  test(`${pathname}: a saved limit has no route floor or independent chat ceiling`, async () => {
    await updateSettings({ maxBodySizeMb: 1 });
    const limit = getBodySizeLimit(pathname, await getCachedBodySizeSettings());
    assert.equal(limit, MIB);
    const incoming = request(pathname, 2, MIB + 1);
    assert.equal(checkBodySize(incoming.value, limit)?.status, 413);
    const result = await admit(incoming.value);
    assert.equal(result.admit, false);
    if (result.admit) return;
    assert.equal(result.response.status, 413);
    assert.match((await result.response.json()).error.message, /1 MB/);
    assert.equal(incoming.pulls(), 0);
  });
}

for (const declared of [undefined, 1]) {
  for (const internal of [false, true]) {
    test(`actual-byte guard honors saved limit (declared=${declared}, internal=${internal})`, async () => {
      await updateSettings({ maxBodySizeMb: 1 });
      const incoming = request("/v1/responses", MIB + 1, declared, internal);
      const result = await admit(incoming.value);
      assert.equal(result.admit, false);
      if (result.admit) return;
      assert.equal(result.response.status, 413);
      const wire = await result.response.text();
      assert.equal(JSON.parse(wire).error.code, "PAYLOAD_TOO_LARGE");
      assert.doesNotMatch(wire, /at \/|at [A-Z]:\\|\.ts:\d+/);
      assert.equal(incoming.pulls(), 1);
    });
  }
}

test("exact saved boundary is admitted, including chunked bodies and self-loops", async () => {
  await updateSettings({ maxBodySizeMb: 1 });
  for (const declared of [undefined, MIB]) {
    for (const internal of [false, true]) {
      const result = await admit(request("/v1/messages", MIB, declared, internal).value);
      assert.equal(result.admit, true);
      if (result.admit) assert.equal((await result.request.arrayBuffer()).byteLength, MIB);
    }
  }
});

test("saving a larger limit immediately admits a body above the former 50 MiB ceiling", async () => {
  await updateSettings({ maxBodySizeMb: 100 });
  const bytes = 51 * MIB;
  const limit = getBodySizeLimit("/api/v1/responses", await getCachedBodySizeSettings());
  assert.equal(limit, 100 * MIB);
  const incoming = request("/api/v1/responses", bytes, bytes);
  assert.equal(checkBodySize(incoming.value, limit), null);
  const result = await admit(incoming.value);
  assert.equal(result.admit, true);
  if (result.admit) assert.equal((await result.request.arrayBuffer()).byteLength, bytes);
});

test("the same wrapper picks up saved increases and decreases without a process restart", async () => {
  const { withChatAdmission } = await import("../../src/shared/middleware/withChatAdmission.ts");
  let calls = 0;
  const wrapped = withChatAdmission(
    async (incoming: Request) => {
      calls += 1;
      return Response.json({ bytes: (await incoming.arrayBuffer()).byteLength });
    },
    { controller: new ChatAdmissionController(1) }
  );
  const bytes = MIB + 1;
  await updateSettings({ maxBodySizeMb: 1 });
  assert.equal((await wrapped(request("/v1/messages", bytes).value)).status, 413);
  assert.equal(calls, 0);
  await updateSettings({ maxBodySizeMb: 2 });
  const accepted = await wrapped(request("/v1/messages", bytes).value);
  assert.equal(accepted.status, 200);
  assert.deepEqual(await accepted.json(), { bytes });
  assert.equal(calls, 1);
  await updateSettings({ maxBodySizeMb: 1 });
  assert.equal((await wrapped(request("/v1/messages", bytes).value)).status, 413);
  assert.equal(calls, 1);
});

test("an admitted stream keeps its limit snapshot while subsequent requests see a decrease", async () => {
  await updateSettings({ maxBodySizeMb: 2 });
  let started!: () => void;
  const reading = new Promise<void>((resolve) => (started = resolve));
  let stream!: ReadableStreamDefaultController<Uint8Array>;
  const incoming = new Request("http://localhost/v1/responses", {
    method: "POST",
    body: new ReadableStream<Uint8Array>(
      {
        start(controller) {
          stream = controller;
        },
        pull() {
          started();
        },
      },
      { highWaterMark: 0 }
    ),
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  const pending = admit(incoming);
  await reading;
  await updateSettings({ maxBodySizeMb: 1 });
  stream.enqueue(new Uint8Array(MIB + 1));
  stream.close();
  assert.equal((await pending).admit, true);
  assert.equal((await admit(request("/v1/responses", MIB + 1).value)).admit, false);
});

test("a compressed body expanding past the saved limit gets a 413", async () => {
  await updateSettings({ maxBodySizeMb: 1 });
  const compressed = zlib.gzipSync(Buffer.alloc(MIB + 1, 120));
  assert.ok(compressed.byteLength < MIB, "the compressed bytes alone must fit the limit");
  const incoming = new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", "content-encoding": "gzip" },
    body: compressed,
  });
  const result = await admit(incoming);
  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 413);
  assert.match((await result.response.json()).error.message, /1 MB/);
});
