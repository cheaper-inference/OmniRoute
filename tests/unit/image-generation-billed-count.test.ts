import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before any module that may open the SQLite singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-billed-count-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-billed-count-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");

const PER_IMAGE_USD = 0.25;
const originalFetch = globalThis.fetch;

test.before(async () => {
  await updatePricing({
    sdwebui: { "stable-diffusion-v1-5": { output_cost_per_image: PER_IMAGE_USD } },
  });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// SD WebUI echoes whatever images it produced; the request's `n` only sets batch_size.
function mockSdWebUi(images: string[]) {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:7860/sdapi/v1/txt2img") {
      return new Response(JSON.stringify({ images }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;
}

async function generate(n: number) {
  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "sdwebui/stable-diffusion-v1-5", prompt: "billing", n }),
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: unknown[] };
  const cost = Number(response.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost));
  return { returned: body.data.length, cost };
}

test("images route bills the images returned, not the n requested", async () => {
  mockSdWebUi(["aW1hZ2Ux"]);
  const { returned, cost } = await generate(4);
  assert.equal(returned, 1);
  assert.equal(cost, PER_IMAGE_USD * 1);
});

test("images route bills every image when the provider returns all n", async () => {
  mockSdWebUi(["aW1hZ2Ux", "aW1hZ2Uy", "aW1hZ2Uz"]);
  const { returned, cost } = await generate(3);
  assert.equal(returned, 3);
  assert.equal(cost, PER_IMAGE_USD * 3);
});
