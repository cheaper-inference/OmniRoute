// Phase B — CodeBuddy International CLI client profile.
//
// Captured wire identity of the official client: `CLI/2.175.0 CodeBuddy/2.175.0`
// with `X-IDE-Name: CLI` / `X-IDE-Type: CLI` / `X-IDE-Version: 2.175.0`, the
// agent headers, and the Stainless SDK block. Auth endpoints carry NONE of the
// conversation or IDE headers — that separation is asserted here.
import test from "node:test";
import assert from "node:assert/strict";

import {
  CODEBUDDY_INTL_CLI,
  CODEBUDDY_INTL_CLI_USER_AGENT,
  buildCodeBuddyCliHeaders,
  buildCodeBuddyAuthHeaders,
  buildCodeBuddySdkHeaders,
  buildCodeBuddyTelemetryHeaders,
  codeBuddyRuntimeFingerprint,
} from "../../open-sse/executors/codebuddy-intl/cliProfile.ts";
import {
  CODEBUDDY_INTL_USER_AGENT,
  normalizeStainlessArch,
  normalizeStainlessPlatform,
} from "../../open-sse/config/providerHeaderProfiles.ts";

test("the international user-agent pins the CLI profile, not the IDE", () => {
  assert.equal(CODEBUDDY_INTL_USER_AGENT, "CLI/2.175.0 CodeBuddy/2.175.0");
  assert.equal(CODEBUDDY_INTL_CLI_USER_AGENT, CODEBUDDY_INTL_USER_AGENT);
  assert.equal(CODEBUDDY_INTL_CLI.version, "2.175.0");
  assert.equal(CODEBUDDY_INTL_CLI.product, "CodeBuddy");
});

test("chat headers identify the CLI client", () => {
  const headers = buildCodeBuddyCliHeaders({ purpose: "conversation" });

  assert.equal(headers["User-Agent"], CODEBUDDY_INTL_CLI_USER_AGENT);
  assert.equal(headers["Accept"], "application/json");
  assert.equal(headers["Accept-Encoding"], "gzip");
  assert.equal(headers["X-Agent-Intent"], "craft");
  assert.equal(headers["X-Agent-Runtime"], "other");
  assert.equal(headers["X-Agent-Type"], "main");
  assert.equal(headers["X-Agent-Purpose"], "conversation");
  assert.equal(headers["X-IDE-Name"], "CLI");
  assert.equal(headers["X-IDE-Type"], "CLI");
  assert.equal(headers["X-IDE-Version"], "2.175.0");
  assert.equal(headers["X-Private-Data"], "false");
  assert.equal(headers["X-Domain"], "www.codebuddy.ai");
  assert.equal(headers["X-Product"], "SaaS");
  assert.equal(headers["x-requested-with"], "XMLHttpRequest");
});

test("auxiliary purposes are marked as auxiliary", () => {
  for (const purpose of ["summary", "prompt_suggestion", "conversation_topic"] as const) {
    const headers = buildCodeBuddyCliHeaders({ purpose });
    assert.equal(headers["X-Agent-Type"], "auxiliary", purpose);
    assert.equal(headers["X-Agent-Purpose"], purpose, purpose);
  }
});

test("the Stainless SDK block keeps the pinned SDK identity", () => {
  const headers = buildCodeBuddySdkHeaders();
  // SDK identity is pinned: it describes the client library, not the host.
  assert.equal(headers["x-stainless-lang"], "js");
  assert.equal(headers["x-stainless-package-version"], "6.25.0");
  assert.equal(headers["x-stainless-runtime"], "node");
  assert.equal(headers["x-stainless-retry-count"], "0");
});

test("the Stainless host fingerprint is derived, never hardcoded", () => {
  const headers = buildCodeBuddySdkHeaders();
  const runtime = codeBuddyRuntimeFingerprint();

  // The captured CLI ran on Windows/x64/v24.14.1; a deployment must not claim
  // to be that host, so the values track the process that is actually running.
  assert.equal(headers["x-stainless-os"], normalizeStainlessPlatform(runtime.platform));
  assert.equal(headers["x-stainless-arch"], normalizeStainlessArch(runtime.arch));
  assert.equal(headers["x-stainless-runtime-version"], runtime.version);
  assert.notEqual(headers["x-stainless-os"], "Other:unknown");
  assert.notEqual(headers["x-stainless-arch"], "other:unknown");
});

test("the retry counter follows the attempt number", () => {
  assert.equal(buildCodeBuddySdkHeaders({ attempt: 1 })["x-stainless-retry-count"], "0");
  assert.equal(buildCodeBuddySdkHeaders({ attempt: 2 })["x-stainless-retry-count"], "1");
});

test("auth headers never carry conversation or IDE identity", () => {
  const headers = buildCodeBuddyAuthHeaders();

  assert.equal(headers["X-IDE-Type"], undefined);
  assert.equal(headers["X-IDE-Name"], undefined);
  assert.equal(headers["X-IDE-Version"], undefined);
  assert.equal(headers["X-Conversation-ID"], undefined);
  assert.equal(headers["X-Conversation-Request-ID"], undefined);
  assert.equal(headers["X-Conversation-Message-ID"], undefined);
  assert.equal(headers["X-Trace-ID"], undefined);
  assert.equal(headers["X-Agent-Type"], undefined);
  // Captured auth shape: no-authorization flags plus the CLI user-agent.
  assert.equal(headers["User-Agent"], CODEBUDDY_INTL_CLI_USER_AGENT);
  assert.equal(headers["X-Product"], "SaaS");
  assert.equal(headers["X-Domain"], "www.codebuddy.ai");
});

test("telemetry headers use the captured report shape", () => {
  const headers = buildCodeBuddyTelemetryHeaders();
  assert.equal(headers["User-Agent"], CODEBUDDY_INTL_CLI_USER_AGENT);
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers["X-IDE-Type"], "CLI");
  assert.equal(headers["X-IDE-Version"], "2.175.0");
});

test("a purpose cannot silently produce an undefined agent header", () => {
  assert.throws(
    // @ts-expect-error — runtime guard for callers that bypass the type.
    () => buildCodeBuddyCliHeaders({ purpose: "not_a_purpose" }),
    /unknown CodeBuddy agent purpose/i
  );
});
