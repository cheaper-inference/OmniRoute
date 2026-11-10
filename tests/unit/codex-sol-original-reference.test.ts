import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

const scratch = path.resolve(".ci-work");
fs.mkdirSync(scratch, { recursive: true });
const owned = fs.mkdtempSync(path.join(scratch, "isolated-sol-reference-"));
const home = path.join(owned, "home");
const environment = {
  DATA_DIR: path.join(owned, "data"),
  HOME: home,
  USERPROFILE: home,
  APPDATA: path.join(home, "AppData", "Roaming"),
  LOCALAPPDATA: path.join(home, "AppData", "Local"),
  XDG_CONFIG_HOME: path.join(home, ".config"),
  XDG_CACHE_HOME: path.join(home, ".cache"),
  OMNIROUTE_PLUGINS_DIR: path.join(owned, "plugins"),
};
for (const [key, directory] of Object.entries(environment)) {
  fs.mkdirSync(directory, { recursive: true });
  process.env[key] = directory;
}
process.env.APP_LOG_TO_FILE = "false";
process.env.NODE_ENV = "test";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_SKIP_DNS_WRITE = "1";
process.env.ADOBE_FIREFLY_BROWSER_REFRESH = "0";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "sol-reference-fixture-only";

const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Unexpected upstream request in isolated Sol fixture");
};
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { POST } = await import("../../src/app/api/v1/images/edits/route.ts");

test.after(
  async () => {
    globalThis.fetch = originalFetch;
    try {
      assert.ok(await callLogs.waitForCallLogSaves(2000), "Call-log saves must settle");
    } finally {
      try {
        await callLogs.closeCallLogSaves(2000);
      } finally {
        core.resetDbInstance();
        fs.rmSync(owned, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    }
  },
  { timeout: 6000 }
);

test.before(
  async () => {
    await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "sol-reference-fixture",
      accessToken: "fixture-access-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { workspacePlanType: "plus", workspaceId: "fixture-workspace" },
    });
    await createCombo({
      name: "fixture-sol-reference-combo",
      strategy: "priority",
      models: ["cx/gpt-6.1-sol-image"],
    });
  },
  { timeout: 10000 }
);

test(
  "public Sol edit preserves large references across canonical and catalog aliases",
  { timeout: 5000 },
  async () => {
    const source = await sharp({
      create: { width: 1025, height: 140, channels: 3, background: "#176fa8" },
    })
      .png({ compressionLevel: 0 })
      .toBuffer();
    assert.ok(source.length > 400_000, "Reference must cross the legacy resize threshold");
    const dataUrl = `data:image/png;base64,${source.toString("base64")}`;
    const digest = (value: Buffer) => createHash("sha256").update(value).digest("hex");
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(String(url), "https://chatgpt.com/backend-api/codex/responses");
      assert.equal(
        new Headers(options?.headers).get("authorization"),
        "Bearer fixture-access-token"
      );
      const body = JSON.parse(String(options?.body));
      assert.equal(body.model, "gpt-6.1-sol");
      assert.equal(body.tools[0].action, "edit");
      const images = body.input[0].content.filter((item) => item.type === "input_image");
      assert.equal(images.length, 1);
      assert.ok(images[0].image_url.startsWith("data:image/png;base64,"));
      const submitted = Buffer.from(images[0].image_url.split(",")[1], "base64");
      assert.equal(submitted.length, source.length);
      assert.equal(digest(submitted), digest(source));
      return new Response(
        `data: ${JSON.stringify({
          type: "response.output_item.done",
          item: { type: "image_generation_call", result: "Zml4dHVyZS1vdXRwdXQ=" },
        })}\n\n`,
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    };
    for (const model of [
      "codex/gpt-6.1-sol",
      "codex/gpt-6.1-sol-image",
      "cx/gpt-6.1-sol-image",
      "gpt-6.1-sol-image",
    ]) {
      const before = calls;
      const response = await POST(
        new Request("http://localhost/api/v1/images/edits", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model, prompt: "make the background blue", image: dataUrl }),
        })
      );
      assert.equal(response.status, 200, await response.clone().text());
      const output = await response.json();
      assert.equal(output.data.length, 1);
      assert.equal(output.data[0].b64_json, "Zml4dHVyZS1vdXRwdXQ=");
      assert.equal(calls, before + 1, "One request must make exactly one submission");
    }
    for (const invalid of [
      { model: "cx/gpt-6.1-sol-unknown", image: dataUrl },
      { model: "cx/gpt-6.1-sol-image", image: "data:image/jpeg;base64,aW52YWxpZA==" },
    ]) {
      const before = calls;
      const response = await POST(
        new Request("http://localhost/api/v1/images/edits", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ prompt: "make the background blue", ...invalid }),
        })
      );
      assert.equal(response.status, 400);
      assert.equal(calls, before, "Invalid input must fail before upstream submission");
    }
    for (const model of ["cx/gpt-6.1-sol-image", "fixture-sol-reference-combo"]) {
      for (const multipart of [false, true]) {
        for (const field of ["mask", "mask_url"]) {
          let request: Request;
          if (multipart) {
            const body = new FormData();
            body.set("model", model);
            body.set("prompt", "make the background blue");
            body.set(
              "image",
              new Blob([new Uint8Array(source)], { type: "image/png" }),
              "source.png"
            );
            body.set(field, "");
            request = new Request("http://localhost/api/v1/images/edits", { method: "POST", body });
          } else {
            request = new Request("http://localhost/api/v1/images/edits", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                model,
                prompt: "make the background blue",
                image: dataUrl,
                [field]: null,
              }),
            });
          }
          const before = calls;
          const response = await POST(request);
          assert.equal(response.status, 400);
          assert.match((await response.json()).error.message, /masks/i);
          assert.equal(calls, before, "Mask presence must reject before a submission");
        }
      }
    }
  }
);
