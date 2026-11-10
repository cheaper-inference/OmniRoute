import test from "node:test";
import assert from "node:assert/strict";

import { resolveClineChatUrl } from "../../src/lib/providers/validation/cline.ts";
import { resolveKilocodeChatUrl } from "../../src/lib/providers/validation/kilocode.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL,
  CLINE_PASS_DEFAULT_VALIDATION_MODEL,
  resolveClineValidationModel,
  resolveClinepassValidationModel,
  resolveKilocodeValidationModel,
} from "../../src/lib/providers/clineKilocodeValidationModel.ts";

// #16298 — the Cline / Kilo Code validation probe must hit EXACTLY the route the
// executor would hit, and must probe a model every account can serve.
//
// Two defects this locks down:
//
//  1. URL duplication — the previous local resolver appended `/api/v1/chat/completions`
//     to an already-normalized `/api/v1` base, producing `/api/api/v1/chat/completions`,
//     a route Cline does not serve. The probe and the real request disagreed, so a
//     valid key could be reported as invalid.
//
//  2. Paid probe model — the probe model was the registry's FIRST model (catalog
//     order, not availability). Cline's first model is `z-ai/glm-5.2`, which is PAID
//     and answers 402 for an account without credit. The probe maps 402 to
//     "Validation failed: 402", reporting a valid key as invalid.
//
// The live routes (verified against the real upstreams):
//   Cline      → https://api.cline.bot/api/v1/chat/completions
//   Kilo Code  → https://api.kilo.ai/api/openrouter/chat/completions

test("#16298: resolveClineChatUrl resolves the live Cline chat route", () => {
  assert.equal(
    resolveClineChatUrl("https://api.cline.bot/api/v1/chat/completions"),
    "https://api.cline.bot/api/v1/chat/completions"
  );
});

test("#16298: resolveClineChatUrl does not duplicate the /api path", () => {
  // The regression: an /api/v1 base must NOT become /api/api/v1/chat/completions.
  assert.equal(
    resolveClineChatUrl("https://api.cline.bot/api/v1"),
    "https://api.cline.bot/api/v1/chat/completions"
  );
  assert.equal(
    resolveClineChatUrl("https://api.cline.bot/api/v1/"),
    "https://api.cline.bot/api/v1/chat/completions"
  );
});

test("#16298: resolveClineChatUrl accepts a custom base URL", () => {
  assert.equal(
    resolveClineChatUrl("https://proxy.example.com/api/v1"),
    "https://proxy.example.com/api/v1/chat/completions"
  );
  assert.equal(
    resolveClineChatUrl("https://proxy.example.com/api/v1/chat/completions"),
    "https://proxy.example.com/api/v1/chat/completions"
  );
  // A base URL that already points at the models route keeps the executor's
  // OpenAI-shape resolution (it appends /v1/chat/completions) — the validator must
  // resolve it EXACTLY like the executor does, see the parity test below.
  assert.equal(
    resolveClineChatUrl("https://proxy.example.com/api/v1/models"),
    "https://proxy.example.com/api/v1/models/v1/chat/completions"
  );
});

test("#16298: resolveKilocodeChatUrl resolves the live Kilo Code chat route", () => {
  assert.equal(
    resolveKilocodeChatUrl("https://api.kilo.ai/api/openrouter/chat/completions"),
    "https://api.kilo.ai/api/openrouter/chat/completions"
  );
});

test("#16298: resolveKilocodeChatUrl accepts a custom base URL", () => {
  assert.equal(
    resolveKilocodeChatUrl("https://proxy.example.com/api/openrouter"),
    "https://proxy.example.com/api/openrouter/v1/chat/completions"
  );
  assert.equal(
    resolveKilocodeChatUrl("https://proxy.example.com/api/openrouter/chat/completions"),
    "https://proxy.example.com/api/openrouter/chat/completions"
  );
});

test("#16298: an empty base URL resolves to an empty URL (no probe against a garbage host)", () => {
  assert.equal(resolveClineChatUrl(""), "");
  assert.equal(resolveKilocodeChatUrl(""), "");
  assert.equal(resolveClineChatUrl("   "), "");
  assert.equal(resolveKilocodeChatUrl("   "), "");
});

test("#16298: the Cline and Kilo Code probe model is the free router", () => {
  assert.equal(resolveClineValidationModel(), CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL);
  assert.equal(resolveKilocodeValidationModel(), CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL);
  assert.equal(CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL, "openrouter/free");
});

test("#16298: the ClinePass probe model stays in the cline-pass/* namespace", () => {
  // ClinePass models live in their own namespace and are NOT in the general catalog,
  // so the ClinePass probe cannot use the free router.
  assert.equal(resolveClinepassValidationModel(), CLINE_PASS_DEFAULT_VALIDATION_MODEL);
  assert.ok(
    CLINE_PASS_DEFAULT_VALIDATION_MODEL.startsWith("cline-pass/"),
    "the ClinePass probe model must be a cline-pass/* id"
  );
});

test("#16298: the dead Cline fallback model is gone", () => {
  // `nvidia/nemotron-3-nano-30b-a30b:free` is absent from Cline's live catalog
  // (neither /api/v1/models nor the picker lists it), so it could never serve a probe.
  assert.ok(
    !resolveClineValidationModel().includes("nemotron-3-nano-30b-a30b:free"),
    "the dead nvidia/nemotron-3-nano-30b-a30b:free fallback must not come back"
  );
});

test("#16298: a connection can override the probe model", () => {
  assert.equal(
    resolveClineValidationModel({ validationModelId: "  z-ai/glm-5.2  " }),
    "z-ai/glm-5.2"
  );
  assert.equal(
    resolveKilocodeValidationModel({ validationModelId: "anthropic/claude-sonnet-5" }),
    "anthropic/claude-sonnet-5"
  );
  assert.equal(
    resolveClinepassValidationModel({ validationModelId: "cline-pass/kimi-k3" }),
    "cline-pass/kimi-k3"
  );
});

test("#16298: a malformed validationModelId falls back to the default", () => {
  for (const bad of [undefined, null, "", "   ", 42, {}, []]) {
    assert.equal(
      resolveClineValidationModel({ validationModelId: bad }),
      CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL,
      `a malformed override (${JSON.stringify(bad)}) must not reach the upstream`
    );
    assert.equal(
      resolveKilocodeValidationModel({ validationModelId: bad }),
      CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL
    );
  }
});

test("#16298: the validator resolves EXACTLY the URL the executor would request", () => {
  // The strongest form of the URL contract: the probe and the real request must
  // agree on the endpoint, otherwise a valid key can be reported as invalid (or an
  // invalid key can pass) purely because the two paths disagree.
  const cases: { provider: "cline" | "kilocode"; baseUrl: string }[] = [
    { provider: "cline", baseUrl: "https://api.cline.bot/api/v1/chat/completions" },
    { provider: "cline", baseUrl: "https://api.cline.bot/api/v1" },
    { provider: "cline", baseUrl: "https://proxy.example.com/api/v1" },
    { provider: "cline", baseUrl: "https://proxy.example.com" },
    { provider: "kilocode", baseUrl: "https://api.kilo.ai/api/openrouter/chat/completions" },
    { provider: "kilocode", baseUrl: "https://api.kilo.ai/api/openrouter" },
    { provider: "kilocode", baseUrl: "https://proxy.example.com/api/openrouter" },
  ];

  for (const { provider, baseUrl } of cases) {
    const executor = new DefaultExecutor(provider);
    const executorUrl = executor.buildUrl("test-model", true, 0, {
      providerSpecificData: { baseUrl },
    });
    const validatorUrl =
      provider === "kilocode" ? resolveKilocodeChatUrl(baseUrl) : resolveClineChatUrl(baseUrl);
    assert.equal(
      validatorUrl,
      executorUrl,
      `${provider} with base URL ${baseUrl}: the probe must hit the same route as the executor`
    );
  }
});
