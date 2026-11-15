// Reversible PII vault, design section 6.2: unless both PII_REDACTION_ENABLED and
// PII_REVERSIBLE_VAULT_ENABLED are on AND a token was minted, the response leaving handleChat
// is the very same Response object, byte for byte, and no vault transform is built.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pii-vault-off-"));

const { runWithRequestTokenVault, isReversibleVaultGateOpen } =
  await import("../../src/lib/pii/requestTokenVaultScope.ts");
const { RequestTokenVault, getActiveRequestTokenVault } =
  await import("../../src/lib/pii/tokenVault.ts");
const { createDetokenizeSseTransform } =
  await import("../../src/lib/pii/detokenizeSseTransform.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");
const { clearAllFeatureFlagOverrides, setFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  clearAllFeatureFlagOverrides();
  resetDbInstance();
});

const sse = (frames: unknown[], events?: string[]) =>
  frames
    .map((f, i) => `${events ? `event: ${events[i]}\n` : ""}data: ${JSON.stringify(f)}\n\n`)
    .join("");

// Each fixture echoes the prompt text, which is what puts a token in the output when one exists.
const FIXTURES: Record<string, (echo: string) => { body: string; contentType: string }> = {
  "openai-sse": (echo) => ({
    contentType: "text/event-stream",
    body:
      sse([
        { id: "c", choices: [{ index: 0, delta: { content: echo } }] },
        { id: "c", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
      ]) + "data: [DONE]\n\n",
  }),
  "claude-sse": (echo) => ({
    contentType: "text/event-stream",
    body: sse(
      [
        { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
        { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: echo } },
        { type: "content_block_stop", index: 0 },
        { type: "message_stop" },
      ],
      ["content_block_start", "content_block_delta", "content_block_stop", "message_stop"]
    ),
  }),
  "responses-sse": (echo) => ({
    contentType: "text/event-stream",
    body: sse(
      [
        { type: "response.output_text.delta", output_index: 0, delta: echo },
        { type: "response.output_text.done", output_index: 0, text: echo },
        { type: "response.completed", response: { id: "r", output: [] } },
      ],
      ["response.output_text.delta", "response.output_text.done", "response.completed"]
    ),
  }),
  "gemini-sse": (echo) => ({
    contentType: "text/event-stream",
    body: sse([
      {
        candidates: [
          { index: 0, content: { role: "model", parts: [{ text: echo }] }, finishReason: "STOP" },
        ],
      },
    ]),
  }),
  "openai-json": (echo) => ({
    contentType: "application/json",
    body: JSON.stringify({
      choices: [{ index: 0, message: { role: "assistant", content: echo } }],
    }),
  }),
};

function setFlags(redaction: boolean, vault: boolean) {
  clearAllFeatureFlagOverrides();
  process.env.PII_REDACTION_ENABLED = String(redaction);
  process.env.PII_REVERSIBLE_VAULT_ENABLED = String(vault);
}

function spies() {
  const calls = { vaults: 0, transforms: 0 };
  return {
    calls,
    deps: {
      createVault: () => {
        calls.vaults++;
        return new RequestTokenVault();
      },
      createSseTransform: ((...args: Parameters<typeof createDetokenizeSseTransform>) => {
        calls.transforms++;
        return createDetokenizeSseTransform(...args);
      }) as typeof createDetokenizeSseTransform,
    },
  };
}

// Mirrors handleChat: the pii-masker runs inside the request with the active vault, then the
// "model" echoes the masked prompt.
async function simulateRequest(prompt: string, fixture: string, deps: object) {
  let original: Response | null = null;
  const result = await runWithRequestTokenVault(async () => {
    const masked = await new PIIMaskerGuardrail().preCall(
      { messages: [{ role: "user", content: prompt }] },
      { tokenVault: getActiveRequestTokenVault() ?? null }
    );
    const sent =
      (masked.modifiedPayload as { messages: Array<{ content: string }> } | undefined)?.messages[0]
        .content ?? prompt;
    const { body, contentType } = FIXTURES[fixture](sent);
    original = new Response(body, {
      status: 200,
      headers: { "Content-Type": contentType, "X-Probe": "1" },
    });
    return original;
  }, deps);
  return { result, original: original as unknown as Response };
}

const COMBOS: Array<{ name: string; redaction: boolean; vault: boolean; prompt: string }> = [
  { name: "off/off", redaction: false, vault: false, prompt: "mail jane@example.com" },
  {
    name: "redaction on, vault off",
    redaction: true,
    vault: false,
    prompt: "mail jane@example.com",
  },
  {
    name: "vault on, redaction off",
    redaction: false,
    vault: true,
    prompt: "mail jane@example.com",
  },
  { name: "on/on without PII in the prompt", redaction: true, vault: true, prompt: "just say hi" },
];

for (const combo of COMBOS) {
  for (const fixture of Object.keys(FIXTURES)) {
    test(`${combo.name} · ${fixture}: same Response object, same bytes, no transform`, async () => {
      setFlags(combo.redaction, combo.vault);
      const expectedEcho =
        combo.redaction && combo.prompt.includes("@") ? "mail [EMAIL_REDACTED]" : combo.prompt;
      const baseline = FIXTURES[fixture](expectedEcho);
      const { calls, deps } = spies();
      const { result, original } = await simulateRequest(combo.prompt, fixture, deps);
      assert.equal(result, original, "the handler's Response is returned as-is");
      assert.equal(await result.text(), baseline.body, "body is byte-identical to the baseline");
      assert.equal(result.headers.get("x-probe"), "1");
      assert.equal(result.headers.get("content-type"), baseline.contentType);
      assert.equal(calls.transforms, 0, "no detokenize transform was created");
      if (!(combo.redaction && combo.vault)) assert.equal(calls.vaults, 0, "no vault was created");
    });
  }
}

test("gate closed: the handler runs without a vault in scope", async () => {
  setFlags(false, false);
  let seen: unknown = "unset";
  await runWithRequestTokenVault(async () => {
    seen = getActiveRequestTokenVault();
    return new Response("{}", { headers: { "Content-Type": "application/json" } });
  });
  assert.equal(seen, undefined);
});

test("the gate honours the DB override like every feature flag", () => {
  setFlags(true, false);
  assert.equal(isReversibleVaultGateOpen(), false);
  setFeatureFlagOverride("PII_REVERSIBLE_VAULT_ENABLED", "true");
  assert.equal(isReversibleVaultGateOpen(), true, "DB override wins over env=false");
  setFeatureFlagOverride("PII_REDACTION_ENABLED", "false");
  assert.equal(isReversibleVaultGateOpen(), false, "both flags are required");
  clearAllFeatureFlagOverrides();
  process.env.PII_REVERSIBLE_VAULT_ENABLED = "true";
  setFeatureFlagOverride("PII_REVERSIBLE_VAULT_ENABLED", "false");
  assert.equal(isReversibleVaultGateOpen(), false, "DB override wins over env=true");
  clearAllFeatureFlagOverrides();
});

test("a throwing flag reader keeps the gate closed", () => {
  assert.equal(
    isReversibleVaultGateOpen(() => {
      throw new Error("db down");
    }),
    false
  );
});
