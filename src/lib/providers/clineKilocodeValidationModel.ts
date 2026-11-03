/**
 * Cline / ClinePass / Kilo Code key-validation probe model (#16298).
 *
 * Key validation does a tiny chat/completions probe and only cares whether auth passes
 * (401/403 ⇒ bad key; anything else ⇒ key OK). The probe model therefore must be one
 * that answers for EVERY account, including accounts with no credit balance.
 *
 * The previous selection was "the first model in the provider registry catalog"
 * (`getRegistryEntry(provider)?.models?.[0]?.id`). That is catalog ORDER, not
 * availability: Cline's registry lists `z-ai/glm-5.2` first (a PAID model) and Kilo's
 * lists `openrouter/free` first. For a Cline account without credit, the paid model
 * answers `402 Payment Required` — a status the probe maps to "Validation failed: 402"
 * (directChatProbe.ts), so a perfectly valid key was reported as invalid. The Cline
 * fallback constant was worse: it named `nvidia/nemotron-3-nano-30b-a30b:free`, which is
 * absent from Cline's live catalog entirely (neither `/api/v1/models` nor the picker
 * lists it), so it could never serve a probe.
 *
 * The default must be a model that is present in the provider's live catalog AND is
 * priced at zero. `openrouter/free` (the OpenRouter "free models router") is listed at
 * prompt "0" / completion "0" in Cline's picker catalog and answers HTTP 200
 * anonymously on Kilo's `/api/openrouter/chat/completions`.
 *
 * ClinePass is a separate namespace: its `cline-pass/*` subscription models are NOT in
 * the general catalog, so the ClinePass probe keeps using one from its own namespace.
 * Cline authenticates BEFORE it resolves the model (a bogus key answers 401 for every
 * model id), so a model that the account cannot serve still yields an unambiguous auth
 * verdict — but it must never be a model scoped outside the account's plan, or a valid
 * key could be rejected with a plan-scoped 403.
 *
 * A connection may still override the probe model via
 * `providerSpecificData.validationModelId`.
 */

/**
 * Free router model present in both the Cline and the Kilo Code live catalogs, priced
 * at zero on both. Shared default probe model for the two providers that expose it.
 */
export const CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL = "openrouter/free";

/**
 * ClinePass probe model. The subscription bucket lives in its own `cline-pass/*`
 * namespace (never in the general catalog), so it cannot share the free-router default
 * with plain Cline. `cline-pass/minimax-m3` is one of the few ids that appears BOTH in
 * the offline registry fallback and in the live `clinePass` bucket of
 * `/api/v1/ai/cline/recommended-models`, so it survives catalog rotation.
 */
export const CLINE_PASS_DEFAULT_VALIDATION_MODEL = "cline-pass/minimax-m3";

/**
 * Resolve the probe model for Cline.
 */
export function resolveClineValidationModel(providerSpecificData?: {
  validationModelId?: unknown;
}): string {
  const override = providerSpecificData?.validationModelId;
  if (typeof override === "string" && override.trim()) return override.trim();
  return CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL;
}

/**
 * Resolve the probe model for ClinePass.
 */
export function resolveClinepassValidationModel(providerSpecificData?: {
  validationModelId?: unknown;
}): string {
  const override = providerSpecificData?.validationModelId;
  if (typeof override === "string" && override.trim()) return override.trim();
  return CLINE_PASS_DEFAULT_VALIDATION_MODEL;
}

/**
 * Resolve the probe model for Kilo Code.
 */
export function resolveKilocodeValidationModel(providerSpecificData?: {
  validationModelId?: unknown;
}): string {
  const override = providerSpecificData?.validationModelId;
  if (typeof override === "string" && override.trim()) return override.trim();
  return CLINE_KILOCODE_DEFAULT_VALIDATION_MODEL;
}
