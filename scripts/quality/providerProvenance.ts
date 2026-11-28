import { z } from "zod";

import * as providers from "../../src/shared/constants/providers.ts";

// Same provider collections as scripts/release/lib/code-facts-probe.mjs.
export function providerDefinitions() {
  return [
    providers.FREE_PROVIDERS,
    providers.NOAUTH_PROVIDERS,
    providers.OAUTH_PROVIDERS,
    providers.WEB_COOKIE_PROVIDERS,
    providers.APIKEY_PROVIDERS,
    providers.LOCAL_PROVIDERS,
    providers.SEARCH_PROVIDERS,
    providers.AUDIO_ONLY_PROVIDERS,
    providers.UPSTREAM_PROXY_PROVIDERS,
    providers.CLOUD_AGENT_PROVIDERS,
    providers.SYSTEM_PROVIDERS,
  ].flatMap((collection): { id: string; hasFree?: boolean }[] => Object.values(collection));
}

const date = z.iso.date();
const id = z.string().trim().min(1);
const trackingParam = /^(?:aff(?:iliate)?$|from$|ref(?:erral)?$|utm_)/i;
const credentialParam =
  /token|secret|password|credential|signature|api[_-]?key|access[_-]?key|auth/i;
const publicUrl = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return (
    url.protocol === "https:" &&
    url.hostname.includes(".") &&
    !url.username &&
    !url.password &&
    ![...url.searchParams.keys(), ...new URLSearchParams(url.hash.slice(1)).keys()].some(
      (key) => trackingParam.test(key) || credentialParam.test(key)
    )
  );
}, "Expected a public HTTPS URL without credentials or tracking parameters");

const reference = z
  .string()
  .max(300)
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9._-]*(?:\/[a-zA-Z0-9][a-zA-Z0-9._-]*)*$/,
    "Expected a safe evidence artifact identifier or relative path"
  );

const factRef = z.discriminatedUnion("scope", [
  z.strictObject({
    scope: z.literal("provider"),
    field: z.enum(["baseUrl", "modelsUrl", "authType", "terms"]),
  }),
  z.strictObject({
    scope: z.literal("model"),
    modelId: id,
    field: z.enum(["id", "contextWindow", "maxOutput", "capabilities", "freeEligibility"]),
  }),
]);
export type ProviderFactRef = z.infer<typeof factRef>;

const factEvidence = z
  .strictObject({
    fact: factRef,
    source: z.enum(["official-doc", "listing-api", "live-test", "models-dev"]),
    sourceUrl: publicUrl,
    checkedAt: date,
    evidenceRef: reference.optional(),
  })
  .refine((entry) => entry.source !== "live-test" || entry.evidenceRef !== undefined, {
    path: ["evidenceRef"],
    message: "A live test requires a sanitized evidence reference",
  });
const factEvidenceList = z.array(factEvidence);

export type ProviderFactEvidence = z.infer<typeof factEvidence>;

export function parseProviderFactEvidence(input: unknown): ProviderFactEvidence[] {
  return factEvidenceList.parse(input);
}

const addition = z
  .strictObject({
    providerId: id,
    addedOn: date,
    discoveredVia: z.enum(["public-list", "provider-page", "submission", "contributor-pr"]),
    sourceUrl: publicUrl,
    checkedAt: date,
    checkedExcerpt: z.string().trim().min(1).max(300),
    tos: z
      .strictObject({
        verdict: z.enum(["ok", "caution", "avoid"]),
        url: publicUrl,
        checkedAt: date,
      })
      .optional(),
  })
  .refine((entry) => entry.checkedAt >= entry.addedOn, {
    path: ["checkedAt"],
    message: "Source check precedes the addition",
  })
  .refine((entry) => !entry.tos || entry.tos.checkedAt >= entry.addedOn, {
    path: ["tos", "checkedAt"],
    message: "Terms check precedes the addition",
  });

const provenance = z.strictObject({
  schemaVersion: z.literal(1),
  baselineRef: id,
  baselineIds: z.array(id),
  added: z.array(addition),
  contributorPending: z.array(id),
  factsByProvider: z
    .record(
      id,
      z.strictObject({
        evidence: factEvidenceList,
        historicalGaps: z.array(z.strictObject({ fact: factRef, reason: id })).default([]),
      })
    )
    .default({}),
});

export type ProviderProvenance = z.infer<typeof provenance>;

export function parseProviderProvenance(input: unknown): ProviderProvenance {
  return provenance.parse(input);
}

function factKey(fact: ProviderFactRef): string {
  return fact.scope === "provider" ? fact.field : `${fact.modelId}/${fact.field}`;
}

/** Every required fact needs an observation. Historical gaps describe inherited facts only. */
export function assertProviderFactCoverage(
  manifest: ProviderProvenance,
  providerId: string,
  required: readonly ProviderFactRef[]
): void {
  const evidence = manifest.factsByProvider[providerId]?.evidence ?? [];
  const recorded = new Set(evidence.map((entry) => factKey(entry.fact)));
  const missing = required.map(factKey).filter((fact) => !recorded.has(fact));
  if (missing.length)
    throw new Error(`${providerId}: missing fact evidence for ${missing.join(", ")}`);
}
