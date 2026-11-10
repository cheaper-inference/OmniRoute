import assert from "node:assert/strict";
import test from "node:test";
import { readConsoleApiResponse } from "../../src/lib/providers/volcengineConsoleResponse.ts";

for (const status of [200, 403]) {
  for (const body of ["not JSON", "null", "[]", "17", "{}", '{"Result":{"value":1}}']) {
    test(`preserves console response semantics for ${status} ${body}`, async () => {
      const result = await readConsoleApiResponse(new Response(body, { status }));
      const parsed = body.startsWith("{") ? JSON.parse(body) : {};
      assert.deepEqual(result, {
        ok: status === 200,
        status,
        json: parsed,
        error: status === 200 ? null : body,
      });
    });
  }
}

test("metadata errors override HTTP success and trim the message", async () => {
  const json = { ResponseMetadata: { Error: { Message: "  expired  " } } };
  assert.deepEqual(await readConsoleApiResponse(new Response(JSON.stringify(json))), {
    ok: false,
    status: 200,
    json,
    error: "expired",
  });
});

test("blank and non-string metadata messages use the HTTP fallback", async () => {
  for (const Message of ["  ", 42, null, {}]) {
    const json = { ResponseMetadata: { Error: { Message } } };
    const body = JSON.stringify(json);
    const result = await readConsoleApiResponse(new Response(body, { status: 500 }));
    assert.equal(result.error, body);
    assert.equal(result.ok, false);
  }
});

test("limits HTTP error text to 200 characters", async () => {
  const result = await readConsoleApiResponse(new Response("x".repeat(250), { status: 502 }));
  assert.equal(result.error, "x".repeat(200));
});

test("propagates body read failures", async () => {
  const failure = new Error("body unavailable");
  await assert.rejects(
    readConsoleApiResponse({
      ok: true,
      status: 200,
      text: async () => {
        throw failure;
      },
    }),
    (error) => error === failure
  );
});
