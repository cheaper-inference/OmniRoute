// Key Templates API: CRUD with revisions, secret-free key preview, acknowledgement of
// lifecycle/exclusions, atomic policy-based key creation, credential enforcement for
// management scopes and independence of keys from later template edits.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-templates-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-key-templates";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const groupsDb = await import("../../src/lib/db/apiKeyGroups.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const templatesRoute = await import("../../src/app/api/key-templates/route.ts");
const templateRoute = await import("../../src/app/api/key-templates/[id]/route.ts");
const previewRoute = await import("../../src/app/api/keys/[id]/template-policy/route.ts");
const { createDefaultKeyTemplatePolicy } = await import("../../src/shared/types/keyTemplates.ts");

const BASE = "http://localhost";
const CONN = "0b7f8f2e-4a1c-4c55-9d1e-2b8d1f0c7a11";

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  const { updateSettings } = await import("@/lib/db/settings");
  await updateSettings({ requireLogin: true, password: "" });
}

function seedConnection() {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO provider_connections (id, provider, is_active, created_at, updated_at) VALUES (?, ?, 1, ?, ?)"
    )
    .run(CONN, "openai", now, now);
}

const params = (id: string) => ({ params: Promise.resolve({ id }) });

async function post(url: string, body: unknown) {
  return makeManagementSessionRequest(`${BASE}${url}`, { method: "POST", body: body as never });
}

function restrictedPolicy() {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.modelAccessMode = "restricted";
  policy.key.allowedModels = [];
  policy.key.allowedCombos = [];
  policy.key.blockedModels = ["vendor/*-preview"];
  policy.key.allowedConnections = [CONN];
  policy.key.catalogScope = "combos";
  policy.related.quotaLimits = { tpmLimit: 1000, rpmLimit: 10, monthlyAmountUsd: null };
  policy.related.tokenLimits = [
    {
      scopeType: "global",
      scopeValue: "",
      tokenLimit: 5000,
      resetInterval: "daily",
      resetTime: "00:00",
      enabled: true,
    },
  ];
  policy.expiry = { mode: "relative", ttlSeconds: 3600 };
  return policy;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  core.resetDbInstance();
});

test("template routes require management authentication", async () => {
  await enableManagementAuth();
  const anonymous = await templatesRoute.GET(new Request(`${BASE}/api/key-templates`));
  assert.equal(anonymous.status, 401);
  const preview = await previewRoute.GET(
    new Request(`${BASE}/api/keys/x/template-policy`),
    params("x")
  );
  assert.equal(preview.status, 401);
});

test("template CRUD with revision checks and no-store responses", async () => {
  seedConnection();
  const created = await templatesRoute.POST(
    await post("/api/key-templates", { name: "Restricted", policy: restrictedPolicy() })
  );
  assert.equal(created.status, 201);
  assert.equal(created.headers.get("cache-control"), "no-store");
  const { template, warnings } = (await created.json()) as any;
  assert.deepEqual(warnings, []);
  assert.equal(template.revision, 1);
  assert.equal(template.schemaVersion, 1);
  assert.deepEqual(template.policy.key.allowedCombos, []);

  const duplicateName = await templatesRoute.POST(
    await post("/api/key-templates", { name: "restricted", policy: restrictedPolicy() })
  );
  assert.equal(duplicateName.status, 409);
  assert.equal(((await duplicateName.json()) as any).code, "TEMPLATE_NAME_CONFLICT");

  const list = (await (
    await templatesRoute.GET(await makeManagementSessionRequest(`${BASE}/api/key-templates`))
  ).json()) as any;
  assert.equal(list.templates.length, 1);

  const read = (await (
    await templateRoute.GET(
      await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`),
      params(template.id)
    )
  ).json()) as any;
  assert.deepEqual(read.referenceIssues, []);

  const patched = await templateRoute.PATCH(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`, {
      method: "PATCH",
      body: { revision: 1, description: "Deny-all raw models" },
    }),
    params(template.id)
  );
  assert.equal(patched.status, 200);
  assert.equal(((await patched.json()) as any).template.revision, 2);

  const stale = await templateRoute.PATCH(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`, {
      method: "PATCH",
      body: { revision: 1, name: "Overwrite" },
    }),
    params(template.id)
  );
  assert.equal(stale.status, 409);
  assert.equal(((await stale.json()) as any).code, "REVISION_CONFLICT");

  const deleted = await templateRoute.DELETE(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`, {
      method: "DELETE",
    }),
    params(template.id)
  );
  assert.deepEqual(await deleted.json(), { success: true });
  const gone = await templateRoute.GET(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`),
    params(template.id)
  );
  assert.equal(gone.status, 404);
  assert.equal(((await gone.json()) as any).code, "TEMPLATE_NOT_FOUND");
});

test("policies are strict: unknown fields such as secrets and inconsistent access are rejected", async () => {
  const withSecret = restrictedPolicy() as any;
  withSecret.key.key = "sk-should-never-be-stored";
  const rejected = await templatesRoute.POST(
    await post("/api/key-templates", { name: "Bad", policy: withSecret })
  );
  assert.equal(rejected.status, 400);
  const body = (await rejected.json()) as any;
  assert.equal(body.code, "VALIDATION_FAILED");
  assert.ok(Array.isArray(body.issues) && body.issues.length > 0);

  const inconsistent = createDefaultKeyTemplatePolicy();
  inconsistent.key.allowedModels = ["vendor/model"];
  const invalid = await templatesRoute.POST(
    await post("/api/key-templates", { name: "Bad", policy: inconsistent })
  );
  assert.equal(invalid.status, 400);
});

test("preview is secret-free and keeps deny-all semantics; lifecycle needs acknowledgement", async () => {
  const source = await apiKeysDb.createApiKey("Source", "machine-1", ["self:usage"]);
  await apiKeysDb.updateApiKeyPermissions(source.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
    allowedCombos: [],
    blockedModels: ["vendor/*"],
    isActive: false,
  });

  const preview = await previewRoute.GET(
    await makeManagementSessionRequest(`${BASE}/api/keys/${source.id}/template-policy`),
    params(source.id)
  );
  assert.equal(preview.status, 200);
  assert.equal(preview.headers.get("cache-control"), "no-store");
  const text = await preview.text();
  assert.ok(!text.includes(source.key), "secret is never in the preview");
  assert.ok(!text.includes(source.key.slice(0, 12)), "key prefix is never in the preview");
  assert.ok(!text.includes(source.id), "key identity is never in the policy");
  const body = JSON.parse(text);
  assert.equal(body.policy.key.modelAccessMode, "restricted");
  assert.deepEqual(body.policy.key.allowedModels, []);
  assert.deepEqual(body.policy.key.allowedCombos, []);
  assert.ok(body.warnings.some((w: any) => w.code === "KEY_DISABLED" && w.requiresAcknowledgement));

  const unacknowledged = await templatesRoute.POST(
    await post("/api/key-templates", { name: "From key", fromKeyId: source.id })
  );
  assert.equal(unacknowledged.status, 409);
  const pending = (await unacknowledged.json()) as any;
  assert.equal(pending.code, "ACKNOWLEDGEMENT_REQUIRED");
  assert.ok(pending.warnings.some((w: any) => w.code === "KEY_DISABLED"));

  const saved = await templatesRoute.POST(
    await post("/api/key-templates", {
      name: "From key",
      fromKeyId: source.id,
      acknowledge: ["KEY_DISABLED"],
    })
  );
  assert.equal(saved.status, 201);
  const { template } = (await saved.json()) as any;
  assert.equal(template.policy.key.isActive, true);
  assert.deepEqual(template.policy.key.allowedCombos, []);

  const missing = await previewRoute.GET(
    await makeManagementSessionRequest(`${BASE}/api/keys/nope/template-policy`),
    params("nope")
  );
  assert.equal(missing.status, 404);
  assert.equal(((await missing.json()) as any).code, "KEY_NOT_FOUND");
});

test("POST /api/keys with a policy creates the complete key atomically", async () => {
  seedConnection();
  const group = groupsDb.createKeyGroup("Team");
  const policy = restrictedPolicy();
  policy.related.groupIds = [group.id];
  const before = apiKeysDb.getApiKeysCount();

  const created = await keysRoute.POST(
    await post("/api/keys", { name: "From policy", policy, templateRef: { id: "t", revision: 1 } })
  );
  assert.equal(created.status, 201);
  assert.equal(created.headers.get("cache-control"), "no-store");
  const body = (await created.json()) as any;
  assert.match(body.key, /^sk-/);
  assert.equal(body.templateRef.status, "missing");
  assert.ok(body.policy.key.scopes.includes("self:usage"));
  assert.equal(apiKeysDb.getApiKeysCount(), before + 1);

  const stored = await apiKeysDb.getApiKeyById(body.id);
  assert.equal(stored?.modelAccessMode, "restricted");
  assert.deepEqual(stored?.allowedModels, []);
  assert.deepEqual(stored?.allowedCombos, []);
  assert.deepEqual(stored?.blockedModels, ["vendor/*-preview"]);
  assert.deepEqual(stored?.allowedConnections, [CONN]);
  assert.equal(stored?.catalogScope, "combos");
  assert.ok(stored?.expiresAt);
  assert.equal(await apiKeysDb.validateApiKey(body.key), true);
  assert.deepEqual(
    groupsDb.getKeyGroupsForApiKey(body.id).map((g: any) => g.id),
    [group.id]
  );
  const db = core.getDbInstance();
  assert.equal(
    (
      db
        .prepare("SELECT tpm_limit FROM api_key_quota_limits WHERE api_key_id = ?")
        .get(body.id) as any
    ).tpm_limit,
    1000
  );
  assert.equal(
    (
      db
        .prepare("SELECT count(*) AS n FROM api_key_token_limits WHERE api_key_id = ?")
        .get(body.id) as any
    ).n,
    1
  );
});

test("blocking stale references reject creation and leave no key behind", async () => {
  seedConnection();
  const policy = restrictedPolicy();
  policy.related.groupIds = ["missing-group"];
  const before = apiKeysDb.getApiKeysCount();
  const rejected = await keysRoute.POST(await post("/api/keys", { name: "Stale", policy }));
  assert.equal(rejected.status, 422);
  const body = (await rejected.json()) as any;
  assert.equal(body.code, "REFERENCE_INVALID");
  assert.equal(body.issues[0].path, "related.groupIds.0");
  assert.equal(body.key, undefined, "no secret on failure");
  assert.equal(apiKeysDb.getApiKeysCount(), before);
});

test("management scopes keep credential enforcement in open mode", async () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.scopes = ["manage"];
  const anonymousKey = await keysRoute.POST(
    new Request(`${BASE}/api/keys`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Admin", policy }),
    })
  );
  assert.equal(anonymousKey.status, 401);
  const anonymousTemplate = await templatesRoute.POST(
    new Request(`${BASE}/api/key-templates`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Admin", policy }),
    })
  );
  assert.equal(anonymousTemplate.status, 401);
  assert.equal(apiKeysDb.getApiKeysCount(), 0);
});

test("keys stay unchanged when their template is edited or deleted", async () => {
  seedConnection();
  const created = (await (
    await templatesRoute.POST(
      await post("/api/key-templates", { name: "Base", policy: restrictedPolicy() })
    )
  ).json()) as any;
  const template = created.template;
  const key = (await (
    await keysRoute.POST(
      await post("/api/keys", {
        name: "Child",
        policy: template.policy,
        templateRef: { id: template.id, revision: template.revision },
      })
    )
  ).json()) as any;
  assert.equal(key.templateRef.status, "current");

  const widened = structuredClone(template.policy);
  widened.key.allowedCombos = ["combo/*"];
  await templateRoute.PATCH(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`, {
      method: "PATCH",
      body: { revision: 1, policy: widened },
    }),
    params(template.id)
  );
  assert.deepEqual((await apiKeysDb.getApiKeyById(key.id))?.allowedCombos, []);

  await templateRoute.DELETE(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`, {
      method: "DELETE",
    }),
    params(template.id)
  );
  const stored = await apiKeysDb.getApiKeyById(key.id);
  assert.ok(stored, "deleting a template keeps keys");
  assert.deepEqual(stored?.allowedCombos, []);
});

test("legacy POST /api/keys keeps its contract and is not cacheable", async () => {
  const created = await keysRoute.POST(await post("/api/keys", { name: "Legacy", noLog: true }));
  assert.equal(created.status, 201);
  assert.equal(created.headers.get("cache-control"), "no-store");
  const body = (await created.json()) as any;
  assert.equal(body.noLog, true);
  assert.deepEqual(body.allowedCombos, ["combo/*"]);
});

test("save-from-key stores the same snapshot that was authorized before a source change", async () => {
  const created = await keysRoute.POST(await post("/api/keys", { name: "Captured source" }));
  assert.equal(created.status, 201);
  const source = await created.json();
  const { previewKeyTemplatePolicy, createKeyTemplateFromKey } =
    await import("../../src/lib/db/keyTemplates.ts");
  const captured = previewKeyTemplatePolicy(source.id);
  assert.equal(captured.policy.key.scopes.includes("manage"), false);
  await apiKeysDb.updateApiKeyPermissions(source.id, { scopes: ["manage"] });
  assert.equal(previewKeyTemplatePolicy(source.id).policy.key.scopes.includes("manage"), true);
  const saved = await createKeyTemplateFromKey(
    { name: "Captured policy", fromKeyId: source.id },
    captured
  );
  assert.deepEqual(saved.template.policy.key.scopes, captured.policy.key.scopes);
  assert.equal(saved.template.policy.key.scopes.includes("manage"), false);
});

test("policy creation rejects reasoning rules affecting other keys", async () => {
  const policy = restrictedPolicy();
  const rule = {
    name: "Not a global rule",
    description: "",
    scope: "global",
    comboId: null,
    connectionId: null,
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  };
  const response = await keysRoute.POST(
    await post("/api/keys", {
      name: "Isolated",
      policy: { ...policy, related: { ...policy.related, reasoningRules: [rule] } },
    })
  );
  assert.equal(response.status, 400);
  assert.equal(apiKeysDb.getApiKeysCount(), 0);
  assert.equal(
    core.getDbInstance().prepare("SELECT count(*) AS n FROM reasoning_routing_rules").get().n,
    0
  );
});

test("deferred capture sees one snapshot even when a separate WAL writer commits between reads", async () => {
  const created = await keysRoute.POST(await post("/api/keys", { name: "Snapshot source" }));
  assert.equal(created.status, 201);
  const source = await created.json();
  const group = groupsDb.createKeyGroup("Concurrent group");
  const db = core.getDbInstance();
  const file = (db.prepare("PRAGMA database_list").get() as { file: string }).file;
  const originalPrepare = db.prepare.bind(db);
  let attempted = false;
  db.prepare = ((sql: string) => {
    const stmt = originalPrepare(sql);
    if (sql !== "SELECT * FROM api_keys WHERE id = ?") return stmt;
    return {
      ...stmt,
      get(...args: unknown[]) {
        const row = stmt.get(...args);
        attempted = true;
        // The first SELECT fixes the snapshot; a WAL writer must not be blocked by
        // a reserved write lock and its newly inserted group must not leak in.
        const writer = spawnSync(
          process.execPath,
          [
            "--max-old-space-size=128",
            "--input-type=module",
            "-e",
            `
             import { DatabaseSync } from "node:sqlite";
             const peer = new DatabaseSync(process.argv[1]);
             peer.exec("PRAGMA busy_timeout=0");
             try {
               peer.prepare("INSERT INTO key_group_members (key_id, group_id) VALUES (?, ?)")
                 .run(process.argv[2], process.argv[3]);
               process.exitCode = 0;
             } catch (error) {
               process.exitCode = /locked|busy/i.test(String(error.message)) ? 2 : 3;
             } finally { peer.close(); }
           `,
            file,
            source.id,
            group.id,
          ],
          { encoding: "utf8", timeout: 5000 }
        );
        assert.equal(writer.status, 0, "a read snapshot must not reserve the writer lock");
        return row;
      },
    };
  }) as typeof db.prepare;
  try {
    const { previewKeyTemplatePolicy } = await import("../../src/lib/db/keyTemplates.ts");
    const snapshot = previewKeyTemplatePolicy(source.id);
    assert.equal(snapshot.policy.key.modelAccessMode, "all");
    assert.deepEqual(
      snapshot.policy.related.groupIds,
      [],
      "later tables must use the first SELECT snapshot"
    );
    assert.equal(
      (
        db.prepare("SELECT count(*) AS n FROM key_group_members WHERE key_id=?").get(source.id) as {
          n: number;
        }
      ).n,
      1
    );
    assert.equal(attempted, true);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("stored templates with unknown versions or invalid policy fail closed", async () => {
  const response = await templatesRoute.POST(
    await post("/api/key-templates", { name: "Versioned", policy: restrictedPolicy() })
  );
  assert.equal(response.status, 201);
  const { template } = await response.json();
  const db = core.getDbInstance();
  const get = async () =>
    templateRoute.GET(
      await makeManagementSessionRequest(`${BASE}/api/key-templates/${template.id}`),
      params(template.id)
    );
  db.prepare("UPDATE key_templates SET schema_version = 999 WHERE id = ?").run(template.id);
  assert.equal((await get()).status, 422);
  db.prepare("UPDATE key_templates SET schema_version = 1, policy = '{}' WHERE id = ?").run(
    template.id
  );
  assert.equal((await get()).status, 422);
  db.prepare("UPDATE key_templates SET policy = 'invalid-json' WHERE id = ?").run(template.id);
  assert.equal((await get()).status, 422);
});

test("a corrupt stored policy remains visible for deletion while healthy templates remain readable", async () => {
  const healthy = await templatesRoute.POST(
    await post("/api/key-templates", {
      name: "Healthy",
      policy: restrictedPolicy(),
    })
  );
  const broken = await templatesRoute.POST(
    await post("/api/key-templates", {
      name: "Broken",
      policy: restrictedPolicy(),
    })
  );
  const healthyId = (await healthy.json()).template.id;
  const brokenId = (await broken.json()).template.id;
  const db = core.getDbInstance();
  for (const [version, policy] of [
    [999, "{}"],
    [1, "{}"],
    [1, "{broken"],
  ] as const) {
    db.prepare("UPDATE key_templates SET schema_version=?, policy=? WHERE id=?").run(
      version,
      policy,
      brokenId
    );
    const response = await templatesRoute.GET(
      await makeManagementSessionRequest(`${BASE}/api/key-templates`)
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(
      body.templates.map((row: { id: string }) => row.id),
      [healthyId]
    );
    assert.deepEqual(body.unreadable, [
      {
        id: brokenId,
        name: "Broken",
        revision: 1,
        code: "VALIDATION_FAILED",
      },
    ]);
    const detail = await templateRoute.GET(
      await makeManagementSessionRequest(`${BASE}/api/key-templates/${brokenId}`),
      params(brokenId)
    );
    assert.equal(detail.status, 422, "individual detail must still fail closed");
  }
  const removed = await templateRoute.DELETE(
    await makeManagementSessionRequest(`${BASE}/api/key-templates/${brokenId}`, {
      method: "DELETE",
    }),
    params(brokenId)
  );
  assert.equal(removed.status, 200);
  assert.equal(
    (
      await (
        await templatesRoute.GET(await makeManagementSessionRequest(`${BASE}/api/key-templates`))
      ).json()
    ).unreadable.length,
    0
  );
});

test("real remote CLI tokens require admin for each template mutation but retain read access", async () => {
  await enableManagementAuth();
  const accessTokens = await import("../../src/lib/db/accessTokens.ts");
  const writer = accessTokens.createAccessToken({ name: "template-writer", scope: "write" }).secret;
  const reader = accessTokens.createAccessToken({ name: "template-reader", scope: "read" }).secret;
  const admin = accessTokens.createAccessToken({ name: "template-admin", scope: "admin" }).secret;
  const remote = (token: string, url: string, method = "GET", body?: unknown) =>
    new Request(`${BASE}${url}`, {
      method,
      headers: {
        authorization: `Bearer ${token}`,
        ...(body ? { "content-type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  const policy = restrictedPolicy();
  const url = "/api/key-templates";
  assert.equal((await templatesRoute.GET(remote(reader, url))).status, 200);
  assert.equal(
    (await templatesRoute.POST(remote(writer, url, "POST", { name: "No", policy }))).status,
    403
  );
  const created = await templatesRoute.POST(remote(admin, url, "POST", { name: "Admin", policy }));
  assert.equal(created.status, 201);
  const id = (await created.json()).template.id;
  const detail = `${url}/${id}`;
  assert.equal((await templateRoute.GET(remote(reader, detail), params(id))).status, 200);
  assert.equal(
    (
      await templateRoute.PATCH(
        remote(writer, detail, "PATCH", {
          revision: 1,
          name: "No rename",
        }),
        params(id)
      )
    ).status,
    403
  );
  const updated = await templateRoute.PATCH(
    remote(admin, detail, "PATCH", {
      revision: 1,
      name: "Renamed",
    }),
    params(id)
  );
  assert.equal(updated.status, 200);
  assert.equal(
    (await templateRoute.DELETE(remote(writer, detail, "DELETE"), params(id))).status,
    403
  );
  assert.equal(
    (await templateRoute.DELETE(remote(admin, detail, "DELETE"), params(id))).status,
    200
  );
});
