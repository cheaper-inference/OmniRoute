import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { NextResponse } from "next/server";

import {
  generateCursorAuthParams,
  createCursorLoginSession,
  CURSOR_LOGIN_TTL_SECONDS,
  type CursorAuthParams,
  clearCursorLoginSessions,
} from "../../src/lib/oauth/services/cursorLogin.ts";

describe("generateCursorAuthParams redirect target", () => {
  beforeEach(() => {
    clearCursorLoginSessions();
  });

  it("defaults to the cli target so the Cursor login stays unchanged", async () => {
    const params = await generateCursorAuthParams();
    assert.match(params.loginUrl, /redirectTarget=cli/);
  });

  it("builds the login target the shared function supports", async () => {
    const params = await generateCursorAuthParams();
    assert.match(params.loginUrl, /^https:\/\/cursor\.com\/loginDeepControl\?/);
    assert.match(params.loginUrl, /redirectTarget=cli/);
    assert.doesNotMatch(params.loginUrl, /verifier=/);
  });
});

// Execute the real route body with explicit dependency seams, not source assertions.
// PKCE/session generation stays real and local; auth never reaches a DB or network.
function routeHarness({ denied = false, fail = false } = {}) {
  const request = new Request("http://localhost/api/oauth/grok-bot/login/start", {
    method: "POST",
  });
  const denial = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const failure = new Error("private upstream detail");
  const events: string[] = [];
  let generated: CursorAuthParams | undefined;
  let publicSession: { sessionId: string; loginUrl: string } | undefined;
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    "@/lib/api/requireManagementAuth": {
      requireManagementAuth: async (
        received: Request,
        options: { invalidApiKeyStatus: number }
      ) => {
        events.push("auth");
        assert.equal(received, request);
        assert.equal(options.invalidApiKeyStatus, 401);
        return denied ? denial : null;
      },
    },
    "@/lib/oauth/services/cursorLogin": {
      CURSOR_LOGIN_TTL_SECONDS,
      generateCursorAuthParams: async (...args: unknown[]) => {
        events.push("generate");
        assert.equal(args.length, 0);
        if (fail) throw failure;
        generated = await generateCursorAuthParams();
        return generated;
      },
      createCursorLoginSession: (params: CursorAuthParams) => {
        events.push("store");
        assert.equal(params, generated);
        publicSession = createCursorLoginSession(params);
        return publicSession;
      },
    },
    "@omniroute/open-sse/utils/error.ts": {
      sanitizeErrorMessage: (error: unknown) => {
        events.push("sanitize");
        assert.equal(error, failure);
        return "Safe login failure";
      },
    },
  };
  const source = readFileSync(
    new URL("../../src/app/api/oauth/grok-bot/login/start/route.ts", import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: { POST?: (request: Request) => Promise<Response> } = {};
  runInNewContext(code, {
    exports,
    require: (id: string) => {
      if (!(id in modules)) throw new Error(`Unmocked dependency: ${id}`);
      return modules[id];
    },
  });
  assert.ok(exports.POST);
  return { request, denial, events, post: exports.POST, session: () => publicSession };
}

describe("Grok Bot login start POST", () => {
  beforeEach(() => clearCursorLoginSessions());

  it("returns the auth denial without generating or storing credentials", async () => {
    const harness = routeHarness({ denied: true });
    const response = await harness.post(harness.request);
    assert.equal(response, harness.denial);
    assert.equal(response.status, 401);
    assert.deepEqual(harness.events, ["auth"]);
  });

  it("starts the established CLI login and returns only public session fields", async () => {
    const harness = routeHarness();
    const response = await harness.post(harness.request);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body, {
      success: true,
      ...harness.session(),
      expiresInSeconds: CURSOR_LOGIN_TTL_SECONDS,
    });
    assert.equal(typeof body.sessionId, "string");
    assert.ok(body.sessionId.length > 0);
    const login = new URL(body.loginUrl);
    assert.equal(login.origin, "https://cursor.com");
    assert.equal(login.pathname, "/loginDeepControl");
    assert.equal(login.searchParams.get("redirectTarget"), "cli");
    assert.equal(login.searchParams.get("mode"), "login");
    assert.ok(login.searchParams.get("challenge"));
    assert.ok(login.searchParams.get("uuid"));
    assert.deepEqual([...login.searchParams.keys()].sort(), [
      "challenge",
      "mode",
      "redirectTarget",
      "uuid",
    ]);
    assert.deepEqual(harness.events, ["auth", "generate", "store"]);
  });

  it("sanitizes login failures and does not create a session", async () => {
    const harness = routeHarness({ fail: true });
    const response = await harness.post(harness.request);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error: "Safe login failure" });
    assert.equal(harness.session(), undefined);
    assert.deepEqual(harness.events, ["auth", "generate", "sanitize"]);
  });
});
