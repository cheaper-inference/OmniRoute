---
title: "Providers — Claude Code (OAuth)"
version: 3.8.53
lastUpdated: 2026-10-31
---

# Providers — Claude Code (OAuth)

The native `claude` provider (alias `cc`) serves Claude models through a Claude Code
subscription OAuth connection. This page documents what the route does to requests —
including OpenAI-compatible third-party clients hitting `/v1/chat/completions` — because
several of these behaviors are invisible to the client and are not configurable switches.
For connecting a connection with a `claude setup-token` token, see
[Claude Code with a setup token](CLAUDE_CODE_SETUP_TOKEN.md).

## When the transforms apply

All of the request rewriting below runs in one block of `open-sse/executors/base.ts` that is
gated on the connection, not on the client. It applies when the provider is `claude` and either
the client is Claude Code itself or the connection authenticates with an OAuth token
(`accessToken` starting with `sk-ant-oat` and no `apiKey`), or when the connection uses the
Claude Code protocol. A `claude` connection that uses a plain API key from a non-Claude-Code
client is not cloaked. The `anthropic-compatible-cc-*` bridge shares the system-transforms
pipeline configuration but goes through a different code path (`claudeCodeCompatible.ts`).

## What is prepended to every cloaked request (not configurable)

In that block, `open-sse/executors/base.ts` (search for `SENTINEL`) prepends two system blocks,
after stripping any pre-existing copies so retries stay idempotent
(`stripClaudeSystemPrefixBlocks`):

1. `x-anthropic-billing-header: cc_version=...; cc_entrypoint=cli; cch=00000;`
2. `You are Claude Code, Anthropic's official CLI for Claude.`

Tool names are also remapped to the Claude Code set on the way out and back
(`open-sse/services/claudeCodeToolRemapper.ts`). None of this has a setting: it is part of
the subscription-OAuth wire format.

Before the configurable pipeline runs, and regardless of its `enabled` flag, the same block also
applies the tool-name remap and third-party tool-name cloaking (`cloakThirdPartyToolNames`),
tool-schema sanitization (`sanitizeClaudeToolSchemas`) and the legacy zero-width-joiner pass
`obfuscateInBody` (`open-sse/services/claudeCodeObfuscation.ts`, driven by its own default word
list such as `opencode`, `cline`, `cursor`, `windsurf`, `aider`, `copilot`).

## The system-transforms pipeline (configurable, on by default)

After the prepend, `applySystemTransformPipeline` (`open-sse/services/systemTransforms.ts`)
runs the default `claude` pipeline unless it is disabled:

- **Paragraph removal**: system paragraphs starting with third-party agent identity
  anchors (`DEFAULT_IDENTITY_PREFIXES`, `DEFAULT_PARAGRAPH_REMOVAL_ANCHORS`) are dropped.
  In practice this removes paragraphs that begin with another agent's identity line or
  carry its documentation URL.
- **Text replacements**: a small set of `replace_text` ops neutralizes phrases known to trip
  the billing gate.
- **Word obfuscation**: listed words are rewritten with zero-width joiners
  (`obfuscate_words` op; native Claude Code words plus the Open WebUI additions from
  issue #2260). The op targets `system`, `messages` and `tools`, not only the system prompt,
  so user text that contains a listed word (for example "cursor" or "copilot") can be rewritten.

Why it exists: without it, non-claude-cli clients on subscription OAuth surface
`[400] Third-party apps now draw from extra usage, not plan limits.` (#2260). That is why
the pipeline defaults to enabled.

Configuration: `systemTransforms.providers.claude` (`enabled`, custom `pipeline`) via the
Settings UI / `setSystemTransformsConfig`. Disabling it is supported but re-exposes the
#2260 400 on accounts that enforce it. Disabling the pipeline does not give an unmodified
prompt: the billing and sentinel blocks, the tool remap/cloaking and the legacy
`obfuscateInBody` pass above still run. The server logs the applied ops per request as
`[SystemTransforms] claude-native: ...` when any op runs.

## What this means for third-party agent clients

If you point an OpenAI-compatible agent at OmniRoute and route it to `claude/*`, expect
the delivered system prompt to differ from what the client sent when the connection is
cloaked (see "When the transforms apply"): a Claude Code identity
and billing line are prepended, and paragraphs that identify the client agent may be
removed. Verify what actually reaches Anthropic with a marker test (send a distinctive
paragraph, inspect the stored request artifact, which exists only when the call log pipeline
is enabled in settings) or the `[SystemTransforms]` server log — do not assume the client's own
echo is what was sent. Expect zero-width-joiner rewrites of listed words even with the
configurable pipeline disabled.

To deliver a third-party agent's prompt unmodified, use an Anthropic API-key provider
(`anthropic`) or a combo seat that avoids the `claude` OAuth route; per-token cost applies.
