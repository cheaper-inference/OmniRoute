import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import { processPII } from "@/shared/utils/inputSanitizer";
import { sanitizePII, sanitizePIIResponse } from "@/lib/piiSanitizer";
import { getPiiRuleConfig } from "@/lib/pii/piiRuleConfig";
import { recordPiiDetections } from "@/lib/pii/piiDetectionStats";

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

type PiiDetection = {
  count: number;
  type: string;
};

type JsonRecord = Record<string, unknown>;

/** Reversible-vault minter; only set when the request runs under the vault scope. */
type Tokenize = (type: string, value: string) => string | null;

function isRequestPiiMaskingEnabled() {
  // Request PII redaction is controlled by PII_REDACTION_ENABLED feature flag (DB > env > default).
  // INPUT_SANITIZER_MODE only governs prompt-injection policy (warn/block/log).
  return isFeatureFlagEnabled("PII_REDACTION_ENABLED");
}

function ruleOptions(redact: boolean, tokenize?: Tokenize) {
  // The operator's per-type selection and custom rules only apply while masking
  // is on; with the flag off detection stays exactly the built-in scan.
  if (!redact) return undefined;
  const config = getPiiRuleConfig();
  return tokenize ? { ...config, tokenize } : config;
}

function sanitizeStringValue(text: string, redact: boolean, tokenize?: Tokenize) {
  const result = processPII(text, redact, ruleOptions(redact, tokenize));
  return {
    detections: result.detections,
    modified: result.text !== text,
    text: result.text,
  };
}

function applyToContentValue(
  value: unknown,
  detections: PiiDetection[],
  redact: boolean,
  tokenize?: Tokenize
): { modified: boolean; value: unknown } {
  if (typeof value === "string") {
    const result = sanitizeStringValue(value, redact, tokenize);
    detections.push(...result.detections);
    return {
      modified: result.modified,
      value: result.text,
    };
  }

  if (Array.isArray(value)) {
    let modified = false;
    const nextValue = value.map((entry) => {
      if (typeof entry === "string") {
        const result = sanitizeStringValue(entry, redact, tokenize);
        detections.push(...result.detections);
        modified ||= result.modified;
        return result.text;
      }

      if (entry && typeof entry === "object") {
        const record = { ...(entry as JsonRecord) };
        if (typeof record.text === "string") {
          const result = sanitizeStringValue(record.text, redact, tokenize);
          detections.push(...result.detections);
          modified ||= result.modified;
          record.text = result.text;
        }
        // Recurse rather than only masking a string `content`. A tool_result
        // block carries its payload as an array of parts, which is what every
        // agentic client sends back, and the string-only test walked straight
        // past it: the outer text block was redacted while the tool output next
        // to it reached the provider intact. This is the same call
        // sanitizeMessageLikeList already makes one level up, so the two agree
        // on how deep masking goes. The payload was parsed from the request
        // body, so it is acyclic and the recursion is bounded by its nesting.
        if ("content" in record) {
          const result = applyToContentValue(record.content, detections, redact, tokenize);
          modified ||= result.modified;
          record.content = result.value;
        }
        return record;
      }

      return entry;
    });
    return { modified, value: nextValue };
  }

  return { modified: false, value };
}

function cloneAndMaskRequestPayload(payload: unknown, tokenize?: Tokenize) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { detections: [] as PiiDetection[], modified: false, payload };
  }

  // The flag is resolved once per payload rather than once per string leaf: a
  // large agentic body carries thousands of leaves, and every resolution walked
  // the DB override chain. The top level is copied shallowly and every branch
  // below rebuilds the containers it touches, so the caller's body is never
  // mutated without paying for a JSON round trip of the whole request up front.
  const redact = isRequestPiiMaskingEnabled();
  // Masking off (the default) changes nothing, so do not scan: a scan only fed a debug count.
  if (!redact) return { detections: [] as PiiDetection[], modified: false, payload };
  const clonedPayload: JsonRecord = { ...(payload as JsonRecord) };
  const detections: PiiDetection[] = [];
  let modified = false;

  const sanitizeMessageLikeList = (list: unknown) => {
    if (!Array.isArray(list)) return list;
    return list.map((entry) => {
      // Responses API can pass plain strings in input[]
      if (typeof entry === "string") {
        const result = sanitizeStringValue(entry, redact, tokenize);
        detections.push(...result.detections);
        modified ||= result.modified;
        return result.text;
      }
      if (!entry || typeof entry !== "object") return entry;
      const record = { ...(entry as JsonRecord) };
      if ("content" in record) {
        const result = applyToContentValue(record.content, detections, redact, tokenize);
        modified ||= result.modified;
        record.content = result.value;
      }
      if (typeof record.text === "string") {
        const result = sanitizeStringValue(record.text, redact, tokenize);
        detections.push(...result.detections);
        modified ||= result.modified;
        record.text = result.text;
      }
      return record;
    });
  };

  if (typeof clonedPayload.system === "string") {
    const result = sanitizeStringValue(clonedPayload.system, redact, tokenize);
    detections.push(...result.detections);
    modified ||= result.modified;
    clonedPayload.system = result.text;
  } else if (Array.isArray(clonedPayload.system)) {
    clonedPayload.system = sanitizeMessageLikeList(clonedPayload.system);
  }

  if (Array.isArray(clonedPayload.messages)) {
    clonedPayload.messages = sanitizeMessageLikeList(clonedPayload.messages);
  }

  if (Array.isArray(clonedPayload.input)) {
    clonedPayload.input = sanitizeMessageLikeList(clonedPayload.input);
  } else if (typeof clonedPayload.input === "string") {
    const result = sanitizeStringValue(clonedPayload.input, redact, tokenize);
    detections.push(...result.detections);
    modified ||= result.modified;
    clonedPayload.input = result.text;
  }

  if (typeof clonedPayload.prompt === "string") {
    const result = sanitizeStringValue(clonedPayload.prompt, redact, tokenize);
    detections.push(...result.detections);
    modified ||= result.modified;
    clonedPayload.prompt = result.text;
  } else if (Array.isArray(clonedPayload.prompt)) {
    clonedPayload.prompt = sanitizeMessageLikeList(clonedPayload.prompt);
  }

  if (redact) recordPiiDetections("request", detections);

  return {
    detections,
    modified,
    payload: modified ? clonedPayload : payload,
  };
}

function maskResponsesOutput(response: JsonRecord) {
  let modified = false;

  if (typeof response.output_text === "string") {
    const result = sanitizePII(response.output_text, false, { recordStats: true });
    if (result.redacted) {
      response.output_text = result.text;
      modified = true;
    }
  }

  if (Array.isArray(response.output)) {
    response.output = response.output.map((item) => {
      if (!item || typeof item !== "object") return item;
      const nextItem = { ...(item as JsonRecord) };
      if (Array.isArray(nextItem.content)) {
        nextItem.content = nextItem.content.map((part) => {
          if (!part || typeof part !== "object") return part;
          const nextPart = { ...(part as JsonRecord) };
          if (typeof nextPart.text === "string") {
            const result = sanitizePII(nextPart.text, false, { recordStats: true });
            if (result.redacted) {
              nextPart.text = result.text;
              modified = true;
            }
          }
          return nextPart;
        });
      }
      return nextItem;
    });
  }

  return modified;
}

/**
 * Mask the request, minting reversible tokens when the request runs under the vault scope
 * (`context.tokenVault`, set by handleChat only). The minter is passed explicitly, so other
 * processPII callers such as the prompt-injection sanitizer never mint. Fail-closed: if the
 * vault path throws, the request is masked again with irreversible placeholders here, because
 * the registry fails open and would forward the original body to the provider.
 */
function maskWithOptionalVault(payload: unknown, context: GuardrailContext | undefined) {
  const minter = context?.tokenVault;
  if (!minter || typeof minter.tokenize !== "function") return cloneAndMaskRequestPayload(payload);
  const tokenize: Tokenize = (type, value) => minter.tokenize(type, value);
  try {
    return cloneAndMaskRequestPayload(payload, tokenize);
  } catch (error) {
    context?.log?.warn?.("GUARDRAIL", "pii-masker vault minting failed; using placeholders", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return cloneAndMaskRequestPayload(payload);
  }
}

export class PIIMaskerGuardrail extends BaseGuardrail {
  constructor(options: { enabled?: boolean; priority?: number } = {}) {
    super("pii-masker", {
      enabled: options.enabled,
      priority: options.priority ?? 10,
    });
  }

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    const result = maskWithOptionalVault(payload, context);
    if (!result.modified) {
      return {
        block: false,
        meta: result.detections.length > 0 ? { detections: result.detections.length } : null,
      };
    }

    return {
      block: false,
      meta: { detections: result.detections.length, redacted: true },
      modifiedPayload: result.payload,
    };
  }

  async postCall(response: unknown, _context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    if (!response || typeof response !== "object" || Array.isArray(response)) {
      return { block: false };
    }
    // Sanitization off (the default) is a no-op below; skip the clone and two stringifies.
    if (!isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")) return { block: false };

    const clonedResponse = JSON.parse(JSON.stringify(response)) as JsonRecord;
    const before = JSON.stringify(clonedResponse);
    const sanitized = sanitizePIIResponse(clonedResponse) as JsonRecord;
    const modifiedResponsesShape = maskResponsesOutput(sanitized);
    const after = JSON.stringify(sanitized);
    const modified = before !== after || modifiedResponsesShape;

    if (!modified) return { block: false };

    return {
      block: false,
      meta: { redacted: true },
      modifiedResponse: sanitized,
    };
  }
}
