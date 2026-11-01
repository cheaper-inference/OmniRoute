import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { NextResponse } from "next/server";
import * as schemas from "../../src/shared/validation/grokBotSchemas.ts";
import * as send from "../../src/app/(dashboard)/dashboard/grok-bot/send.ts";

const directory = mkdtempSync(join(tmpdir(), "grok-lease-state-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "synthetic-lease-test";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const isolation = await import("../../src/lib/exclusiveLeaseIsolation.ts");
test.after(() => {
  core.resetDbInstance();
  rmSync(directory, { recursive: true, force: true });
});

test("the real DB fence is connection-scoped and only the matching owner/generation can release it", async () => {
  const first = await providers.createProviderConnection({
    provider: "grok-bot",
    authType: "oauth",
    name: "first",
    isActive: true,
  });
  const second = await providers.createProviderConnection({
    provider: "grok-bot",
    authType: "oauth",
    name: "second",
    isActive: true,
  });
  const owner = "vlo_" + "A".repeat(43);
  const other = "vlo_" + "B".repeat(43);
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "managed",
    provider: "grok-bot",
    connectionId: first.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  assert.ok("lease" in acquired);
  let refreshed = 0;
  let dispatched = 0;
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    "@/lib/api/requireManagementAuth": { requireManagementAuth: async () => null },
    "@/lib/exclusiveLeaseIsolation": isolation,
    "@/shared/validation/grokBotSchemas": schemas,
    "@/lib/db/providers": providers,
    "../tokenSource": {
      grokBotToken: async () => {
        refreshed++;
        return { accessToken: "synthetic" };
      },
    },
    "../../../../../(dashboard)/dashboard/grok-bot/read": {
      grokBotRead: async () => {
        dispatched++;
        return {};
      },
    },
    "../../../../../(dashboard)/dashboard/grok-bot/send": send,
  };
  const source = readFileSync(
    new URL("../../src/app/api/providers/[id]/grok-bot/send/route.ts", import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: {
    POST?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
  } = {};
  runInNewContext(code, {
    exports,
    Date,
    require: (id: string) => {
      if (!(id in modules)) throw new Error("Unmocked dependency: " + id);
      return modules[id];
    },
  });
  const post = (id: string) =>
    exports.POST!(
      new Request("http://localhost/api", {
        method: "POST",
        body: '{"agentId":"agent","messageId":"message","text":"hello"}',
      }),
      { params: Promise.resolve({ id }) }
    );
  assert.equal((await post(first.id)).status, 409);
  assert.equal(refreshed, 0);
  assert.equal(dispatched, 0);
  assert.equal((await post(second.id)).status, 200);
  assert.equal(refreshed, 1);
  assert.equal(dispatched, 1);

  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: other,
      generation: acquired.lease.generation,
      apiKeyId: "managed",
    }).kind,
    "STALE"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: acquired.lease.generation + 1,
      apiKeyId: "managed",
    }).kind,
    "STALE"
  );
  assert.equal((await post(first.id)).status, 409);
  assert.equal(refreshed, 1);
  assert.equal(dispatched, 1);
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: acquired.lease.generation,
      apiKeyId: "managed",
    }).kind,
    "RELEASED"
  );
  assert.equal((await post(first.id)).status, 200);
  assert.equal(refreshed, 2);
  assert.equal(dispatched, 2);
});
