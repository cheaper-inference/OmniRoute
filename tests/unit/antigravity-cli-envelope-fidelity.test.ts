import test from "node:test";
import assert from "node:assert/strict";

import {
  antigravityCliUserAgent,
  resolveAntigravityCliChangelist,
} from "../../open-sse/services/antigravityHeaders.ts";
import { scrubProxyAndFingerprintHeaders } from "../../open-sse/services/antigravityHeaderScrub.ts";
import { applyAntigravityClientProfileHeaders } from "../../open-sse/services/antigravityClientProfile.ts";
import {
  buildAntigravityEnvelopeIdentity,
  clearAntigravityCliTrajectories,
  getAntigravityConversationSessionId,
  refreshAntigravityRequestIdTimestamp,
  resolveAntigravityModelEnum,
} from "../../open-sse/services/antigravityIdentity.ts";
import { applyFingerprint, CLI_FINGERPRINTS } from "../../open-sse/config/cliFingerprints.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";
import { resolveExecutionCredentials } from "../../open-sse/handlers/chatCore/executionCredentials.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalFetch = globalThis.fetch;

const cliCreds = {
  accessToken: "ag-cli-token",
  projectId: "proj-cli-1",
  email: "cli-user@example.com",
  providerSpecificData: { clientProfile: "cli" },
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearAntigravityCliTrajectories();
  clearAntigravityVersionCaches();
  delete process.env.OMNIROUTE_ANTIGRAVITY_WRITE_TRAJECTORY_ACLS;
});

test("CLI changelist table and User-Agent match agy 1.5.10 / 1.5.12 / 1.5.18", () => {
  assert.equal(resolveAntigravityCliChangelist("1.5.10"), "1023297289");
  assert.equal(resolveAntigravityCliChangelist("1.5.12"), "1024904911");
  assert.equal(resolveAntigravityCliChangelist("1.5.18"), "1030252320");
  assert.equal(
    antigravityCliUserAgent("1.5.18", "consumer", undefined, { osType: "windows", arch: "amd64" }),
    "antigravity/cli/1.5.18 (aidev_client; os_type=windows; arch=amd64; cl=1030252320; auth_method=consumer)"
  );
});

test("CLI headers send Accept-Encoding: gzip and omit Accept / x-goog-user-project", () => {
  seedAntigravityCliVersionCache("1.5.18");
  const executor = new AntigravityExecutor();
  const cliHeaders = executor.buildHeaders(cliCreds, true);
  assert.equal(cliHeaders["Accept-Encoding"], "gzip");
  assert.equal(cliHeaders.Accept, undefined);

  const ideHeaders = executor.buildHeaders(
    { accessToken: "ide-token", providerSpecificData: { clientProfile: "ide" } },
    true
  );
  assert.equal(ideHeaders["Accept-Encoding"], "gzip, deflate, br");
  assert.equal(ideHeaders.Accept, "text/event-stream");
  assert.equal(
    scrubProxyAndFingerprintHeaders({ Authorization: "Bearer x" })["Accept-Encoding"],
    "gzip, deflate, br"
  );

  const { headers: fpHeaders } = applyFingerprint(
    "antigravity",
    { ...cliHeaders, Host: "daily-cloudcode-pa.googleapis.com", "Content-Length": "12" },
    {
      project: "p",
      requestId: "r",
      request: {},
      model: "m",
      userAgent: "antigravity",
      requestType: "agent",
    }
  );
  applyAntigravityClientProfileHeaders(fpHeaders, cliCreds, { project: "proj-cli-1" });
  assert.equal(fpHeaders["Accept-Encoding"], "gzip");
  assert.equal(fpHeaders["x-goog-user-project"], undefined);
  assert.deepEqual(CLI_FINGERPRINTS.antigravity.headerOrder.slice(0, 6), [
    "Host",
    "User-Agent",
    "Content-Length",
    "Authorization",
    "Content-Type",
    "Accept-Encoding",
  ]);
});

test("CLI envelope identity tracks per-conversation cascade/trajectory state and live labels", () => {
  assert.equal(
    resolveAntigravityModelEnum("antigravity/gemini-4-hydrogen-high"),
    "MODEL_PLACEHOLDER_M525"
  );
  assert.equal(resolveAntigravityModelEnum("claude-sonnet-4-6"), "MODEL_PLACEHOLDER_M35");

  const sessionId = getAntigravityConversationSessionId(cliCreds, "conv-1", "cli");
  assert.match(sessionId, /^[1-9]\d*$/);

  const turn1 = buildAntigravityEnvelopeIdentity({
    isClaude: false,
    credentials: cliCreds,
    clientProfile: "cli",
    model: "gemini-4-hydrogen-high",
    conversationKey: "conv-1",
    contentsLength: 1,
  });
  const turn2 = buildAntigravityEnvelopeIdentity({
    isClaude: false,
    credentials: cliCreds,
    clientProfile: "cli",
    model: "gemini-4-hydrogen-high",
    conversationKey: "conv-1",
    contentsLength: 3,
  });

  const [, cascade1, , traj1, step1] = turn1.requestId.split("/");
  const [, cascade2, , traj2, step2] = turn2.requestId.split("/");
  assert.equal(step1, "1");
  assert.equal(step2, "3");
  assert.equal(cascade1, cascade2);
  assert.equal(traj1, traj2);
  assert.equal(turn1.sessionId, sessionId);
  assert.equal(turn2.sessionId, sessionId);

  assert.deepEqual(turn1.labels, {
    cascade_id: cascade1,
    last_step_index: "0",
    model_enum: "MODEL_PLACEHOLDER_M525",
    request_id: `${traj1}-0`,
    root_cascade_id: cascade1,
    trajectory_id: traj1,
    trajectory_source: "CORTEX_TRAJECTORY_SOURCE_CLI",
    used_claude: "false",
    used_claude_conservative: "false",
    used_non_gemini_model: "false",
  });
  assert.equal(turn2.labels.last_step_index, "2");
  assert.equal(turn2.labels.request_id, `${traj1}-1`);

  const otherConv = buildAntigravityEnvelopeIdentity({
    isClaude: true,
    credentials: cliCreds,
    clientProfile: "cli",
    model: "claude-sonnet-4-6",
    conversationKey: "conv-2",
    contentsLength: 1,
  });
  assert.notEqual(otherConv.labels.trajectory_id, traj1);
  assert.notEqual(otherConv.sessionId, sessionId);
  assert.equal(otherConv.labels.used_claude, "true");
  assert.equal(otherConv.labels.used_non_gemini_model, "true");
});

test("CLI envelope omits synthetic topK/topP/safetySettings/VALIDATED toolConfig and uses user system role", async () => {
  const wrapped = openaiToAntigravityRequest(
    "gemini-4-hydrogen-high",
    {
      model: "gemini-4-hydrogen-high",
      messages: [
        { role: "system", content: "Be concise." },
        { role: "user", content: "hi" },
      ],
      max_tokens: 262144,
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "read",
            parameters: { type: "object" },
          },
        },
      ],
    },
    true,
    { ...cliCreds, _antigravitySessionKey: "conv-wrap" }
  ) as { request: Record<string, unknown> };

  assert.equal((wrapped.request.systemInstruction as { role: string }).role, "user");
  assert.equal((wrapped.request.generationConfig as Record<string, unknown>).topK, undefined);
  assert.equal((wrapped.request.generationConfig as Record<string, unknown>).topP, undefined);
  assert.equal("safetySettings" in wrapped.request, false);
  assert.equal("toolConfig" in wrapped.request, false);

  const executor = new AntigravityExecutor();
  const envelope = await executor.transformRequest(
    "gemini-4-hydrogen-high",
    {
      request: {
        ...wrapped.request,
        labels: { used_claude: "spoofed", used_claude_conservative: "spoofed" },
      },
    },
    true,
    { ...cliCreds, _antigravitySessionKey: "conv-exec" }
  );
  assert.ok(!(envelope instanceof Response));
  const req = envelope.request as Record<string, unknown>;
  assert.deepEqual(Object.keys(req), [
    "contents",
    "systemInstruction",
    "tools",
    "labels",
    "generationConfig",
    "sessionId",
  ]);
  assert.equal((req.systemInstruction as { role: string }).role, "user");
  assert.equal((req.labels as Record<string, string>).used_claude, "false");
  assert.equal(
    (req.labels as Record<string, string>).trajectory_source,
    "CORTEX_TRAJECTORY_SOURCE_CLI"
  );
  assert.equal((req.labels as Record<string, string>).model_enum, "MODEL_PLACEHOLDER_M525");
  assert.match(String(req.sessionId), /^[1-9]\d*$/);
});

test("resolveExecutionCredentials forwards antigravitySessionKey only for antigravity", () => {
  const agCreds = resolveExecutionCredentials({
    credentials: { accessToken: "t", providerSpecificData: {} },
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    targetFormat: "antigravity",
    provider: "antigravity",
    ccSessionId: null,
    antigravitySessionKey: "conv-key-1",
  }) as Record<string, unknown>;
  assert.equal(agCreds._antigravitySessionKey, "conv-key-1");

  const otherCreds = resolveExecutionCredentials({
    credentials: { accessToken: "t", providerSpecificData: {} },
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    targetFormat: "openai",
    provider: "openai",
    ccSessionId: null,
    antigravitySessionKey: "conv-key-1",
  }) as Record<string, unknown>;
  assert.equal(otherCreds._antigravitySessionKey, undefined);
});

test("CLI opt-in writeTrajectoryAcls runs once per trajectory before streamGenerateContent", async () => {
  seedAntigravityCliVersionCache("1.5.18");
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    if (String(url).includes(":writeTrajectoryAcls")) {
      return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok"}]}}]}}\n\n',
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };

  const executor = new AntigravityExecutor();
  const optedInCreds = {
    ...cliCreds,
    _antigravitySessionKey: "conv-acl",
    providerSpecificData: { clientProfile: "cli", writeTrajectoryAcls: true },
  };
  const body = { request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] } };

  await executor.execute({
    model: "gemini-4-hydrogen-high",
    body,
    stream: true,
    credentials: optedInCreds,
  });
  await executor.execute({
    model: "gemini-4-hydrogen-high",
    body,
    stream: true,
    credentials: optedInCreds,
  });

  const aclCalls = calls.filter((c) => c.url.endsWith("/v1internal:writeTrajectoryAcls"));
  const genCalls = calls.filter((c) => c.url.includes("/v1internal:streamGenerateContent"));
  assert.equal(aclCalls.length, 1);
  assert.equal(genCalls.length, 2);
  const expectedTraj = (
    (genCalls[0].body.request as Record<string, unknown>).labels as Record<string, string>
  ).trajectory_id;
  assert.deepEqual(aclCalls[0].body, { trajectoryId: expectedTraj });
});

test("refreshAntigravityRequestIdTimestamp preserves CLI 5-segment shape and falls back for legacy IDs", () => {
  const refreshed = refreshAntigravityRequestIdTimestamp("agent/cas-1/1000/traj-1/3");
  const parts = refreshed.split("/");
  assert.equal(parts.length, 5);
  assert.equal(parts[0], "agent");
  assert.equal(parts[1], "cas-1");
  assert.notEqual(parts[2], "1000");
  assert.equal(parts[3], "traj-1");
  assert.equal(parts[4], "3");

  const fallback = refreshAntigravityRequestIdTimestamp("agent/1000/deadbeef");
  assert.match(fallback, /^agent\/\d+\/[0-9a-f]{8}$/);
});

test("CLI preserves explicit tool_choice while IDE profile keeps legacy defaults", () => {
  const cliWithToolChoice = openaiToAntigravityRequest(
    "gemini-4-hydrogen-high",
    {
      model: "gemini-4-hydrogen-high",
      messages: [{ role: "user", content: "hi" }],
      tool_choice: "required",
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "read",
            parameters: { type: "object" },
          },
        },
      ],
    },
    true,
    cliCreds
  ) as { request: Record<string, unknown> };
  assert.deepEqual(cliWithToolChoice.request.toolConfig, {
    functionCallingConfig: { mode: "ANY" },
  });

  const ideWrapped = openaiToAntigravityRequest(
    "gemini-4-hydrogen-high",
    {
      model: "gemini-4-hydrogen-high",
      messages: [
        { role: "system", content: "Be concise." },
        { role: "user", content: "hi" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            description: "read",
            parameters: { type: "object" },
          },
        },
      ],
    },
    true,
    {
      accessToken: "ide-token",
      projectId: "proj-ide",
      providerSpecificData: { clientProfile: "ide" },
    }
  ) as { request: Record<string, unknown> };
  assert.equal((ideWrapped.request.systemInstruction as { role: string }).role, "system");
  assert.equal((ideWrapped.request.generationConfig as Record<string, unknown>).topK, 40);
  assert.equal((ideWrapped.request.generationConfig as Record<string, unknown>).topP, 1);
  assert.deepEqual(ideWrapped.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
});
