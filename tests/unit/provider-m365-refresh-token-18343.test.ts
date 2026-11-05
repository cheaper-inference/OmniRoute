import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-m365-refresh-18343-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "m365-refresh-synthetic-storage-key-18343";
process.env.JWT_SECRET = "m365-refresh-synthetic-management-secret-18343";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { summarizeProviderConnectionForAudit } =
  await import("../../src/lib/compliance/providerAudit.ts");
const listRoute = await import("../../src/app/api/providers/route.ts");
const detailRoute = await import("../../src/app/api/providers/[id]/route.ts");
const recordSchema = z.record(z.string(), z.unknown());
const OLD = "ROTATED-OLD-synthetic-18343";
const LEGACY = "LEGACY-OLD-synthetic-18343";
const NEW = "NEW-REFRESH-synthetic-18343";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seed(provider = "copilot-m365-web", canonical = true) {
  return providers.createProviderConnection({
    provider,
    authType: "apikey",
    name: `fixture-${randomUUID()}`,
    apiKey: `synthetic-invalid-access-${randomUUID()}`,
    ...(canonical ? { refreshToken: OLD } : {}),
    providerSpecificData: { refreshToken: LEGACY, tier: "enterprise", tags: ["keep"] },
  });
}

async function write(id: string, body: Record<string, unknown>, method: "PUT" | "PATCH" = "PUT") {
  return detailRoute[method](
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, { method, body }),
    { params: Promise.resolve({ id }) }
  );
}

async function post(providerSpecificData: Record<string, unknown>) {
  return listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: { "x-skip-model-sync": "true" },
      body: {
        provider: "copilot-m365-web",
        name: `new-${randomUUID()}`,
        apiKey: `synthetic-invalid-access-${randomUUID()}`,
        providerSpecificData,
      },
    })
  );
}

async function responseRecord(response: Response, expectedStatus = 200) {
  assert.equal(response.status, expectedStatus);
  const body: unknown = await response.json();
  return recordSchema.parse(body);
}

function assertSecretFree(value: unknown) {
  const serialized = JSON.stringify(value);
  for (const token of [OLD, LEGACY, NEW]) {
    assert.equal(serialized.includes(token), false, "refresh token must never be exposed");
  }
}

test("POST promotes a trimmed M365 token to encrypted canonical storage and redacts credentials", async () => {
  const body = await responseRecord(
    await post({ refreshToken: ` ${NEW} `, tier: "enterprise" }),
    201
  );
  assertSecretFree(body);
  const connection = recordSchema.parse(body.connection);
  for (const field of ["apiKey", "accessToken", "refreshToken", "idToken"]) {
    assert.equal(Object.hasOwn(connection, field), false);
  }
  const id = z.string().parse(connection.id);
  const stored = await providers.getProviderConnectionById(id);
  assert.ok(stored);
  assert.equal(stored.refreshToken, NEW);
  assert.equal(stored.providerSpecificData.refreshToken, undefined);
  const raw: unknown = core
    .getDbInstance()
    .prepare("SELECT refresh_token FROM provider_connections WHERE id = ?")
    .get(id);
  const row = z.object({ refresh_token: z.string() }).parse(raw);
  assert.ok(row.refresh_token.startsWith("enc:v1:"));
  assert.equal(row.refresh_token.includes(NEW), false);
  assertSecretFree(summarizeProviderConnectionForAudit(stored));
});

for (const method of ["PUT", "PATCH"] as const) {
  test(`${method} supersedes a rotated token and removes only the obsolete nested credential`, async () => {
    const fixture = await seed();
    const body = await responseRecord(
      await write(
        fixture.id,
        {
          providerSpecificData: { refreshToken: ` ${NEW} ` },
        },
        method
      )
    );
    assertSecretFree(body);
    const stored = await providers.getProviderConnectionById(fixture.id);
    assert.ok(stored);
    assert.equal(stored.refreshToken, NEW);
    assert.equal(stored.providerSpecificData.refreshToken, undefined);
    assert.equal(stored.providerSpecificData.tier, "enterprise");
    assert.deepEqual(stored.providerSpecificData.tags, ["keep"]);
    assert.equal(
      fixture.providerSpecificData.refreshToken,
      LEGACY,
      "do not mutate cached fixtures"
    );
  });

  for (const canonical of [true, false]) {
    for (const patch of [{}, { refreshToken: "" }, { refreshToken: "   " }, { tier: "business" }]) {
      test(`${method} preserves ${canonical ? "canonical and legacy" : "legacy-only"} tokens for ${JSON.stringify(patch)}`, async () => {
        const fixture = await seed("copilot-m365-web", canonical);
        await responseRecord(
          await write(fixture.id, { name: "renamed", providerSpecificData: patch }, method)
        );
        const stored = await providers.getProviderConnectionById(fixture.id);
        assert.ok(stored);
        assert.equal(stored.refreshToken, canonical ? OLD : undefined);
        assert.equal(stored.providerSpecificData.refreshToken, LEGACY);
      });
    }
  }
}

test("rename without metadata preserves both M365 tokens", async () => {
  const fixture = await seed();
  await responseRecord(await write(fixture.id, { name: "only-rename" }));
  const stored = await providers.getProviderConnectionById(fixture.id);
  assert.ok(stored);
  assert.equal(stored.refreshToken, OLD);
  assert.equal(stored.providerSpecificData.refreshToken, LEGACY);
});

test("other providers retain nested metadata replacement behavior", async () => {
  const fixture = await seed("openai");
  await responseRecord(await write(fixture.id, { providerSpecificData: { refreshToken: NEW } }));
  const stored = await providers.getProviderConnectionById(fixture.id);
  assert.ok(stored);
  assert.equal(stored.refreshToken, OLD);
  assert.equal(stored.providerSpecificData.refreshToken, NEW);
});

for (const token of [null, 123, {}, "X".repeat(100_001), " enc:v1:synthetic-envelope "]) {
  test(`rejects invalid M365 refresh input (${typeof token}, length ${typeof token === "string" ? token.length : 0}) safely`, async () => {
    const fixture = await seed();
    for (const response of [
      await post({ refreshToken: token }),
      await write(fixture.id, {
        providerSpecificData: { refreshToken: token },
      }),
    ]) {
      const body = await responseRecord(response, 400);
      assertSecretFree(body);
      assert.equal(JSON.stringify(body).includes("synthetic-envelope"), false);
      assert.equal(JSON.stringify(body).includes("X".repeat(100)), false);
    }
  });
}

test("accepts a bounded opaque refresh token and a missing field on create", async () => {
  const token = "x".repeat(100_000);
  const body = await responseRecord(await post({ refreshToken: token }), 201);
  const connection = recordSchema.parse(body.connection);
  const stored = await providers.getProviderConnectionById(z.string().parse(connection.id));
  assert.ok(stored);
  assert.equal(stored.refreshToken, token);
  await responseRecord(await post({}), 201);
});

test("list, detail, update and audit summaries never reveal M365 tokens even with API key reveal", async () => {
  const fixture = await seed();
  for (const reveal of ["false", "true"]) {
    process.env.ALLOW_API_KEY_REVEAL = reveal;
    const requests = [
      listRoute.GET(
        await makeManagementSessionRequest(
          "http://localhost/api/providers?provider=copilot-m365-web"
        )
      ),
      detailRoute.GET(
        await makeManagementSessionRequest(`http://localhost/api/providers/${fixture.id}`),
        {
          params: Promise.resolve({ id: fixture.id }),
        }
      ),
      write(fixture.id, { name: "secret-free" }),
      write(fixture.id, { name: "secret-free-patch" }, "PATCH"),
    ];
    for (const response of await Promise.all(requests)) {
      assertSecretFree(await responseRecord(response));
    }
    assertSecretFree(
      summarizeProviderConnectionForAudit(await providers.getProviderConnectionById(fixture.id))
    );
  }
  delete process.env.ALLOW_API_KEY_REVEAL;
});
