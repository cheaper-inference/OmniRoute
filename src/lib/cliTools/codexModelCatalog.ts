import { execFile } from "child_process";
import { promisify } from "util";
import { resolveProviderId } from "@/shared/constants/providers";
import {
  getCliToolCommandCandidates,
  getLookupEnv,
  locateCommandCandidate,
  shouldUseShellForCommand,
} from "@/shared/services/cliRuntime";

const execFileAsync = promisify(execFile);

// Codex validates `model_catalog_json` entries strictly, and every bundled entry
// carries a version-specific system prompt (base_instructions / model_messages).
// OmniRoute entries are therefore cloned from the installed Codex's own bundled
// catalog, never synthesized.
const BUNDLED_CATALOG_ARGS = ["debug", "models", "--bundled"];
const BUNDLED_CATALOG_TIMEOUT_MS = 15_000;
// The bundled dump is ~450 KB and grows with every Codex release.
const BUNDLED_CATALOG_MAX_BUFFER = 16 * 1024 * 1024;

// Each listed entry carries a full system prompt (~60 KB with Codex 0.162), so the
// picker is capped to keep the catalog file bounded on deployments with thousands of
// models. Callers order their input so the models the user selected come first.
export const MAX_LISTED_CATALOG_MODELS = 300;

// Preferred fallback template: a plain shell-tool entry. Code-mode entries expose
// tools that Codex rejects as "unsupported call" when a non-Codex model uses them.
const DEFAULT_TEMPLATE_SLUG = "gpt-5.5";

// Code-mode / responses-lite behavior only the Codex upstream understands.
const CODE_MODE_OVERRIDES = {
  tool_mode: null,
  use_responses_lite: false,
  multi_agent_version: null,
  multi_agent_reasoning_effort: null,
  experimental_supported_tools: [],
};

export type CodexCatalogEntry = Record<string, unknown> & {
  slug: string;
  priority?: number;
  visibility?: string;
};

export type CodexModelCatalog = { models: CodexCatalogEntry[] };

export type CatalogModelInput = string | { id?: unknown; context_length?: unknown } | null;

const isValidEntry = (entry: unknown): entry is CodexCatalogEntry =>
  !!entry &&
  typeof entry === "object" &&
  typeof (entry as { slug?: unknown }).slug === "string" &&
  (entry as { slug: string }).slug !== "";

const isCodeModeEntry = (entry: CodexCatalogEntry) =>
  entry.tool_mode === "code_mode_only" || entry.use_responses_lite === true;

const priorityOf = (entry: CodexCatalogEntry) =>
  typeof entry.priority === "number" && Number.isFinite(entry.priority) ? entry.priority : Infinity;

// gpt-5.5 if bundled, else the first plain listed entry, else the entry Codex itself
// leads its picker with (lowest-priority listed), else the lowest-priority entry.
const pickDefaultTemplate = (entries: CodexCatalogEntry[]): CodexCatalogEntry | null => {
  const preferred = entries.find((e) => e.slug === DEFAULT_TEMPLATE_SLUG);
  if (preferred) return preferred;
  const byPriority = (a: CodexCatalogEntry, b: CodexCatalogEntry) => priorityOf(a) - priorityOf(b);
  const listed = entries.filter((e) => e.visibility === "list").sort(byPriority);
  const plain = listed.find((e) => !isCodeModeEntry(e));
  if (plain) return plain;
  if (listed.length) return listed[0];
  return [...entries].sort(byPriority)[0] || null;
};

// Only `codex/…` (or one of its registry aliases, e.g. `cx/…`) reaches the real Codex
// upstream; unprefixed ids (combos) and every other provider are non-Codex.
const isCodexProviderModel = (id: string) => {
  const slash = id.indexOf("/");
  return slash > 0 && resolveProviderId(id.slice(0, slash)) === "codex";
};

const normalizeModel = (model: CatalogModelInput) => {
  if (typeof model === "string") return { id: model.trim(), contextLength: null };
  if (model && typeof model === "object" && typeof model.id === "string") {
    const contextLength =
      typeof model.context_length === "number" &&
      Number.isFinite(model.context_length) &&
      model.context_length > 0
        ? model.context_length
        : null;
    return { id: model.id.trim(), contextLength };
  }
  return null;
};

/**
 * Build a Codex `model_catalog_json` document listing OmniRoute models.
 *
 * Each OmniRoute model clones the bundled entry whose slug matches the part after the
 * last "/" (`cx/gpt-5.5` ← `gpt-5.5`), else a default template. Bundled entries are
 * kept but hidden so Codex's internal slugs still resolve.
 */
export function buildCodexModelCatalog(
  bundledCatalog: unknown,
  models: CatalogModelInput[]
): CodexModelCatalog {
  const rawBundled = (bundledCatalog as { models?: unknown } | null)?.models;
  const bundled = (Array.isArray(rawBundled) ? rawBundled : []).filter(isValidEntry);
  const defaultTemplate = pickDefaultTemplate(bundled);
  if (!defaultTemplate) return { models: [] };

  const bySlug = new Map(bundled.map((e) => [e.slug, e]));
  const listedEntries: CodexCatalogEntry[] = [];
  const seen = new Set<string>();

  for (const raw of Array.isArray(models) ? models : []) {
    if (listedEntries.length >= MAX_LISTED_CATALOG_MODELS) break;
    const model = normalizeModel(raw);
    if (!model?.id || seen.has(model.id)) continue;
    seen.add(model.id);

    const baseSlug = model.id.slice(model.id.lastIndexOf("/") + 1);
    const matched = bySlug.get(baseSlug);
    const entry = structuredClone(matched || defaultTemplate);

    entry.slug = model.id;
    entry.display_name = model.id;
    entry.description = matched
      ? `${model.id} via OmniRoute`
      : `${model.id} via OmniRoute (Codex profile: ${defaultTemplate.slug})`;
    entry.visibility = "list";
    entry.priority = listedEntries.length + 1;
    // Retirement notices point at bare OpenAI slugs; an inherited upgrade would push
    // the user off a working prefixed model.
    entry.upgrade = null;
    entry.availability_nux = null;

    // Non-Codex upstreams get the plain shell toolset even when the name matches a
    // code-mode bundled model.
    if (!isCodexProviderModel(model.id)) {
      Object.assign(entry, structuredClone(CODE_MODE_OVERRIDES));
    }

    if (!matched) {
      // OpenAI service tiers (Fast/priority) do not exist on arbitrary upstreams.
      entry.service_tiers = [];
      entry.additional_speed_tiers = [];
      // The template's window belongs to a GPT model; prefer OmniRoute's own figure so
      // Codex compacts at the right point instead of overflowing upstream.
      if (model.contextLength) {
        entry.context_window = model.contextLength;
        entry.max_context_window = model.contextLength;
      }
    }

    listedEntries.push(entry);
  }

  // Shift hidden entries past the OmniRoute block, keeping their relative order.
  const offset = listedEntries.length + 1;
  const hiddenBundled = bundled
    .filter((e) => !seen.has(e.slug))
    .map((e) => {
      const priority =
        typeof e.priority === "number" && Number.isFinite(e.priority) ? e.priority : 0;
      return {
        ...structuredClone(e),
        visibility: "hide",
        priority: offset + Math.max(0, priority),
      };
    });

  return { models: [...listedEntries, ...hiddenBundled] };
}

/**
 * Load Codex's bundled model catalog by running the installed CLI
 * (`codex debug models --bundled`). Throws when Codex is not runnable, is too old to
 * have the subcommand, or prints something that is not a catalog.
 *
 * `codexHome` pins `CODEX_HOME` for the child so it reads the same directory OmniRoute
 * writes the config into.
 */
export async function loadBundledCodexCatalog(codexHome: string): Promise<CodexModelCatalog> {
  const env = getLookupEnv();
  const commands = getCliToolCommandCandidates("codex");
  const hasEnvOverride = !!String(process.env.CLI_CODEX_BIN || "").trim();
  const located = await locateCommandCandidate(commands, env, hasEnvOverride ? undefined : "codex");
  if (!located.installed || !located.commandPath || located.reason === "not_executable") {
    throw new Error(`Codex CLI not available (${located.reason || "not_found"})`);
  }

  // Hard Rule #13: argv array, no shell string. Windows .cmd/.bat wrappers still need
  // cmd.exe, which Node quotes itself when `shell` is set.
  const { stdout } = await execFileAsync(located.commandPath, BUNDLED_CATALOG_ARGS, {
    windowsHide: true,
    env: { ...env, CODEX_HOME: codexHome },
    timeout: BUNDLED_CATALOG_TIMEOUT_MS,
    maxBuffer: BUNDLED_CATALOG_MAX_BUFFER,
    ...(shouldUseShellForCommand(located.commandPath) ? { shell: true } : {}),
  });
  const parsed = JSON.parse(String(stdout));
  if (!Array.isArray(parsed?.models) || parsed.models.length === 0) {
    throw new Error("Codex bundled catalog has no models");
  }
  return parsed as CodexModelCatalog;
}
