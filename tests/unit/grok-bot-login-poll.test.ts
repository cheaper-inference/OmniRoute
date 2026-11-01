import assert from "node:assert/strict";
import { it } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as validation from "../../src/shared/validation/helpers.ts";

type Result =
  | { status: "pending" }
  | { status: "error"; message: string; httpStatus?: number }
  | { status: "ok"; accessToken: string; refreshToken: string };
function harness(
  options: {
    denied?: boolean;
    expired?: boolean;
    result?: Result;
    persistFailure?: boolean;
    cloudFailure?: boolean;
    email?: string | null;
  } = {}
) {
  const events: string[] = [];
  const result = options.result ?? {
    status: "ok",
    accessToken: "synthetic-access",
    refreshToken: "synthetic-refresh",
  };
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    zod: { z },
    "@/shared/validation/helpers": validation,
    "@/lib/api/requireManagementAuth": {
      requireManagementAuth: async () =>
        options.denied ? NextResponse.json({}, { status: 401 }) : null,
    },
    "@/lib/oauth/services/cursorLogin": {
      peekCursorLoginSession: () =>
        options.expired ? null : { uuid: "uuid", verifier: "synthetic" },
      pollCursorAuthOnce: async () => {
        events.push("poll");
        return result;
      },
      credentialsFromCursorTokens: () => ({
        accessToken: "synthetic-access",
        refreshToken: "synthetic-refresh",
        email: "fallback@example.test",
      }),
      consumeCursorLoginSession: (id: string) => {
        assert.equal(id, "session");
        events.push("consume");
      },
    },
    "@/lib/oauth/services/persistGrokBotConnection": {
      persistGrokBotConnection: async (input: { email: string }) => {
        events.push("persist");
        assert.equal(input.email, options.email ?? "fallback@example.test");
        if (options.persistFailure) throw new Error("private failure");
        return { id: "connection", email: input.email };
      },
    },
    "@/lib/oauth/services/grokBotAccount": {
      fetchGrokBotAccountEmail: async () => options.email ?? null,
    },
    "@/models": { isCloudEnabled: async () => true },
    "@/lib/cloudSync": {
      syncToCloud: async () => {
        events.push("sync");
        if (options.cloudFailure) throw new Error("private cloud failure");
      },
    },
    "@omniroute/open-sse/utils/error.ts": { sanitizeErrorMessage: () => "Safe failure" },
    "@/shared/utils/machineId": { getConsistentMachineId: async () => "machine" },
  };
  const source = readFileSync(
    new URL("../../src/app/api/oauth/grok-bot/login/poll/route.ts", import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: { POST?: (request: Request) => Promise<Response> } = {};
  runInNewContext(code, {
    exports,
    require: (id: string) => {
      if (!(id in modules)) throw new Error("Unmocked: " + id);
      return modules[id];
    },
  });
  return {
    events,
    post: (body = '{"sessionId":"session"}') =>
      exports.POST!(new Request("http://localhost/api", { method: "POST", body })),
  };
}
it("retains auth, JSON/schema and expired-session rejection without polling", async () => {
  for (const [options, body, status] of [
    [{ denied: true }, "{}", 401],
    [{}, "{", 400],
    [{}, "null", 400],
    [{}, "{}", 400],
    [{ expired: true }, '{"sessionId":"session"}', 410],
  ] as const) {
    const h = harness(options);
    assert.equal((await h.post(body)).status, status);
    assert.deepEqual(h.events, []);
  }
});
it("keeps pending and upstream-error status behavior", async () => {
  for (const [result, status] of [
    [{ status: "pending" }, 200],
    [{ status: "error", message: "not ready", httpStatus: 429 }, 429],
    [{ status: "error", message: "not ready" }, 502],
    [{ status: "error", message: "not ready", httpStatus: 200 }, 502],
  ] as const) {
    const h = harness({ result });
    assert.equal((await h.post()).status, status);
    assert.deepEqual(h.events, ["poll"]);
  }
});
it("persists before consuming, then syncs; cloud failures remain best effort", async () => {
  for (const cloudFailure of [false, true]) {
    const h = harness({ cloudFailure, email: "account@example.test" });
    const response = await h.post();
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      status: "ok",
      success: true,
      connection: { id: "connection", provider: "grok-bot", email: "account@example.test" },
    });
    assert.deepEqual(h.events, ["poll", "persist", "consume", "sync"]);
  }
});
it("retains fallback email and does not leak tokens in success", async () => {
  const h = harness();
  const response = await h.post();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    success: true,
    connection: { id: "connection", provider: "grok-bot", email: "fallback@example.test" },
  });
});
it("does not consume a session when persistence fails and sanitizes the failure", async () => {
  const h = harness({ persistFailure: true });
  const response = await h.post();
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "Safe failure" });
  assert.deepEqual(h.events, ["poll", "persist"]);
});
