import test from "node:test";
import assert from "node:assert/strict";

import {
  buildThinkingSignatureDiagnosticsEvent,
  compareThinkingSignatures,
  emitThinkingSignatureDiagnostics,
  projectThinkingSignatureStructure,
} from "../../open-sse/handlers/chatCore/thinkingSignatureDiagnostics.ts";

const FOREIGN_SIGNATURE = "PRIVATE_FOREIGN_SIGNATURE_15534";
const ACTIVE_SIGNATURE = "PRIVATE_ACTIVE_SIGNATURE_15534";
const SENSITIVE_THINKING = "PRIVATE_THINKING_TEXT_15534";
const ENCRYPTED_CONTENT = "PRIVATE_ENCRYPTED_CONTENT_15534";
const API_KEY = "PRIVATE_API_KEY_15534";

const ingress = {
  messages: [
    { role: "user", content: "start" },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "", signature: FOREIGN_SIGNATURE },
        { type: "thinking", thinking: SENSITIVE_THINKING },
        { type: "text", text: API_KEY },
      ],
    },
    { role: "user", content: "continue" },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: SENSITIVE_THINKING, signature: ACTIVE_SIGNATURE },
        { type: "tool_use", id: "private-tool-id", name: "Bash", input: {} },
      ],
    },
    { role: "user", content: [{ type: "tool_result", tool_use_id: "private-tool-id" }] },
  ],
  encrypted_content: ENCRYPTED_CONTENT,
  headers: { authorization: API_KEY },
};

const outbound = {
  ...ingress,
  messages: [
    ingress.messages[0],
    {
      role: "assistant",
      content: [{ type: "redacted_thinking", data: FOREIGN_SIGNATURE }],
    },
    ...ingress.messages.slice(2),
  ],
};

test("#15534 diagnostics compare signatures in-memory and emit only aggregate structural facts", () => {
  assert.deepEqual(projectThinkingSignatureStructure(ingress), {
    assistantTurns: 2,
    signedThinking: 2,
    unsignedThinking: 1,
    emptyTextSignedThinking: 1,
    redactedThinking: 0,
    toolResultTurns: 1,
  });
  assert.deepEqual(compareThinkingSignatures(ingress, outbound), {
    unchanged: 2,
    removed: 0,
    added: 0,
  });
  const event = buildThinkingSignatureDiagnosticsEvent({
    correlationId: "1f3db3ae-468c-49c6-b6e5-4233f2551553",
    provider: "claude",
    model: "claude-opus-5-5",
    status: 400,
    message: "messages.1.content.0: Invalid `signature` in `thinking` block",
    ingressBody: ingress,
    outboundBody: outbound,
    recoveryAttempted: true,
    recoverySucceeded: false,
    outboundBodyCaptured: true,
  });
  assert.ok(event);
  assert.equal(event.status, 400);
  assert.equal(event.correlationId, "1f3db3ae-468c-49c6-b6e5-4233f2551553");
  assert.equal(event.recoveryAttempted, true);
  const serialized = JSON.stringify(event);
  for (const secret of [
    FOREIGN_SIGNATURE,
    ACTIVE_SIGNATURE,
    SENSITIVE_THINKING,
    ENCRYPTED_CONTENT,
    API_KEY,
    "private-tool-id",
  ]) {
    assert.equal(serialized.includes(secret), false, `diagnostics must not leak ${secret}`);
  }
  assert.deepEqual(Object.keys(event).sort(), [
    "correlationId",
    "ingress",
    "ingressToOutbound",
    "model",
    "outbound",
    "outboundBodyCaptured",
    "provider",
    "recoveryAttempted",
    "recoverySucceeded",
    "status",
  ]);
});

test("#15534 diagnostics do not emit on unrelated status, provider, or validation error", () => {
  for (const input of [
    { provider: "claude", status: 200, message: "Invalid `signature` in `thinking` block" },
    { provider: "codex", status: 400, message: "Invalid `signature` in `thinking` block" },
    // Truncated paraphrase, not Anthropic's canonical wording — the gate must not
    // over-match generic "cannot be modified" 400s (see #17324 positive case below).
    { provider: "claude", status: 400, message: "latest assistant message cannot be modified" },
  ]) {
    assert.equal(
      buildThinkingSignatureDiagnosticsEvent({
        correlationId: null,
        model: null,
        ingressBody: ingress,
        outboundBody: outbound,
        recoveryAttempted: false,
        recoverySucceeded: false,
        outboundBodyCaptured: true,
        ...input,
      }),
      null
    );
  }
});

test('#17324 diagnostics emit on the canonical "cannot be modified" thinking-block 400', () => {
  // Anthropic's exact wording for a replayed latest-turn thinking block that is not a
  // faithful copy (cross-org signature restore, fabricated placeholder, truncated capture).
  const canonicalMessage =
    "messages.2.content.0: `thinking` or `redacted_thinking` blocks in the latest assistant message cannot be modified. These blocks must remain as they were in the original response.";
  const event = buildThinkingSignatureDiagnosticsEvent({
    correlationId: "27d5aa1e-9f40-4b9e-8e4b-1c2d3e4f5a6b",
    provider: "claude",
    model: "claude-opus-5-5",
    status: 400,
    message: canonicalMessage,
    ingressBody: ingress,
    outboundBody: outbound,
    recoveryAttempted: true,
    recoverySucceeded: false,
    outboundBodyCaptured: true,
  });
  assert.ok(event);
  assert.equal(event.status, 400);
  assert.equal(event.correlationId, "27d5aa1e-9f40-4b9e-8e4b-1c2d3e4f5a6b");
  assert.equal(event.recoveryAttempted, true);
  // Same allowlisted shape: structural scalars only, no signature/thinking/header values.
  const serialized = JSON.stringify(event);
  for (const secret of [
    FOREIGN_SIGNATURE,
    ACTIVE_SIGNATURE,
    SENSITIVE_THINKING,
    ENCRYPTED_CONTENT,
    API_KEY,
    "private-tool-id",
  ]) {
    assert.equal(serialized.includes(secret), false, `diagnostics must not leak ${secret}`);
  }
  assert.deepEqual(Object.keys(event).sort(), [
    "correlationId",
    "ingress",
    "ingressToOutbound",
    "model",
    "outbound",
    "outboundBodyCaptured",
    "provider",
    "recoveryAttempted",
    "recoverySucceeded",
    "status",
  ]);

  // anthropic-compatible-* providers share the same boundary; a non-400 status does not.
  assert.equal(
    buildThinkingSignatureDiagnosticsEvent({
      correlationId: null,
      model: null,
      ingressBody: ingress,
      outboundBody: outbound,
      recoveryAttempted: false,
      recoverySucceeded: false,
      outboundBodyCaptured: true,
      provider: "anthropic-compatible-proxy",
      status: 400,
      message: canonicalMessage,
    }) === null,
    false
  );
  assert.equal(
    buildThinkingSignatureDiagnosticsEvent({
      correlationId: null,
      model: null,
      ingressBody: ingress,
      outboundBody: outbound,
      recoveryAttempted: false,
      recoverySucceeded: false,
      outboundBodyCaptured: true,
      provider: "claude",
      status: 500,
      message: canonicalMessage,
    }),
    null
  );
});

test("#15534 diagnostics never echo a caller-supplied non-UUID correlation id", () => {
  const event = buildThinkingSignatureDiagnosticsEvent({
    correlationId: "Bearer sk-private-header-value-15534",
    provider: "claude",
    model: "claude-opus-5-5",
    status: 400,
    message: "Invalid `signature` in `thinking` block",
    ingressBody: ingress,
    outboundBody: outbound,
    recoveryAttempted: false,
    recoverySucceeded: false,
    outboundBodyCaptured: true,
  });
  assert.ok(event);
  assert.equal(event.correlationId, null);
  assert.equal(JSON.stringify(event).includes("sk-private-header-value-15534"), false);
});

test("#15534 diagnostics emit one allowlisted warning and honor noLog", () => {
  const warnings: { tag: string; message: string }[] = [];
  const log = { warn: (tag: string, message: string) => warnings.push({ tag, message }) };
  const args = {
    correlationId: "Bearer sk-private-header-value-15534",
    provider: "claude",
    model: "claude-opus-5-5",
    status: 400,
    message: "Invalid `signature` in `thinking` block: " + API_KEY,
    ingressBody: ingress,
    outboundBody: outbound,
    recoveryAttempted: true,
    recoverySucceeded: true,
    outboundBodyCaptured: true,
  };

  emitThinkingSignatureDiagnostics(args, true, log);
  assert.equal(warnings.length, 0);
  emitThinkingSignatureDiagnostics({ ...args, status: 200 }, false, log);
  assert.equal(warnings.length, 0);
  emitThinkingSignatureDiagnostics(args, false, null);
  assert.equal(warnings.length, 0);

  emitThinkingSignatureDiagnostics(args, false, log);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].tag, "THINKING_SIGNATURE");
  assert.deepEqual(JSON.parse(warnings[0].message), buildThinkingSignatureDiagnosticsEvent(args));
  for (const secret of [
    FOREIGN_SIGNATURE,
    ACTIVE_SIGNATURE,
    SENSITIVE_THINKING,
    ENCRYPTED_CONTENT,
    API_KEY,
    "private-tool-id",
    "sk-private-header-value-15534",
  ]) {
    assert.equal(warnings[0].message.includes(secret), false, `warning must not leak ${secret}`);
  }
});
