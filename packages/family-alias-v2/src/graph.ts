import type { EnrichedEndpoint } from "./catalog.ts";
import { classifyLocalEndpoint } from "./classify.ts";
import { evaluateEndpoint } from "./health/evaluate.ts";
import type { HealthCache } from "./health/cache.ts";
import { endpointHealthKey } from "./health/cache.ts";
import { OWNER, ownershipDescription, stableHash } from "./ownership.ts";
import { compareVersionNewestFirst } from "./version.ts";
import type { ClassifiedEndpoint } from "./types.ts";

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
  models: Array<
    | DesiredModelStep
    | { id: string; kind: "combo-ref"; comboName: string; weight: 0 }
  >;
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
    const health = opts.health[endpointHealthKey(item.endpoint.connectionId, item.endpoint.modelId)];
    const state = evaluateEndpoint(item.endpoint, health);
    if (state.state === "temporarily_unavailable" && state.preserve) {
      // Preserve last-known-good endpoint identity to avoid destructive graph churn.
      // Runtime health/cooldown decides whether it can serve now.
    } else if (state.state !== "eligible") {
      omitted.push({ modelId: item.endpoint.modelId, reason: state.state });
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
        .map(([display, endpoints]) => ({
          display,
          version: endpoints[0].version,
          endpoints: [...endpoints].sort((a, b) => endpointKey(a).localeCompare(endpointKey(b))),
        }))
        .sort((a, b) => compareVersionNewestFirst(a.version, b.version)),
    }));

  const graphHash = stableHash(
    skeleton.map((family) => ({
      alias: family.alias,
      versions: family.versions.map((version) => ({
        version: version.display,
        endpoints: version.endpoints.map(endpointKey),
      })),
    })),
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
      models: versionNames.map((comboName, index) => ({
        id: `fam-v2-ref-${stableHash(`${family.alias}:${comboName}:${index}`).slice(0, 16)}`,
        kind: "combo-ref",
        comboName,
        weight: 0,
      })),
    });
  }

  return { owner: OWNER, graphHash, combos, omitted };
}
