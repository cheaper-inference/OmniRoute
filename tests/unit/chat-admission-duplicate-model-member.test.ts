// newapi-01: a JSON body with two top-level `model` members routes by whichever JSON parser reads it
// (first wins in one, last wins in another). Opt-in guard: OMNIROUTE_REJECT_DUPLICATE_MODEL_MEMBER.
import test from "node:test";
import assert from "node:assert/strict";

const { admitChatRequest, ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

const FLAG = "OMNIROUTE_REJECT_DUPLICATE_MODEL_MEMBER";

async function admit(body: string, headers: Record<string, string> = {}) {
  const controller = new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, () => {});
  const result = await admitChatRequest(
    new Request("http://x/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body,
    }),
    { controller, hardMaxBytes: 10 * 1024 * 1024, largeBodyBytes: 1024 * 1024, queueMs: 0 }
  );
  if (result.admit) result.lease?.release();
  return result;
}

async function withFlag<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const saved = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return await fn();
  } finally {
    if (saved === undefined) delete process.env[FLAG];
    else process.env[FLAG] = saved;
  }
}

const DUP = '{"model":"gpt-a","messages":[],"model":"gpt-b"}';

test("flag off (default): a body with two model members is admitted unchanged", async () => {
  await withFlag(undefined, async () => {
    assert.equal((await admit(DUP)).admit, true);
  });
});

test("flag on: two top-level model members are rejected with 400 duplicate_model_field", async () => {
  await withFlag("1", async () => {
    const result = await admit(DUP);
    assert.equal(result.admit, false);
    if (result.admit) return;
    assert.equal(result.response.status, 400);
    const body = await result.response.json();
    assert.equal(body.error.code, "duplicate_model_field");
    assert.equal(body.error.type, "invalid_request_error");
    assert.ok(!JSON.stringify(body).includes("gpt-a"), "the model values are not echoed");
  });
});

test("flag on: an escaped spelling of the key counts as the same member", async () => {
  await withFlag("true", async () => {
    const result = await admit('{"model":"a","mod\\u0065l":"b"}');
    assert.equal(result.admit, false);
  });
});

test("flag on: one model member, nested model keys and model inside strings are admitted", async () => {
  await withFlag("1", async () => {
    for (const body of [
      '{"model":"a","messages":[{"role":"user","content":"\\"model\\": \\"x\\""}]}',
      '{"model":"a","metadata":{"model":"other"},"tools":[{"model":"t"}]}',
      '{"messages":[],"stream":true}',
      '{"models":["a","b"],"model":"a"}',
      '["model","model"]',
      "",
    ]) {
      assert.equal((await admit(body)).admit, true, body);
    }
  });
});

test("flag on: a duplicate after nested objects and arrays is still found", async () => {
  await withFlag("1", async () => {
    const result = await admit(
      '{"a":{"model":1},"b":[{"model":2}],"model":"x","c":"}","model":"y"}'
    );
    assert.equal(result.admit, false);
  });
});

test("flag on: a gzip body is checked after decoding", async () => {
  const { gzipSync } = await import("node:zlib");
  await withFlag("1", async () => {
    const controller = new ChatAdmissionController(Number.MAX_SAFE_INTEGER, undefined, 0, () => {});
    const result = await admitChatRequest(
      new Request("http://x/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", "content-encoding": "gzip" },
        body: gzipSync(Buffer.from(DUP)),
      }),
      { controller, hardMaxBytes: 10 * 1024 * 1024, largeBodyBytes: 1024 * 1024, queueMs: 0 }
    );
    assert.equal(result.admit, false);
  });
});

test("flag on: a rejected request releases its lease", async () => {
  await withFlag("1", async () => {
    const controller = new ChatAdmissionController(1, undefined, 0, () => {});
    const make = () =>
      new Request("http://x/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", "content-length": String(DUP.length) },
        body: DUP,
      });
    const opts = { controller, hardMaxBytes: 10 * 1024 * 1024, largeBodyBytes: 8, queueMs: 0 };
    assert.equal((await admitChatRequest(make(), opts)).admit, false);
    const ok = await admitChatRequest(
      new Request("http://x/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: '{"model":"a","pad":"0123456789"}',
      }),
      opts
    );
    assert.equal(ok.admit, true, "the single heavy slot must be free again");
    if (ok.admit) ok.lease?.release();
  });
});
