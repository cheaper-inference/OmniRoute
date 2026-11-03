/**
 * Kiro API-key import must prove the key on the same Amazon Q surface used for inference
 * (`q.<region>/ListAvailableModels`) and pin the connection to the region where it works.
 * Auto mode probes us-east-1 then eu-central-1; an explicit region probes only that region.
 * ListAvailableProfiles is NOT proof (AWS denies it for every API key), so a key rejected by
 * the model catalog in every candidate region must fail the import.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { KiroService } from "../../src/lib/oauth/services/kiro.ts";
import { kiroApiKeyImportSchema } from "../../src/shared/validation/schemas/auth.ts";
import { isKiroApiKeyImportClientError } from "../../src/app/api/oauth/kiro/api-key/helpers.ts";

type FetchCall = { url: string; init?: RequestInit };

const PROFILE_DENIED = JSON.stringify({
  __type: "com.amazon.aws.codewhisperer#AccessDeniedException",
  message: "API key authentication is not supported for this operation.",
});

async function withFetch<T>(
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>,
  run: (calls: FetchCall[]) => Promise<T>
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (url: URL | string, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return handler(String(url), init);
  }) as typeof fetch;
  try {
    return await run(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function modelsOk(): Response {
  return new Response(JSON.stringify({ models: [{ modelId: "claude-sonnet-4.5" }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("auto mode: us-east-1 rejects, eu-central-1 accepts → region pinned to eu-central-1", async () => {
  await withFetch(
    (url) => {
      if (url.startsWith("https://q.us-east-1.amazonaws.com/ListAvailableModels")) {
        return new Response("{}", { status: 401 });
      }
      if (url.startsWith("https://q.eu-central-1.amazonaws.com/ListAvailableModels")) {
        return modelsOk();
      }
      return new Response(PROFILE_DENIED, { status: 403 });
    },
    async (calls) => {
      const credential = await new KiroService().validateApiKey(" ksk_live ", "auto");
      assert.equal(credential.region, "eu-central-1");
      assert.equal(credential.accessToken, "ksk_live");
      assert.equal(credential.authMethod, "api_key");
      assert.equal(credential.profileArn, null);

      const modelCalls = calls.filter((c) => c.url.includes("/ListAvailableModels"));
      assert.deepEqual(
        modelCalls.map((c) => c.url),
        [
          "https://q.us-east-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR",
          "https://q.eu-central-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR",
        ]
      );
      const headers = modelCalls[0].init?.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer ksk_live");
      assert.equal(headers.tokentype, "API_KEY");
      assert.ok(modelCalls[0].init?.signal, "each probe must carry a timeout signal");
    }
  );
});

test("auto is the default when no region is given and us-east-1 wins first", async () => {
  await withFetch(
    (url) =>
      url.includes("/ListAvailableModels")
        ? modelsOk()
        : new Response(PROFILE_DENIED, { status: 403 }),
    async (calls) => {
      const credential = await new KiroService().validateApiKey("ksk_live");
      assert.equal(credential.region, "us-east-1");
      assert.equal(calls.filter((c) => c.url.includes("/ListAvailableModels")).length, 1);
    }
  );
});

test("auto mode: key rejected in every candidate region → import fails as a client error", async () => {
  await withFetch(
    (url) =>
      url.includes("/ListAvailableModels")
        ? new Response("{}", { status: 403 })
        : new Response(PROFILE_DENIED, { status: 403 }),
    async () => {
      await assert.rejects(
        () => new KiroService().validateApiKey("ksk_dead", "auto"),
        (error: unknown) => {
          assert.ok(isKiroApiKeyImportClientError(error), String(error));
          assert.match(String((error as Error).message), /invalid kiro api key/i);
          return true;
        }
      );
    }
  );
});

test("explicit region probes only that region", async () => {
  await withFetch(
    (url) =>
      url.includes("/ListAvailableModels")
        ? modelsOk()
        : new Response(PROFILE_DENIED, { status: 403 }),
    async (calls) => {
      const credential = await new KiroService().validateApiKey("ksk_live", "eu-central-1");
      assert.equal(credential.region, "eu-central-1");
      const modelCalls = calls.filter((c) => c.url.includes("/ListAvailableModels"));
      assert.deepEqual(
        modelCalls.map((c) => c.url),
        ["https://q.eu-central-1.amazonaws.com/ListAvailableModels?origin=AI_EDITOR"]
      );
    }
  );
});

test("explicit region outside the Amazon Q allowlist is rejected before any fetch", async () => {
  await withFetch(
    () => modelsOk(),
    async (calls) => {
      await assert.rejects(
        () => new KiroService().validateApiKey("ksk_live", "evil.com/x"),
        /region/i
      );
      assert.equal(calls.length, 0);
    }
  );
});

test("upstream 5xx in every region is a server-side failure, not an invalid key", async () => {
  await withFetch(
    () => new Response("boom", { status: 503 }),
    async () => {
      await assert.rejects(
        () => new KiroService().validateApiKey("ksk_live", "auto"),
        (error: unknown) => {
          assert.equal(isKiroApiKeyImportClientError(error), false);
          return true;
        }
      );
    }
  );
});

test("kiroApiKeyImportSchema defaults region to auto and allowlists Amazon Q regions", () => {
  const defaulted = kiroApiKeyImportSchema.safeParse({ apiKey: "ksk_live" });
  assert.equal(defaulted.success, true);
  assert.equal(defaulted.success && defaulted.data.region, "auto");

  for (const region of ["auto", "us-east-1", "eu-central-1"]) {
    const parsed = kiroApiKeyImportSchema.safeParse({ apiKey: "ksk_live", region });
    assert.equal(parsed.success, true, region);
  }

  for (const region of ["eu-west-1", "evil.com/x", "us-east-1.attacker"]) {
    const parsed = kiroApiKeyImportSchema.safeParse({ apiKey: "ksk_live", region });
    assert.equal(parsed.success, false, region);
  }
});
