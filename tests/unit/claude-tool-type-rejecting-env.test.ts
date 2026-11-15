import test from "node:test";
import assert from "node:assert/strict";

// A self-hosted or third-party Anthropic-compatible gateway can reject Claude's
// `type: "custom"` tool discriminator exactly the way agentrouter and deepseek do
// (HTTP 400 "unknown variant `custom`"). The built-in deny list cannot name every
// such gateway, so OMNIROUTE_CLAUDE_TOOL_TYPE_REJECTING_PROVIDERS extends the list
// at runtime with extra provider ids — no code change needed. Default off: with the
// variable unset the list stays the built-in entries and every other provider keeps
// the #2195 `type: "custom"` default.

const { normalizeClaudeToolsForDispatch } =
  await import("../../open-sse/handlers/chatCore/claudeToolDefaults.ts");

type Tool = Record<string, unknown>;

const ENV_VAR = "OMNIROUTE_CLAUDE_TOOL_TYPE_REJECTING_PROVIDERS";

test("env-declared provider strips type:'custom' and leaves typeless tools alone", () => {
  process.env[ENV_VAR] = "my-newapi-gateway, other-gw";
  try {
    const out = normalizeClaudeToolsForDispatch(
      [
        { type: "custom", name: "plain", input_schema: {} },
        { type: "web_search_20250305", name: "ws" },
        { name: "typeless", input_schema: {} },
      ],
      "my-newapi-gateway"
    ) as Tool[];
    assert.equal(out[0].type, undefined, "custom must be stripped for the env-declared provider");
    assert.equal(out[1].type, "web_search_20250305", "versioned types stay");
    assert.equal(
      out[2].type,
      undefined,
      "typeless must not get a default for the env-declared provider"
    );
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("env list trims segments and drops empty ones", () => {
  process.env[ENV_VAR] = "  , my-gw ,, other-gw ,";
  try {
    const strip = normalizeClaudeToolsForDispatch(
      [{ type: "custom", name: "t" }],
      "my-gw"
    ) as Tool[];
    assert.equal(strip[0].type, undefined, "trimmed id must be honoured");

    const keep = normalizeClaudeToolsForDispatch([{ name: "t" }], "my-gw ") as Tool[];
    assert.equal(
      keep[0].type,
      "custom",
      "an untrimmed id with trailing space is not the same provider"
    );
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("built-in entries still strip when the env list is set (union, not replace)", () => {
  process.env[ENV_VAR] = "my-newapi-gateway";
  try {
    for (const provider of ["agentrouter", "deepseek"]) {
      const out = normalizeClaudeToolsForDispatch(
        [{ type: "custom", name: "t" }],
        provider
      ) as Tool[];
      assert.equal(out[0].type, undefined, `${provider} must keep stripping`);
    }
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("providers outside the env list keep the #2195 default", () => {
  process.env[ENV_VAR] = "my-newapi-gateway";
  try {
    const out = normalizeClaudeToolsForDispatch(
      [{ name: "t", input_schema: {} }],
      "minimax"
    ) as Tool[];
    assert.equal(out[0].type, "custom", "minimax still gets the default");
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("env unset: only the built-in entries strip", () => {
  delete process.env[ENV_VAR];
  const strips = normalizeClaudeToolsForDispatch(
    [{ type: "custom", name: "t" }],
    "agentrouter"
  ) as Tool[];
  assert.equal(strips[0].type, undefined);

  const defaults = normalizeClaudeToolsForDispatch([{ name: "t" }], "my-newapi-gateway") as Tool[];
  assert.equal(
    defaults[0].type,
    "custom",
    "unknown provider keeps the default when the env is unset"
  );
});
