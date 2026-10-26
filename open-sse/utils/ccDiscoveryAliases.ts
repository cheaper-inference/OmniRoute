/**
 * Claude Code discovery aliases (`claude/<id>` mirror entries).
 *
 * Claude Code's gateway model discovery only lists models whose id begins with
 * `claude` or `anthropic` — any other provider prefix (`kimi/…`, `gemini-cli/…`,
 * combo names, etc.) is invisible to it even when the underlying model is fully
 * routable through OmniRoute. To make every enabled model reachable from Claude
 * Code without renaming anything in the real catalog, this module synthesizes a
 * mirror entry for each eligible model:
 *
 *     claude/<original-id>            e.g. claude/kimi/kimi-k2.6
 *     claude/combo/<combo-name>       for owned_by:"combo" entries
 *
 * The mirror entry keeps every field from the original (translated by the
 * existing model-id handling once the request lands, same as `no-think/…` and
 * the effort-variant aliases), only overriding `id`, `root` (back-pointer to the
 * real id), and `display_name`. This mirrors the structure of
 * `claudeEffortVariants.ts` and `noThinkingAlias.ts`: pure synthesis over the
 * already key-filtered catalog list, no I/O, no mutation of the input array.
 *
 * Never aliased:
 *  - ids that already start with `claude` or `anthropic` (with or without a
 *    following `/`, case-insensitive) — would double-prefix or shadow the base id.
 *  - `no-think/…` aliases — no-think discovery is a separate concern.
 *  - entries the caller's `isEnabled` predicate rejects.
 *  - by default, reasoning-effort variants (`-low`/`-medium`/`-high`/`-xhigh`
 *    suffix) — the historical contract mirrors base ids only.
 *
 * Opt-in refinements (`options.refined`, CATALOG_MIRROR_REFINEMENTS_ENABLED):
 *  - reasoning-effort variants already present in the list (e.g. the registered
 *    `codex/gpt-6-sol-low` … `-xhigh` entries) are mirrored like any other id: the
 *    request path strips `claude/` and the provider's own suffix handling applies,
 *    so `claude/codex/gpt-6-sol-low` routes exactly like `codex/gpt-6-sol-low`.
 *  - built-in `auto`/`auto/*` ids are only mirrored when the injected
 *    `isResolvableAutoId` says the request path will materialize them.
 *  - an alias whose (id, type, subtype) identity is already listed is not
 *    appended a second time.
 */

export const CC_DISCOVERY_PREFIX = "claude/";
export const CC_DISCOVERY_COMBO_PREFIX = "claude/combo/";

// Ids that already live under the claude/anthropic namespace — never re-mirror them.
const ALREADY_CLAUDE_RE = /^(?:claude|anthropic)(?:\/|$)/i;
// Ids that already carry a reasoning-effort suffix — the default contract mirrors base ids only.
const CLAUDE_EFFORT_SUFFIX_RE = /-(?:xhigh|high|medium|low)$/i;
const NO_THINKING_PREFIX = "no-think/";

const CC_DISCOVERY_ALIAS = Symbol("ccDiscoveryAlias");

interface CcDiscoveryCatalogEntry {
  id?: unknown;
  owned_by?: unknown;
  name?: unknown;
  root?: unknown;
  [CC_DISCOVERY_ALIAS]?: true;
  [key: string]: unknown;
}

/**
 * True for an entry synthesized by {@link appendCcDiscoveryAliases}. Later catalog
 * passes use it to avoid re-mirroring a mirror: the alias only resolves through
 * OmniRoute's own `claude/` strip, so no upstream provider can route it.
 */
export function isCcDiscoveryAlias(model: CcDiscoveryCatalogEntry): boolean {
  return model?.[CC_DISCOVERY_ALIAS] === true;
}

export interface CcDiscoveryAliasOptions {
  /** Opt-in refinements (CATALOG_MIRROR_REFINEMENTS_ENABLED); off = historical behavior. */
  refined?: boolean;
  /**
   * Refined mode only: true when a built-in `auto`/`auto/*` id resolves on the
   * request path. Injected so this helper stays free of the auto-combo catalog.
   * When absent, `auto` ids are not filtered.
   */
  isResolvableAutoId?: (id: string) => boolean;
}

/**
 * Ids the mirror must never cover: already claude/anthropic (would double-prefix
 * or shadow the base id) and `no-think/…` aliases; by default also
 * reasoning-effort variants. In refined mode effort variants are mirrored and
 * built-in `auto/*` ids only when the request path will actually resolve them.
 */
function isMirrorableId(id: string, options: CcDiscoveryAliasOptions): boolean {
  if (id.length === 0) return false;
  if (ALREADY_CLAUDE_RE.test(id)) return false;
  if (id.startsWith(NO_THINKING_PREFIX)) return false;
  if (!options.refined) return !CLAUDE_EFFORT_SUFFIX_RE.test(id);
  const isAutoId = id === "auto" || id.startsWith("auto/");
  return !isAutoId || !options.isResolvableAutoId || options.isResolvableAutoId(id);
}

/** Strip a `<provider>/` prefix to get the bare model name, matching the convention in
 * claudeEffortVariants.ts / noThinkingAlias.ts. */
function bareModelName(id: string): string {
  const slash = id.lastIndexOf("/");
  return slash >= 0 ? id.slice(slash + 1) : id;
}

// Match the catalog's (id, type, subtype) identity: audio speech/transcription
// rows intentionally share a public id and must retain both discovery mirrors.
function listingIdentity(model: CcDiscoveryCatalogEntry, id = model.id): string {
  return JSON.stringify([
    id,
    typeof model.type === "string" ? model.type : "",
    typeof model.subtype === "string" ? model.subtype : "",
  ]);
}

/**
 * Append `claude/<id>` (or `claude/combo/<id>` for combos) discovery-mirror
 * entries for every eligible model. Returns the original array reference
 * unchanged when nothing is eligible (no allocation in the common case).
 *
 * `isEnabled` is caller-supplied so this module stays free of feature-flag /
 * gate lookups — it only knows how to synthesize the mirror shape.
 */
export function appendCcDiscoveryAliases<T extends CcDiscoveryCatalogEntry>(
  models: T[],
  isEnabled: (entry: T) => boolean,
  options: CcDiscoveryAliasOptions = {}
): T[] {
  if (!Array.isArray(models)) return models;

  const listedIdentities = options.refined
    ? new Set(models.map((model) => listingIdentity(model)))
    : null;
  const aliases: T[] = [];
  for (const model of models) {
    const id = model.id;
    if (typeof id !== "string" || !isMirrorableId(id, options)) continue;
    if (!isEnabled(model)) continue;

    const isCombo = model.owned_by === "combo";
    const aliasId = isCombo ? `${CC_DISCOVERY_COMBO_PREFIX}${id}` : `${CC_DISCOVERY_PREFIX}${id}`;
    if (listedIdentities) {
      const identity = listingIdentity(model, aliasId);
      if (listedIdentities.has(identity)) continue;
      listedIdentities.add(identity);
    }
    const label = typeof model.name === "string" && model.name ? model.name : id;

    aliases.push({
      ...model,
      id: aliasId,
      // Combo names may legally contain "/" (comboNameSchema allows it), so a combo's
      // root must stay the full name verbatim — only real provider-qualified ids get
      // the "/" stripped down to the bare model name.
      root: isCombo ? id : bareModelName(id),
      display_name: `${label} (OmniRoute)`,
      [CC_DISCOVERY_ALIAS]: true,
    } as T);
  }

  return aliases.length > 0 ? [...models, ...aliases] : models;
}
