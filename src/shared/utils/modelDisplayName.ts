/**
 * Human-readable display names for routed models.
 *
 * Model ids are slugs ("claude-opus-5-5", "oc/space-bunny-free"). Registry and
 * synced entries usually publish a human `name`; when nothing does, clients that
 * render `name` (or fall back to the id) show the raw slug in their pickers.
 *
 * `modelDisplayName()` derives a name from an id.
 * `resolveModelDisplayName()` is what callers should use: it keeps a name the
 * registry, a synced row or a custom model already carries, and only derives one
 * when the value it is given is missing or is itself the raw id.
 */

/** Canonical casing for tokens that plain title-casing would get wrong. */
const BRAND_TOKENS: Record<string, string> = {
  ai: "AI",
  claude: "Claude",
  deepseek: "DeepSeek",
  gemma: "Gemma",
  gemini: "Gemini",
  glm: "GLM",
  gpt: "GPT",
  grok: "Grok",
  hf: "HF",
  kimi: "Kimi",
  llama: "Llama",
  mimo: "MiMo",
  mistral: "Mistral",
  mixtral: "Mixtral",
  moonshot: "Moonshot",
  nova: "Nova",
  oss: "OSS",
  phi: "Phi",
  qwen: "Qwen",
  stt: "STT",
  tts: "TTS",
  vl: "VL",
};

/**
 * Brands whose version number is glued on with a dash ("gpt-6.1-sol" -> "GPT-6.1 Sol").
 * Every other family separates it with a space ("Claude Opus 5.5", "GLM 5.3 Flash").
 */
const DASH_VERSION_BRANDS = new Set(["gpt"]);

/** Release-date stamps at the end of ids ("claude-3-5-sonnet-20241022"). */
const DATE_TOKEN = /^(19|20)\d{6}$/;

/** "v4.1" / "V2.6" — an explicit version marker. */
const VERSION_MARKER = /^v\d+([.\d]*)$/i;

/** Digits left over after the brand prefix ("qwen3.8" -> "qwen" + "3.8"). */
const BRANDED_VERSION = /^([A-Za-z]+)(\d[.\d]*)$/;

const DIGITS = /^\d+$/;

function capitalize(token: string): string {
  return token.charAt(0).toUpperCase() + token.slice(1);
}

/** Last path segment: "cmc/deepseek/deepseek-v4.1-flash" -> "deepseek-v4.1-flash". */
function leafOf(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  const slash = trimmed.lastIndexOf("/");
  return slash === -1 ? trimmed : trimmed.slice(slash + 1);
}

/**
 * Split an id leaf into tokens, folding "5-5" back into "5.5" and dropping
 * release-date stamps instead of folding them into the version before them.
 */
function tokenize(leaf: string): string[] {
  const rawTokens = leaf.split(/[-_\s]+/).filter(Boolean);
  const tokens: string[] = [];
  for (let i = 0; i < rawTokens.length; i += 1) {
    const token = rawTokens[i];
    if (DATE_TOKEN.test(token)) continue;
    let merged = token;
    while (
      DIGITS.test(merged) &&
      DIGITS.test(rawTokens[i + 1] || "") &&
      !DATE_TOKEN.test(rawTokens[i + 1])
    ) {
      i += 1;
      merged = `${merged}.${rawTokens[i]}`;
    }
    tokens.push(merged);
  }
  return tokens;
}

function isVersionish(token: string): boolean {
  return /^\d/.test(token) || VERSION_MARKER.test(token);
}

function renderToken(token: string, brand: string | undefined): string {
  if (brand) return brand;
  if (/^\d/.test(token)) return token.toUpperCase();
  return capitalize(token);
}

/**
 * Human-readable name for a model id.
 * Returns "" for anything without a usable id, so callers can fall back.
 *
 *   modelDisplayName("claude-opus-5-5")             -> "Claude Opus 5.5"
 *   modelDisplayName("gpt-6.1-sol")                 -> "GPT-6.1 Sol"
 *   modelDisplayName("glm-5.3-flash")               -> "GLM 5.3 Flash"
 *   modelDisplayName("claude-3-5-sonnet-20241022")  -> "Claude 3.5 Sonnet"
 */
export function modelDisplayName(idOrSlug: unknown): string {
  const leaf = leafOf(idOrSlug);
  if (!leaf) return "";

  const tokens = tokenize(leaf);
  if (tokens.length === 0) return leaf;

  let out = "";
  // Set while the previous token was a dash-brand, so a version right behind it attaches.
  let dashVersion = false;
  for (const token of tokens) {
    const lower = token.toLowerCase();
    const brand = BRAND_TOKENS[lower];

    if (!brand) {
      // "qwen3.8" — brand and version written as a single token.
      const branded = token.match(BRANDED_VERSION);
      const brandedName = branded ? BRAND_TOKENS[branded[1].toLowerCase()] : undefined;
      if (branded && brandedName) {
        const separator = DASH_VERSION_BRANDS.has(branded[1].toLowerCase()) ? "-" : " ";
        out = `${out ? `${out} ` : ""}${brandedName}${separator}${branded[2]}`;
        dashVersion = false;
        continue;
      }
    }

    const rendered = renderToken(token, brand);
    if (!out) {
      out = rendered;
    } else {
      out += dashVersion && isVersionish(token) ? `-${rendered}` : ` ${rendered}`;
    }
    // Only a version glues to the brand, and only the one immediately after it:
    // "gpt-4-turbo" -> "GPT-4 Turbo", not "GPT-Turbo".
    dashVersion = Boolean(brand) && DASH_VERSION_BRANDS.has(lower);
  }

  return out || leaf;
}

/**
 * Display name for a model entry: keep an explicit name when the registry, a
 * synced row or a custom model already has a real one, otherwise derive it from
 * the id.
 *
 *   resolveModelDisplayName("claude-sonnet-4-20250514", "Claude Sonnet 4") -> "Claude Sonnet 4"
 *   resolveModelDisplayName("claude-opus-5-5", "claude-opus-5-5")          -> "Claude Opus 5.5"
 *   resolveModelDisplayName("claude-opus-5-5", "My Daily Driver")          -> "My Daily Driver"
 */
export function resolveModelDisplayName(idOrSlug: unknown, explicitName?: unknown): string {
  const id = typeof idOrSlug === "string" ? idOrSlug.trim() : "";
  const name = typeof explicitName === "string" ? explicitName.trim() : "";
  // Both sides present and different: the published name wins.
  if (id && name && name !== id) return name;
  // Otherwise the only value left may still be a raw id ("claude-opus-5-5"), and
  // modelDisplayName() is idempotent, so a real name passes through unchanged.
  return modelDisplayName(id || name);
}
