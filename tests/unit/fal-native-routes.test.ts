import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "fal-native-routes-"));
process.env.API_KEY_SECRET = "fal-native-test-secret";
process.env.INITIAL_PASSWORD = "fal-native-tests-only-password";
const run = await import("../../src/app/api/v1/fal/run/route.ts");
const jobs = await import("../../src/app/api/v1/fal/jobs/[id]/route.ts");
const models = await import("../../src/app/api/v1/fal/models/route.ts");
const registration = await import("../../src/app/api/providers/[id]/fal/route.ts");
const edits = await import("../../src/app/api/v1/images/edits/route.ts");
const db = await import("../../src/lib/db/fal.ts");
const providers = await import("../../src/lib/db/providers.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const core = await import("../../src/lib/db/core.ts");
const costs = await import("../../src/domain/costRules.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const endpoint = "fal-ai/hunyuan3d-v21";
const definition = JSON.parse(
  readFileSync(new URL("../fixtures/fal/fal-ai_hunyuan3d-v21.json", import.meta.url), "utf8")
);
const originalFetch = globalThis.fetch;
const connection = await providers.createProviderConnection({
  provider: "fal-ai",
  authType: "apikey",
  apiKey: "fal-account-one-test-secret",
  isActive: true,
  testStatus: "active",
  name: "fal-test-account",
});
const otherConnection = await providers.createProviderConnection({
  provider: "fal-ai",
  authType: "apikey",
  apiKey: "fal-account-two-test-secret",
  isActive: true,
  testStatus: "active",
  name: "fal-other-account",
});
const key = await keys.createApiKey("fal test key", "fal-test-machine", ["manage"], {
  allowedConnections: [String(connection.id)],
});
const otherKey = await keys.createApiKey("fal other key", "fal-test-machine-two", [], {
  allowedConnections: [String(otherConnection.id)],
});
const nativeOutput = {
  mesh: {
    url: "https://example.com/model.glb",
    content_type: "model/gltf-binary",
    file_name: "model.glb",
  },
  textures: [{ url: "https://example.com/texture.png", width: 1024 }],
  preview_url: "https://example.com/preview.png",
};
const sent: Array<{ url: string; method: string; body?: Record<string, unknown> }> = [];
let cancelStatus = "OK";
test.beforeEach(() => {
  sent.length = 0;
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    sent.push({
      url: target,
      method: init.method ?? "GET",
      ...(init.body ? { body: JSON.parse(String(init.body)) } : {}),
    });
    assert.equal(new Headers(init.headers).get("authorization"), "Key fal-account-one-test-secret");
    if (
      target.startsWith("https://api.fal.ai/") &&
      new URL(target).searchParams.get("endpoint_id")?.startsWith("openai/")
    ) {
      const selected = new URL(target).searchParams.get("endpoint_id")!;
      const imageDefinition = JSON.parse(
        readFileSync(
          new URL(`../fixtures/fal/${selected.replaceAll("/", "_")}.json`, import.meta.url),
          "utf8"
        )
      );
      return Response.json({ models: [imageDefinition], has_more: false, next_cursor: null });
    }
    if (target.includes("https://fal.run/openai/gpt-image-2.5/")) {
      return Response.json({ images: [{ url: "data:image/png;base64,CAkK" }] });
    }
    if (target.startsWith("https://api.fal.ai/"))
      return Response.json({ models: [definition], has_more: false, next_cursor: null });
    if (target === `https://queue.fal.run/${endpoint}`)
      return Response.json({
        request_id: "upstream-id",
        status_url: "https://queue.fal.run/fal-ai/hunyuan3d-v21/requests/upstream-id/status",
        response_url: "https://queue.fal.run/fal-ai/hunyuan3d-v21/requests/upstream-id",
        cancel_url: "https://queue.fal.run/fal-ai/hunyuan3d-v21/requests/upstream-id/cancel",
      });
    if (target.endsWith("/status")) return Response.json({ status: "COMPLETED" });
    if (target.endsWith("/cancel"))
      return Response.json({ status: cancelStatus }, { status: cancelStatus === "OK" ? 200 : 202 });
    return Response.json(nativeOutput);
  };
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(10_000);
  keys.resetApiKeyState();
  core.resetDbInstance();
});

function request(
  path: string,
  method = "GET",
  body?: unknown,
  apiKey = key.key,
  headers: Record<string, string> = {}
) {
  return new Request(`http://localhost/api/v1/fal/${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...headers },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
const body = {
  endpoint_id: endpoint,
  input: { input_image_url: "https://example.com/source.png" },
  transport: "queue",
};

test("native queue reserves once; retries and repeated result GETs never regenerate or rebill", async () => {
  const response = await run.POST(
    request("run", "POST", body, key.key, { "Idempotency-Key": "same-native-input" })
  );
  assert.equal(response.status, 202, await response.clone().text());
  const receipt = await response.json();
  const repeat = await run.POST(
    request("run", "POST", body, key.key, { "Idempotency-Key": "same-native-input" })
  );
  assert.equal((await repeat.json()).id, receipt.id);
  for (let i = 0; i < 2; i++) {
    const result = await jobs.GET(request(`jobs/${receipt.id}?result=true`), {
      params: Promise.resolve({ id: receipt.id }),
    });
    assert.equal(result.status, 200, await result.clone().text());
    const payload = await result.json();
    assert.deepEqual(payload.output, nativeOutput);
    assert.equal(payload.artifacts.length, 3);
    assert.equal(JSON.stringify(payload).includes("test-secret"), false);
  }
  assert.equal(sent.filter((call) => call.method === "POST").length, 1);
  assert.equal(db.loadFalJob(receipt.id)?.accounted, true);
  const conflict = await run.POST(
    request("run", "POST", { ...body, input: { ...body.input, seed: 42 } }, key.key, {
      "Idempotency-Key": "same-native-input",
    })
  );
  assert.equal(conflict.status, 400);
});

test("idempotency ignores object key ordering and preserves ordered references and nulls", () => {
  const input = {
    options: { enabled: false, count: 0 },
    refs: ["second", "first"],
    nullable: null,
  };
  const reserved = db.reserveFalJob(
    "fingerprint-owner",
    String(connection.id),
    endpoint,
    input,
    "ordered-input"
  );
  const recovered = db.findFalReservation("fingerprint-owner", "ordered-input", endpoint, {
    nullable: null,
    refs: ["second", "first"],
    options: { count: 0, enabled: false },
  });
  assert.equal(recovered?.id, reserved.job.id);
  assert.throws(
    () =>
      db.findFalReservation("fingerprint-owner", "ordered-input", endpoint, {
        ...input,
        refs: ["first", "second"],
      }),
    /different fal input/
  );
  assert.equal(db.findFalReservation("another-owner", "ordered-input", endpoint, input), null);
});

test("job ownership, model restrictions and connection scopes survive retrieval and cancellation", async () => {
  const response = await run.POST(request("run", "POST", body));
  const receipt = await response.json();
  assert.equal(response.status, 202, JSON.stringify(receipt));
  const outsider = await jobs.GET(request(`jobs/${receipt.id}`, "GET", undefined, otherKey.key), {
    params: Promise.resolve({ id: receipt.id }),
  });
  assert.equal(outsider.status, 403);
  const denied = await run.POST(
    request("run", "POST", { ...body, connection_id: otherConnection.id })
  );
  assert.equal(denied.status, 403);
  cancelStatus = "CANCELLATION_REQUESTED";
  const cancellation = await jobs.DELETE(request(`jobs/${receipt.id}`, "DELETE"), {
    params: Promise.resolve({ id: receipt.id }),
  });
  assert.equal(cancellation.status, 202);
  assert.equal((await cancellation.json()).status, "CANCELLATION_REQUESTED");
});

test("completed jobs remain retrievable when their unknown cost exhausts a limited budget", async () => {
  costs.setBudget(key.id, { dailyLimitUsd: 1, resetInterval: "daily" });
  try {
    const submitted = await run.POST(
      request("run", "POST", body, key.key, { "Idempotency-Key": "budget-recovery" })
    );
    assert.equal(submitted.status, 202, await submitted.clone().text());
    const receipt = await submitted.json();
    assert.equal(costs.checkBudget(key.id).allowed, false);
    const recovered = await run.POST(
      request("run", "POST", body, key.key, { "Idempotency-Key": "budget-recovery" })
    );
    assert.equal(recovered.status, 202, await recovered.clone().text());
    assert.equal((await recovered.json()).id, receipt.id);
    const result = await jobs.GET(request(`jobs/${receipt.id}?result=true`), {
      params: Promise.resolve({ id: receipt.id }),
    });
    assert.equal(result.status, 200, await result.clone().text());
    const next = await run.POST(
      request("run", "POST", body, key.key, { "Idempotency-Key": "new-after-budget" })
    );
    assert.equal(next.status, 429);
  } finally {
    costs.resetCostData();
  }
});

test("uncertain submissions retain a recoverable receipt after the budget fails closed", async () => {
  const fetcher = globalThis.fetch;
  let submissions = 0;
  globalThis.fetch = async (url, init) => {
    if (String(url) === `https://queue.fal.run/${endpoint}` && init?.method === "POST") {
      submissions++;
      throw new TypeError("connection reset after dispatch");
    }
    return fetcher(url, init);
  };
  costs.setBudget(key.id, { dailyLimitUsd: 1, resetInterval: "daily" });
  try {
    const first = await run.POST(
      request("run", "POST", body, key.key, { "Idempotency-Key": "uncertain-recovery" })
    );
    assert.equal(first.status, 502);
    const id = first.headers.get("X-Request-ID");
    assert.ok(id);
    assert.equal(costs.checkBudget(key.id).allowed, false);
    const recovered = await run.POST(
      request("run", "POST", body, key.key, { "Idempotency-Key": "uncertain-recovery" })
    );
    assert.equal(recovered.status, 202);
    const receipt = await recovered.json();
    assert.equal(receipt.id, id);
    assert.equal(receipt.status, "SUBMISSION_UNKNOWN");
    assert.equal(submissions, 1);
  } finally {
    globalThis.fetch = fetcher;
    costs.resetCostData();
  }
});

test("discovery retains cursors and malformed/missing schemas cannot execute", async () => {
  const response = await models.GET(request("models?q=mesh&category=image-to-3d&cursor=page-two"));
  assert.equal(response.status, 200);
  const url = new URL(sent[0].url);
  assert.equal(url.searchParams.get("cursor"), "page-two");
  assert.equal(url.searchParams.get("category"), "image-to-3d");
  const missing = await run.POST(
    request("run", "POST", { endpoint_id: "missing/endpoint", input: {}, transport: "direct" })
  );
  assert.equal(missing.status, 404);
  assert.equal(
    sent.some((call) => call.method === "POST"),
    false
  );
});

test("management registration validates a manual schema and gives it a real native path", async () => {
  const manual = { ...definition, endpoint_id: "new-publisher/private-app" };
  const registered = await registration.PUT(
    new Request(`http://localhost/api/providers/${connection.id}/fal`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${key.key}`, "Content-Type": "application/json" },
      body: JSON.stringify(manual),
    }),
    { params: Promise.resolve({ id: String(connection.id) }) }
  );
  assert.equal(registered.status, 200, await registered.clone().text());
  const result = await run.POST(
    request("run", "POST", {
      ...body,
      endpoint_id: manual.endpoint_id,
      connection_id: connection.id,
      transport: "direct",
    })
  );
  assert.equal(result.status, 200, await result.clone().text());
  assert.equal(
    sent.some((call) => call.url === "https://fal.run/new-publisher/private-app"),
    true
  );
});

test("manual registration rejects invalid envelopes before discovery or dispatch", async () => {
  for (const value of [null, [], {}, { endpoint_id: endpoint, openapi: [] }]) {
    const response = await registration.PUT(
      new Request(`http://localhost/api/providers/${connection.id}/fal`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${key.key}`, "Content-Type": "application/json" },
        body: JSON.stringify(value),
      }),
      { params: Promise.resolve({ id: String(connection.id) }) }
    );
    assert.equal(response.status, 400, await response.clone().text());
  }
  assert.equal(sent.length, 0);
});

test("socket input rejects invalid envelopes without spending another inference", async () => {
  const id = "invalid-socket-envelope";
  db.saveFalJob({
    id,
    owner: key.id,
    connectionId: String(connection.id),
    endpoint: "fal-ai/fast-lcm-diffusion",
    transport: "realtime",
    status: "REALTIME",
    createdAt: Date.now(),
    accounted: true,
  });
  for (const value of [null, [], {}, { input: [] }, { input: {}, extra: true }]) {
    const response = await jobs.POST(request(`jobs/${id}`, "POST", value), {
      params: Promise.resolve({ id }),
    });
    assert.equal(response.status, 400, await response.clone().text());
  }
  assert.equal(sent.length, 0);
  assert.equal(db.loadFalJob(id)?.status, "REALTIME");
});

test("image edit JSON preserves quality, custom dimensions, masks, count and schema-specific reference limit", async () => {
  const response = await edits.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "fal-ai/openai/gpt-image-2.5/sunburst/edit",
        prompt: "a blue cube",
        quality: "max",
        size: "1536x1024",
        mask: "data:image/png;base64,BAUG",
        n: 2,
        enable_safety_checker: false,
        images: Array.from({ length: 12 }, () => "data:image/png;base64,AQID"),
      }),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  const posted = sent.find(
    (call) => call.url === "https://fal.run/openai/gpt-image-2.5/sunburst/edit"
  )!.body!;
  assert.equal(posted.quality, "max");
  assert.equal(posted.num_images, 2);
  assert.equal(posted.enable_safety_checker, false);
  assert.equal(posted.mask_url, "data:image/png;base64,BAUG");
  assert.deepEqual(posted.image_size, { width: 1536, height: 1024 });
  assert.equal((posted.image_urls as string[]).length, 12);
});

test("image edit multipart preserves additional fields and ordered references", async () => {
  const form = new FormData();
  form.set("model", "fal-ai/openai/gpt-image-2.5/flare/edit");
  form.set("prompt", "a blue cube");
  form.set("quality", "max");
  form.set("n", "2");
  form.append("image[]", new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" }), "first.png");
  form.append(
    "image[]",
    new Blob([new Uint8Array([4, 5, 6])], { type: "image/png" }),
    "second.png"
  );
  form.set("mask", new Blob([new Uint8Array([7, 8, 9])], { type: "image/png" }), "mask.png");
  const response = await edits.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}` },
      body: form,
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  const posted = sent.find(
    (call) => call.url === "https://fal.run/openai/gpt-image-2.5/flare/edit"
  )!.body!;
  assert.equal(posted.quality, "max");
  assert.equal(posted.num_images, 2);
  assert.deepEqual(posted.image_urls, ["data:image/png;base64,AQID", "data:image/png;base64,BAUG"]);
  assert.equal(posted.mask_url, "data:image/png;base64,BwgJ");
});
