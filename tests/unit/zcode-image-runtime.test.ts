import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import {
  PATCH_STEPS,
  applyZcodePatchSteps,
  patchZcodeImageProtocol,
  patchZcodeNumericProviderCode,
} from "../../scripts/ops/zcode-image-runtime.mjs";

test("ZCode image patch changes only the native user-content schema and fails closed on drift", () => {
  const schema =
    'prefix;m.object({role:m.literal("user"),content:m.string()}).strict(),m.object({role:m.literal("assistant"),content:m.string(),toolCalls:suffix';
  const patched = patchZcodeImageProtocol(schema);
  assert.match(patched, /dataUrl:m.string\(\).startsWith\("data:image\/"\)/);
  assert.match(patched, /role:m.literal\("assistant"\),content:m.string\(\),toolCalls:suffix$/);
  assert.ok(patched.startsWith("prefix;"));
  assert.throws(() => patchZcodeImageProtocol("unknown native build"), /exactly one/);
  assert.throws(() => patchZcodeImageProtocol(schema + schema), /exactly one/);
});

/** Minimal faithful replica of the vendor finish-record detection body (lG). */
const LG_FIXTURE =
  'function lG(e){let t=hS(e.source);if(!SFs(t))return;let n=kWr(t),o=wFs(t),s=hS(t.error),a=o.providerCode??Pb(t.providerCode)??Pb(s?.code);if(!(a!==void 0||n==="provider_success_false"||t.isProviderBusinessError===!0||t.name==="ProviderBusinessError"))return;let u={providerId:e.providerId,providerKind:bFs(e.providerKind),providerCode:a,providerMessage:o.providerMessage??Pb(t.providerMessage)??Pb(t.message)??(n==="provider_success_false"?"Provider returned a business error.":void 0),providerRequestId:o.providerRequestId,responseBodySummary:o.responseBodySummary,responseHeaders:o.responseHeaders,responseStatus:o.responseStatus,statusCode:o.statusCode};return new S2(u)}';

const VENDOR_PEEBEE = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};
const VENDOR_AS_RECORD = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;

function buildPatchedDetector() {
  const source = `${LG_FIXTURE}`;
  const patched = patchZcodeNumericProviderCode(source);
  const start = patched.indexOf("function lG(e){");
  const marker = "return new S2(u)}";
  const end = patched.indexOf(marker, start) + marker.length;
  assert.ok(start >= 0 && end > start, "patched detector body must stay extractable");
  const captured = [];
  class S2 {
    constructor(u) {
      captured.push(this);
      Object.assign(this, u);
    }
  }
  const sandbox = {
    hS: VENDOR_AS_RECORD,
    SFs: () => true,
    kWr: (t) => t.rawFinishReason,
    wFs: (t) => t.__o,
    Pb: VENDOR_PEEBEE,
    bFs: (kind) => kind,
    S2,
  };
  const detect = runInNewContext(`${patched.slice(start, end)}\nlG`, sandbox);
  return { detect, captured };
}

function runDetector(providerCode, finishFields = {}) {
  const { detect, captured } = buildPatchedDetector();
  const record = {
    type: "finish",
    __o: { providerCode },
    ...finishFields,
  };
  const result = detect({ source: record });
  return { result, captured };
}

test("ZCode numeric guard: generated text in a finish record is no longer a business error", () => {
  const generatedToolCall =
    'const r = await tools["agent-herder"].send_message({\n  sessionId: "x"\n});';
  const { result, captured } = runDetector(generatedToolCall);
  assert.equal(result, undefined);
  assert.equal(captured.length, 0);
});

test("ZCode numeric guard: real numeric provider failure codes still raise", () => {
  for (const code of [1210, "1210", 429]) {
    const { result, captured } = runDetector(code);
    assert.equal(result, captured[0], "detector returns the constructed error object");
    assert.equal(captured.length, 1);
    assert.equal(String(captured[0].providerCode), String(code));
  }
});

test("ZCode numeric guard: explicit failure markers still raise without a numeric code", () => {
  const successFalse = runDetector(undefined, { rawFinishReason: "provider_success_false" });
  assert.notEqual(successFalse.result, undefined);
  assert.equal(successFalse.captured.length, 1);
  assert.match(successFalse.captured[0].providerMessage, /business error/);

  const marked = runDetector(undefined, { isProviderBusinessError: true });
  assert.notEqual(marked.result, undefined);
  assert.equal(marked.captured.length, 1);

  const named = runDetector(undefined, { name: "ProviderBusinessError" });
  assert.notEqual(named.result, undefined);
  assert.equal(named.captured.length, 1);
});

test("ZCode numeric patch step applies exactly once and fails closed on drift", () => {
  const once = patchZcodeNumericProviderCode(LG_FIXTURE);
  assert.match(once, /\/\^\-\?\[0-9\]\+\$\//);
  assert.throws(() => patchZcodeNumericProviderCode(once), /exactly one/);
  assert.throws(() => patchZcodeNumericProviderCode("unknown native build"), /exactly one/);
});

test("ZCode patch pipeline keeps both versioned steps in order", () => {
  assert.deepEqual(
    PATCH_STEPS.map((step) => step.id),
    ["user-text-and-image-v1", "numeric-provider-code-v1"]
  );
  const schema =
    'm.object({role:m.literal("user"),content:m.string()}).strict(),m.object({role:m.literal("assistant"),content:m.string(),toolCalls:suffix';
  const patched = applyZcodePatchSteps(`${schema}${LG_FIXTURE}`);
  assert.match(patched, /dataUrl:m.string\(\).startsWith\("data:image\/"\)/);
  assert.match(patched, /\/\^\-\?\[0-9\]\+\$\//);
});
