/**
 * NVIDIA NIM diagnostics — `s.startsWith is not a function` (issue
 *
 * How to run (the key is NEVER committed — it comes via env):
 *   NVIDIA_API_KEY="nvapi-..." node --import tsx/esm scripts/ad-hoc/nvidia-startswith-diag.ts
 *
 * Opcional — apontar para outra base/model:
 *   NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1/chat/completions"
 *   NVIDIA_MODEL="openai/gpt-oss-120b"
 *
 * O que ele faz:
 *   Part A — Actual validation via validateProviderApiKey() (path of the "Test Connection" button).
 *   Part B — Upstream sanity: Direct POST to NVIDIA (isolates the key/model from our pipeline).
 *   Part C — Type-crash probes WITHOUT a key: feeds a malformed model into resolveModelAlias +
 *             replica o strip de prefixo de chatCore.ts:3316 e parseModel(), capturando o stack
 *             NOT minified (we run it against the TS source) to pinpoint the exact line of startsWith.
 *
 * Part C does not require a key — it demonstrates which lines are vulnerable today.
 */

const KEY = process.env.NVIDIA_API_KEY ?? "";
const BASE_URL =
  process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NVIDIA_MODEL || "openai/gpt-oss-120b";

// Neutralize CR/LF before logging so env-derived values (NVIDIA_MODEL, etc.)
// cannot forge extra log lines (S5145 log injection). Also strip any raw
// occurrence of the API key so an upstream error/response that echoes it
// back (e.g. inside err.stack or a validation result) never reaches the
// terminal in clear text (js/clear-text-logging, CWE-312/532).
const line = (s = "") => {
  let out = String(s).replace(/[\r\n]+/g, " ");
  if (KEY) out = out.split(KEY).join("[REDACTED]");
  console.log(out);
};
const hr = () => line("─".repeat(72));

function show(label: string, value: unknown) {
  line(`  ${label}: ${typeof value === "string" ? value : JSON.stringify(value)}`);
}

// ──────────────────────────────────────────────────────────────────────────
// Part A — validateProviderApiKey (validation path/connection test)
// ──────────────────────────────────────────────────────────────────────────
async function partA() {
  hr();
  line("PARTE A — validateProviderApiKey({ provider: 'nvidia' })");
  hr();
  if (!KEY) {
    line("  ⏭  skipped — set NVIDIA_API_KEY to run.");
    return;
  }
  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const providerSpecificData = { baseUrl: BASE_URL };
    const result = await validateProviderApiKey({
      provider: "nvidia",
      apiKey: KEY,
      providerSpecificData,
    });
    line("  ✅ validateProviderApiKey retornou (sem crash):");
    show("result", result);
    if (
      typeof (result as any)?.error === "string" &&
      (result as any).error.includes("startsWith")
    ) {
      line(
        "  ⚠️  The error message contains 'startsWith' → crash CAPTURED within the validation try/catch."
      );
    }
  } catch (err: any) {
    line("  ❌ validateProviderApiKey THREW (unhandled crash):");
    line(`     ${err?.message}`);
    line(err?.stack ?? String(err));
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Part B — NVIDIA upstream sanity check (isolates key/model from our pipeline)
// ──────────────────────────────────────────────────────────────────────────
async function partB() {
  hr();
  line("PART B — Direct POST to NVIDIA upstream (key/model sanity check)");
  hr();
  if (!KEY) {
    line("  ⏭  skipped — set NVIDIA_API_KEY to run.");
    return;
  }
  const url = BASE_URL.endsWith("/chat/completions") ? BASE_URL : `${BASE_URL}/chat/completions`;
  show("url", url);
  show("model", MODEL);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      }),
    });
    const text = await res.text();
    show("status", res.status);
    line(`  body (256): ${text.slice(0, 256)}`);
    if (res.ok) line("  ✅ upstream OK — valid key and model.");
    else if (res.status === 401 || res.status === 403) line("  ❌ invalid key (401/403).");
    else line("  ⚠️  not OK, not auth — key probably valid, see body.");
  } catch (err: any) {
    line(`  ❌ fetch failed: ${err?.message}`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Part C — Type-crash probes (no key) — locks the startsWith line
// ──────────────────────────────────────────────────────────────────────────
async function partC() {
  hr();
  line("PARTE C — probes de type-crash (resolveModelAlias + strip chatCore:3316 + parseModel)");
  hr();

  const { resolveModelAlias } = await import("../../open-sse/services/modelDeprecation.ts");
  const { parseModel } = await import("../../open-sse/services/model.ts");

  // Replica EXATA do trecho de chatCore.ts:3315-3320 (feature #1261), sem guard.
  function stripPrefixLikeChatCore(effectiveModel: any, provider: string, alias?: string) {
    let finalModelToUpstream = effectiveModel;
    if (finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
    return finalModelToUpstream;
  }

  const inputs: Array<{ label: string; model: any }> = [
    { label: "string normal (multi-barra NVIDIA)", model: "nvidia/openai/gpt-oss-120b" },
    { label: "object {} (UI bug / providerSpecificData not saved correctly)", model: {} },
    { label: "object {id: '...'}", model: { id: "openai/gpt-oss-120b" } },
    { label: "number", model: 123 },
    { label: "array", model: ["openai/gpt-oss-120b"] },
    { label: "null", model: null },
    { label: "undefined", model: undefined },
  ];

  for (const { label, model } of inputs) {
    line("");
    line(`  ▶ input: ${label}  (typeof=${typeof model})`);

    // 1) resolveModelAlias — does it let non-strings pass? (if (!modelId) return modelId)
    let effective: any;
    try {
      effective = resolveModelAlias(model as any);
      line(`     resolveModelAlias → ${typeof effective} ${JSON.stringify(effective)}`);
    } catch (err: any) {
      line(`     resolveModelAlias THROW: ${err?.message}`);
      effective = model;
    }

    // 2) strip de prefixo (chatCore:3316) — captura o stack EXATO
    try {
      const out = stripPrefixLikeChatCore(effective, "nvidia", "nvidia");
      line(`     chatCore strip → ${JSON.stringify(out)}  ✅ sem crash`);
    } catch (err: any) {
      line(`     ❌ chatCore:3316 strip THROW: ${err?.message}`);
      const at = (err?.stack ?? "").split("\n").find((l: string) => l.includes(".ts"));
      if (at) line(`        ${at.trim()}`);
    }

    // 3) parseModel (model.ts:315) — captura o stack EXATO
    try {
      const parsed = parseModel(model as any);
      line(`     parseModel → ${JSON.stringify(parsed)}  ✅ sem crash`);
    } catch (err: any) {
      line(`     ❌ model.ts parseModel THROW: ${err?.message}`);
      const at = (err?.stack ?? "").split("\n").find((l: string) => l.includes("model.ts"));
      if (at) line(`        ${at.trim()}`);
    }
  }
}

async function main() {
  line("");
  line("NVIDIA NIM — diagnosis `startsWith is not a function`");
  // Never echo any portion of the key (js/clear-text-logging) — presence only.
  show("NVIDIA_API_KEY present", KEY ? "yes" : "no");
  show("BASE_URL", BASE_URL);
  show("MODEL", MODEL);
  line("");
  await partA();
  await partB();
  await partC();
  hr();
  line("FIM.");
}

main().catch((e) => {
  console.error("fatal error in diagnosis:", e);
  process.exit(1);
});
