import { readFileSync } from "node:fs";

import { z } from "zod";

/** @typedef {"model-list"|"json-assert"|"page-text"} ProbeType */
/** @typedef {{ provider: string, poolKey?: string|null, modelId?: string, monthlyTokens: number }} Back */
/** @typedef {{ path: string, op: "equals"|"atLeast"|"lengthEquals"|"lengthAtLeast"|"includesCatalogIds", value?: unknown }} Assertion */
/** @typedef {{ id: string, provider: string, type: ProbeType, url: string, addedAt: string,
 *   source: "public-api"|"public-docs", backs?: Back[], note?: string,
 *   idsPath?: string, filter?: { field: string, equals: string|boolean } | { idEndsWith: string } | { zeroPricing: string[] },
 *   minIds?: number, idTransform?: { stripPrefix?: string, addPrefix?: string }, ignoreIds?: string[],
 *   assertions?: Assertion[],
 *   mustContain?: string[], mustNotContain?: string[], mustContainCatalogIds?: boolean, minTextChars?: number,
 *   excerpt?: { anchor: string, chars: number, sha256_16: string } }} Probe */
/** @typedef {{ schemaVersion: 1, reviewedAt: string, allowedHosts: string[], probes: Probe[] }} Manifest */

export const SOCIAL_DENYLIST = Object.freeze([
  "x.com",
  "twitter.com",
  "reddit.com",
  "old.reddit.com",
  "discord.com",
  "discord.gg",
  "t.me",
  "telegram.org",
  "linux.do",
  "youtube.com",
]);

const ASSERTION_OPS = new Set([
  "equals",
  "atLeast",
  "lengthEquals",
  "lengthAtLeast",
  "includesCatalogIds",
]);
const PROBE_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CREDENTIAL_PARAM = /key|token|auth|secret|sig/i;
const nonempty = z.string().min(1);
const positiveInteger = z.number().int().positive();
const stringList = z.array(nonempty);
const manifestShape = z.object({
  schemaVersion: z.literal(1),
  reviewedAt: z.iso.date(),
  allowedHosts: z.array(nonempty),
  probes: z.array(z.unknown()),
});
const probeShape = z.object({
  provider: nonempty,
  type: z.enum(["model-list", "json-assert", "page-text"]),
  addedAt: z.iso.date(),
  source: z.enum(["public-api", "public-docs"]),
  note: z.string().optional(),
  backs: z
    .array(
      z.object({
        provider: nonempty,
        poolKey: nonempty.nullable().optional(),
        modelId: nonempty.optional(),
      })
    )
    .optional(),
  idsPath: nonempty.optional(),
  filter: z
    .union([
      z.strictObject({ field: nonempty, equals: z.union([z.string(), z.boolean()]) }),
      z.strictObject({ idEndsWith: nonempty }),
      z.strictObject({ zeroPricing: stringList.min(1) }),
    ])
    .optional(),
  idTransform: z
    .object({ stripPrefix: nonempty.optional(), addPrefix: nonempty.optional() })
    .optional(),
  ignoreIds: stringList.optional(),
  assertions: z.array(z.object({ path: nonempty })).optional(),
  mustContain: stringList.optional(),
  mustNotContain: stringList.optional(),
  mustContainCatalogIds: z.boolean().optional(),
  minTextChars: positiveInteger.optional(),
  excerpt: z
    .object({
      anchor: nonempty,
      chars: positiveInteger,
      sha256_16: z.string().regex(/^[a-f0-9]{16}$/),
    })
    .optional(),
});

export function probeUrlErrors(id, rawUrl, allowedHosts) {
  const url = typeof rawUrl === "string" ? URL.parse(rawUrl) : null;
  if (!url) return [`${id}: invalid url`];

  const errors = [];
  if (url.protocol !== "https:") errors.push(`${id}: url must be https`);
  if (!allowedHosts.has(url.hostname)) errors.push(`${id}: host not allowed: ${url.hostname}`);
  const hostname = url.hostname.replace(/\.$/, "");
  if (SOCIAL_DENYLIST.some((host) => hostname === host || hostname.endsWith(`.${host}`))) {
    errors.push(`${id}: social platform hosts are never probed`);
  }
  if (
    url.username ||
    url.password ||
    [...url.searchParams.keys()].some((key) => CREDENTIAL_PARAM.test(key))
  ) {
    errors.push(`${id}: url must not carry credentials`);
  }
  return errors;
}

function typeErrors(probe) {
  const { id, type } = probe;
  if (type === "model-list" && !positiveInteger.safeParse(probe.minIds).success) {
    return [`${id}: model-list needs minIds >= 1`];
  }
  if (type === "json-assert" && !(Array.isArray(probe.assertions) && probe.assertions.length)) {
    return [`${id}: json-assert needs assertions`];
  }
  if (
    type === "page-text" &&
    !(
      probe.mustContain?.length ||
      probe.mustNotContain?.length ||
      probe.mustContainCatalogIds === true ||
      probe.excerpt
    )
  ) {
    return [`${id}: page-text needs at least one check`];
  }
  return [];
}

/** @param {unknown} manifest @returns {string[]} */
export function validateManifest(manifest) {
  const parsed = manifestShape.safeParse(manifest);
  if (!parsed.success) {
    return parsed.error.issues.map(
      ({ path }) => `invalid manifest field: ${path.join(".") || "root"}`
    );
  }

  const errors = [];
  const seen = new Set();
  const allowedHosts = new Set(parsed.data.allowedHosts);
  for (const probe of parsed.data.probes) {
    if (!probe || typeof probe !== "object" || Array.isArray(probe)) {
      errors.push("invalid probe: expected an object");
      continue;
    }
    const { id, assertions, backs } = probe;
    if (seen.has(id)) errors.push(`duplicate probe id: ${id}`);
    seen.add(id);
    if (typeof id !== "string" || !PROBE_ID.test(id)) errors.push(`invalid probe id: ${id}`);

    errors.push(...probeUrlErrors(id, probe.url, allowedHosts), ...typeErrors(probe));
    if (Array.isArray(assertions)) {
      for (const assertion of assertions) {
        if (!ASSERTION_OPS.has(assertion?.op))
          errors.push(`${id}: unknown assertion op: ${assertion?.op}`);
      }
    }
    if (Array.isArray(backs)) {
      for (const back of backs) {
        if (!Number.isInteger(back?.monthlyTokens) || back.monthlyTokens < 0) {
          errors.push(`${id}: backs.monthlyTokens must be a non-negative integer`);
        }
      }
    }
    const shape = probeShape.safeParse(probe);
    if (!shape.success) {
      errors.push(
        ...shape.error.issues.map(({ path }) => `${id}: invalid field: ${path.join(".")}`)
      );
    }
  }
  return errors;
}

/** @param {string|URL} file @returns {Manifest} */
export function loadManifest(file) {
  const manifest = JSON.parse(readFileSync(file, "utf8"));
  const errors = validateManifest(manifest);
  if (errors.length) throw new Error(errors.join("\n"));
  return manifest;
}
