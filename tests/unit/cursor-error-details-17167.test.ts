import assert from "node:assert/strict";
import test from "node:test";
import { EventEmitter } from "node:events";
import {
  encodeBytes,
  encodeString,
  encodeBoolField,
} from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";
import { connectEndStreamError } from "../../open-sse/executors/cursor/streamDriver.ts";
import {
  classifyCursorError,
  resolveCursorEmptyTurnError,
} from "../../open-sse/executors/cursor/cursorErrors.ts";
import {
  CursorExecutor,
  newStreamCtx,
  processFrame,
  type StreamCtx,
} from "../../open-sse/executors/cursor.ts";

const TITLE = "Fable 5 is not included in your weekly usage";
const DETAIL = "Buy credits or switch to a Grok model to continue.";
const TYPE = "aiserver.v1.ErrorDetails";

// Synthetic fixture, not captured production traffic. Field numbers match the
// official CLI 2026.05.07-42ddaca generated aiserver.v1 schemas. This is an
// ErrorDetails value inside Connect JSON, NOT an AgentServerMessage action.
function typed(title = TITLE, detail = DETAIL, debug?: object) {
  const custom = Buffer.concat([
    encodeString(1, title),
    encodeString(2, detail),
    encodeBoolField(4, false),
    encodeBytes(10, encodeString(1, "payment")),
    encodeString(6, "PRIVATE_ADDITIONAL_INFO"),
  ]);
  return { type: TYPE, value: encodeBytes(2, custom).toString("base64"), ...(debug && { debug }) };
}
function envelope(details: unknown[], code = "unknown", message = "Error") {
  return Buffer.from(JSON.stringify({ error: { code, message, details } }));
}
function classifiedPayload(payload: Buffer) {
  const projected = connectEndStreamError(payload);
  assert.ok(projected);
  return classifyCursorError(projected);
}

test("known-type debug-only details retain title and guidance without exposing private fields", () => {
  const debug = {
    details: {
      title: TITLE,
      detail: `${DETAIL} authorization=synthetic-secret /srv/private/synthetic.txt https://evil.invalid/pay`,
      additional_info: "PRIVATE_ADDITIONAL_INFO",
      buttons: [{ label: "BUTTON_POISON", url: "https://evil.invalid/button" }],
      metadata: "METADATA_POISON",
    },
    raw: "RAW_DEBUG_POISON",
  };
  const result = classifiedPayload(envelope([{ type: TYPE, debug }]));
  assert.equal(result.status, 404);
  assert.ok(result.message.includes(TITLE));
  assert.ok(result.message.includes(DETAIL));
  assert.doesNotMatch(
    result.message,
    /synthetic-secret|\/srv\/private|evil\.invalid|PRIVATE_ADDITIONAL_INFO|POISON/
  );
  for (const details of [{ title: TITLE }, { detail: TITLE }]) {
    assert.equal(classifiedPayload(envelope([{ type: TYPE, debug: { details } }])).status, 404);
  }
  const bounded = connectEndStreamError(
    envelope([{ type: TYPE, debug: { details: { title: "x".repeat(3000) + "TAIL_POISON" } } }])
  );
  assert.doesNotMatch(bounded || "", /TAIL_POISON/);
});

test("debug-only details require the exact known type and explicit object whitelist", () => {
  for (const type of [undefined, "", "other.ErrorDetails", `${TYPE}Extra`]) {
    assert.equal(
      connectEndStreamError(envelope([{ type, debug: { details: { title: TITLE } } }])),
      "cursor-agent stream ended with error unknown: Error"
    );
  }
  for (const debug of [null, [], { title: TITLE }, { details: [TITLE] }, { details: TITLE }]) {
    assert.equal(
      connectEndStreamError(envelope([{ type: TYPE, debug }])),
      "cursor-agent stream ended with error unknown: Error"
    );
  }
});

test("present typed value wins over debug and malformed values never enable debug fallback", () => {
  const debug = { details: { title: "DEBUG_POISON", detail: "DEBUG_GUIDANCE_POISON" } };
  const valid = connectEndStreamError(envelope([typed(TITLE, DETAIL, debug)]));
  assert.ok(valid?.includes(TITLE));
  assert.ok(valid?.includes(DETAIL));
  assert.doesNotMatch(valid || "", /POISON/);
  for (const value of [null, false, 0, {}, "", "%%%", "EgV4", "A".repeat(100_000)]) {
    assert.equal(
      connectEndStreamError(envelope([{ type: TYPE, value, debug }])),
      "cursor-agent stream ended with error unknown: Error"
    );
  }
});

for (const [name, details] of [
  ["without debug", [typed()]],
  ["with conflicting debug", [typed(TITLE, DETAIL, { details: { title: "DEBUG_POISON" } })]],
  [
    "target not first",
    [{ type: "untrusted.Type", debug: { details: { title: "POISON" } } }, typed()],
  ],
] as const) {
  test(`typed Connect ${name}: retain title AND guidance; entitlement is 404`, () => {
    const result = classifiedPayload(envelope([...details]));
    assert.ok(result.message.includes(TITLE), result.message);
    assert.ok(result.message.includes(DETAIL), result.message);
    assert.equal(result.status, 404);
    assert.equal(result.type, "invalid_request_error");
    assert.doesNotMatch(result.message, /POISON|PRIVATE_ADDITIONAL_INFO/);
  });
}

for (const prefix of ["", "ActionRequiredError: "]) {
  test(`weekly model entitlement precedes generic quota cues (${prefix || "bare"})`, () => {
    const result = classifyCursorError(`${prefix}${TITLE}. ${DETAIL}`);
    assert.equal(result.status, 404);
    assert.equal(result.kind, "not_found");
    assert.equal(result.type, "invalid_request_error");
  });
}

test("explicit model unavailability wins over a cached empty-turn quota hint", () => {
  assert.equal(
    resolveCursorEmptyTurnError({ upstreamMessage: TITLE, quotaExhaustedHint: true }).status,
    404
  );
});

test("negative controls retain quota, RPM, auth, size and generic ActionRequired semantics", () => {
  for (const [message, status] of [
    ["ActionRequiredError: increase limits", 429],
    ["resource_exhausted: too many requests per minute", 429],
    ["not_found: AI Model Not Found (reset after 109h)", 429],
    ["quota exhausted; reset after 2h", 429],
    ["unauthenticated: expired token", 401],
    ["resource_exhausted: request body exceeds maximum size", 400],
    ["payment", 502],
    ["Your account is not included in weekly usage", 502],
  ] as const) {
    assert.equal(classifyCursorError(message).status, status, message);
  }
});

// Exercise real processFrame and real HTTP/SSE finalizers without execute(),
// credentials, sessions, upstream H2 or DB writes. Only construction is bypassed.
const finalizers = Object.create(CursorExecutor.prototype) as {
  buildResponseFromCtx(ctx: StreamCtx, body: object): Response;
  finalizeSseStream(ctx: StreamCtx, body: object): void;
};
for (const entry of ["json", "trailer"] as const) {
  test(`${entry}: real HTTP and SSE finalizers expose safe title + guidance`, async () => {
    const payload = envelope([
      typed(
        TITLE,
        `${DETAIL} authorization=synthetic-secret /srv/private/synthetic.txt https://evil.invalid/pay`
      ),
    ]);
    const chunks: string[] = [];
    const ctx = newStreamCtx("fable-5", (chunk) => chunks.push(chunk));
    if (entry === "json") {
      processFrame(payload, ctx, new Set());
    } else {
      const classified = classifiedPayload(payload);
      // driveCursorH2 throws the projected message. execute catches/classifies
      // it; inject that result at the existing finalizer seam, not a fake H2.
      ctx.midStreamError = classified;
      ctx.endReason = "server_end";
    }
    const response = finalizers.buildResponseFromCtx(ctx, {});
    const body = await response.text();
    assert.equal(response.status, 404, body);
    finalizers.finalizeSseStream(ctx, {});
    const sse = chunks.join("");
    for (const visible of [body, sse]) {
      assert.ok(visible.includes(TITLE), visible);
      assert.ok(visible.includes(DETAIL), visible);
      assert.doesNotMatch(
        visible,
        /synthetic-secret|\/srv\/private|evil\.invalid|PRIVATE_ADDITIONAL_INFO/
      );
      assert.doesNotMatch(visible, /analytics|debug|base64/);
    }
    assert.match(sse, /"finish_reason":"error"/);
    assert.match(sse, /data: \[DONE\]/);
  });
}

for (const source of ["typed", "debug"] as const) {
  for (const entry of ["json", "trailer"] as const) {
    for (const message of [
      "ActionRequiredError: increase limits",
      "ActionRequiredError: increase limits https://private.invalid/pay /srv/private/file authorization=synthetic-secret",
    ]) {
      test(`${entry} ${source} details preserve generic ActionRequired quota cues and safe guidance (${message.includes("authorization=") ? "redacted message" : "plain message"})`, async () => {
        const title = "Usage limit reached";
        const guidance = "Upgrade your plan to continue.";
        const debug = {
          details: {
            title,
            detail: guidance,
            additional_info: "INFO_POISON",
            buttons: "BUTTON_POISON",
          },
          metadata: "METADATA_POISON",
        };
        const details = source === "typed" ? typed(title, guidance, debug) : { type: TYPE, debug };
        const payload = envelope([details], "unknown", message);
        const ctx = newStreamCtx("fable-5", () => {});
        if (entry === "json") processFrame(payload, ctx, new Set());
        else ctx.midStreamError = classifiedPayload(payload);
        const response = finalizers.buildResponseFromCtx(ctx, {});
        const body = await response.text();
        assert.equal(response.status, 429, body);
        assert.match(body, /rate_limit_error/);
        for (const text of [body, connectEndStreamError(payload) || ""]) {
          assert.ok(text.includes("ActionRequiredError: increase limits"), text);
          assert.ok(text.includes(title), text);
          assert.ok(text.includes(guidance), text);
          assert.doesNotMatch(
            text,
            /POISON|PRIVATE_ADDITIONAL_INFO|synthetic-secret|private\.invalid|\/srv\/private/
          );
        }
        assert.equal(classifiedPayload(payload).status, 429);
        assert.equal(classifiedPayload(payload).type, "rate_limit_error");
      });
    }
  }
}

test("detail projection omits placeholders and duplicates while weekly entitlement stays first", () => {
  const expected = `cursor-agent stream ended with error unknown: ${TITLE} ${DETAIL}`;
  for (const message of ["Error", "", " error ", TITLE, `${TITLE} ${DETAIL}`]) {
    assert.equal(connectEndStreamError(envelope([typed()], "unknown", message)), expected);
  }
  const weekly = classifiedPayload(
    envelope([typed()], "unknown", "ActionRequiredError: increase limits")
  );
  assert.equal(weekly.status, 404);
  assert.equal(weekly.type, "invalid_request_error");
  assert.equal(
    connectEndStreamError(envelope([])),
    "cursor-agent stream ended with error unknown: Error"
  );
  assert.equal(
    connectEndStreamError(envelope([], "unknown", "")),
    "cursor-agent stream ended with error unknown"
  );
});

test("detail budget keeps typed/debug details intact and appends only a complete message", () => {
  const message = "ActionRequiredError: increase limits";
  const prefix = "cursor-agent stream ended with error unknown: ";
  const cap = 2048 * 2 + 1;
  for (const source of ["typed", "debug"] as const) {
    for (const remaining of [0, message.length, message.length + 1]) {
      const title = "x".repeat(2048);
      const detail = "y".repeat(2048 - remaining);
      const details =
        source === "typed"
          ? typed(title, detail)
          : { type: TYPE, debug: { details: { title, detail } } };
      const withoutMessage = connectEndStreamError(envelope([details], "unknown", ""));
      assert.equal(withoutMessage, `${prefix}${title} ${detail}`);
      const output = connectEndStreamError(envelope([details], "unknown", message));
      assert.equal(
        output,
        remaining === message.length + 1 ? `${withoutMessage} ${message}` : withoutMessage
      );
      assert.ok(output && output.length <= prefix.length + cap);
    }
  }
});

test("wrong/unknown type never trusts debug or typed bytes; code/message fallback survives", () => {
  for (const type of [
    "other.ErrorDetails",
    `${TYPE}Extra`,
    "type.googleapis.com/aiserver.v1.ErrorDetails",
    "",
  ]) {
    const payload = envelope(
      [{ ...typed(), type, debug: { details: { title: "DEBUG_POISON" } } }],
      "unauthenticated",
      "expired token"
    );
    const result = classifiedPayload(payload);
    assert.equal(result.status, 401);
    assert.doesNotMatch(result.message, /DEBUG_POISON|Fable/);
  }
});

test("malformed base64/protobuf and oversized values fail closed to code/message", () => {
  for (const value of [
    "%%%=",
    "a",
    "Cg==",
    "EgV4",
    "AAAA",
    Buffer.from([0x12, 0x01, 0xff]).toString("base64"),
    "A".repeat(100_000),
  ]) {
    const result = classifiedPayload(
      envelope([{ type: TYPE, value }], "resource_exhausted", "slow down")
    );
    assert.equal(result.status, 429);
    assert.doesNotMatch(result.message, /Fable|base64/);
  }
  assert.equal(connectEndStreamError(Buffer.from("not json")), null);
  assert.equal(connectEndStreamError(Buffer.from("{}")), null);
});

test("bounded projection rejects pathological wire values and never exposes untrusted debug", () => {
  const values = [
    Buffer.from([0x00]), // illegal field zero
    Buffer.from([0x12, ...Array(11).fill(0x80)]), // unterminated uint64
    Buffer.from([0x0d, 0x00]), // truncated fixed32
    Buffer.from([0x09, 0x00]), // truncated fixed64
    Buffer.concat(Array.from({ length: 129 }, () => encodeBoolField(1, true))),
    encodeBytes(2, Buffer.concat(Array.from({ length: 129 }, () => encodeBoolField(3, true)))),
    encodeBytes(2, encodeString(1, "x".repeat(2049))),
  ];
  for (const bytes of values) {
    const payload = envelope([
      { type: TYPE, value: bytes.toString("base64"), debug: { details: { title: TITLE } } },
    ]);
    assert.equal(classifiedPayload(payload).status, 502);
    assert.doesNotMatch(connectEndStreamError(payload) || "", /Fable/);
  }
  // Nesting is traversed only at the two known schema levels, never recursively.
  let nested = encodeString(1, "NESTED_POISON");
  for (let i = 0; i < 100; i++) nested = encodeBytes(10, nested);
  nested = encodeBytes(2, nested);
  assert.doesNotMatch(
    connectEndStreamError(envelope([{ type: TYPE, value: nested.toString("base64") }])) || "",
    /NESTED_POISON/
  );
  const list = Array.from({ length: 16 }, () => ({ type: "other.Type" }));
  assert.doesNotMatch(connectEndStreamError(envelope([...list, typed()])) || "", /Fable/);
  assert.match(
    connectEndStreamError(envelope([], "unknown", "x".repeat(140_000))) || "",
    /too large/
  );
  const unpadded = typed();
  unpadded.value = unpadded.value.replace(/=+$/, "");
  assert.equal(classifiedPayload(envelope([unpadded])).status, 404);
  assert.equal(
    classifiedPayload(envelope([{ ...typed(), value: typed().value + "=" }])).status,
    502
  );
});

test("typed action=payment alone is not quota exhaustion; title-only/detail-only are retained", () => {
  assert.equal(
    classifiedPayload(envelope([typed("Please review your configuration", "")])).status,
    502
  );
  for (const item of [typed(TITLE, ""), typed("", TITLE)]) {
    assert.equal(classifiedPayload(envelope([item])).status, 404);
  }
});

test("real Connect driver rejects a typed error trailer with safe guidance", async () => {
  const { driveCursorH2 } = await import("../../open-sse/executors/cursor/streamDriver.ts");
  const payload = envelope([
    typed(TITLE, `${DETAIL} authorization=synthetic-secret /srv/private/file`),
  ]);
  const header = Buffer.alloc(5);
  header[0] = 2;
  header.writeUInt32BE(payload.length, 1);
  const req = Object.assign(new EventEmitter(), { close() {}, pause() {}, resume() {} });
  const client = { close() {} };
  const ctx = newStreamCtx("fable-5", () => {});
  await assert.rejects(
    driveCursorH2(
      {
        req: req as unknown as import("node:http2").ClientHttp2Stream,
        client: client as unknown as import("node:http2").ClientHttp2Session,
        initialBytes: Buffer.concat([header, payload]),
      },
      ctx,
      {
        debugEnabled: true,
        debugLog: () => {},
        onFrame: () => assert.fail("trailer is not protobuf"),
      }
    ),
    (error: Error) => {
      assert.ok(error.message.includes(TITLE));
      assert.ok(error.message.includes(DETAIL));
      assert.doesNotMatch(error.message, /synthetic-secret|\/srv\/private/);
      assert.equal(classifyCursorError(error.message).status, 404);
      return true;
    }
  );
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});
