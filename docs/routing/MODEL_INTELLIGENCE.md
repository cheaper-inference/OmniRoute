---
title: "Model Intelligence"
version: 3.8.54
lastUpdated: 2026-11-14
---

# Model Intelligence — How It Works

> Summary of the `model_intelligence` system: sourcing, schedule, storage, and consumption.
> Codebase: `v3.8.54` · Last verified: 2026-11-14

## 1. What the Scores Actually Are

Two benchmark families feed the same `model_intelligence` rows. Both are persisted under the historical source name `arena_elo`, and the `metric` column (see [Storage](#5-storage--db-table)) records which one produced each row.

- **Artificial Analysis (AA) indices** — the _intelligence_, _coding_ and _agentic_ indices published by Artificial Analysis, served by the OpenRouter benchmarks API. This is the primary source whenever an OpenRouter key is available. In the dashboard, "AA Intelligence Index", "AA Coding Index" and "AA Agentic Index" mean these.
- **Arena AI ELO** — crowd-sourced human-preference ratings (LMArena style): humans compare two model outputs, pick the better one, and the result updates an ELO rating per model. Used when no OpenRouter key is configured or the OpenRouter fetch fails.

Either way, OmniRoute normalizes the raw value into a task-fit score in `[0.4, 0.98]` and uses it to rank providers and to bias routing.

## 2. External Sources

| Source            | Upstream                                                                                                                                               | Module                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `arena_elo`       | OpenRouter benchmarks `https://openrouter.ai/api/v1/benchmarks` (AA indices, Design Arena, task benchmarks) — used when an OpenRouter key is available | `src/lib/arenaEloSync.ts`         |
| `arena_elo`       | `https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard` (Arena AI ELO) — used without an OpenRouter key, or when OpenRouter fails                | `src/lib/arenaEloSync.ts`         |
| `arena_elo`       | `lmarena-ai/leaderboard-dataset` on the Hugging Face datasets-server — fallback when the Arena API returns no usable board                             | `src/lib/arenaEloHfSource.ts`     |
| `models_dev_tier` | `https://models.dev/api.json` (via capabilities sync)                                                                                                  | `src/lib/db/modelIntelligence.ts` |
| `user_override`   | Operator API (`POST /api/intelligence/overrides`)                                                                                                      | `src/lib/db/modelIntelligence.ts` |

### Source selection

On every sync (`syncArenaElo()` in `src/lib/arenaEloSync.ts`):

1. If an OpenRouter key resolves, fetch the OpenRouter benchmarks. The key comes from the first active `openrouter` provider connection that has an API key, else the `OPENROUTER_API_KEY` environment variable (`resolveOpenRouterApiKey()`).
2. If there is no key, or the OpenRouter fetch fails (the failure is recorded under `key_value[openrouter/lastFailedAt]`), fall back to the Arena AI leaderboards, then to the Hugging Face dataset.

Only one source is written per refresh; sources are never blended. `GET /api/intelligence/sync` reports `activeSource` (`openrouter`, `wulong` or `huggingface`), and the freshness guard and failure backoff look at the primary source (`openrouter` when a key is configured, otherwise `arena_elo`).

## 3. Schedule — How Often

| Setting         | Default                                                                           | Env var                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Interval        | `86400` s (24 h)                                                                  | `ARENA_ELO_SYNC_INTERVAL`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Enabled         | `true`                                                                            | `ARENA_ELO_SYNC_ENABLED` (also dashboard feature flag)                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| First sync      | Immediately at server boot (`src/instrumentation-node.ts` → `initArenaEloSync()`) | non-blocking, never fatal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Freshness guard | If last sync is younger than interval, skip fetch                                 | `getLatestSyncedAt("arena_elo")`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Failure backoff | After failure, skip for `interval/4` (6 h default)                                | `key_value[arena_elo/lastFailedAt]` or `key_value[openrouter/lastFailedAt]`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Manual trigger  | `POST /api/intelligence/sync` (management auth)                                   | `dryRun: true` previews without writing (the benchmark sync by default, the tier rebuild when combined with `rebuildTier`); `force` (default `true`) skips the freshness guard and failure backoff, so a manual call always refetches (periodic ticks run with `force=false`); `rebuildTier: true` rebuilds only the tier source; `syncArenaElo: true` forces the benchmark sync alongside it. A sync failure answers `502`; a body with no source flag is a benchmark sync, and an empty body is accepted |
| Status + health | `GET /api/intelligence/sync`                                                      | returns `enabled`, `lastSync`, `nextSync`, `intervalMs`, `sources` (includes `openrouter` after an OpenRouter sync), `activeSource`, `lastError`, `lastFailedAt`, `datasetDate`, plus `sourcesDetail` with per-source `count/lastSync/oldestExpiresAt`                                                                                                                                                                                                                                                     |
| Clear           | `DELETE /api/intelligence/sync`                                                   | deletes all `arena_elo` rows                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Failure never crashes the server. Rankings simply show last good data or empty state.

### models_dev_tier rebuild

`models_dev_tier` rows are rebuilt automatically at the end of every successful capabilities save:

- `saveModelsDevCapabilities()` in `src/lib/modelsDevSync.ts` (full replace)
- `upsertSyncedCapabilities()` in `src/lib/modelsDevSync.ts` (incremental upsert)

Errors are swallowed with `console.warn` so the capabilities save is never rolled back.

Manual rebuild: `POST /api/intelligence/sync { "rebuildTier": true }`.

## 4. Transform — ELO to Task-Fit (arena_elo)

```
taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo || 1))
```

- Computed per leaderboard (min/max of that leaderboard).
- Range `[0.4, 0.98]` — never 0 or 1, leaves headroom for user overrides.
- Rounded to 4 decimals.

Category mapping:

| Arena leaderboard | OmniRoute task categories                         |
| ----------------- | ------------------------------------------------- |
| `text`            | `default`, `review`, `documentation`, `debugging` |
| `code`            | `coding`                                          |

Other steps:

- Strip vendor prefixes (`anthropic/`, `openai/`, `google/`, ... 18 total) and harness annotations (` (codex-harness)`).
- Lowercase.
- Confidence from votes: `high` >=5000, `medium` >=1000, `low` <1000.
- Synthesize base rows for effort-suffix variants via `resolveScoresAs()` (best variant score becomes base score).

TTL: `expires_at = now + 7 days`. Reader filters `expires_at IS NULL OR expires_at > now()`.

### Transform — OpenRouter benchmarks (arena_elo)

`transformOpenRouterBenchmarksToModelIntelligence()` applies the same formula as above, with min/max taken **per metric** across the models in the payload. A permaslug (for example `anthropic/claude-4.6-sonnet`) is expanded by `normalizeOpenRouterModelSlug()` into several bare model-name forms (vendor prefix and snapshot date stripped, version-reversed spellings mapped), and every form gets a row. Rows keep the original `permaslug` and a `metric` tag. Phases run in priority order and a later phase never overwrites an earlier one for the same model and category:

1. **Artificial Analysis (primary).** Confidence `high` unless noted.

   | Category                             | Metric used                                                           |
   | ------------------------------------ | --------------------------------------------------------------------- |
   | `default`, `review`, `documentation` | `artificial-analysis:intelligence`                                    |
   | `coding`                             | `artificial-analysis:coding`, else the intelligence index (`medium`)  |
   | `debugging`                          | `artificial-analysis:agentic`, else the intelligence index (`medium`) |

2. **Design Arena ELO** (`design-arena:elo`) fills categories that have no AA row, discounted by `0.85`. The `website`, `gamedev`, `uicomponent` and code categories feed `coding`; the rest feed `default`, `review`, `documentation` and `debugging`.
3. **OpenRouter task benchmarks** (`openrouter:<benchmark_type>`, or `openrouter:multi-bench` when several were averaged) fill what is still empty, discounted by `0.70`. Accuracy is normalized between the best and worst model of each benchmark type and averaged weighted by `total_tasks`; `eloRaw` stores the accuracy percentage. `code` and `tau` benchmarks feed `coding` and `debugging`; the others feed `default`, `review`, `documentation` and `debugging`. Confidence is `high` at >=1000 tasks, `medium` at >=100, else `low`.

Arena-sourced rows also carry a `permaslug` (the leaderboard model name) and a `metric` of `<source>:elo`. Effort-suffix variants are synthesized by `resolveScoresAs()` as before, but a variant only replaces a measured base row when both share the same `metric`.

### Transform — Tier to Task-Fit (models_dev_tier)

`buildModelsDevTierEntries()` reads aggregated `model_capabilities` (capability-maximal booleans + max `limit_context` across providers for the same model id), derives tier via `deriveTierFromCapabilities()`, then maps tier → score via `TIER_TASK_FITNESS`:

| Tier       | Confidence | Scores (coding/review/planning/analysis/debugging/documentation/default) |
| ---------- | ---------- | ------------------------------------------------------------------------ |
| `premium`  | `high`     | 0.92/0.93/0.94/0.95/0.90/0.88/0.85                                       |
| `standard` | `medium`   | 0.85/0.84/0.85/0.85/0.82/0.85/0.78                                       |
| `fast`     | `low`      | 0.78/0.72/0.70/0.72/0.75/0.80/0.72                                       |
| `budget`   | `low`      | 0.65/0.60/0.55/0.58/0.60/0.70/0.55                                       |

The table lives in `open-sse/services/autoCombo/tierFitness.ts`. Routing no longer derives tiers from capabilities at request time: `taskFitness.ts` reads the rows this rebuild persists, so a model only has a `models_dev_tier` fitness after a capabilities sync has run.

`eloRaw = null`, `expiresAt = null` (never expires — rebuilt on next capabilities sync).
Lifecycle veto: ids the vendor has retired (`isVendorRetiredId()`, backed by `config/quality/model-lifecycle.json`) are excluded.

### User Overrides (user_override)

`user_override` entries are written via `POST /api/intelligence/overrides`:

```json
{ "model": "gpt-4o", "category": "coding", "score": 0.95 }
```

- `score` clamped to `[0, 1]`.
- `category` must be one of: `coding | review | planning | analysis | debugging | documentation | default`.
- `expiresAt = null` (never expires until explicitly deleted).
- `DELETE /api/intelligence/overrides?model=gpt-4o&category=coding` removes the entry idempotently.
- Both routes require management authentication.

## 5. Storage — DB Table

Migration `097_model_intelligence.sql`:

```sql
CREATE TABLE model_intelligence (
  model TEXT NOT NULL,
  source TEXT NOT NULL,       -- arena_elo (OpenRouter / Arena / HF rows) | models_dev_tier | user_override
  category TEXT NOT NULL,     -- coding | review | planning | analysis | debugging | documentation | default
  score REAL NOT NULL,        -- [0..1]
  elo_raw INTEGER,            -- original ELO if arena_elo
  confidence TEXT,            -- high | medium | low
  synced_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,            -- NULL = never expires
  PRIMARY KEY (model, source, category)
) WITHOUT ROWID;
```

Two nullable columns were added later:

- `permaslug TEXT` (migration `242_model_intelligence_permaslug.sql`) — the original upstream benchmark identifier (for example `google/gemini-2.5-flash`), so the Free Provider Rankings page and routing can show and verify which benchmark entry a model was matched to.
- `metric TEXT` (migration `243_model_intelligence_metric.sql`) — the exact metric behind the score: `artificial-analysis:intelligence`, `artificial-analysis:coding`, `artificial-analysis:agentic`, `design-arena:elo`, `openrouter:<benchmark>`, `openrouter:multi-bench`, or `<source>:elo` for Arena data.

Indexes: `(model, category)`, `(source)`, `(expires_at) WHERE NOT NULL`.

Domain module: `src/lib/db/modelIntelligence.ts`.

| Function                                    | Role                                             | Production caller                                       |
| ------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `applyArenaEloRefresh(entries)`             | Atomic upsert+prune in one tx                    | `arenaEloSync.ts`                                       |
| `buildModelsDevTierEntries(caps?)`          | Derive tier rows from capabilities               | `rebuildModelsDevTierIntelligence()`                    |
| `applyModelsDevTierRefresh(entries)`        | Atomic upsert+prune for tier source              | `rebuildModelsDevTierIntelligence()`                    |
| `rebuildModelsDevTierIntelligence()`        | Full tier rebuild (read caps → derive → persist) | `modelsDevSync.ts`, `POST /api/intelligence/sync`       |
| `getIntelligenceSourcesHealth()`            | Per-source count/lastSync/oldestExpiresAt        | `GET /api/intelligence/sync`                            |
| `setUserFitnessOverrideEntry`               | Write user_override                              | `POST /api/intelligence/overrides`                      |
| `deleteUserFitnessOverrideEntry`            | Delete user_override                             | `DELETE /api/intelligence/overrides`                    |
| `listModelIntelligence({source, category})` | List/filter                                      | `freeProviderRankings.ts`                               |
| `getModelIntelligence(model, category)`     | Priority-ordered lookup (override > elo > tier)  | none in production code at this revision (tests only)   |
| `getModelIntelligenceBySource`              | Single-source lookup                             | `taskFitness.ts::queryModelIntelligence`                |
| `getLatestSyncedAt(source)`                 | Freshness guard                                  | `arenaEloSync.ts`, `rebuildModelsDevTierIntelligence()` |

## 6. Deployed Sources

| Source            | Written by                                                 | Persisted rows   | Notes                                                          |
| ----------------- | ---------------------------------------------------------- | ---------------- | -------------------------------------------------------------- |
| `arena_elo`       | 24 h periodic benchmark sync (OpenRouter, else Arena / HF) | Yes — TTL 7 days | Score + confidence + `permaslug` + `metric` per model/category |
| `models_dev_tier` | Capabilities sync success hook                             | Yes — no TTL     | Rebuilt atomically; prunes stale rows                          |
| `user_override`   | `POST /api/intelligence/overrides`                         | Yes — no TTL     | Operator-set; persists until DELETEd                           |

## 7. Consumption — Two Surfaces

### 7a. Free Provider Rankings

`src/lib/freeProviderRankings.ts::computeFreeProviderRankings()`

- Iterates `getFreeProviders()` = all `NOAUTH_PROVIDERS` + `OAUTH_PROVIDERS`/`APIKEY_PROVIDERS` where `providerHasFreeModels(id)` (shipped free catalog, models flagged free, and — through the checker registered in `src/lib/db/models.ts` — custom or synced models flagged free or priced at zero; that answer is cached for 10 s per provider).
- For each provider, loads `REGISTRY[provider].models` + custom + synced models, then matches each model id to a benchmark row with `findMatchingIntelligence()` from `src/lib/modelIntelligenceMatching.ts` (the same matcher the routing engine uses, see 7b).
- Keeps only models with a match; sorts models by score; provider ranked by `topModel.score` then `averageScore`.
- Each ranking carries `models[]`, the considered models best first, with `score`, `eloRaw`, `confidence`, `category`, `isFree`, `permaslug` and `metric`.
- Exposed at `GET /api/free-provider-rankings?category=&limit=&configuredOnly=&availableOnly=&freeModelsOnly=` and dashboard `/dashboard/free-provider-rankings`. Categories map to AA indices: `default` = intelligence, `coding` = coding, `debugging` = agentic.

Matching strategy (`modelIntelligenceMatching.ts`):

1. Exact match on any normalized candidate id. Candidates strip `:free` / `-free`, vendor prefixes (`google/…`), snapshot dates (`-20260303`, `-2026-03-03`) and `-preview`.
2. Exact match with a trailing version suffix stripped (`kimi-k2.6` -> `kimi-k2`).
3. Preview-added fallback (the provider id lacks `-preview`, the benchmark has it).
4. Symmetrical stem match: the benchmark model is a prefix of the candidate id, or the candidate id is a prefix of the benchmark model.

### 7b. Auto-Combo Task Fitness (Routing)

`open-sse/services/autoCombo/taskFitness.ts::getTaskFitnessWithSource(model, taskType)`

Resolution chain per request (highest priority first):

1. `user_override` DB hit
2. `arena_elo` DB hit (OpenRouter AA, Design Arena, task benchmark, Arena or HF rows), matched with the shared `modelIntelligenceMatching.ts` rules
3. Inherited retry of 1-2 via `resolveScoresAs()` base id (`:inherited`)
4. `models_dev_tier` DB hit — populated on capabilities sync
5. Neutral `0.5` ("no evidence", not a quality claim)

The hand-maintained static fitness table and the name-pattern boosts (`coder`, `code`, `fast`, `thinking`) were removed, so a model with no benchmark row is no longer favored or penalized by its name.

Retired ids (via `model-lifecycle.json`) veto layers 1-4 and return neutral 0.5.

Variants pin a task type: `auto/coding` scores with `coding` and `auto/agentic` with `debugging`, which is the AA agentic index. A combo can also set `config.auto.taskType` explicitly.

Consumed by `scoring.ts::scorePool()` (16-factor auto-combo scoring) and `comboScoringInspector`.

## 8. Provider Binding — Model-Keyed, Not Provider-Keyed

`model_intelligence.model` is a **bare model name** (`claude-opus-4-6`), not `provider/model`. The Arena sync strips vendor prefixes before storing. Matching is by model id, so the same score applies regardless of which provider serves that model.

### Aggregators / Upstream Proxies

- `UPSTREAM_PROXY_PROVIDERS` (`cliproxyapi`, `9router`) are **not** iterated by `getFreeProviders()`.
- `AGGREGATOR_PROVIDER_IDS` (~50 ids) **are** in `REGISTRY` and eligible for rankings and routing. Their registry model ids are matched against bare Arena/tier names via `findMatchingIntelligence` / `resolveScoresAs`.

## 9. Health API

`GET /api/intelligence/sync` now returns an additional `sourcesDetail` field:

```json
{
  "enabled": true,
  "lastSync": "2026-10-07T12:00:00Z",
  "nextSync": "2026-10-08T12:00:00Z",
  "intervalMs": 86400000,
  "sources": ["arena_elo"],
  "sourcesDetail": {
    "arena_elo": {
      "count": 1842,
      "lastSync": "2026-10-07T12:00:00Z",
      "oldestExpiresAt": "2026-10-14T12:00:00Z"
    },
    "models_dev_tier": {
      "count": 4312,
      "lastSync": "2026-10-07T11:00:00Z",
      "oldestExpiresAt": null
    },
    "user_override": { "count": 3, "lastSync": "2026-10-07T10:00:00Z", "oldestExpiresAt": null }
  }
}
```

## 10. Related Files

- `src/lib/arenaEloSync.ts` — fetch, transform, schedule, status
- `src/lib/db/modelIntelligence.ts` — table + CRUD + tier rebuild + health
- `src/lib/db/migrations/097_model_intelligence.sql` — schema; `242_model_intelligence_permaslug.sql`, `243_model_intelligence_metric.sql` — `permaslug` and `metric` columns
- `src/lib/modelIntelligenceMatching.ts` — shared model-id ↔ benchmark matching (rankings + routing)
- `src/lib/arenaEloHfSource.ts` — Hugging Face leaderboard fallback
- `src/lib/freeProviderRankings.ts` — rankings join + matching
- `src/lib/modelsDevSync.ts` — models.dev capabilities (tier rebuild wiring)
- `open-sse/services/autoCombo/taskFitness.ts` — routing fitness chain
- `open-sse/services/autoCombo/tierFitness.ts` — tier → fitness table used by the persisted `models_dev_tier` rebuild
- `open-sse/services/autoCombo/scoresAs.ts` — variant->base resolution
- `src/app/api/intelligence/sync/route.ts` — manual sync/status/clear + rebuildTier + sourcesDetail
- `src/app/api/intelligence/overrides/route.ts` — POST/DELETE user_override entries
- `src/app/api/free-provider-rankings/route.ts` — rankings API
- `docs/guides/FREE_PROVIDER_RANKINGS.md` — user-facing guide
