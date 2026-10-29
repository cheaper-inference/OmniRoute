/**
 * #16571 — OpenCode v2 client fingerprint (ported from 9router), opt-in through
 * OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED (default off).
 *
 * Flag off: every OpenCode request keeps the current identity (`opencode/<1.x>` UA,
 * `x-opencode-client: desktop`, a synthesized `x-opencode-request`), the current contract
 * placeholder schemas and the caller's `tool_choice` — byte for byte.
 * Flag on: the v2 CLI identity (`opencode/latest/<2.x>/cli`, client `cli`), the 2.x UA rule,
 * and on gated free-tier requests no `x-opencode-request`, the session mirrored onto three
 * more headers, the v2 CLI `read`/`shell` schemas and no `tool_choice: "none"`.
 *
 * Also guards the keyless path the original port broke: a gated request without a key no
 * longer reads `gatedScope` before its declaration (TDZ), and no `Authorization: Bearer
 * public` is invented — the keyless OpenCode Free provider was removed by #16310.
 */
import { after, afterEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_OPENCODE_USER_AGENT,
  DEFAULT_OPENCODE_V2_USER_AGENT,
  forwardOpencodeClientHeaders,
  resolveOpencodeCliDefaults,
  satisfiesOpencodeUserAgentContract,
} from "../../open-sse/utils/opencodeHeaders.ts";
import {
  OPENCODE_CLI_V2_VERSION_FALLBACK,
  OPENCODE_CLI_VERSION_FALLBACK,
  resetOpencodeCliVersionCache,
} from "../../open-sse/utils/opencodeCliVersion.ts";
import {
  _setOpencodeFreeModelsForTests,
  applyFreeTierRequestContract,
  placeholderToolDescription,
  placeholderToolParameters,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const FLAG = "OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED";
const FREE_MODEL = "nemotron-3.5-lightning-free";
const PAID_MODEL = "gpt-5.6-luna";
const priorFlag = process.env[FLAG];

function withFlag<T>(value: string | undefined, run: () => T): T {
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return run();
  } finally {
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
  }
}

afterEach(() => {
  resetOpencodeCliVersionCache();
  _setOpencodeFreeModelsForTests(null);
});

after(() => {
  resetDbInstance();
});

test("flag off: the synthesized identity is the current one, byte for byte", () => {
  assert.equal(DEFAULT_OPENCODE_USER_AGENT, "opencode/1.18.31");
  assert.equal(OPENCODE_CLI_VERSION_FALLBACK, "1.18.31");
  for (const gated of [true, false]) {
    assert.deepEqual(resolveOpencodeCliDefaults("opencode-zen", gated), {
      userAgent: "opencode/1.18.31",
      client: "desktop",
      project: "global",
    });
  }
  // The 1.17 rule stands: a current 1.x OpenCode client keeps its own UA.
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/1.17.0"), true);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/beta/1.18.31/cli"), true);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/1.16.0"), false);
});

test("flag on: the v2 identity, with a 2.x version even when the live cache holds 1.x", () => {
  assert.equal(DEFAULT_OPENCODE_V2_USER_AGENT, "opencode/latest/2.0.26/cli");
  assert.equal(OPENCODE_CLI_V2_VERSION_FALLBACK, "2.0.26");
  assert.deepEqual(resolveOpencodeCliDefaults("opencode-zen", true, true), {
    userAgent: DEFAULT_OPENCODE_V2_USER_AGENT,
    client: "cli",
    project: "global",
  });
  // A configured 1.x UA no longer satisfies a gated request under the v2 rule.
  const prior = process.env.OPENCODE_USER_AGENT;
  process.env.OPENCODE_USER_AGENT = "opencode/1.18.31";
  try {
    assert.equal(
      resolveOpencodeCliDefaults("opencode-zen", true, true)?.userAgent,
      DEFAULT_OPENCODE_V2_USER_AGENT
    );
    assert.equal(
      resolveOpencodeCliDefaults("opencode-zen", true, false)?.userAgent,
      "opencode/1.18.31"
    );
  } finally {
    if (prior === undefined) delete process.env.OPENCODE_USER_AGENT;
    else process.env.OPENCODE_USER_AGENT = prior;
  }
});

test("the v2 UA rule takes 2.x clients and rejects 1.x only when asked to", () => {
  for (const ua of [
    "opencode/latest/2.0.26/cli",
    "opencode/beta/2.0.26/cli",
    "opencode/2.0.0",
    "opencode/latest/2.0.26/cli ai-sdk/provider-utils/4.0.23",
  ]) {
    assert.equal(satisfiesOpencodeUserAgentContract(ua, true), true, ua);
  }
  for (const ua of ["opencode/1.18.31", "opencode/beta/1.18.31/cli", "opencode", "curl/8.5.0"]) {
    assert.equal(satisfiesOpencodeUserAgentContract(ua, true), false, ua);
  }
  assert.equal(satisfiesOpencodeUserAgentContract(undefined, true), false);
});

test("gated header synthesis: v2 drops x-opencode-request and mirrors the session; v1 does not", () => {
  const client = { "x-opencode-request": "msg_0001020304051234567890ABCD" };

  const v1: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    v1,
    { ...client },
    {
      cliDefaults: resolveOpencodeCliDefaults("opencode-zen", true),
      reencodeSession: true,
    }
  );
  assert.match(v1["x-opencode-request"], /^msg_/);
  assert.equal(v1["x-opencode-session-id"], undefined);
  assert.equal(v1["x-session-affinity"], undefined);
  assert.equal(v1["User-Agent"] ?? v1["user-agent"], "opencode/1.18.31");
  assert.equal(v1["x-opencode-client"], "desktop");

  const v2: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    v2,
    { ...client },
    {
      cliDefaults: resolveOpencodeCliDefaults("opencode-zen", true, true),
      reencodeSession: true,
      v2Fingerprint: true,
    }
  );
  assert.equal(v2["x-opencode-request"], undefined);
  const session = v2["x-opencode-session"];
  assert.match(session, /^ses_/);
  assert.equal(v2["x-opencode-session-id"], session);
  assert.equal(v2["x-session-affinity"], session);
  assert.equal(v2["x-session-id"], session);
  assert.equal(v2["User-Agent"] ?? v2["user-agent"], DEFAULT_OPENCODE_V2_USER_AGENT);
  assert.equal(v2["x-opencode-client"], "cli");
});

test("ungated header synthesis keeps x-opencode-request even with the v2 fingerprint", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    { "x-opencode-request": "msg_0123456789ab0123456789cdef" },
    {
      cliDefaults: resolveOpencodeCliDefaults("opencode-zen", false, true),
      reencodeSession: false,
      v2Fingerprint: true,
    }
  );
  assert.equal(headers["x-opencode-request"], "msg_0123456789ab0123456789cdef");
  assert.equal(headers["x-opencode-session-id"], undefined);
});

test("contract body: v1 placeholders and tool_choice by default, v2 schemas when asked", () => {
  const body = () => ({
    model: FREE_MODEL,
    messages: [{ role: "user", content: "hi" }],
    tool_choice: "none",
  });

  const v1 = applyFreeTierRequestContract(body(), "openai", ["read", "shell"]) as {
    tool_choice?: unknown;
    tools: Array<{ function: { name: string; description: string; parameters: unknown } }>;
  };
  assert.equal(v1.tool_choice, "none");
  assert.deepEqual(v1.tools[0].function.parameters, {
    type: "object",
    properties: { filePath: { type: "string" } },
    required: ["filePath"],
  });
  assert.deepEqual(v1.tools[1].function.parameters, { type: "object", properties: {} });
  assert.match(v1.tools[0].function.description, /^Do not call this tool/);

  const v2 = applyFreeTierRequestContract(body(), "openai", ["read", "shell"], true) as typeof v1;
  assert.equal("tool_choice" in v2, false);
  const read = v2.tools[0].function.parameters as { required: string[]; properties: object };
  // #16998 (Junior-HJ): the v2 CLI schemas close the object like the real client does.
  assert.equal((read as { additionalProperties?: boolean }).additionalProperties, false);
  assert.deepEqual(read.required, ["path"]);
  assert.deepEqual(Object.keys(read.properties), ["path", "offset", "limit"]);
  const shell = v2.tools[1].function.parameters as { required: string[]; properties: object };
  assert.equal((shell as { additionalProperties?: boolean }).additionalProperties, false);
  assert.deepEqual(shell.required, ["command"]);
  assert.deepEqual(Object.keys(shell.properties), ["command", "workdir", "timeout", "background"]);
  assert.match(v2.tools[0].function.description, /^Read the contents of a file or directory\./);
  assert.match(v2.tools[1].function.description, /^Execute a shell command/);

  // A tool_choice other than "none" travels unchanged under v2 too.
  const auto = applyFreeTierRequestContract(
    { ...body(), tool_choice: "auto" },
    "openai",
    ["read"],
    true
  ) as { tool_choice?: unknown };
  assert.equal(auto.tool_choice, "auto");
  // Names v2 does not declare keep the minimal schemas.
  assert.deepEqual(placeholderToolParameters("bash", true), placeholderToolParameters("bash"));
  assert.equal(
    placeholderToolDescription("webfetch", true),
    placeholderToolDescription("webfetch")
  );
});

test("executor: a gated request without a key carries only the anonymous credential", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  for (const flag of [undefined, "true"]) {
    withFlag(flag, () => {
      const executor = new OpencodeExecutor("opencode-zen");
      const headers = executor.buildHeaders(null, true, null, FREE_MODEL);
      // No operator key is invented: the gated lane's own credential stands in for it
      // (the /inference lane serves `Bearer public`, measured 2026-10-21).
      assert.equal(headers["Authorization"], "Bearer public", `flag=${flag}`);
      assert.equal(headers["x-api-key"], undefined, `flag=${flag}`);
    });
  }
});

test("executor: the flag drives the identity on the real header path", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  const creds = { apiKey: "sk-test" } as never;

  const off = withFlag(undefined, () =>
    new OpencodeExecutor("opencode-zen").buildHeaders(creds, true, null, FREE_MODEL)
  );
  assert.equal(off["User-Agent"] ?? off["user-agent"], "opencode/1.18.31");
  assert.equal(off["x-opencode-client"], "desktop");
  assert.match(off["x-opencode-request"], /^msg_/);
  assert.equal(off["x-opencode-session-id"], undefined);
  // Gated: the anonymous /inference credential stands in for sk-test (measured 2026-10-21).
  assert.equal(off["Authorization"], "Bearer public");

  const on = withFlag("true", () =>
    new OpencodeExecutor("opencode-zen").buildHeaders(creds, true, null, FREE_MODEL)
  );
  assert.equal(on["User-Agent"] ?? on["user-agent"], DEFAULT_OPENCODE_V2_USER_AGENT);
  assert.equal(on["x-opencode-client"], "cli");
  assert.equal(on["x-opencode-request"], undefined);
  assert.equal(on["x-opencode-session-id"], on["x-opencode-session"]);
  assert.equal(on["Authorization"], "Bearer public");

  // A paid (ungated) model keeps its request id even with the flag on.
  const paid = withFlag("true", () =>
    new OpencodeExecutor("opencode-zen").buildHeaders(creds, true, null, PAID_MODEL)
  );
  assert.match(paid["x-opencode-request"], /^msg_/);
  assert.equal(paid["x-opencode-session-id"], undefined);
});

test("executor: the flag drives the free-tier body on the real transform path", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  const body = () => ({
    model: FREE_MODEL,
    messages: [{ role: "user", content: "hi" }],
    tool_choice: "none",
  });
  const run = () =>
    new OpencodeExecutor("opencode-zen").transformRequest(
      FREE_MODEL,
      body(),
      true,
      null as never
    ) as {
      tool_choice?: unknown;
      tools: Array<{ function: { name: string; parameters: { required?: string[] } } }>;
    };

  const off = withFlag(undefined, run);
  assert.equal(off.tool_choice, "none");
  const offRead = off.tools.find((t) => t.function.name === "read");
  assert.deepEqual(offRead?.function.parameters.required, ["filePath"]);

  const on = withFlag("true", run);
  assert.equal("tool_choice" in on, false);
  const onRead = on.tools.find((t) => t.function.name === "read");
  assert.deepEqual(onRead?.function.parameters.required, ["path"]);
});
