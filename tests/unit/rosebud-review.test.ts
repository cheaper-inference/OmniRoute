import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  rosebudImageBinding,
  scopedRosebudKey,
  matchesRosebudPin,
  selectRosebudImageCredentials,
} from "../../open-sse/services/rosebud/imageBinding.ts";
import { RosebudRuntime } from "../../open-sse/services/rosebud/runtime.ts";
import { RosebudError } from "../../open-sse/services/rosebud/cli.ts";
import { rosebudPublish } from "../../open-sse/services/rosebud/publishing.ts";

async function isolated(run: (root: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), "rosebud-review-"));
  const before = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = root;
  try {
    await run(root);
  } finally {
    if (before === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = before;
    await rm(root, { recursive: true, force: true });
  }
}
const model = {
  id: "test",
  name: "Test",
  category: "image",
  inputs: [{ name: "prompt", type: "string", required: true }],
  output_formats: ["png"],
};

test("image idempotency stays pinned across account selection and process restarts", async () =>
  isolated(async () => {
    const body = { model: "rosebud/test", prompt: "hello" };
    const bound = await Promise.all([
      rosebudImageBinding("key-a", "retry", body, null, "account-a"),
      rosebudImageBinding("key-a", "retry", body, null, "account-b"),
    ]);
    assert.equal(bound[0], bound[1]);
    assert.equal(
      await rosebudImageBinding("key-a", "retry", { prompt: "hello", model: "rosebud/test" }, null),
      bound[0]
    );
    await assert.rejects(
      rosebudImageBinding("key-a", "retry", body, ["other"]),
      /connection_not_allowed/
    );
    await assert.rejects(
      rosebudImageBinding("key-a", "retry", { ...body, prompt: "changed" }, null),
      /idempotency_conflict/
    );
    assert.equal(await rosebudImageBinding("different-caller", "retry", body, null), undefined);
  }));

test("unpaid transient failures can retry the same key; unknown catalog entries do not disable supported models", async () =>
  isolated(async () => {
    let quotes = 0,
      submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models")
        return { models: [model, { ...model, id: "future", category: "future-modality" }] };
      if (args[1] === "quote") {
        if (++quotes === 1) throw new RosebudError("throttled", 429);
        return { credits: 5 };
      }
      if (args[1] === "create") {
        submissions++;
        return { id: "paid", status: "succeeded", credits: 5 };
      }
      return {};
    });
    assert.equal((await runtime.models("a")).length, 1);
    const request = { model: "test", input: { prompt: "hello" }, idempotencyKey: "retry" };
    await assert.rejects(runtime.generate("a", request), /throttled/);
    assert.equal((await runtime.generate("a", request)).upstreamId, "paid");
    assert.equal(submissions, 1);
  }));

test("a second key cannot adopt an uncertain paid request with identical input", async () =>
  isolated(async () => {
    let submits = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") return { models: [model] };
      if (args[1] === "quote") return { credits: 5 };
      if (args[1] === "create") {
        submits++;
        throw new RosebudError("interrupted", 502, true);
      }
      return {};
    });
    const request = { model: "test", input: { prompt: "hello" }, idempotencyKey: "first" };
    await assert.rejects(runtime.generate("a", request), /interrupted/);
    await assert.rejects(
      runtime.generate("a", { ...request, idempotencyKey: "second" }),
      /matching_request_requires_reconciliation/
    );
    assert.equal(submits, 1);
  }));

test("profile traversal is refused before download or publishing writes; status remains available during reconciliation", async () =>
  isolated(async (root) => {
    const runtime = new RosebudRuntime(async () => ({}));
    await assert.rejects(runtime.downloadAsset("../outside", randomUUID()), /invalid_profile/);
    await assert.rejects(
      rosebudPublish("../outside", "publish", { gameId: randomUUID() }),
      /invalid_profile/
    );
    const gameId = randomUUID();
    const folder = join(root, "games", "primary", gameId);
    await mkdir(folder, { recursive: true });
    await writeFile(join(folder, "operation.lock"), "uncertain");
    const result = await rosebudPublish(
      "primary",
      "game_status",
      { gameId },
      async (_profile, args) => {
        assert.equal(args[0], "status");
        return { status: "active" };
      }
    );
    assert.equal(result.status, "active");
  }));

test("Rosebud requires authenticated management access even in open mode and respects connection allowlists", async () => {
  const previousSecret = process.env.API_KEY_SECRET;
  process.env.API_KEY_SECRET = "test-only-rosebud-api-key-secret";
  const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
  const { requireRosebudAccess } = await import("../../src/lib/rosebud/authorization.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  try {
    assert.equal(
      (await requireRosebudAccess(new Request("http://localhost/api/rosebud/account"), "a"))
        ?.status,
      401
    );
    const key = await createApiKey("rosebud-restricted", "test-machine", ["manage"], {
      allowedConnections: ["a"],
    });
    const request = new Request("http://localhost/api/rosebud/account", {
      headers: { Authorization: "Bearer " + key.key },
    });
    assert.equal(await requireRosebudAccess(request, "a"), null);
    assert.equal((await requireRosebudAccess(request, "b"))?.status, 403);
    assert.equal((await requireRosebudAccess(request))?.status, 403);
  } finally {
    resetDbInstance();
    if (previousSecret === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = previousSecret;
  }
});

test("cancellation while quoting does not start a paid request", async () =>
  isolated(async () => {
    const controller = new AbortController();
    let submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") return { models: [model] };
      if (args[1] === "quote") {
        controller.abort();
        return { credits: 5 };
      }
      if (args[1] === "create") submissions++;
      return {};
    });
    await assert.rejects(
      runtime.generate(
        "a",
        { model: "test", input: { prompt: "hello" }, idempotencyKey: "cancel" },
        controller.signal
      ),
      /request_cancelled/
    );
    assert.equal(submissions, 0);
  }));

test("model discovery preserves other accounts and operator-added models", async (context) => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { discoverRosebud, rosebudModelConnections } =
    await import("../../src/lib/rosebud/provider.ts");
  const { rosebudRuntime } = await import("../../open-sse/services/rosebud/runtime.ts");
  const { rosebudModel } = await import("../../open-sse/services/rosebud/catalog.ts");
  const { addCustomModel, getCustomModels } = await import("../../src/lib/db/models.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  try {
    const a = await createProviderConnection({
      provider: "rosebud",
      isActive: true,
      authType: "none",
      providerSpecificData: { rosebudProfile: "model-a" },
    });
    const b = await createProviderConnection({
      provider: "rosebud",
      isActive: true,
      authType: "none",
      providerSpecificData: { rosebudProfile: "model-b" },
    });
    assert.ok(a && b);
    context.mock.method(rosebudRuntime, "models", async (profile: string) => [
      rosebudModel.parse({ ...model, id: profile }),
    ]);
    await addCustomModel("rosebud", "operator-model", "Manual", "manual", "images-generations", [
      "images",
    ]);
    await discoverRosebud(a.id);
    await discoverRosebud(b.id);
    assert.deepEqual(await rosebudModelConnections("model-a", null), [a.id]);
    assert.deepEqual(await rosebudModelConnections("model-a", [b.id]), []);

    assert.deepEqual((await getCustomModels("rosebud")).map((entry) => entry.id).sort(), [
      "model-a",
      "model-b",
      "operator-model",
    ]);
  } finally {
    resetDbInstance();
  }
});

test("generation keys are isolated between callers and consistent across HTTP and tools", () => {
  assert.notEqual(scopedRosebudKey("client-a", "1"), scopedRosebudKey("client-b", "1"));
  assert.equal(scopedRosebudKey("client-a", "1"), scopedRosebudKey("client-a", "1"));
});

test("declared audio and video container signatures remain retrievable", async () => {
  const { rosebudArtifactType } = await import("../../open-sse/services/rosebud/artifact.ts");
  assert.equal(rosebudArtifactType(Buffer.from("fLaC0000"), "music"), "audio/flac");
  assert.equal(rosebudArtifactType(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), "video"), "video/webm");
  const m4a = Buffer.alloc(16);
  m4a.write("ftyp", 4);
  m4a.write("M4A ", 8);
  assert.equal(rosebudArtifactType(m4a, "speech"), "audio/mp4");
  assert.throws(() => rosebudArtifactType(m4a, "image"), /invalid_artifact_format/);
});

test("unsupported output formats are rejected before a paid submission", async () =>
  isolated(async () => {
    let submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models")
        return { models: [{ ...model, output_formats: ["unknown-format"] }] };
      submissions++;
      return {};
    });
    await assert.rejects(
      runtime.generate("a", { model: "test", input: { prompt: "x" } }),
      /unsupported_output_format/
    );
    assert.equal(submissions, 0);
  }));

test("soft-dropping a pinned account must not authorize a second paid account", () => {
  assert.equal(matchesRosebudPin("account-a", "account-b"), false);
  assert.equal(matchesRosebudPin("account-a", undefined), false);
  assert.equal(matchesRosebudPin("account-a", "account-a"), true);
});

test("route selection rejects soft pin fallback, null credentials and a lost binding race", async () => {
  for (const value of [{ connectionId: "b" }, null]) {
    let bound = false;
    await assert.rejects(
      selectRosebudImageCredentials({
        pinned: "a",
        eligible: ["a", "b"],
        lookup: async (ids) => {
          assert.deepEqual(ids, ["a"]);
          return value;
        },
        bind: async () => {
          bound = true;
          return "a";
        },
        usable: () => true,
      }),
      /original_connection_unavailable/
    );
    assert.equal(bound, false);
  }
  let lookups = 0;
  const selected = await selectRosebudImageCredentials({
    eligible: ["a", "b"],
    lookup: async (ids, forced) => {
      lookups++;
      if (lookups === 1) return { connectionId: "b" };
      assert.deepEqual(ids, ["a"]);
      assert.equal(forced, "a");
      return { connectionId: "a" };
    },
    bind: async () => "a",
    usable: () => true,
  });
  assert.equal(selected.credentials.connectionId, "a");
  assert.equal(lookups, 2);
  await assert.rejects(
    selectRosebudImageCredentials({
      eligible: ["a", "b"],
      lookup: async () => ({ connectionId: "b" }),
      bind: async () => "a",
      usable: () => true,
    }),
    /original_connection_unavailable/
  );
});

test("unpinned selection leaves null and rate-limited results for the route to report", async () => {
  const limited = { allRateLimited: true, retryAfter: "soon" };
  for (const value of [null, limited]) {
    let bound = false;
    const selected = await selectRosebudImageCredentials<typeof limited | null>({
      eligible: ["a"],
      lookup: async () => value,
      bind: async () => {
        bound = true;
        return "a";
      },
      usable: (candidate) => !candidate.allRateLimited,
    });
    assert.equal(selected.credentials, value);
    assert.equal(selected.pinned, undefined);
    assert.equal(bound, false);
  }
  await assert.rejects(
    selectRosebudImageCredentials({
      pinned: "a",
      eligible: ["a"],
      lookup: async () => ({ connectionId: "a", allRateLimited: true }),
      bind: async () => "a",
      usable: (candidate) => !candidate.allRateLimited,
    }),
    /original_connection_unavailable/
  );
});

test("an account check keeps an operator's switch-off but still activates new connections", async (context) =>
  isolated(async () => {
    const { createProviderConnection, getProviderConnectionById } =
      await import("../../src/lib/db/providers.ts");
    const { rosebudAccount } = await import("../../src/lib/rosebud/provider.ts");
    const { rosebudRuntime } = await import("../../open-sse/services/rosebud/runtime.ts");
    const { resetDbInstance } = await import("../../src/lib/db/core.ts");
    const { OPERATOR_DISABLED_AT_KEY } = await import("../../src/lib/providers/operatorDisable.ts");
    try {
      const fresh = await createProviderConnection({
        provider: "rosebud",
        isActive: false,
        authType: "none",
        providerSpecificData: { rosebudProfile: "fresh" },
      });
      const off = await createProviderConnection({
        provider: "rosebud",
        isActive: false,
        authType: "none",
        providerSpecificData: {
          rosebudProfile: "off",
          [OPERATOR_DISABLED_AT_KEY]: "2026-01-01T00:00:00.000Z",
        },
      });
      assert.ok(fresh && off);
      const account = context.mock.method(rosebudRuntime, "account", async () => ({
        status: "active",
      }));
      await rosebudAccount(fresh.id);
      await rosebudAccount(off.id);
      assert.equal((await getProviderConnectionById(fresh.id))?.isActive, true);
      assert.equal((await getProviderConnectionById(off.id))?.isActive, false);
      assert.equal((await getProviderConnectionById(off.id))?.testStatus, "active");
      account.mock.mockImplementation(async () => ({ status: "expired" }));
      await rosebudAccount(fresh.id);
      assert.equal((await getProviderConnectionById(fresh.id))?.isActive, false);
    } finally {
      resetDbInstance();
    }
  }));

test("Rosebud model lists honor the chat and hidden-model projections", async () => {
  const { projectRosebudCatalog } = await import("../../src/lib/rosebud/provider.ts");
  const catalog = { provider: "rosebud", models: [{ id: "a" }, { id: "b" }] };
  const hidden = (_provider: string, id: string) => id === "b";
  const project = (chatOnly: boolean, excludeHidden: boolean) =>
    projectRosebudCatalog(catalog, { chatOnly, excludeHidden }, hidden);
  assert.deepEqual(project(false, false).models, catalog.models);
  assert.deepEqual(project(false, true).models, [{ id: "a" }]);
  assert.deepEqual(project(true, false), { provider: "rosebud", models: [] });
});

test("the internal hop does not turn a forged cookie or a remote sync into Rosebud access", async () => {
  const { requireRosebudAccess, requireRosebudSyncAccess } =
    await import("../../src/lib/rosebud/authorization.ts");
  const { getInternalServiceAuthHeaders } =
    await import("../../src/lib/api/internalServiceAuth.ts");
  const { buildModelSyncInternalHeaders } =
    await import("../../src/shared/services/modelSyncScheduler.ts");
  const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../src/server/authz/headers.ts");
  const previous = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  const previousService = process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "test-only-stamp";
  process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN = "test-only-service";
  const request = (locality: string, extra: Record<string, string>) =>
    new Request("http://localhost/api/rosebud/account", {
      headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality, ...extra },
    });
  try {
    const hop = getInternalServiceAuthHeaders();
    assert.equal(await requireRosebudAccess(request("loopback", hop), "a"), null);
    assert.equal(
      (
        await requireRosebudAccess(
          request("loopback", { ...hop, Cookie: "auth_token=forged" }),
          "a"
        )
      )?.status,
      401
    );
    const sync = buildModelSyncInternalHeaders();
    assert.equal(await requireRosebudSyncAccess(request("loopback", sync), "a"), null);
    assert.equal((await requireRosebudSyncAccess(request("lan", sync), "a"))?.status, 401);
    assert.equal(
      (
        await requireRosebudSyncAccess(
          request("loopback", buildModelSyncInternalHeaders({ denyLocalSpawn: true })),
          "a"
        )
      )?.status,
      401
    );
    assert.equal((await requireRosebudAccess(request("loopback", sync), "a"))?.status, 401);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
    else process.env.OMNIROUTE_PEER_STAMP_TOKEN = previous;
    if (previousService === undefined) delete process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN;
    else process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN = previousService;
  }
});

test("the Rosebud connection test explains each outcome", async () => {
  const { testRosebudAccount } =
    await import("../../src/app/api/providers/[id]/test/rosebudConnectionTest.ts");
  const ok = await testRosebudAccount("a", async () => ({ status: "active" }));
  assert.equal(ok.valid, true);
  assert.equal(ok.diagnosis.type, "ok");
  const expired = await testRosebudAccount("a", async () => ({ status: "expired" }));
  assert.equal(expired.statusCode, 401);
  assert.equal(expired.diagnosis.type, "reauth_required");
  const down = await testRosebudAccount("a", async () => {
    throw new RosebudError("cli_unavailable", 503);
  });
  assert.equal(down.statusCode, 503);
  assert.equal(down.diagnosis.type, "runtime_error");
  assert.equal(down.diagnosis.code, "cli_unavailable");
  const unknown = await testRosebudAccount("a", async () => {
    throw new Error("/private/path leaked");
  });
  assert.equal(unknown.error, "Rosebud account check failed");
  assert.equal(unknown.statusCode, 502);
});

test("a generation reads the catalog once before quoting and submitting", async () =>
  isolated(async () => {
    let catalogReads = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") {
        catalogReads++;
        return { models: [model] };
      }
      if (args[1] === "quote") throw new RosebudError("stop_after_quote", 400);
      return {};
    });
    await assert.rejects(
      runtime.generate("a", { model: "test", input: { prompt: "hello" }, idempotencyKey: "one" }),
      /stop_after_quote/
    );
    assert.equal(catalogReads, 1);
  }));
