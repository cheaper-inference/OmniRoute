export const name = "family-alias-ask-gate";
export const priority = 10;

/** Lookups use the host's shared model/pricing map, not a plugin-owned tier ladder. */
export function normalizeModel(model) {
  return String(model ?? "")
    .replace(/^(?:cpa-base|cpa-fast|cpa-deep)[/:]/, "")
    .replace(/(?:-|\/|\()(?:high|low|medium|xhigh|max|none|minimal)\)?$/, "");
}

function consent(headers) {
  const entry = Object.entries(headers ?? {}).find(
    ([key]) => key.toLowerCase() === "x-open-design-cross-family"
  );
  return entry?.[1] === "1" ||
    (Array.isArray(entry?.[1]) && entry[1].length === 1 && entry[1][0] === "1");
}

function lookup(models, model) {
  const key = normalizeModel(model);
  const entry = models instanceof Map ? models.get(key) : models?.[key];
  return entry && typeof entry.family === "string" && entry.family.length > 0 &&
    Number.isFinite(entry.tier) && entry.tier >= 0 ? entry : null;
}

function stopped(requested, crossFamilyConsent, reason) {
  return {
    allowed: false,
    modelId: null,
    reason,
    cross_family_consent: crossFamilyConsent,
    line: `No confirmed lower-tier model in the same family. Stopped on ${requested}.`,
  };
}

/**
 * Authorize one proposed fallback, not the initial request. A higher numeric
 * tier is more capable/costly; it can never be selected, even with consent.
 * ask must be a trusted host callback, never a client request-body field.
 */
export async function authorizeFallback({
  requested, candidate, models, headers, sameModelRetries = 0, ask,
}) {
  const approvedCrossFamily = consent(headers);
  const source = lookup(models, requested);
  const target = lookup(models, candidate);
  if (!source || !target) return stopped(requested, approvedCrossFamily, "missing_model_tier");
  if (target.tier > source.tier) return stopped(requested, approvedCrossFamily, "upward_tier");
  if (source.family !== target.family && !approvedCrossFamily) {
    return stopped(requested, false, "cross_family_consent_required");
  }
  if (requested === candidate && sameModelRetries >= 1) {
    return stopped(requested, approvedCrossFamily, "same_model_retry_exhausted");
  }
  if (typeof ask !== "function") return stopped(requested, approvedCrossFamily, "ask_required");
  // Approval must be the exact allow value, not a truthy string such as "deny".
  if (await ask({ requested, candidate, source, target }) !== "allow") {
    return stopped(requested, approvedCrossFamily, "ask_denied");
  }
  return { allowed: true, modelId: candidate, cross_family_consent: approvedCrossFamily };
}

function blocked(decision) {
  return {
    blocked: true,
    response: { status: 409, body: { error: { code: decision.reason, message: decision.line } } },
    metadata: { family_alias_ask_gate: decision },
  };
}

/**
 * Native OmniRoute hook. Initial requests pass unchanged. The host must mark
 * every proposed fallback in trusted metadata before dispatching that hop.
 * The isolated IPC loader cannot transport an Ask callback: it stops with an
 * ask_required response unless a host-side Ask approved this exact candidate.
 */
export async function onRequest(ctx) {
  const gate = ctx?.metadata?.family_alias_ask_gate;
  if (!gate) return;
  if (typeof gate.requested !== "string" || typeof ctx.model !== "string") {
    return blocked(stopped(String(gate.requested ?? "unknown"), false, "invalid_gate_context"));
  }
  let ask = ctx.ask;
  if (!ask && gate.approved_model === ctx.model && gate.ask_answer === "allow") {
    ask = () => "allow";
  }
  const decision = await authorizeFallback({
    requested: gate.requested,
    candidate: ctx.model,
    models: gate.models,
    headers: ctx.headers,
    sameModelRetries: gate.same_model_retries ?? 0,
    ask,
  });
  if (!decision.allowed) return blocked(decision);
  // ctx.model is already the proposed card. Do not claim a {model: ...}
  // return rewrites it; OmniRoute's hook contract only accepts body/metadata.
  return { metadata: { family_alias_ask_gate: decision } };
}
