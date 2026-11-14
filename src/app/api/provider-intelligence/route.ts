/**
 * GET /api/provider-intelligence?provider=<id>
 *
 * Returns per-model intelligence scores for all models belonging to the
 * specified provider. Reuses the same fuzzy-matching and model-list assembly
 * that powers the free-provider-rankings page.
 *
 * Auth: requireManagementAuth (same guard used by all other management API routes)
 * Errors: any failure after auth is returned through sanitizeErrorMessage() (Hard Rule #12).
 */

import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listModelIntelligence, type ModelIntelligenceEntry } from "@/lib/db/modelIntelligence";
import {
  mergeProviderModels,
  findMatchingIntelligence,
  type RankableModel,
} from "@/lib/freeProviderRankings";
import { isFreeModel } from "@/shared/utils/freeModels";
import { getCustomModels } from "@/lib/db/models";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export interface ProviderModelIntelligence {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  isFree: boolean;
}

type IntelligenceMatch = Pick<
  ModelIntelligenceEntry,
  "score" | "eloRaw" | "confidence" | "category"
>;

/** Resolution chain, strongest first (same order as the task-fitness layers). */
const SOURCE_PRECEDENCE = ["user_override", "arena_elo", "models_dev_tier"];

function sourceRank(source: string): number {
  const rank = SOURCE_PRECEDENCE.indexOf(source);
  return rank === -1 ? SOURCE_PRECEDENCE.length : rank;
}

/**
 * Lookup map of normalized model name -> rows of that model's strongest source.
 *
 * `findMatchingIntelligence` picks the highest score it is given, so weaker
 * sources must be dropped here: a derived `models_dev_tier` row would otherwise
 * outrank the measured Arena score, or an operator override, of the same model.
 * Precedence is per model, not per category, because tier rows cover every
 * category and would still win wherever Arena has no row.
 */
function buildIntelligenceMap(entries: ModelIntelligenceEntry[]): Map<string, IntelligenceMatch[]> {
  const intelMap = new Map<string, IntelligenceMatch[]>();
  const rankByModel = new Map<string, number>();

  for (const { model, source, score, eloRaw, confidence, category } of entries) {
    const key = model.toLowerCase();
    const rank = sourceRank(source);
    const currentRank = rankByModel.get(key);
    if (currentRank !== undefined && rank > currentRank) continue;
    if (currentRank !== rank) {
      intelMap.set(key, []);
      rankByModel.set(key, rank);
    }
    intelMap.get(key)?.push({ score, eloRaw, confidence, category });
  }

  return intelMap;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError as NextResponse;

  const provider = request.nextUrl.searchParams.get("provider");
  if (!provider || provider.trim() === "") {
    return NextResponse.json(
      { error: "Missing required query parameter: provider" },
      { status: 400 }
    );
  }

  try {
    const providerId = provider.trim();

    // Assemble models: static registry + user-added custom models (same as rankings page)
    const entry = REGISTRY[providerId];
    const registryModels: RankableModel[] = entry?.models ?? [];
    const customModels = (await getCustomModels(providerId)) as RankableModel[];
    const models = mergeProviderModels(
      registryModels,
      Array.isArray(customModels) ? customModels : []
    );

    // Load all intelligence entries, keeping each model's best source
    const intelMap = buildIntelligenceMap(listModelIntelligence());

    // Score each model
    const result: ProviderModelIntelligence[] = models.map((model) => {
      const match = findMatchingIntelligence(model.id, intelMap);
      return {
        modelId: model.id,
        modelName: model.name,
        score: match?.score ?? 0,
        eloRaw: match?.eloRaw ?? null,
        confidence: match?.confidence ?? null,
        category: match?.category ?? "",
        isFree: isFreeModel(providerId, { id: model.id }),
      };
    });

    // Sort by score descending
    result.sort((a, b) => b.score - a.score);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: sanitizeErrorMessage(err) }, { status: 500 });
  }
}
