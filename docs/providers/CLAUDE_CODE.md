---
title: "Providers — Claude Code (OAuth)"
version: 3.8.53
lastUpdated: 2026-10-31
---

# Providers — Claude Code (OAuth)

The native `claude` provider (alias `cc`) serves Claude models through a Claude Code
subscription OAuth connection. This page documents what the route does to every request —
including OpenAI-compatible third-party clients hitting `/v1/chat/completions` — because
several of these behaviors are invisible to the client and are not configurable switches.

## What is prepended to every request (not configurable)

`open-sse/executors/base.ts` (search for `SENTINEL`) prepends two system blocks to every
request on this route, after stripping any pre-existing copies so retries stay idempotent
(`stripClaudeSystemPrefixBlocks`):

1. `x-anthropic-billing-header: cc_version=...; cc_entrypoint=cli; cch=00000;`
2. `You are Claude Code, Anthropic's official CLI for Claude.`

Tool names are also remapped to the Claude Code set on the way out and back
(`open-sse/services/claudeCodeToolRemapper.ts`). None of this has a setting: it is part of
the subscription-OAuth wire format.

## The system-transforms pipeline (configurable, on by default)

After the prepend, `applySystemTransformPipeline` (`open-sse/services/systemTransforms.ts`)
runs the default `claude` pipeline unless it is disabled:

- **Paragraph removal**: system paragraphs starting with third-party agent identity
  anchors (`DEFAULT_IDENTITY_PREFIXES`, `DEFAULT_PARAGRAPH_REMOVAL_ANCHORS`) are dropped.
  In practice this removes paragraphs that begin with another agent's identity line or
  carry its documentation URL.
- **Word obfuscation**: listed words are rewritten with zero-width joiners
  (`obfuscate_words` op; native Claude Code words plus the Open WebUI additions from
  issue #2260).

Why it exists: without it, non-claude-cli clients on subscription OAuth surface
`[400] Third-party apps now draw from extra usage, not plan limits.` (#2260). That is why
the pipeline defaults to enabled.

Configuration: `systemTransforms.providers.claude` (`enabled`, custom `pipeline`) via the
Settings UI / `setSystemTransformsConfig`. Disabling it is supported but re-exposes the
#2260 400 on accounts that enforce it. The server logs the applied ops per request as
`[SystemTransforms] claude-native: ...` when any op runs.

## What this means for third-party agent clients

If you point an OpenAI-compatible agent at OmniRoute and route it to `claude/*`, expect
the delivered system prompt to differ from what the client sent: a Claude Code identity
and billing line are prepended, and paragraphs that identify the client agent may be
removed. Verify what actually reaches Anthropic with a marker test (send a distinctive
paragraph, inspect the stored request artifact) or the `[SystemTransforms]` server log —
do not assume the client's own echo is what was sent.

To deliver a third-party agent's prompt unmodified, use an Anthropic API-key provider
(`anthropic`) or a combo seat that avoids the `claude` OAuth route; per-token cost applies.
