import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-edit-controls-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET ||= "image-control-test-secret";
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection, createProviderNode } =
  await import("../../src/lib/db/providers.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { POST } = await import("../../src/app/api/v1/images/edits/route.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const originalFetch = globalThis.fetch;
const url = "http://localhost/api/v1/images/edits";
const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 1]);
const image = "data:image/png;base64," + Buffer.from(png).toString("base64");
const baseUrl = "https://custom.example/v1";
const customId = "openai-compatible-edits-test";
const model = "gpt-image-2.5-sunburst";
const targets = {
  custom: { model: "edit-node/" + model, endpoint: baseUrl + "/images/edits" },
  codex: {
    model: "codex/" + model,
    endpoint: "https://chatgpt.com/backend-api/codex/images/edits",
  },
  openrouter: {
    model: "openrouter/openai/" + model,
    endpoint: "https://openrouter.ai/api/v1/images",
  },
};

test.before(async () => {
  await createProviderNode({
    id: customId,
    type: "openai-compatible",
    name: "edit node",
    prefix: "edit-node",
    baseUrl,
  });
  for (const provider of [customId, "openrouter", "codex"]) {
    await createProviderConnection({
      provider,
      authType: "apikey",
      name: provider,
      apiKey: "test-image-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { baseUrl },
    });
  }
  for (const [name, target] of Object.entries(targets)) {
    if (name === "custom") continue;
    await createCombo({
      name: name + "-edit-combo",
      strategy: "priority",
      models: ["openai/gpt-image-2", target.model],
    });
  }
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  await waitForCallLogSaves(5000);
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

function jsonRequest(model: string, controls: Record<string, unknown>) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, prompt: "edit this", image, ...controls }),
  });
}

for (const [name, target] of Object.entries(targets)) {
  for (const dispatch of name === "custom" ? ["direct"] : ["direct", "combo"]) {
    test(name + " " + dispatch + " edit forwards only supplied image controls", async () => {
      const received: Record<string, unknown>[] = [];
      const endpoints: string[] = [];
      globalThis.fetch = async (input, init) => {
        endpoints.push(String(input));
        const request = new Request(input, init);
        const body =
          name === "custom" ? Object.fromEntries(await request.formData()) : await request.json();
        received.push(
          Object.fromEntries(
            Object.entries(body).filter(([key]) => ["quality", "background"].includes(key))
          )
        );
        return Response.json({ data: [{ b64_json: "ZWRpdGVk" }] });
      };
      const controls = [
        {},
        { quality: "low" },
        { background: "opaque" },
        { quality: "high", background: "transparent" },
      ];
      const routeModel = dispatch === "direct" ? target.model : name + "-edit-combo";
      for (const options of controls) {
        let request = jsonRequest(routeModel, options);
        if (name === "codex") {
          const form = new FormData();
          form.set("image", new Blob([png], { type: "image/png" }), "source.png");
          form.set("prompt", "edit this");
          form.set("model", routeModel);
          for (const [key, value] of Object.entries(options)) form.set(key, value);
          request = new Request(url, { method: "POST", body: form });
        }
        const response = await POST(request);
        assert.equal(response.status, 200, await response.text());
      }
      assert.deepEqual(
        endpoints,
        controls.map(() => target.endpoint)
      );
      assert.deepEqual(received, controls);
    });
  }
}

test("malformed edit controls return a field-specific 400 before upstream dispatch", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ data: [{ b64_json: "ZWRpdGVk" }] });
  };
  for (const [field, value] of Object.entries({ quality: "lo\nw", background: null })) {
    const response = await POST(jsonRequest(targets.custom.model, { [field]: value }));
    assert.equal(response.status, 400);
    assert.match(await response.text(), new RegExp(field));
  }
  assert.equal(calls, 0);
});

test("a file supplied as a multipart edit control is malformed", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ data: [{ b64_json: "ZWRpdGVk" }] });
  };
  const form = new FormData();
  form.set("model", targets.custom.model);
  form.set("prompt", "edit this");
  form.set("image", new Blob([png], { type: "image/png" }), "source.png");
  form.set("quality", new Blob(["low"]), "quality.txt");
  const response = await POST(new Request(url, { method: "POST", body: form }));
  assert.equal(response.status, 400);
  assert.match(await response.text(), /quality/);
  assert.equal(calls, 0);
});

test("malformed controls stop a mixed combo before its Firefly fallback", async () => {
  await createCombo({
    name: "firefly-fallback",
    strategy: "priority",
    models: [targets.openrouter.model, "adobe-firefly/flux-2"],
  });
  await createProviderConnection({
    provider: "adobe-firefly",
    authType: "apikey",
    name: "firefly",
    apiKey:
      "eyJhbGciOiJSUzI1NiJ9." +
      Buffer.from(
        JSON.stringify({
          user_id: "test@AdobeID",
          type: "access_token",
          client_id: "clio-playground-web",
        })
      ).toString("base64url") +
      "." +
      "x".repeat(40),
    isActive: true,
  });
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({}, { status: 400 });
  };
  const response = await POST(jsonRequest("firefly-fallback", { quality: false }));
  assert.equal(calls, 0);
  assert.equal(response.status, 400);
  assert.match(await response.text(), /Invalid image edit quality/);
});
