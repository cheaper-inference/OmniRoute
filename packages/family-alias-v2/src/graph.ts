import type { EnrichedEndpoint } from "./catalog.ts";
import { classifyLocalEndpoint } from "./classify.ts";
import { evaluateEndpoint } from "./health/evaluate.ts";
import type { HealthCache } from "./health/cache.ts";
import { endpointHealthKey } from "./health/cache.ts";
import { OWNER, ownershipDescription, stableHash } from "./ownership.ts";
import { EFFORT_TOKENS, effortId, orderEndpoints, type Effort } from "./routing.ts";
import { compareVersionNewestFirst } from "./version.ts";
import type { ClassifiedEndpoint, LocalEndpoint } from "./types.ts";

export type DesiredModelStep = {
  id: string;
  kind: "model";
  model: string;
  providerId: string;
  connectionId: string;
  allowedConnectionIds: string[];
  weight: 0;
};

export type DesiredCombo = {
  name: string;
  description: string;
  strategy: "priority";
  allowedModelFamilies: string[];
  models: Array<DesiredModelStep | { id: string; kind: "combo-ref"; comboName: string; weight: 0 }>;
};

export type DesiredGraph = {
  owner: typeof OWNER;
  graphHash: string;
  combos: DesiredCombo[];
  omitted: Array<{ modelId: string; reason: string }>;
};

function aliasOf(endpoint: ClassifiedEndpoint): string {
  const { owner, line, modality } = endpoint.lineage;
  return [owner, line, modality].filter(Boolean).join("/");
}

function endpointKey(endpoint: ClassifiedEndpoint): string {
  return [
    endpoint.endpoint.connectionId,
    endpoint.endpoint.providerId,
    endpoint.endpoint.modelId,
  ].join("\u0000");
}

function stepId(endpoint: ClassifiedEndpoint): string {
  return `fam-v2-${stableHash(endpointKey(endpoint)).slice(0, 16)}`;
}

/**
 * Returns null when the endpoint may appear in the graph, otherwise the state
 * that keeps it out. A temporary outage keeps a last-known-good endpoint so the
 * graph does not churn; runtime health/cooldown decides whether it can serve now.
 */
function admissionFailure(endpoint: LocalEndpoint, health: HealthCache): string | null {
  const state = evaluateEndpoint(
    endpoint,
    health[endpointHealthKey(endpoint.connectionId, endpoint.modelId)]
  );
  if (state.state === "eligible") return null;
  if (state.state === "temporarily_unavailable" && state.preserve) return null;
  return state.state;
}

export function buildDesiredGraph(opts: {
  enriched: EnrichedEndpoint[];
  health: HealthCache;
}): DesiredGraph {
  const families = new Map<string, Map<string, ClassifiedEndpoint[]>>();
  const omitted: Array<{ modelId: string; reason: string }> = [];

  for (const item of opts.enriched) {
    const classified = classifyLocalEndpoint(item.endpoint, item.metadata);
    if (!classified) {
      omitted.push({ modelId: item.endpoint.modelId, reason: "unclassified" });
      continue;
    }
    if (classified.isReasoningVariant) {
      omitted.push({ modelId: item.endpoint.modelId, reason: "reasoning_variant" });
      continue;
    }
    const rejected = admissionFailure(item.endpoint, opts.health);
    if (rejected) {
      omitted.push({ modelId: item.endpoint.modelId, reason: rejected });
      continue;
    }
    const alias = aliasOf(classified);
    const versionKey = classified.version.display;
    if (!families.has(alias)) families.set(alias, new Map());
    const versions = families.get(alias)!;
    if (!versions.has(versionKey)) versions.set(versionKey, []);
    versions.get(versionKey)!.push(classified);
  }

  const skeleton = [...families.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([alias, versions]) => ({
      alias,
      versions: [...versions.entries()]
        .map(([display, endpoints]) => {
          const ordered = orderEndpoints(alias.split("/")[0], endpoints);
          // A version with no allowed provider must not become the newest
          // version of its family; record its endpoints instead.
          if (ordered.length === 0) {
            for (const endpoint of endpoints) {
              omitted.push({ modelId: endpoint.endpoint.modelId, reason: "no_allowed_provider" });
            }
          }
          return { display, version: endpoints[0].version, endpoints: ordered };
        })
        .filter((version) => version.endpoints.length > 0)
        .sort((a, b) => compareVersionNewestFirst(a.version, b.version)),
    }))
    .filter((family) => family.versions.length > 0);

  const graphHash = stableHash(
    skeleton.map((family) => ({
      alias: family.alias,
      versions: family.versions.map((version) => ({
        version: version.display,
        endpoints: version.endpoints.map(endpointKey),
      })),
    }))
  );

  const combos: DesiredCombo[] = [];
  for (const family of skeleton) {
    const versionNames: string[] = [];
    for (const version of family.versions) {
      const versionName = `${family.alias}/${version.display}`;
      versionNames.push(versionName);
      combos.push({
        name: versionName,
        description: ownershipDescription(graphHash, "version"),
        strategy: "priority",
        allowedModelFamilies: [family.alias.split("/")[0]],
        models: version.endpoints.map((classified) => ({
          id: stepId(classified),
          kind: "model",
          model: classified.endpoint.modelId,
          providerId: classified.endpoint.providerId,
          connectionId: classified.endpoint.connectionId,
          allowedConnectionIds: [classified.endpoint.connectionId],
          weight: 0,
        })),
      });
    }
    combos.push({
      name: family.alias,
      description: ownershipDescription(graphHash, "family"),
      strategy: "priority",
      allowedModelFamilies: [family.alias.split("/")[0]],
      models: versionNames.slice(0, 1).map((comboName, index) => ({
        id: `fam-v2-ref-${stableHash(`${family.alias}:${comboName}:${index}`).slice(0, 16)}`,
        kind: "combo-ref" as const,
        comboName,
        weight: 0 as const,
      })),
    });
  }

  const extra: DesiredCombo[] = [];
  for (const combo of combos) {
    const first = combo.models.find((step) => step.kind === "model");
    if (!first || first.kind !== "model") continue;
    for (const effort of EFFORT_TOKENS) {
      const wanted = effortId(first.model, effort as Effort);
      // The suffix must be served by the same connection as the first step, and
      // that endpoint must pass the same eligibility and health rules.
      const match = opts.enriched.find(
        (item) =>
          item.endpoint.modelId === wanted &&
          item.endpoint.providerId === first.providerId &&
          item.endpoint.connectionId === first.connectionId &&
          admissionFailure(item.endpoint, opts.health) === null
      );
      if (!match) continue;
      extra.push({
        ...combo,
        name: combo.name + "/" + effort,
        models: [
          {
            ...first,
            id: stepId({ endpoint: match.endpoint } as ClassifiedEndpoint),
            model: wanted,
          },
        ],
      });
    }
  }
  combos.push(...extra);

  return { owner: OWNER, graphHash, combos, omitted };
}
